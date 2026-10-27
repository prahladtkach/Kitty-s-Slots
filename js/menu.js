// ═══════════════════════════════════════════════════════════════════
// 🎰 Menú de Inicio · menu.js
// ───────────────────────────────────────────────────────────────────
// La tragamonedas de portada (capa sobre el juego). Autónomo:
// maneja sus propios elementos del DOM, no toca la lógica del juego.
// ═══════════════════════════════════════════════════════════════════
/* ===== Menú = máquina tragamonedas (capa por encima del juego) ===== */
(function(){
  var menu=document.getElementById('startMenu'); if(!menu) return;
  var opts=document.getElementById('smOptions');
  function setVer(){ try{ var v=document.getElementById('ver'), t=(v&&v.textContent)||''; ['smVer','smVer2'].forEach(function(id){ var e=document.getElementById(id); if(e) e.textContent=t; }); }catch(_e){} }
  setVer(); setTimeout(setVer,600); setTimeout(setVer,1600);

  var actx=null;
  function tone(seq){ try{ actx=actx||new (window.AudioContext||window.webkitAudioContext)(); if(actx.state==='suspended') actx.resume(); var t=actx.currentTime; seq.forEach(function(n){ var o=actx.createOscillator(), g=actx.createGain(); o.type='square'; o.frequency.value=n[0]; o.connect(g); g.connect(actx.destination); var st=t+n[1], en=st+n[2]; g.gain.setValueAtTime(0.05,st); g.gain.exponentialRampToValueAtTime(0.001,en); o.start(st); o.stop(en); }); }catch(_e){} }
  function beepSelect(){ tone([[620,0,0.06],[930,0.06,0.09]]); }
  function beepDenied(){ tone([[300,0,0.12],[175,0.10,0.15]]); }
  function beepType(){ tone([[880,0,0.014]]); }
  function beepTick(){ tone([[520,0,0.02]]); }
  function beepPop(){ tone([[1000,0,0.03],[560,0.03,0.06]]); }

  var MSGS=["¡Bienvenido de nuevo! 🐾","¿Listo para tentar la suerte?","Tirá de la palanca, dale 😼","Hoy es tu día de suerte... ¿o no? 🍀","9 vidas y una palanca.","¡A gamblear se ha dicho!","El jackpot te espera 💰","¿Modo Historia? Pronto, pronto...","Miau significa 'apostá fuerte'.","¡Explotá los gatos del fondo! 💥","La casa siempre... bueno, jugá igual.","¡Otra vez vos! Me caés bien 💜"];
  function typeBubble(txt){ var el=document.getElementById('smBubbleTx'); if(!el) return; if(el._t) clearInterval(el._t); el.textContent=''; var i=0; el._t=setInterval(function(){ if(i>=txt.length){ clearInterval(el._t); el._t=null; return; } var c=txt.charAt(i++); el.textContent+=c; if(c!==' ') beepType(); }, 42); }
  function stopBubble(){ var el=document.getElementById('smBubbleTx'); if(el&&el._t){ clearInterval(el._t); el._t=null; } }
  function newBubble(){ typeBubble(MSGS[Math.floor(Math.random()*MSGS.length)]); }

  function wipeThen(cb){ var w=document.getElementById('smWipe'); if(!w){ cb&&cb(); return; } w.classList.remove('out'); w.classList.add('in'); setTimeout(function(){ if(cb) cb(); w.classList.remove('in'); w.classList.add('out'); setTimeout(function(){ w.classList.remove('out'); }, 380); }, 320); }
  function selectThen(btn, fn){ if(btn._busy) return; btn._busy=true; beepSelect(); btn.classList.add('sm-select'); setTimeout(function(){ btn.classList.remove('sm-select'); btn._busy=false; fn(); }, 300); }

  function openGame(iconId, overlayId){ var ov=document.getElementById(overlayId); if(ov) ov.style.zIndex='10002'; var ic=document.getElementById(iconId); if(ic) ic.click(); }
  function enterLibre(){ stopBubble(); menu.classList.add('sm-hidden'); if(opts) opts.classList.remove('open'); ['musicModal','helpModal','authModal','feedback','logrosModal'].forEach(function(id){ var o=document.getElementById(id); if(o) o.style.zIndex=''; }); }

  /* ===== pantalla de selección de juego (Slots | Ruleta) ===== */
  var gamePick=document.getElementById('gamePick');
  function openGamePick(){ stopBubble(); if(gamePick) gamePick.classList.add('open'); menu.classList.add('sm-hidden'); }
  function closeGamePick(){ if(gamePick) gamePick.classList.remove('open'); }
  function pickSlots(){ closeGamePick(); enterLibre(); }        // Slots: el juego de siempre
  function pickRoulette(){ stopBubble(); closeGamePick(); menu.classList.add('sm-hidden'); if(typeof window.rlOpen==='function') window.rlOpen(); }
  function pickBlackjack(){ stopBubble(); closeGamePick(); menu.classList.add('sm-hidden'); if(typeof window.bjOpen==='function') window.bjOpen(); }
  function wireGamePickButtons(){
    var gps=document.getElementById('gpSlots'), gpr=document.getElementById('gpRoulette'), gpb=document.getElementById('gpBack');
    if(gps && !gps._wired){ gps._wired=1; gps.addEventListener('click', function(){ beepSelect(); pickSlots(); }); }
    if(gpr && !gpr._wired){ gpr._wired=1; gpr.addEventListener('click', function(){ beepSelect(); pickRoulette(); }); }
    var gpbj=document.getElementById('gpBlackjack');
    if(gpbj && !gpbj._wired){ gpbj._wired=1; gpbj.addEventListener('click', function(){ beepSelect(); pickBlackjack(); }); }
    if(gpb && !gpb._wired){ gpb._wired=1; gpb.addEventListener('click', function(){ beepSelect(); closeGamePick(); _busy=false; showMenu(); }); }
    var rh=document.getElementById('rlHome');
    if(rh && !rh._wired){ rh._wired=1; rh.addEventListener('click', function(){ if(typeof window.rlClose==='function') window.rlClose(); wipeThen(function(){ _busy=false; showMenu(); }); }); }
    var bh=document.getElementById('bjHome');
    if(bh && !bh._wired){ bh._wired=1; bh.addEventListener('click', function(){ if(typeof window.bjClose==='function') window.bjClose(); wipeThen(function(){ _busy=false; showMenu(); }); }); }
  }
  wireGamePickButtons();
  if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded', wireGamePickButtons); }
  window.addEventListener('load', wireGamePickButtons);

  var inr=document.querySelector('#startMenu .sm-inner');
  function fastReels(on){ if(inr){ if(on) inr.classList.add('sm-fast'); else inr.classList.remove('sm-fast'); } }

  /* ---- palanca arrastrable ---- */
  var lever=document.getElementById('smLever');
  var arm=lever?lever.querySelector('.sm-lever-arm'):null;
  var MAX=62, cur=0, dragging=false, offY=0, fired=false, _busy=false;
  function setArm(y){ cur=Math.max(0,Math.min(MAX,y)); if(arm) arm.style.transform='translateX(-50%) translateY('+cur+'px)'; fastReels(cur>MAX*0.28); }
  function armReset(){ if(lever) lever.classList.add('sm-spring'); setArm(0); setTimeout(function(){ if(lever) lever.classList.remove('sm-spring'); },220); fastReels(false); }
  function doLibre(){ if(_busy) return; _busy=true; beepSelect(); if(lever){ lever.classList.remove('sm-spring'); } setArm(MAX); fastReels(true); setTimeout(function(){ wipeThen(function(){ openGamePick(); }); }, 300); }
  if(lever){
    lever.addEventListener('pointerdown', function(e){ if(_busy) return; dragging=true; fired=false; offY=e.clientY-cur; try{lever.setPointerCapture(e.pointerId);}catch(_e){} lever.classList.remove('sm-spring'); lever.style.cursor='grabbing'; beepTick(); e.preventDefault(); });
    window.addEventListener('pointermove', function(e){ if(!dragging) return; var prev=cur; setArm(e.clientY-offY); if(Math.floor(cur/10)!==Math.floor(prev/10)) beepTick(); if(cur>=MAX*0.85 && !fired){ fired=true; dragging=false; doLibre(); } e.preventDefault(); });
    window.addEventListener('pointerup', function(e){ if(!dragging) return; dragging=false; lever.style.cursor='grab'; if(!fired){ if(cur<8){ doLibre(); } else { armReset(); } } });
  }

  var libre=document.getElementById('smLibre'); if(libre) libre.addEventListener('click', doLibre);
  var ob=document.getElementById('smOpts'); if(ob&&opts) ob.addEventListener('click', function(){ selectThen(ob, function(){ buildThemes(); opts.classList.add('open'); }); });
  var hist=document.getElementById('smHistoria'), hint=document.getElementById('smHint');
  if(hist) hist.addEventListener('click', function(){ beepDenied(); hist.classList.remove('sm-shake'); void hist.offsetWidth; hist.classList.add('sm-shake'); if(hint){ hint.textContent='🔒 Modo Historia — ¡pronto!'; hint.classList.add('show'); } });
  var ai=document.getElementById('smAccIco'); if(ai) ai.addEventListener('click', function(){ beepSelect(); openGame('accIcon','authModal'); });
  var li=document.getElementById('smLogIco'); if(li) li.addEventListener('click', function(){ beepSelect(); openGame('logrosIcon','logrosModal'); });

  var oc=document.getElementById('smOptClose'); if(oc&&opts) oc.addEventListener('click', function(){ opts.classList.remove('open'); });
  if(opts) opts.addEventListener('click', function(e){ if(e.target===opts) opts.classList.remove('open'); });
  var s=document.getElementById('optSound'); if(s) s.addEventListener('click', function(){ beepSelect(); openGame('musicIcon','musicModal'); });
  var oa=document.getElementById('optAcc'); if(oa) oa.addEventListener('click', function(){ beepSelect(); openGame('accIcon','authModal'); });
  var h=document.getElementById('optHelp'); if(h) h.addEventListener('click', function(){ beepSelect(); openGame('helpIcon','helpModal'); });
  var f=document.getElementById('optFeedback'); if(f) f.addEventListener('click', function(){ beepSelect(); openGame('suggestIcon','feedback'); });
  var fs=document.getElementById('optFull'); if(fs){ if(!document.fullscreenEnabled){ fs.style.display='none'; } else fs.addEventListener('click', function(){ beepSelect(); try{ if(document.fullscreenElement) document.exitFullscreen(); else document.documentElement.requestFullscreen(); }catch(_e){} }); }

  function buildThemes(){ var host=document.getElementById('optThemes'); if(!host) return; host.innerHTML=''; var sws=document.querySelectorAll('#palrow .swatch'); if(!sws.length){ host.innerHTML='<span class="sm-th-empty">Entrá al juego para ver los temas</span>'; return; } sws.forEach(function(orig){ var m=document.createElement('button'); m.className='sm-sw'+(orig.classList.contains('active')?' active':''); m.title=orig.title||''; m.style.background=orig.style.background; m.style.boxShadow=orig.style.boxShadow; m.addEventListener('click', function(){ beepSelect(); orig.click(); setTimeout(buildThemes,40); }); host.appendChild(m); }); }

  function showMenu(){ armReset(); _busy=false; if(opts) opts.classList.remove('open'); menu.classList.remove('sm-hidden'); stopBubble(); setTimeout(newBubble, 420); }

  /* ===== FONDO VIVO: gatitos + símbolos flotando, explotables (tipo Geometry Dash) ===== */
  var fx=document.getElementById('smBgFx');
  var CAT_IDX=[0,1,3,5,7,9,11,14,17,20,23,26];
  var SYM_BG=['🍒','💎','7️⃣','⭐','🍋','🔔'];
  function rnd(a,b){ return a+Math.random()*(b-a); }
  function burst(x,y){ var cols=['#ffd23f','#ff3d8b','#39e0e6','#a45cff','#5bd75b']; for(var k=0;k<8;k++){ var p=document.createElement('div'); p.className='sm-burst'; p.style.left=x+'px'; p.style.top=y+'px'; p.style.background=cols[k%cols.length]; var a=Math.random()*6.2832, d=rnd(20,48); p.style.setProperty('--dx',(Math.cos(a)*d).toFixed(1)+'px'); p.style.setProperty('--dy',(Math.sin(a)*d).toFixed(1)+'px'); document.body.appendChild(p); (function(pp){ setTimeout(function(){ if(pp.parentNode) pp.parentNode.removeChild(pp); }, 480); })(p); } }
  function popFloat(el){ if(el._pop) return; el._pop=true; beepPop(); var r=el.getBoundingClientRect(); burst(r.left+r.width/2, r.top+r.height/2); el.classList.add('sm-fl-pop'); setTimeout(function(){ if(el.parentNode) el.parentNode.removeChild(el); spawnFloat(); }, 260); }
  function spawnFloat(){ if(!fx) return; var el=document.createElement('div'); el.className='sm-fl'; var dur=rnd(10,17); el.style.left=rnd(3,93)+'%'; el.style.animationDuration=dur.toFixed(1)+'s'; el.style.animationDelay=(-rnd(0,dur)).toFixed(1)+'s'; el.style.setProperty('--rot',(rnd(-52,52)).toFixed(0)+'deg');
    if(Math.random()<0.62){ el.classList.add('sm-fl-cat'); var idx=CAT_IDX[(Math.random()*CAT_IDX.length)|0]; el.style.backgroundPosition='-'+((idx%10)*48)+'px -'+(((idx/10)|0)*48)+'px'; }
    else { el.classList.add('sm-fl-sym'); el.textContent=SYM_BG[(Math.random()*SYM_BG.length)|0]; }
    el.addEventListener('pointerdown', function(e){ e.stopPropagation(); popFloat(el); });
    el.addEventListener('animationend', function(){ if(el.parentNode) el.parentNode.removeChild(el); spawnFloat(); });
    fx.appendChild(el);
  }
  if(fx){ for(var q=0;q<9;q++) spawnFloat(); }

  /* MODO LIBRE en el juego: ayuda+música → ícono Opciones (con login adentro) */
  var mi=document.getElementById('musicIcon'); if(mi) mi.style.display='none';
  var hi=document.getElementById('helpIcon'); if(hi) hi.style.display='none';
  var si=document.querySelector('.sound-icons');
  if(si && !document.getElementById('gearOptsIcon')){ var g=document.createElement('button'); g.className='iconbtn'; g.id='gearOptsIcon'; g.title='Opciones'; g.setAttribute('aria-label','Opciones'); g.textContent='⚙️'; g.addEventListener('click', function(){ beepSelect(); buildThemes(); if(opts) opts.classList.add('open'); }); si.appendChild(g); }
  var cl=document.querySelector('.corner-left');
  if(cl && !document.getElementById('menuHomeBtn')){ var hb=document.createElement('button'); hb.className='iconbtn'; hb.id='menuHomeBtn'; hb.title='Menú principal'; hb.setAttribute('aria-label','Menú principal'); hb.textContent='🏠'; hb.addEventListener('click', function(){ beepSelect(); wipeThen(showMenu); }); cl.insertBefore(hb, cl.firstChild); }

  newBubble();
})();
