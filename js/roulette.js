// ═══════════════════════════════════════════════════════════════════
// 🎡 Kitty's Roulette · roulette.js
// ───────────────────────────────────────────────────────────────────
// Juego de ruleta del Casino. Se comunica con el juego principal
// (slots) a través de window.__casino — la billetera compartida.
// Extraído de index.html para mantener el HTML liviano.
// ═══════════════════════════════════════════════════════════════════

(function(){
  var ORDER=[0,32,15,19,4,21,2,25,17,34,6,27,13,36,11,30,8,23,10,5,24,16,33,1,20,14,31,9,22,18,29,7,28,12,35,3,26];
  var RED=new Set([1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36]);
  var N=ORDER.length, ANG=360/N;
  function colorOf(n){ return n===0?'green':(RED.has(n)?'red':'black'); }

  var balance=1000, currentChip=25, bets={}, spinning=false, rotation=0, recents=[], lastBets=null, streak=0, allInArmed=false;
  // ===== PUENTE DE BILLETERA COMPARTIDA CON KITTY'S CASINO (Slots) =====
  // Lee/escribe las fichas del estado global de Slots (window.__casino) para compartir la economía.
  function rlLoadCredits(){ try{ if(window.__casino && typeof window.__casino.getCredits==='function'){ balance = window.__casino.getCredits(); } }catch(_e){} }
  function rlSaveCredits(){ try{ if(window.__casino && typeof window.__casino.setCredits==='function'){ window.__casino.setCredits(balance); } }catch(_e){} }
  // estado de reposo de la bolita: dónde quedó y con qué rotación de rueda (para que gire junto al arrastrar)
  var ballRestDeg=null, ballRestRad=null, ballRestRotation=0;

  // ---------- construir rueda ----------
  function pt(cx,cy,r,deg){ var a=(deg-90)*Math.PI/180; return [cx+r*Math.cos(a), cy+r*Math.sin(a)]; }
  function buildWheel(){
    var cx=150,cy=150,R=142, parts=[];
    for(var i=0;i<N;i++){
      var n=ORDER[i], a0=i*ANG, a1=(i+1)*ANG, mid=(i+0.5)*ANG;
      var p0=pt(cx,cy,R,a0), p1=pt(cx,cy,R,a1);
      var col=colorOf(n)==='red'?'#e02850':(colorOf(n)==='green'?'#1fbf6b':'#181030');
      parts.push('<path d="M'+cx+' '+cy+' L'+p0[0].toFixed(1)+' '+p0[1].toFixed(1)+' A'+R+' '+R+' 0 0 1 '+p1[0].toFixed(1)+' '+p1[1].toFixed(1)+' Z" fill="'+col+'" stroke="#0a0618" stroke-width="1"/>');
      var tp=pt(cx,cy,R-13,mid);
      parts.push('<text x="'+tp[0].toFixed(1)+'" y="'+tp[1].toFixed(1)+'" fill="#fff" font-family="Press Start 2P, monospace" font-size="8" text-anchor="middle" dominant-baseline="central" transform="rotate('+mid.toFixed(1)+' '+tp[0].toFixed(1)+' '+tp[1].toFixed(1)+')">'+n+'</text>');
    }
    parts.push('<circle cx="150" cy="150" r="146" fill="none" stroke="#0a0618" stroke-width="8"/>');
    parts.push('<circle cx="150" cy="150" r="142" fill="none" stroke="#ffd23f" stroke-width="4"/>');
    parts.push('<circle cx="150" cy="150" r="138" fill="none" stroke="#0a0618" stroke-width="3"/>');
    parts.push('<circle cx="150" cy="150" r="53" fill="none" stroke="#0a0618" stroke-width="4"/>');
    parts.push('<circle cx="150" cy="150" r="49" fill="none" stroke="#ffd23f" stroke-width="2"/>');
    document.getElementById('wheel').innerHTML=parts.join('');
  }

  // ---------- construir tablero ----------
  function cellHTML(n){ return '<div class="cell '+colorOf(n)+'" data-bet="n'+n+'">'+n+'<span class="chipon" data-chip="n'+n+'" style="display:none"></span></div>'; }
  function buildBoard(){
    var g=['<div class="cell zero green" data-bet="n0">0<span class="chipon" data-chip="n0" style="display:none"></span></div>'];
    // 3 filas: arriba 3,6,..36 ; medio 2,5,..35 ; abajo 1,4,..34
    var rows=[[],[],[]];
    for(var c=0;c<12;c++){ rows[0].push(3+c*3); rows[1].push(2+c*3); rows[2].push(1+c*3); }
    for(var r=0;r<3;r++){ for(var c2=0;c2<12;c2++){ g.push(cellHTML(rows[r][c2])); } 
      g.push('<div class="cell col" data-bet="c'+(3-r)+'">2:1<span class="chipon" data-chip="c'+(3-r)+'" style="display:none"></span></div>'); }
    document.getElementById('grid').innerHTML=g.join('');

    var dz=[['d1','1ra 12'],['d2','2da 12'],['d3','3ra 12']].map(function(x){
      return '<div class="obet" data-bet="'+x[0]+'">'+x[1]+'<span class="chipon" data-chip="'+x[0]+'" style="display:none"></span></div>';}).join('');
    document.getElementById('dozens').innerHTML=dz;

    var ob=[['low','1-18'],['even','PAR'],['red','<span class="sw red"></span>'],['black','<span class="sw black"></span>'],['odd','IMPAR'],['high','19-36']].map(function(x){
      return '<div class="obet" data-bet="'+x[0]+'">'+x[1]+'<span class="chipon" data-chip="'+x[0]+'" style="display:none"></span></div>';}).join('');
    document.getElementById('outside').innerHTML=ob;

    document.querySelectorAll('[data-bet]').forEach(function(el){
      el.addEventListener('click', function(){ placeBet(el.getAttribute('data-bet')); });
    });
  }

  // ---------- fichas ----------
  var CHIPS=[[25,'c25'],[100,'c100'],[500,'c500'],[1000,'c1000']];
  function buildChips(){
    document.getElementById('chips').innerHTML=CHIPS.map(function(x){
      return '<button class="chip '+x[1]+(x[0]===currentChip?' sel':'')+'" data-val="'+x[0]+'">'+x[0]+'</button>';}).join('');
    document.querySelectorAll('.chip').forEach(function(b){
      b.addEventListener('click', function(){ currentChip=parseInt(b.getAttribute('data-val'),10);
        document.querySelectorAll('.chip').forEach(function(c){ c.classList.remove('sel'); }); b.classList.add('sel'); });
    });
  }

  // ---------- apuestas ----------
  function totalBet(){ var t=0; for(var k in bets) t+=bets[k]; return t; }
  function updateBal(){ document.getElementById('bal').textContent=balance; document.getElementById('totalbet').textContent=totalBet(); refreshRebet(); rlSaveCredits(); }
  function refreshRebet(){
    var has=lastBets && Object.keys(lastBets).length>0;
    document.getElementById('repeatBtn').disabled = spinning || !has;
    document.getElementById('doubleBtn').disabled = spinning || (!has && totalBet()===0);
  }
  // racha caliente: bonus desde la 2da victoria seguida, +10% por victoria, tope +50%
  function streakBonusPct(){ return Math.min(Math.max(streak-1,0), 5) * 10; }
  function renderStreak(){
    var el=document.getElementById('streak');
    if(streak>=2){
      el.classList.add('on');
      document.getElementById('streakN').textContent=streak;
      document.getElementById('streakBonus').textContent='+'+streakBonusPct()+'%';
      if(streak>=4) el.classList.add('hot'); else el.classList.remove('hot');
    } else {
      el.classList.remove('on','hot');
    }
  }
  // aplica un mapa de apuestas encima de las actuales, cobrando del saldo; recorta si no alcanza
  function applyBets(map){
    var short=false;
    for(var k in map){
      var want=map[k];
      var can=Math.min(want, balance);
      if(can<want) short=true;
      if(can>0){ balance-=can; bets[k]=(bets[k]||0)+can; refreshChip(k); }
    }
    updateBal();
    return short;
  }
  function chipSpan(bet){ return document.querySelector('.chipon[data-chip="'+bet+'"]'); }
  function refreshChip(bet){ var s=chipSpan(bet); if(!s) return; if(bets[bet]){ s.style.display='flex'; s.textContent=bets[bet]>=1000?(Math.round(bets[bet]/100)/10)+'k':bets[bet]; } else { s.style.display='none'; } }
  function placeBet(bet){
    if(spinning) return;
    if(allInArmed){ doAllIn(bet); return; }
    if(balance<currentChip){ say('😿','No te alcanza para esa ficha.'); return; }
    balance-=currentChip; bets[bet]=(bets[bet]||0)+currentChip; refreshChip(bet); updateBal();
  }
  // ---------- all-in ----------
  function setArmed(on){
    allInArmed=on;
    var btn=document.getElementById('allinBtn'), board=document.querySelector('.board');
    if(btn) btn.classList.toggle('armed', on);
    if(board) board.classList.toggle('aiming', on);
  }
  function doAllIn(bet){
    var pot=balance+totalBet();
    if(pot<=0){ setArmed(false); say('😿','No tenés fichas para apostar.'); return; }
    // todo (saldo + lo ya apostado) va a una sola casilla
    bets={}; document.querySelectorAll('.chipon').forEach(function(s){ s.style.display='none'; });
    bets[bet]=pot; balance=0; refreshChip(bet); updateBal();
    setArmed(false);
    say('💰','¡ALL-IN de <b>'+pot+'</b> 🪙 a '+betName(bet)+'! Que la suerte te acompañe. 😼');
    kbReact('kb-win','💰');
  }
  function clearBets(refund){
    if(spinning) return;
    setArmed(false);
    if(refund){ balance+=totalBet(); }
    bets={}; document.querySelectorAll('.chipon').forEach(function(s){ s.style.display='none'; }); updateBal();
  }

  // ---------- pagos ----------
  function wins(bet,w){
    if(bet[0]==='n') return parseInt(bet.slice(1),10)===w;
    switch(bet){
      case 'red': return RED.has(w); case 'black': return w!==0 && !RED.has(w);
      case 'odd': return w!==0 && w%2===1; case 'even': return w!==0 && w%2===0;
      case 'low': return w>=1&&w<=18; case 'high': return w>=19&&w<=36;
      case 'd1': return w>=1&&w<=12; case 'd2': return w>=13&&w<=24; case 'd3': return w>=25&&w<=36;
      case 'c1': return w!==0 && w%3===1; case 'c2': return w!==0 && w%3===2; case 'c3': return w!==0 && w%3===0;
    }
    return false;
  }
  function payout(bet){ if(bet[0]==='n') return 35; if(bet[0]==='d'||bet[0]==='c') return 2; return 1; }

  // ---------- mensajes ----------
  function say(face,txt){ document.getElementById('kface').textContent=face; document.getElementById('ksay').innerHTML=txt; }

  // ---------- reacciones de KitBoss (rápidas: transforms + globito) ----------
  var KB_ANIMS=['kb-watch','kb-win','kb-hot','kb-nod','kb-lose'];
  function kbAnim(name){
    var cat=document.querySelector('.hubcat'); if(!cat) return;
    KB_ANIMS.forEach(function(c){ cat.classList.remove(c); });
    if(name==='kb-watch'){ cat.classList.add('kb-watch'); return; } // loop, se saca aparte
    void cat.offsetWidth; // reiniciar animación
    cat.classList.add(name);
    cat.addEventListener('animationend', function h(){ cat.classList.remove(name); cat.removeEventListener('animationend', h); });
  }
  function kbStopWatch(){ var cat=document.querySelector('.hubcat'); if(cat) cat.classList.remove('kb-watch'); }
  function kbBubble(emoji){
    var b=document.getElementById('kbubble'); if(!b) return;
    b.textContent=emoji; b.classList.remove('pop'); void b.offsetWidth; b.classList.add('pop');
  }
  function kbEyesOff(){
    var e=document.getElementById('hubeyes'), h=document.querySelector('.hub');
    if(e) e.classList.remove('on'); if(h) h.classList.remove('eyes-on');
  }
  function kbReact(anim, emoji){ kbEyesOff(); kbStopWatch(); kbAnim(anim); if(emoji) kbBubble(emoji); }

  // ---------- ojos animados de KitBoss (7 frames, controlados por JS) ----------
  // Mapeo de dirección de mirada -> índice de frame en el spritesheet:
  //  F0 = sup-der (base) | F1 = arriba | F2 = sup-izq | F3 = medio-izq
  //  F4 = inf-izq | F5 = abajo | F6 = inf-der
  var EYE_UP=1, EYE_UP_RIGHT=0; // la bolita cae arriba; miramos hacia arriba al final
  function setEyeFrame(idx){
    var e=document.getElementById('hubeyes'); if(!e) return;
    idx=((idx%7)+7)%7;
    e.style.backgroundPosition=(idx/6*100)+'% 0';
  }
  // ángulo de la bolita (coords CSS: 0=der, -90=arriba, 90=abajo, 180=izq) -> frame que mira hacia ahí
  var EYE_DIRS=[[-45,0],[-90,1],[-135,2],[180,3],[135,4],[90,5],[45,6]];
  function normDeg(a){ a=a%360; if(a>180)a-=360; if(a<-180)a+=360; return a; }
  function eyeFrameForAngle(deg){
    var d=normDeg(deg), best=1, bd=999;
    for(var i=0;i<EYE_DIRS.length;i++){
      var diff=Math.abs(normDeg(d-EYE_DIRS[i][0]));
      if(diff<bd){ bd=diff; best=EYE_DIRS[i][1]; }
    }
    return best;
  }


  // ---------- girar ----------
  var wheelEl=document.getElementById('wheel');
  // ---------- audio: clicks de la ruleta + festejo ----------
  var actx=null;
  function ensureAudio(){ try{ if(!actx) actx=new (window.AudioContext||window.webkitAudioContext)(); if(actx&&actx.state==='suspended') actx.resume(); }catch(_e){} }
  function tick(vol){ try{ if(!actx) return; var dl=0.028;
      var buf=actx.createBuffer(1, Math.max(1,Math.floor(actx.sampleRate*dl)), actx.sampleRate), d=buf.getChannelData(0);
      for(var i=0;i<d.length;i++){ d[i]=(Math.random()*2-1)*Math.pow(1-i/d.length,2.6); }
      var s=actx.createBufferSource(); s.buffer=buf;
      var bp=actx.createBiquadFilter(); bp.type='bandpass'; bp.frequency.value=2700; bp.Q.value=1.4;
      var g=actx.createGain(); g.gain.value=(vol||0.3);
      s.connect(bp); bp.connect(g); g.connect(actx.destination); s.start(actx.currentTime);
    }catch(_e){} }
  function beep(freq,when,dur,vol,type){ try{ if(!actx) return; var o=actx.createOscillator(), g=actx.createGain();
      o.type=type||'square'; o.frequency.value=freq; var t=actx.currentTime+when;
      g.gain.setValueAtTime(0.0001,t); g.gain.exponentialRampToValueAtTime(vol||0.25,t+0.02); g.gain.exponentialRampToValueAtTime(0.0001,t+(dur||0.15));
      o.connect(g); g.connect(actx.destination); o.start(t); o.stop(t+(dur||0.15)+0.03);
    }catch(_e){} }
  function playWin(){ ensureAudio(); beep(523,0,0.12,0.22,'square'); beep(659,0.10,0.12,0.22,'square'); beep(784,0.20,0.16,0.24,'square'); beep(1047,0.32,0.22,0.24,'triangle'); }

  // ---------- música de fondo (chiptune synthwave, generada) ----------
  var music={on:false, master:null, timer:null, step:0, nextTime:0};
  var NF={A2:110.00,F2:87.31,C3:130.81,G2:98.00,
          F3:174.61,G3:196.00,A3:220.00,B3:246.94,
          C4:261.63,D4:293.66,E4:329.63,F4:349.23,G4:392.00,A4:440.00,
          C5:523.25,E5:659.25,G5:783.99};
  // 4 compases (Am-F-C-G). Cada compás: bajo (raíz) + arpegio de 4 notas + pad.
  var PROG=[
    {bass:'A2', arp:['A3','C4','E4','A4'], pad:['A3','E4']},
    {bass:'F2', arp:['F3','A3','C4','F4'], pad:['F3','C4']},
    {bass:'C3', arp:['C4','E4','G4','C5'], pad:['G3','E4']},
    {bass:'G2', arp:['G3','B3','D4','G4'], pad:['G3','D4']}
  ];
  var BPM=100, SIXTEENTH=(60/BPM)/4; // duración de un 16avo
  // sintetizadores simples que cuelgan del master de música
  function mNote(freq, t, dur, vol, type, glide){
    if(!actx||!music.master) return;
    var o=actx.createOscillator(), g=actx.createGain();
    o.type=type||'square'; o.frequency.setValueAtTime(freq,t);
    if(glide) o.frequency.exponentialRampToValueAtTime(freq*glide,t+dur);
    g.gain.setValueAtTime(0.0001,t);
    g.gain.exponentialRampToValueAtTime(vol,t+0.02);
    g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
    o.connect(g); g.connect(music.master); o.start(t); o.stop(t+dur+0.03);
  }
  function mHat(t, vol){
    if(!actx||!music.master) return;
    var n=Math.floor(actx.sampleRate*0.03), buf=actx.createBuffer(1,n,actx.sampleRate), d=buf.getChannelData(0);
    for(var i=0;i<n;i++) d[i]=(Math.random()*2-1)*Math.pow(1-i/n,3);
    var s=actx.createBufferSource(); s.buffer=buf;
    var hp=actx.createBiquadFilter(); hp.type='highpass'; hp.frequency.value=7000;
    var g=actx.createGain(); g.gain.value=vol;
    s.connect(hp); hp.connect(g); g.connect(music.master); s.start(t);
  }
  // programa un 16avo del loop (step 0..15 -> 4 compases de 4 16avos... usamos 16 pasos = 4 compases de 4 negras)
  function scheduleStep(step, t){
    var bar=Math.floor(step/4)%4, beat=step%4, chord=PROG[bar];
    // bajo: golpea en cada negra (pulso synthwave)
    mNote(NF[chord.bass], t, 0.26, 0.16, 'sawtooth');
    if(beat===2) mNote(NF[chord.bass]*2, t, 0.20, 0.09, 'sawtooth'); // octava sutil
    // arpegio: una nota por negra, sonido brillante
    mNote(NF[chord.arp[beat]], t, 0.34, 0.075, 'square');
    // pad suave sosteniendo el acorde al inicio del compás
    if(beat===0){ mNote(NF[chord.pad[0]], t, 1.1, 0.045, 'triangle'); mNote(NF[chord.pad[1]], t, 1.1, 0.04, 'triangle'); }
    // hi-hat en contratiempo
    mHat(t+SIXTEENTH*2, 0.05);
  }
  function musicLoop(){
    if(!music.on||!actx) return;
    var ahead=0.2; // programar 200ms por adelantado
    while(music.nextTime < actx.currentTime + ahead){
      scheduleStep(music.step, music.nextTime);
      music.nextTime += (60/BPM); // avanza una negra
      music.step=(music.step+1)%16;
    }
    music.timer=setTimeout(musicLoop, 60);
  }
  function musicStart(){
    ensureAudio(); if(!actx) return;
    if(music.on) return;
    if(!music.master){ music.master=actx.createGain(); music.master.gain.value=0.55; music.master.connect(actx.destination); }
    music.on=true; music.step=0; music.nextTime=actx.currentTime+0.06;
    musicLoop();
  }
  function musicStop(){
    music.on=false; if(music.timer){ clearTimeout(music.timer); music.timer=null; }
  }
  function musicToggle(){
    if(music.on){ musicStop(); } else { musicStart(); }
    var btn=document.getElementById('musicBtn');
    if(btn){ btn.classList.toggle('off', !music.on); btn.textContent=music.on?'🎵':'🔇'; }
  }

  function flyChips(){
    try{
      var wrap=document.querySelector('.wheel-wrap'); if(!wrap) return;
      var wr=wrap.getBoundingClientRect(), cx=wr.left+wr.width/2, cy=wr.top+wr.height/2, srcs=[];
      document.querySelectorAll('.chipon').forEach(function(s){
        if(s.style.display!=='none'){ var r=s.getBoundingClientRect(); if(r.width) srcs.push({x:r.left+r.width/2, y:r.top+r.height/2}); }
      });
      if(!srcs.length) return;   // sin apuestas, no vuela nada
      srcs=srcs.slice(0,12);
      srcs.forEach(function(sp,idx){
        var fc=document.createElement('div'); fc.className='flychip';
        fc.style.left=sp.x+'px'; fc.style.top=sp.y+'px';
        fc.style.setProperty('--dx',(cx-sp.x)+'px'); fc.style.setProperty('--dy',(cy-sp.y)+'px');
        fc.style.animationDelay=(idx*0.045)+'s';
        document.body.appendChild(fc);
        (function(el){ setTimeout(function(){ if(el.parentNode) el.parentNode.removeChild(el); }, 980); })(fc);
      });
      var _ww=document.querySelector('.wheel-wrap');
      if(_ww){ setTimeout(function(){ _ww.classList.remove('hop'); void _ww.offsetWidth; _ww.classList.add('hop'); setTimeout(function(){ _ww.classList.remove('hop'); }, 450); }, 560); }
      document.querySelectorAll('.chipon').forEach(function(s){ s.style.display='none'; });
    }catch(_e){}
  }

  function flyWinToBalance(inc){
    try{
      var wrap=document.querySelector('.wheel-wrap'), balBox=document.querySelector('.bal'), balNum=document.getElementById('bal');
      if(!wrap||!balBox||!balNum){ updateBal(); return; }
      var wr=wrap.getBoundingClientRect(), br=balBox.getBoundingClientRect();
      var sx=wr.left+wr.width/2, sy=wr.top+wr.height/2, tx=br.left+br.width/2, ty=br.top+br.height/2;
      var start=balance-inc; balNum.textContent=start;
      var count=8;
      for(var i=0;i<count;i++){
        (function(i){
          var fc=document.createElement('div'); fc.className='flychip towin';
          fc.style.left=sx+'px'; fc.style.top=sy+'px';
          fc.style.setProperty('--dx',(tx-sx)+'px'); fc.style.setProperty('--dy',(ty-sy)+'px');
          fc.style.animationDelay=(i*0.06)+'s';
          document.body.appendChild(fc);
          setTimeout(function(){
            if(fc.parentNode) fc.parentNode.removeChild(fc);
            balNum.textContent=Math.round(start + inc*((i+1)/count));
            balBox.classList.remove('balhit'); void balBox.offsetWidth; balBox.classList.add('balhit');
          }, 600 + i*60);
        })(i);
      }
      setTimeout(function(){ updateBal(); }, 600 + count*60 + 160);
    }catch(_e){ updateBal(); }
  }

  function landAndResolve(turns){
    if(spinning) return;
    setArmed(false);
    spinning=true; ensureAudio(); flyChips();
    document.getElementById('rl-spinBtn').disabled=true; document.getElementById('clearBtn').disabled=true; refreshRebet();
    say('🐱','La bolita gira...');
    var _eyes=document.getElementById('hubeyes'), _hub=document.querySelector('.hub');
    if(_eyes) _eyes.classList.add('on'); if(_hub) _hub.classList.add('eyes-on');
    setEyeFrame(EYE_UP); // arranca mirando arriba
    var winIdx=Math.floor(Math.random()*N), w=ORDER[winIdx];
    var land=-((winIdx+0.5)*ANG);
    var add=(((land-(rotation%360))%360)+360)%360;
    var startRot=rotation, target=rotation + Math.max(3,turns)*360 + add;
    rotation=target;
    var dur=Math.min(6800, Math.max(3600, 3200 + turns*300));
    var t0=performance.now(), lastStep=Math.floor(startRot/ANG), lastTick=0;
    wheelEl.style.transition='none';
    // ---- bolita ----
    var ballEl=document.getElementById('ball');
    var wrapEl=document.querySelector('.wheel-wrap');
    var R=wrapEl ? wrapEl.getBoundingClientRect().width/2 : 145;
    var rOut=R*0.885, rIn=R*0.80;           // radio pista exterior -> reposa cerca del anillo de números
    var ballTurns=Math.max(5, Math.round(turns)+3); // gira más que la rueda
    var ballTopDeg=-90;                      // arriba, bajo el puntero (coord. CSS)
    // parte desde donde está la bolita ahora (por si venís de arrastrar) y gira varias vueltas hasta arriba
    var curBallDeg = (ballRestDeg!==null) ? (ballRestDeg + (rotation-ballRestRotation)) : ballTopDeg;
    var ballStart = curBallDeg - ballTurns*360;
    // los ojos siguen la MISMA dirección que la bolita pero con MENOS vueltas,
    // así se ve la animación clara (no un borrón) y desacelera parejo hasta mirar arriba
    var eyeTurns = 3, eyeStart = ballTopDeg - eyeTurns*360;
    if(ballEl){ placeBallInit(ballEl, ballStart, rOut); ballEl.classList.add('show'); }
    function placeBall(deg, rad){
      if(!ballEl) return;
      var a=deg*Math.PI/180;
      var x=Math.cos(a)*rad, y=Math.sin(a)*rad;
      ballEl.style.transform='translate(-50%,-50%) translate('+x+'px,'+y+'px)';
    }
    function ease(t){ return 1-Math.pow(1-t,4); } // desacelera (easeOutQuart)
    function frame(now){
      var t=Math.min(1,(now-t0)/dur), e=ease(t), rot=startRot+(target-startRot)*e;
      wheelEl.style.transform='rotate('+rot+'deg)';
      // bolita: ángulo interpola de ballStart a ballTop con el mismo easing
      var bDeg=ballStart+(ballTopDeg-ballStart)*e;
      // el radio se mantiene afuera y "cae" en el último tramo
      var drop = t<0.62 ? 0 : (t-0.62)/0.38;      // 0..1 en el último 38%
      drop = drop*drop*(3-2*drop);                // smoothstep
      var rad=rOut-(rOut-rIn)*drop;
      // pequeño temblor cuando ya casi frena
      if(t>0.92){ rad += Math.sin(now/22)* (1-t)*10; }
      placeBall(bDeg, rad);
      // los ojos siguen su propio ángulo (menos vueltas) con el mismo easing -> desacelera parejo
      var eDeg=eyeStart+(ballTopDeg-eyeStart)*e;
      setEyeFrame(eyeFrameForAngle(eDeg));
      var step=Math.floor(rot/ANG);
      if(step!==lastStep){ if(now-lastTick>40){ tick(0.15+0.24*(1-t)); lastTick=now; } lastStep=step; }
      if(t<1) requestAnimationFrame(frame);
      else {
        wheelEl.style.transform='rotate('+target+'deg)';
        placeBall(ballTopDeg, rIn);
        setEyeFrame(EYE_UP); // termina mirando arriba, hacia la bolita
        ballSettle(ballEl, ballTopDeg, rIn);
        // recordar dónde quedó la bolita y con qué rotación (para que acompañe el arrastre)
        ballRestDeg=ballTopDeg; ballRestRad=rIn; ballRestRotation=target;
        resolve(w);
      }
    }
    requestAnimationFrame(frame);
  }

  function placeBallInit(ballEl, deg, rad){
    var a=deg*Math.PI/180, x=Math.cos(a)*rad, y=Math.sin(a)*rad;
    ballEl.style.transform='translate(-50%,-50%) translate('+x+'px,'+y+'px)';
  }

  // rebotecito final de la bolita al asentarse en el pocket
  function ballSettle(ballEl, deg, rad){    if(!ballEl) return;
    var a=deg*Math.PI/180, x=Math.cos(a)*rad, y=Math.sin(a)*rad;
    var t0=performance.now(), dur=420;
    function bob(now){
      var t=Math.min(1,(now-t0)/dur);
      var b=Math.sin(t*Math.PI*2)*(1-t)*4;   // rebote amortiguado hacia el centro
      ballEl.style.transform='translate(-50%,-50%) translate('+x+'px,'+(y-b)+'px)';
      if(t<1) requestAnimationFrame(bob);
    }
    requestAnimationFrame(bob);
  }


  // ---------- girar con el dedo/mouse (tap o arrastre/flick) ----------
  (function(){
    var wrap=document.querySelector('.wheel-wrap'); if(!wrap) return;
    var dragging=false, lastA=0, lastT=0, vel=0, moved=0;
    function center(){ var r=wrap.getBoundingClientRect(); return {x:r.left+r.width/2, y:r.top+r.height/2}; }
    function angle(e){ var c=center(); return Math.atan2(e.clientY-c.y, e.clientX-c.x)*180/Math.PI; }
    function norm(x){ return ((x+180)%360+360)%360-180; }
    wrap.addEventListener('pointerdown', function(e){
      if(spinning) return; ensureAudio(); dragging=true; moved=0; vel=0;
      lastA=angle(e); lastT=e.timeStamp||Date.now();
      wheelEl.style.transition='none'; wrap.classList.add('grabbing');
      try{ wrap.setPointerCapture(e.pointerId); }catch(_e){}
      e.preventDefault();
    });
    wrap.addEventListener('pointermove', function(e){
      if(!dragging) return;
      var a=angle(e), t=e.timeStamp||Date.now(), d=norm(a-lastA);
      rotation+=d; moved+=Math.abs(d);
      wheelEl.style.transform='rotate('+rotation+'deg)';
      // la bolita descansa en su pocket y gira junto con la rueda
      if(ballRestDeg!==null){
        var ballEl=document.getElementById('ball');
        if(ballEl){ placeBallInit(ballEl, ballRestDeg+(rotation-ballRestRotation), ballRestRad); }
      }
      var dt=t-lastT; if(dt>0) vel=d/dt;
      lastA=a; lastT=t;
    });
    function end(e){
      if(!dragging) return; dragging=false; wrap.classList.remove('grabbing');
      try{ wrap.releasePointerCapture(e.pointerId); }catch(_e){}
      var turns = (moved<7) ? 5 : Math.min(12, Math.max(3, 3+Math.abs(vel)*7));
      landAndResolve(turns);
    }
    wrap.addEventListener('pointerup', end);
    wrap.addEventListener('pointercancel', end);
  })();

  function betName(k){
    if(k.charAt(0)==='n') return 'Número '+k.slice(1);
    var m={red:'Rojo',black:'Negro',odd:'Impar',even:'Par',low:'1-18',high:'19-36',d1:'1ra Docena',d2:'2da Docena',d3:'3ra Docena',c1:'Columna 1',c2:'Columna 2',c3:'Columna 3'};
    return m[k]||k;
  }
  function celebrate(net, items){
    try{
      var ban=document.createElement('div'); ban.className='winban';
      var html='<div class="wb-title">¡GANASTE +'+net+' 🪙!</div>';
      if(items && items.length){
        html+='<div class="wb-list">';
        for(var j=0;j<items.length;j++){
          html+='<div class="wb-item" style="animation-delay:'+(0.28+j*0.20).toFixed(2)+'s"><span>'+items[j].name+' <b>×'+items[j].mult+'</b></span><span class="wb-plus">+'+items[j].prof+'</span></div>';
        }
        html+='</div>';
      }
      ban.innerHTML=html; document.body.appendChild(ban);
      var life=1700 + (items?items.length:0)*300;
      setTimeout(function(){ ban.classList.add('wb-out'); }, life);
      setTimeout(function(){ if(ban.parentNode) ban.parentNode.removeChild(ban); }, life+450);
      var colors=['#ffd23f','#ff3d8b','#3fe0e0','#1fbf6b','#e02850','#a45cff'];
      for(var i=0;i<44;i++){
        var c=document.createElement('div'); c.className='confp'; var sz=5+Math.floor(Math.random()*7);
        c.style.left=(Math.random()*100)+'vw'; c.style.width=sz+'px'; c.style.height=sz+'px'; c.style.background=colors[i%colors.length];
        c.style.animation='confFall '+(1.4+Math.random()*1.2)+'s linear '+(Math.random()*0.35)+'s forwards';
        document.body.appendChild(c);
        (function(el){ setTimeout(function(){ if(el.parentNode) el.parentNode.removeChild(el); }, 3000); })(c);
      }
    }catch(_e){}
  }

  function resolve(w){
    var col=colorOf(w), stake=totalBet(), win=0, gross=0, items=[];
    if(stake>0){ lastBets={}; for(var _b in bets) lastBets[_b]=bets[_b]; }
    for(var k in bets){ if(wins(k,w)){ var _m=payout(k); win += bets[k]*(_m+1); gross += bets[k]*_m; items.push({name:betName(k), mult:_m, prof:bets[k]*_m}); } }
    items.sort(function(a,b){return b.prof-a.prof;});
    balance+=win;
    // resultado
    document.getElementById('result').innerHTML='<span class="res-num '+col+'">'+w+'</span>';
    recents.unshift({n:w,c:col}); if(recents.length>9) recents.pop();
    document.getElementById('recents').innerHTML=recents.map(function(r){ return '<span class="r '+r.c+'">'+r.n+'</span>'; }).join('');
    document.querySelectorAll('.hit').forEach(function(el){ el.classList.remove('hit'); });
    var _hc=document.querySelector('[data-bet="n'+w+'"]'); if(_hc){ _hc.classList.add('hit'); setTimeout(function(){ _hc.classList.remove('hit'); }, 2300); }
    // mensaje
    var net=win-stake;
    // KitBoss queda un instante mirando arriba (donde cayó la bolita) y después reacciona
    function reactSoon(anim, emoji){ setTimeout(function(){ kbReact(anim, emoji); }, 480); }
    if(stake===0){
      say('😸','Salió el <b>'+w+'</b>. Giro de práctica — poné fichas para apostar.');
      reactSoon('kb-nod','😸');
      // giro de práctica no corta la racha
    }
    else if(win>0 && net>0){
      streak++;
      var bpct=streakBonusPct(), bonus=0;
      if(bpct>0){ bonus=Math.round(gross*bpct/100); gross+=bonus; win+=bonus; balance+=bonus; }
      renderStreak();
      if(bonus>0){ say('🔥','¡Salió el <b>'+w+'</b>! Ganaste <b>'+gross+'</b> 🪙 (racha '+streak+', +'+bonus+' de bonus)'); reactSoon('kb-hot','🔥'); }
      else { say('😻','¡Salió el <b>'+w+'</b>! Ganaste <b>'+gross+'</b> 🪙'); reactSoon('kb-win','🤑'); }
      playWin(); celebrate(gross, items);
    }
    else if(win>0){
      streak=0; renderStreak();
      say('😺','Salió el <b>'+w+'</b>. Recuperaste algo.');
      reactSoon('kb-nod','😺');
    }
    else {
      streak=0; renderStreak();
      say('🙀','Salió el <b>'+w+'</b>. La casa se queda con esta...');
      reactSoon('kb-lose','😼');
    }
    // limpiar sin devolver (ya se resolvió)
    bets={}; document.querySelectorAll('.chipon').forEach(function(s){ s.style.display='none'; });
    if(win>0){ flyWinToBalance(gross); } else { updateBal(); }
    spinning=false;
    document.getElementById('rl-spinBtn').disabled=false; document.getElementById('clearBtn').disabled=false; refreshRebet();
    if(balance<=0){ updateBal(); say('🙀','Te quedaste sin fichas. Ganá más en el Slots o volvé cuando tengas. 🎰'); }
  }

  // init
  buildWheel(); buildBoard(); buildChips(); updateBal();
  document.getElementById('rl-spinBtn').addEventListener('click', function(){ landAndResolve(6); });
  document.getElementById('clearBtn').addEventListener('click', function(){ clearBets(true); });
  document.getElementById('musicBtn').addEventListener('click', musicToggle);

  document.getElementById('repeatBtn').addEventListener('click', function(){
    if(spinning) return;
    if(!lastBets || Object.keys(lastBets).length===0){ say('😿','Todavía no hay una apuesta anterior.'); return; }
    var short=applyBets(lastBets);
    if(short) say('😅','Repetí lo que pude — no te alcanzaba para toda la apuesta anterior.');
    else say('↩️','Repetí tu apuesta anterior.');
  });

  document.getElementById('doubleBtn').addEventListener('click', function(){
    if(spinning) return;
    // base a doblar: lo que hay en el tablero; si está vacío, la última apuesta
    var base=null;
    if(totalBet()>0){ base={}; for(var k in bets) base[k]=bets[k]; }
    else if(lastBets && Object.keys(lastBets).length>0){ base={}; for(var j in lastBets) base[j]=lastBets[j]; }
    if(!base){ say('😿','Poné una apuesta o repetí la anterior para poder doblar.'); return; }
    var short=applyBets(base);
    if(short) say('😅','Dobré lo que pude — no te alcanzaba para todo.');
    else say('✖️2','¡Apuesta doblada! Va con todo.');
  });

  document.getElementById('allinBtn').addEventListener('click', function(){
    if(spinning) return;
    if(allInArmed){ setArmed(false); say('😺','All-in cancelado.'); return; }
    if(balance+totalBet()<=0){ say('😿','No tenés fichas para apostar.'); return; }
    setArmed(true);
    say('💰','Modo ALL-IN: tocá la casilla donde va TODO. (Tocá de nuevo para cancelar.)');
  });

  // ===== auto-escalado: encoge la ruleta si no entra en la altura de la pantalla =====
  function rlFit(){
    var app=document.getElementById('rlApp'); if(!app || !app.classList.contains('rl-active')) return;
    var wrap=app.querySelector('.wrap'); if(!wrap) return;
    // En PC (pantallas anchas) usamos layout de 2 columnas por CSS: no achicar por altura.
    if(window.innerWidth >= 900){ wrap.style.transform='none'; wrap.style.marginBottom=''; app.classList.remove('rl-fitted'); return; }
    // medir a escala 1
    wrap.style.transform='none';
    wrap.style.marginBottom='';
    var avail=window.innerHeight - 44;          // alto disponible (con margen de seguridad)
    var need=wrap.offsetHeight;                   // alto real del contenido
    var scale=Math.min(1, avail/need);            // nunca agranda, solo achica
    if(scale<1){
      wrap.style.transform='scale('+scale.toFixed(3)+')';
      // compensar el espacio "fantasma" que deja el scale (el transform no achica el layout)
      wrap.style.marginBottom = (-(need*(1-scale))) + 'px';
      app.classList.add('rl-fitted');
    } else {
      wrap.style.transform='none';
      wrap.style.marginBottom='';
      app.classList.remove('rl-fitted');
    }
  }
  window.addEventListener('resize', rlFit);
  window.addEventListener('orientationchange', function(){ setTimeout(rlFit, 300); });

  // ===== abrir / cerrar la pantalla de ruleta (llamado desde el Casino) =====
  window.rlOpen = function(){
    // devolver cualquier apuesta pendiente al saldo antes de recargar (por las dudas)
    if(totalBet()>0){ balance+=totalBet(); bets={}; document.querySelectorAll('.chipon').forEach(function(s){ s.style.display='none'; }); }
    setArmed(false);
    rlLoadCredits();          // traer las fichas actuales del Casino
    updateBal();              // refrescar UI (y re-sincronizar)
    var app=document.getElementById('rlApp'); if(app) app.classList.add('rl-active');
    setTimeout(rlFit, 30);    // ajustar el tamaño una vez visible
  };
  window.rlClose = function(){
    // si quedaron fichas apostadas sin girar, se devuelven (no se pierden)
    if(!spinning && totalBet()>0){ balance+=totalBet(); bets={}; document.querySelectorAll('.chipon').forEach(function(s){ s.style.display='none'; }); }
    setArmed(false);
    musicStop && musicStop();               // cortar la música al salir
    rlSaveCredits();                        // guardar las fichas en el Casino
    var app=document.getElementById('rlApp'); if(app) app.classList.remove('rl-active');
  };

})();

