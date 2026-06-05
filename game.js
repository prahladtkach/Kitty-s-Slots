// Kitty's Slots Deluxe · PUBLICA (v1.0) · esta va a GitHub Pages
  /* ============================================================
     FIREBASE  —  PEGÁ ACÁ LA CONFIG DE TU PROYECTO
     Reemplazá los valores "TU_..." por los de tu app web.
     (La apiKey NO es secreta: es seguro subirla a GitHub.
      La seguridad la dan el login + las reglas de Firestore.)
     ============================================================ */
  const firebaseConfig = {
    apiKey: "AIzaSyAsZd700r-lb8WIF8tLXZK8B-73tPJH7lc",
    authDomain: "kittys-slots.firebaseapp.com",
    projectId: "kittys-slots",
    storageBucket: "kittys-slots.firebasestorage.app",
    messagingSenderId: "80482504547",
    appId: "1:80482504547:web:d793ff4cd0c81f194b0d56",
    measurementId: "G-0QRBRV8TX6"
  };
  const FB_VER = "11.0.2"; // versión del SDK de Firebase (CDN de gstatic)

  const SYMS=['🍋','🍒','🔔','⭐','7️⃣','💎','🐟','🐱','🦴'];
  const SPRITE_ORDER=['🍋','🍒','🔔','⭐','7️⃣','💎','🐟','🐱','🦴'];
  const WEIGHTS={'🍋':20,'🍒':20,'🔔':16,'⭐':12,'7️⃣':9,'💎':6,'🐟':5,'🐱':5,'🦴':9};
  const PAY3={'🐟':80,'💎':60,'7️⃣':40,'⭐':25,'🔔':15,'🍒':10,'🍋':6};
  const PRESETS=[50,100,250,500,1000];
  const LOAN=1000, START=1000, JP_BASE=10000, JP_MULT=250, KEY='kitty-slots-deluxe', INTEREST=0.03, LOAN_FEE=0.1, SKILL_UNLOCK=5000, CAJA_COST=2000;
  const CREDIT_LIMITS=[6000,12000,22000,40000,70000,110000,170000];
  const CREDIT_COSTS=[800,2000,5000,12000,25000,45000];
  const BANK_UNLOCK_CREDITS=3000;
  const MIN_BET=50;
  const VERSION="1.0";
  const INT_RATES=[0,0.01,0.015,0.02,0.025,0.03];
  const INT_INTERVALS=[0,25,22,19,16,13];
  const INT_COSTS=[3500,6000,10000,16000,24000];
  const PALETTES={
    synthwave:{bg:'#1a1033',bg2:'#0d0820',panel:'#2d1b54',panel2:'#241046',violet:'#a45cff',magenta:'#ff3d8b',cyan:'#39e0e6',gold:'#ffd23f',green:'#5bd75b',red:'#ff5b79',text:'#fdf6ff',muted:'#b3a7dd',cream:'#f4ead2',dark:'#0a0618'},
    gameboy:{bg:'#143a14',bg2:'#0f380f',panel:'#306230',panel2:'#27512a',violet:'#8bac0f',magenta:'#8bac0f',cyan:'#9bbc0f',gold:'#9bbc0f',green:'#8bac0f',red:'#0f380f',text:'#9bbc0f',muted:'#8bac0f',cream:'#9bbc0f',dark:'#0f380f'},
    nes:{bg:'#14142e',bg2:'#0b0b1a',panel:'#2c2c7a',panel2:'#22225e',violet:'#5c7cff',magenta:'#e23b5b',cyan:'#3cc0e0',gold:'#f0c040',green:'#50c050',red:'#e23b5b',text:'#fdfdff',muted:'#9aa0d0',cream:'#e8d8b0',dark:'#08081a'},
    vapor:{bg:'#241046',bg2:'#160a2e',panel:'#3a2a6e',panel2:'#2e1f5a',violet:'#b07bff',magenta:'#ff6ad5',cyan:'#26d4d4',gold:'#ffe06a',green:'#6affc0',red:'#ff6ad5',text:'#fdf0ff',muted:'#c4a7e8',cream:'#f0e0f8',dark:'#0d0620'},
    lava:{bg:'#2e0d0d',bg2:'#1f0707',panel:'#4a1818',panel2:'#3a1212',violet:'#ff7a3c',magenta:'#ff4d4d',cyan:'#ffb03c',gold:'#ffd23f',green:'#ff8c3c',red:'#ff4d4d',text:'#fff0e8',muted:'#e0a890',cream:'#f4dcc0',dark:'#160404'}
  };
  const PALNAMES=['synthwave','gameboy','nes','vapor','lava'];
  function curve(base,g){ return function(l){ return Math.round(base*Math.pow(g,l)/10)*10; }; }
  const UPG={
    win:{name:'Multiplicador',desc:'+25% a todo lo que ganás',max:5,cost:curve(200,2.6)},
    combo:{name:'Tope de combo',desc:'+0.5 al tope del multiplicador',max:5,cost:curve(300,2.8)},
    cat:{name:'Suerte del gato',desc:'el JACKPOT sale más seguido',max:5,cost:curve(250,2.8)},
    bone:{name:'Menos espinas',desc:'aparecen menos espinas 🦴',max:5,cost:curve(180,2.6)}
  };

  let state={credits:START,jackpot:JP_BASE,bet:50,debt:0,palette:'synthwave',upg:{win:0,combo:0,cat:0,bone:0},abilities:{hold:false,gamble:false},holdLevel:0,superLevel:0,musicOn:true,sfxOn:true,skillsUnlocked:false,bankUnlocked:false,introSeen:false,bank:0,vault:false,creditLevel:0,interestLevel:0,intSpins:0,helpSeen:[]};
  let spinning=false, combo=0, audioCtx=null, musicTimer=null, mi=0, musicStarted=false;
  let held=[false,false,false], holdCD=0, gambleAmount=0, gambling=false, cur=['🍋','🍒','💎'];
  const pool=[];
  const luckyPool=[];
  let luckyUntil=0, superReadyAt=0;

  function comboMult(){ if(combo<2) return 1; return Math.min(1+0.5*(combo-1), 3+0.5*state.upg.combo); }
  function comboCap(){ return 3 + 0.5*state.upg.combo; }
  function fmtMult(m){ return Number.isInteger(m)? (''+m) : m.toFixed(1); }
  function winMult(){ return 1 + 0.25*state.upg.win; }
  function rebuildPool(){ pool.length=0; luckyPool.length=0; var slv=Math.max(1,state.superLevel||1); var k=1+(slv-1)*0.1; SYMS.forEach(function(s){ let w=WEIGHTS[s]; if(s==='🐱') w+=state.upg.cat*3; if(s==='🦴') w=Math.max(2,w-state.upg.bone*3); for(let i=0;i<w;i++) pool.push(s); let m=1; if(s==='🐱') m=14; else if(s==='🐟'||s==='💎') m=4; else if(s==='7️⃣') m=3; else if(s==='🍒'||s==='⭐') m=2.5; else if(s==='🔔') m=1.5; var em=1+(m-1)*k; var lw=Math.round(w*em); for(let i=0;i<lw;i++) luckyPool.push(s); }); }
  function randSym(){ var p=(Date.now()<luckyUntil)?luckyPool:pool; return p[Math.floor(Math.random()*p.length)]; }
  function fmt(n){ return n.toLocaleString('es-AR'); }

  // ---- Guardado local: window.storage (preview de Claude) -> localStorage (GitHub Pages) -> memoria ----
  let _mem = {};
  async function lsGet(k){
    try{ if(window.storage&&window.storage.get){ const r=await window.storage.get(k); if(r&&r.value!=null) return r.value; } }catch(e){}
    try{ const v=localStorage.getItem(k); if(v!=null) return v; }catch(e){}
    return (k in _mem)?_mem[k]:null;
  }
  async function lsSet(k,v){
    try{ if(window.storage&&window.storage.set){ await window.storage.set(k,v); return; } }catch(e){}
    try{ localStorage.setItem(k,v); return; }catch(e){}
    _mem[k]=v;
  }
  function applySave(d){
    if(!d||typeof d!=='object') return;
    Object.assign(state,d);
    if(!state.upg) state.upg={win:0,combo:0,cat:0,bone:0};
    if(!state.abilities) state.abilities={hold:false,gamble:false};
    if(state.skillsUnlocked===undefined) state.skillsUnlocked = state.credits>=SKILL_UNLOCK || !!(state.abilities && (state.abilities.hold||state.abilities.gamble));
    if(typeof state.holdLevel!=='number') state.holdLevel = (state.abilities && state.abilities.hold) ? 2 : 0;
    if(typeof state.superLevel!=='number') state.superLevel = 0;
    if(typeof state.bankUnlocked!=='boolean') state.bankUnlocked = (state.bank>0||state.debt>0||state.vault||state.creditLevel>0||state.interestLevel>0||state.credits<1);
    if(typeof state.introSeen!=='boolean') state.introSeen = false;
    if(!Array.isArray(state.helpSeen)) state.helpSeen=[];
    if(state.bankUnlocked && state.helpSeen.indexOf('bank')<0) state.helpSeen.push('bank'); if(state.introSeen && state.helpSeen.indexOf('intro')<0) state.helpSeen.push('intro');
    if(!state.bankUnlocked && state.credits>=BANK_UNLOCK_CREDITS) state.bankUnlocked=true;
    if(!state.bankUnlocked && state.credits<MIN_BET) state.bankUnlocked=true;
    if(typeof state.bet!=='number'||state.bet<50) state.bet=50; if(state.bet>1000) state.bet=1000;
    if(typeof state.bank!=='number') state.bank=0;
    if(state.vault===undefined) state.vault=false;
    if(typeof state.creditLevel!=='number') state.creditLevel=0;
    if(typeof state.interestLevel!=='number') state.interestLevel=0;
    if(typeof state.intSpins!=='number') state.intSpins=0;
  }
  async function loadState(){ try{ const v=await lsGet(KEY); if(v) applySave(JSON.parse(v)); }catch(e){} }
  async function saveStateLocalOnly(){ try{ await lsSet(KEY, JSON.stringify(state)); }catch(e){} }
  async function saveState(){ await saveStateLocalOnly(); cloudSaveSoon(); }

  function refreshAfterLoad(){
    applyPalette(state.palette);
    renderBetPresets(); renderPalette(); rebuildPool(); updateUI();
    const bi=document.getElementById('betInput'); if(bi) bi.value=state.bet;
    syncSoundIcons(); renderHold(); updateSuperUI(); if(!state.introSeen) showIntro();
  }

  // ---- Firebase: cuentas reales + guardado en la nube (SDK cargado on-demand con import dinámico) ----
  let fbReady=false, fbAuth=null, fbDB=null, fbUser=null, _fbAuthMod=null, _fbFsMod=null, _cloudTimer=null, _applyingCloud=false;
  function fbConfigured(){ return !!(firebaseConfig && firebaseConfig.apiKey && firebaseConfig.apiKey.indexOf('TU_')!==0); }
  function setAuthMsg(t,cls){ const el=document.getElementById('authMsg'); if(!el) return; el.textContent=t||''; el.className='auth-msg'+(cls?(' '+cls):''); }
  function renderAccount(){
    const icon=document.getElementById('accIcon');
    const inDiv=document.getElementById('authLoggedIn'), outDiv=document.getElementById('authLoggedOut');
    const emailEl=document.getElementById('authEmail');
    if(icon) icon.classList.toggle('acc-on', !!fbUser);
    if(inDiv&&outDiv){
      if(fbUser){ inDiv.style.display=''; outDiv.style.display='none'; if(emailEl) emailEl.textContent='Conectado como: '+(fbUser.email||fbUser.uid); }
      else { inDiv.style.display='none'; outDiv.style.display=''; }
    }
  }
  async function initFirebase(){
    if(!fbConfigured()){ setAuthMsg('Firebase todavía no está configurado. Pegá tu config arriba en el archivo.','err'); renderAccount(); return; }
    try{
      const base='https://www.gstatic.com/firebasejs/'+FB_VER+'/';
      const appMod=await import(base+'firebase-app.js');
      _fbAuthMod=await import(base+'firebase-auth.js');
      _fbFsMod=await import(base+'firebase-firestore.js');
      const app=appMod.initializeApp(firebaseConfig);
      fbAuth=_fbAuthMod.getAuth(app);
      fbDB=_fbFsMod.getFirestore(app);
      fbReady=true;
      _fbAuthMod.onAuthStateChanged(fbAuth, function(u){ fbUser=u||null; renderAccount(); if(fbUser) cloudLoad(); });
    }catch(e){
      fbReady=false;
      setAuthMsg('No se pudo conectar con Firebase. (En el preview de Claude no anda; probalo en tu sitio o local.)','err');
      renderAccount();
    }
  }
  async function signUp(email,pass){
    if(!fbReady){ setAuthMsg('Firebase no está listo (revisá la config).','err'); return; }
    if(!email||!pass){ setAuthMsg('Completá email y contraseña.','err'); return; }
    setAuthMsg('Creando cuenta…','');
    try{ await _fbAuthMod.createUserWithEmailAndPassword(fbAuth,email,pass); setAuthMsg('¡Cuenta creada! Guardando tu progreso ☁️','ok'); }
    catch(e){ setAuthMsg(authError(e),'err'); }
  }
  async function signIn(email,pass){
    if(!fbReady){ setAuthMsg('Firebase no está listo (revisá la config).','err'); return; }
    if(!email||!pass){ setAuthMsg('Completá email y contraseña.','err'); return; }
    setAuthMsg('Entrando…','');
    try{ await _fbAuthMod.signInWithEmailAndPassword(fbAuth,email,pass); setAuthMsg('','' ); }
    catch(e){ setAuthMsg(authError(e),'err'); }
  }
  async function signOutUser(){
    try{ if(_cloudTimer){ clearTimeout(_cloudTimer); _cloudTimer=null; } await cloudSaveNow(); if(fbReady) await _fbAuthMod.signOut(fbAuth); }catch(e){}
  }
  function userDoc(){ return _fbFsMod.doc(fbDB,'saves',fbUser.uid); }
  async function cloudLoad(){
    if(!fbReady||!fbUser) return;
    try{
      const snap=await _fbFsMod.getDoc(userDoc());
      if(snap.exists() && snap.data() && snap.data().state){
        _applyingCloud=true;
        applySave(JSON.parse(snap.data().state));
        await saveStateLocalOnly();
        refreshAfterLoad();
        _applyingCloud=false;
      } else {
        await cloudSaveNow(); // primera vez: subimos el progreso local
      }
    }catch(e){}
  }
  async function cloudSaveNow(){
    if(!fbReady||!fbUser) return;
    try{ await _fbFsMod.setDoc(userDoc(), { state: JSON.stringify(state), updated: Date.now() }); }catch(e){}
  }
  function cloudSaveSoon(){
    if(!fbReady||!fbUser||_applyingCloud) return;
    if(_cloudTimer) clearTimeout(_cloudTimer);
    _cloudTimer=setTimeout(function(){ _cloudTimer=null; cloudSaveNow(); }, 2500);
  }
  function authError(e){
    const c=(e&&e.code)||'';
    if(c.indexOf('email-already-in-use')>=0) return 'Ese email ya tiene cuenta. Probá ENTRAR.';
    if(c.indexOf('invalid-email')>=0) return 'Email inválido.';
    if(c.indexOf('weak-password')>=0) return 'La contraseña necesita 6 caracteres o más.';
    if(c.indexOf('invalid-credential')>=0||c.indexOf('wrong-password')>=0||c.indexOf('user-not-found')>=0) return 'Email o contraseña incorrectos.';
    if(c.indexOf('too-many-requests')>=0) return 'Demasiados intentos. Esperá un momento.';
    if(c.indexOf('network')>=0) return 'Sin conexión con Firebase.';
    if(c.indexOf('operation-not-allowed')>=0) return 'Activá Email/Contraseña en Firebase Authentication.';
    return 'Error: '+(c||'desconocido');
  }

  function ac(){ if(!audioCtx){ try{ audioCtx=new (window.AudioContext||window.webkitAudioContext)(); }catch(e){} } return audioCtx; }
  function tone(f,dur,vol,type,when){ const c=ac(); if(!c)return; try{ const o=c.createOscillator(),g=c.createGain(); o.type=type||'square'; o.frequency.value=f; o.connect(g); g.connect(c.destination); const t=c.currentTime+(when||0); g.gain.setValueAtTime(vol,t); g.gain.exponentialRampToValueAtTime(0.0001,t+dur); o.start(t); o.stop(t+dur); }catch(e){} }
  function sfx(f,dur,vol,type,when){ if(state.sfxOn) tone(f,dur,vol,type,when); }
  function sStop(){ sfx(220+Math.random()*70,0.05,0.05,'square'); }
  function sWin(big){ const arr=big?[392,523,659,784,1047]:[523,659,784]; arr.forEach(function(f,i){ sfx(f,0.13,0.07,'square',i*0.08); }); }
  function sJackpot(){ [523,659,784,1047,784,1047,1319,1568].forEach(function(f,i){ sfx(f,0.16,0.07,'square',i*0.1); }); }
  function sBad(){ [400,330,260,180].forEach(function(f,i){ sfx(f,0.18,0.08,'sawtooth',i*0.1); }); }
  function sSuper(){ [523,659,784,1047,1319,1568].forEach(function(f,i){ sfx(f,0.12,0.06,'triangle',i*0.06); }); }

  // ---- Chiptune music engine (Web Audio: square lead+arp, triangle bass, noise drums) ----
  const BPM=128, STEP=60/BPM/4;            // 16th-note duration in seconds
  let musicPlaying=false, schedTimer=null, nextNoteT=0, step16=0, catMode=false;
  let _musicBus=null, _noiseBuf=null;
  function musicBus(){ const c=ac(); if(!c) return null; if(!_musicBus){ _musicBus=c.createGain(); _musicBus.gain.value=0.16; _musicBus.connect(c.destination); } return _musicBus; }
  function noiseBuf(){ const c=ac(); if(!c) return null; if(!_noiseBuf){ _noiseBuf=c.createBuffer(1,Math.floor(c.sampleRate*0.3),c.sampleRate); const d=_noiseBuf.getChannelData(0); for(let i=0;i<d.length;i++) d[i]=Math.random()*2-1; } return _noiseBuf; }
  const NSEMI={C:0,'C#':1,D:2,'D#':3,E:4,F:5,'F#':6,G:7,'G#':8,A:9,'A#':10,B:11};
  function noteFreq(name){ const m=/^([A-G]#?)(\d)$/.exec(name); if(!m) return 0; const midi=NSEMI[m[1]]+(parseInt(m[2],10)+1)*12; return 440*Math.pow(2,(midi-69)/12); }
  function mnote(freq,t,dur,type,vol){ const c=ac(); if(!c||!freq) return; const o=c.createOscillator(),g=c.createGain(); o.type=type; o.frequency.value=freq; o.connect(g); g.connect(musicBus()); g.gain.setValueAtTime(0.0001,t); g.gain.linearRampToValueAtTime(vol,t+0.006); g.gain.exponentialRampToValueAtTime(0.0006,t+dur); o.start(t); o.stop(t+dur+0.02); }
  function kick(t){ const c=ac(); if(!c) return; const o=c.createOscillator(),g=c.createGain(); o.type='square'; o.frequency.setValueAtTime(140,t); o.frequency.exponentialRampToValueAtTime(45,t+0.12); g.gain.setValueAtTime(0.55,t); g.gain.exponentialRampToValueAtTime(0.001,t+0.14); o.connect(g); g.connect(musicBus()); o.start(t); o.stop(t+0.16); }
  function snare(t){ const c=ac(); if(!c) return; const s=c.createBufferSource(); s.buffer=noiseBuf(); const bp=c.createBiquadFilter(); bp.type='bandpass'; bp.frequency.value=1800; bp.Q.value=0.7; const g=c.createGain(); g.gain.setValueAtTime(0.26,t); g.gain.exponentialRampToValueAtTime(0.001,t+0.12); s.connect(bp); bp.connect(g); g.connect(musicBus()); s.start(t); s.stop(t+0.14); }
  function hat(t,vol){ const c=ac(); if(!c) return; const s=c.createBufferSource(); s.buffer=noiseBuf(); const hp=c.createBiquadFilter(); hp.type='highpass'; hp.frequency.value=7000; const g=c.createGain(); g.gain.setValueAtTime(vol,t); g.gain.exponentialRampToValueAtTime(0.001,t+0.045); s.connect(hp); hp.connect(g); g.connect(musicBus()); s.start(t); s.stop(t+0.06); }
  const CHORDS=[ {root:'A2',triad:['A3','C4','E4']}, {root:'F2',triad:['F3','A3','C4']}, {root:'C2',triad:['C4','E4','G4']}, {root:'G2',triad:['G3','B3','D4']} ];
  const ARP=[0,1,2,1,0,1,2,1,0,1,2,1,0,1,2,1];
  const LEAD={};
  [ {s:0,n:'E5',d:2},{s:2,n:'A4',d:2},{s:4,n:'C5',d:2},{s:6,n:'E5',d:2},{s:8,n:'D5',d:4},{s:12,n:'C5',d:4},
    {s:16,n:'C5',d:2},{s:18,n:'A4',d:2},{s:20,n:'F4',d:4},{s:24,n:'A4',d:2},{s:26,n:'C5',d:2},{s:28,n:'F5',d:4},
    {s:32,n:'E5',d:2},{s:34,n:'G5',d:2},{s:36,n:'E5',d:2},{s:38,n:'C5',d:2},{s:40,n:'G4',d:4},{s:44,n:'E5',d:4},
    {s:48,n:'D5',d:2},{s:50,n:'B4',d:2},{s:52,n:'G4',d:2},{s:54,n:'D5',d:2},{s:56,n:'G5',d:4},{s:60,n:'D5',d:2},{s:62,n:'B4',d:2}
  ].forEach(function(e){ LEAD[e.s]=e; });
  const CHORDS_CAT=[ {root:'D2',triad:['D4','F4','A4']}, {root:'A2',triad:['A3','C4','E4']}, {root:'A#2',triad:['A#3','D4','F4']}, {root:'C2',triad:['C4','E4','G4']} ];
  const LEAD_CAT={};
  [ {s:0,n:'A4',d:6},{s:8,n:'D5',d:6},{s:16,n:'C5',d:6},{s:24,n:'E5',d:4},{s:28,n:'A4',d:2},{s:32,n:'A#4',d:6},{s:40,n:'D5',d:6},{s:48,n:'C5',d:4},{s:52,n:'G4',d:4},{s:56,n:'A4',d:8} ].forEach(function(e){ LEAD_CAT[e.s]=e; });
  function scheduleStep(idx,t){
    const bar=Math.floor(idx/16), within=idx%16; if(catMode){ const cc=CHORDS_CAT[bar]; if(within%4===0){ mnote(noteFreq(cc.root), t, STEP*3.6, 'triangle', 0.5); mnote(noteFreq(cc.triad[1]), t, STEP*3.0, 'sine', 0.07); } var ce=LEAD_CAT[idx]; if(ce) mnote(noteFreq(ce.n), t, STEP*ce.d*0.9, 'triangle', 0.30); return; } const ch=CHORDS[bar];
    if(within%2===0) mnote(noteFreq(ch.root), t, STEP*1.7, 'triangle', within===0?0.55:0.42);   // bass
    mnote(noteFreq(ch.triad[ARP[within]]), t, STEP*0.85, 'square', 0.10);                        // arp
    const ev=LEAD[idx]; if(ev) mnote(noteFreq(ev.n), t, STEP*ev.d*0.9, 'square', 0.36);          // lead
    if(within===0||within===8) kick(t);
    if(within===4||within===12) snare(t);
    if(within%2===1) hat(t, (within===6||within===14)?0.14:0.08);
  }
  function scheduler(){ const c=ac(); if(!c) return; while(nextNoteT < c.currentTime + 0.12){ scheduleStep(step16%64, nextNoteT); nextNoteT+=STEP; step16++; } }
  function startMusic(){ const c=ac(); if(!c) return; if(c.state==='suspended') c.resume(); if(musicPlaying) return; musicPlaying=true; step16=0; nextNoteT=c.currentTime+0.06; schedTimer=setInterval(scheduler,25); }
  function stopMusic(){ musicPlaying=false; if(schedTimer){ clearInterval(schedTimer); schedTimer=null; } }
  function firstGesture(){ if(musicStarted) return; musicStarted=true; const c=ac(); if(c&&c.state==='suspended') c.resume(); if(state.musicOn) startMusic(); }
  function syncSoundIcons(){ const m=document.getElementById('musicIcon'), s=document.getElementById('sfxIcon'); if(m) m.classList.toggle('off', !state.musicOn); if(s) s.classList.toggle('off', !state.sfxOn); }

  const sheet=new Image(); let sheetReady=false;
  sheet.onload=function(){ sheetReady=true; CV.forEach(function(cv,i){ drawSym(cv, SYMS[[0,1,5][i]]); }); };
  sheet.src='kitty-sprites.png';
  const CV=[document.getElementById('cv0'),document.getElementById('cv1'),document.getElementById('cv2')];
  const REEL=[document.getElementById('reel0'),document.getElementById('reel1'),document.getElementById('reel2')];
  function drawSym(cv, sym){ const x=cv.getContext('2d'); x.imageSmoothingEnabled=false; x.clearRect(0,0,cv.width,cv.height); const idx=SPRITE_ORDER.indexOf(sym); if(idx<0||!sheetReady) return; x.drawImage(sheet, idx*32,0,32,32, 0,0,cv.width,cv.height); }

  function renderLights(){ const el=document.getElementById('lights'); el.innerHTML=''; const cols=['var(--gold)','var(--magenta)','var(--cyan)','var(--violet)']; for(let i=0;i<14;i++){ const d=document.createElement('div'); d.className='light'; d.style.background=cols[i%cols.length]; d.style.animationDelay=(i*0.09)+'s'; el.appendChild(d); } }
  function renderBetPresets(){ const el=document.getElementById('betbar'); el.innerHTML=''; PRESETS.forEach(function(b){ const btn=document.createElement('div'); btn.className='bet'+(b===state.bet?' active':''); btn.textContent='$'+b; btn.addEventListener('click',function(){ setBet(b); }); el.appendChild(btn); }); }
  function renderPalette(){ const el=document.getElementById('palrow'); el.querySelectorAll('.swatch').forEach(function(s){s.remove();}); PALNAMES.forEach(function(n){ const sw=document.createElement('div'); sw.className='swatch'+(n===state.palette?' active':''); sw.title=n; sw.style.background=PALETTES[n].violet; sw.style.boxShadow='0 0 0 2px '+PALETTES[n].dark+(n===state.palette?',0 0 0 4px '+PALETTES[n].gold:''); sw.addEventListener('click',function(){ applyPalette(n); }); el.appendChild(sw); }); }
  function renderPaytable(){ const el=document.getElementById('ptBody'); const rows=[['🐱🐱🐱','JACKPOT',0],['🐟🐟🐟','x80',0],['💎💎💎','x60',0],['7️⃣7️⃣7️⃣','x40',0],['⭐⭐⭐','x25',0],['🔔🔔🔔','x15',0],['🍒🍒🍒','x10',0],['🍋🍋🍋','x6',0],['🍒🍒·','x4',0],['🍒··','x2',0],['🦴🦴🦴','PIERDES TODO',1],['🦴 suelta','-apuesta',1]]; el.innerHTML=''; rows.forEach(function(r){ const row=document.createElement('div'); row.className='pt-row'; const s=document.createElement('span'); s.style.fontSize='20px'; s.textContent=r[0]; const p=document.createElement('span'); p.className='pay'+(r[2]?' bad':''); p.textContent=r[1]; row.appendChild(s); row.appendChild(p); el.appendChild(row); }); const note=document.createElement('div'); note.style.cssText='margin-top:10px;color:var(--muted);line-height:1.4'; note.innerHTML='COMBO: gana 2+ seguidas y se multiplica (x1.5, x2, x2.5... hasta x'+fmtMult(comboCap())+'). Perder reinicia el combo.'; el.appendChild(note); }
  function renderShop(){ const el=document.getElementById('upgList'); el.innerHTML=''; function header(t){ const h=document.createElement('div'); h.className='shop-section'; h.textContent=t; el.appendChild(h); } function row(name,desc,sub,btnTxt,disabled,onBuy,cls){ const r=document.createElement('div'); r.className='upg'+(cls?(' '+cls):''); const info=document.createElement('div'); info.className='info'; info.innerHTML='<div class="nm">'+name+'</div><div class="ds">'+desc+'</div><div class="lv">'+sub+'</div>'; const b=document.createElement('button'); b.textContent=btnTxt; b.disabled=disabled; if(onBuy) b.addEventListener('click',onBuy); r.appendChild(info); r.appendChild(b); el.appendChild(r); } header('🔧 MEJORAS'); Object.keys(UPG).forEach(function(k){ const u=UPG[k], lv=state.upg[k], maxed=lv>=u.max, cost=u.cost(lv); row(u.name,u.desc,'Nivel '+lv+'/'+u.max, maxed?'MÁX':'$'+fmt(cost), maxed||state.debt>0||state.credits<cost, function(){ buyUpg(k); }); }); header('⚡ HABILIDADES'); if(!state.skillsUnlocked){ const lock=document.createElement('div'); lock.className='shop-lock'; const falta=Math.max(0, SKILL_UNLOCK-state.credits); lock.innerHTML='🔒 Llegá a <b>$'+fmt(SKILL_UNLOCK)+'</b> para desbloquear las habilidades.'+(falta>0?'<br>Te faltan $'+fmt(falta)+'.':''); el.appendChild(lock); } else { var hl=state.holdLevel||0; var hmax=hl>=2; var hcost=hmax?0:HOLD_COSTS[hl]; var hdesc=hl===0?'Trabá 1 rodillo y volvé a girar el resto. Enfría 3 giros.':(hl===1?'MEJORA: trabá 2 rodillos a la vez':'Trabás hasta 2 rodillos a la vez'); var hsub=hl===0?'habilidad nueva — Nivel 1/2':('Nivel '+hl+'/2 — retenés '+hl); row('Retener (Hold)', hdesc, hsub, hmax?'MÁX':(hl===0?'$'+fmt(hcost):'Mejorar $'+fmt(hcost)), hmax||state.debt>0||state.credits<hcost, function(){ buyHold(); }, 'abil'); var sl=state.superLevel||0; var smax=sl>=20; var scost=smax?0:superCost(sl); var sdesc=sl===0?'Activala para una racha de suerte: suben las chances de TODOS los premios y jackpots (no garantizado).':'Activala para una racha de suerte. Mejorar suma +1s de duración.'; var ssub=sl===0?'habilidad nueva — dura 5s':('Nivel '+sl+'/20 — dura '+superDur(sl)+'s'); row('Supersuerte 🍀', sdesc, ssub, smax?'MÁX':(sl===0?'$'+fmt(scost):'Mejorar $'+fmt(scost)), smax||state.debt>0||state.credits<scost, function(){ buySuper(); }, 'abil'); Object.keys(ABIL).forEach(function(k){ const a=ABIL[k], owned=state.abilities[k]; row(a.name,a.desc, owned?'\u2713 desbloqueada':'habilidad nueva', owned?'OK':'$'+fmt(a.cost), owned||state.debt>0||state.credits<a.cost, function(){ buyAbility(k); }, 'abil'); }); } document.getElementById('shopNote').textContent = state.debt>0 ? 'Pagá tu deuda antes de comprar.' : 'Comprás con tus créditos.'; }
  function updateUI(){ if(!state.skillsUnlocked && state.credits>=SKILL_UNLOCK) state.skillsUnlocked=true; if(!state.bankUnlocked && state.credits>=BANK_UNLOCK_CREDITS) unlockBank('rich'); document.getElementById('credits').textContent=fmt(state.credits); document.getElementById('debt').textContent=fmt(state.debt); const ind=state.debt>0; document.getElementById('debtBox').classList.toggle('on', ind); document.getElementById('danger').classList.toggle('on', ind); document.getElementById('debtWarn').style.display=ind?'block':'none'; if(document.getElementById('bank').classList.contains('open')) renderBank(); document.getElementById('jpAmount').textContent=fmt(Math.round(Math.max(state.jackpot, state.bet*JP_MULT)*winMult())); var _bb=document.getElementById('bankBtn'); if(_bb){ _bb.disabled=!state.bankUnlocked; _bb.textContent=state.bankUnlocked?'🏦 BANCO':'🔒 BANCO'; } }
  function setSpinUI(on){ document.getElementById('spinBtn').disabled=on; document.body.classList.toggle('spin-lock', on); updateSuperUI(); }
  function setMsg(t,cls){ const el=document.getElementById('winMsg'); el.textContent=t; el.className='win-msg'+(cls?(' '+cls):''); }
  function setCombo(){ const el=document.getElementById('combo'); const m=comboMult(); if(combo>=2){ const ONO=['','','¡ZAS!','¡PUM!','¡PAM!','¡BOOM!','¡KABOOM!']; const o=ONO[Math.min(combo,ONO.length-1)]; el.textContent=o+' x'+fmtMult(m); el.classList.add('on'); } else { el.classList.remove('on'); } }
  function applyPalette(name){ const p=PALETTES[name]||PALETTES.synthwave; for(const k in p){ document.documentElement.style.setProperty('--'+k,p[k]); } state.palette=name; renderPalette(); saveState(); }

  function confetti(n){ const real=['#ffd23f','#ff3d8b','#39e0e6','#a45cff','#5bd75b']; for(let i=0;i<n;i++){ const c=document.createElement('div'); c.className='confetti'; c.style.left=(50+(Math.random()*44-22))+'vw'; c.style.top='30vh'; c.style.background=real[i%real.length]; c.style.transform='translateX('+((Math.random()*2-1)*250)+'px)'; c.style.animation='fall '+(0.9+Math.random())+'s steps(12) forwards'; c.style.animationDelay=(Math.random()*0.2)+'s'; document.body.appendChild(c); setTimeout(function(){c.remove();},2300); } }

  function applyWin(w){ if(state.debt>0){ const p=Math.min(w,state.debt); state.debt-=p; w-=p; } state.credits+=w; return w; }
  function celebrate(big){ const l=document.getElementById('lights'); l.classList.add('win'); setTimeout(function(){l.classList.remove('win');},1400); confetti(big?55:22); sWin(big); }

  function spinReel(reelEl, cv, target, duration, onDone){ reelEl.classList.remove('stop'); reelEl.classList.add('spinning'); let elapsed=0, delay=55; (function tick(){ drawSym(cv, randSym()); elapsed+=delay; if(elapsed>=duration){ drawSym(cv,target); reelEl.classList.remove('spinning'); reelEl.classList.add('stop'); sStop(); if(onDone)onDone(); return; } if(elapsed>duration*0.55) delay+=13; setTimeout(tick,delay); })(); }

  function spin(){
    if(spinning) return;
    hideGamble();
    if(state.credits<1){ if(!state.bankUnlocked) unlockBank(); if(loanAvailable()){ setMsg('SIN CRÉDITOS — PEDÍ PRÉSTAMO',false); } else { gameOver(); } return; }
    if(state.bet>state.credits){ setMsg('TE FALTA — BAJÁ LA APUESTA O PEDÍ PRÉSTAMO',false); return; }
    if(state.bet<1){ setMsg('SUBÍ LA APUESTA',false); return; }
    if(state.debt>0){ state.debt+=Math.ceil(state.debt*INTEREST); }
    spinning=true; setSpinUI(true); setMsg('',false); renderHold();
    state.credits-=state.bet; state.jackpot+=Math.max(2,Math.round(state.bet*0.2)); accrueInterest(); updateUI();
    const t=[0,1,2].map(function(i){ return held[i]?cur[i]:randSym(); });
    const idx=[0,1,2].filter(function(i){ return !held[i]; });
    if(idx.length===0){ finish(t); return; }
    let done=0;
    idx.forEach(function(i,k){ spinReel(REEL[i],CV[i],t[i],800+k*450,function(){ done++; if(done===idx.length) finish(t); }); });
  }

  function finish(t){
    spinning=false; setSpinUI(false);
    const wasHeld=held.slice();
    cur=t.slice(); if(held.indexOf(true)>=0){ holdCD=3; } else { holdCD=Math.max(0,holdCD-1); } held=[false,false,false]; renderHold();
    const a=t[0],b=t[1],c=t[2];
    if(a===b && b===c){
      if(a==='🐱'){ combo++; const w=Math.round(Math.max(state.jackpot, state.bet*JP_MULT)*winMult()); state.jackpot=JP_BASE; const net=applyWin(w); updateUI(); setCombo(); setMsg('¡JACKPOT! +'+fmt(w),'big'); confetti(75); sJackpot(); jackpotRain(); const jp=document.getElementById('jpAmount'); jp.classList.add('flash'); setTimeout(function(){jp.classList.remove('flash');},2600); offerGamble(net); saveState(); return; }
      if(a==='🦴'){ combo=0; state.credits=0; updateUI(); setCombo(); setMsg('¡ESPINAS! PERDISTE TODO 💀','big bad'); const cab=document.getElementById('cabinet'); cab.classList.add('bad'); setTimeout(function(){cab.classList.remove('bad');},900); sBad(); saveState(); checkBroke(); return; }
      combo++; const mult=comboMult(); const w=Math.round(state.bet*PAY3[a]*mult*winMult()); const net=applyWin(w); updateUI(); setCombo(); const big=PAY3[a]>=25||mult>=2.5; setMsg('TRIPLE'+(mult>1?' x'+fmtMult(mult):'')+' +'+fmt(w), big?'big':''); celebrate(big); offerGamble(net); saveState(); return;
    }
    const bones=t.filter(function(s){return s==='🦴';}).length;
    if(bones>0){ combo=0; const pen=state.bet*bones; state.credits=Math.max(0,state.credits-pen); updateUI(); setCombo(); setMsg('-'+fmt(pen)+'$','bad'); const cab=document.getElementById('cabinet'); cab.classList.add('bad'); setTimeout(function(){cab.classList.remove('bad');},600); sBad(); saveState(); checkBroke(); return; }
    const ch=t.filter(function(s){return s==='🍒';}).length;
    const chFresh=[0,1,2].filter(function(i){ return t[i]==='🍒' && !wasHeld[i]; }).length;
    if(ch>=1 && chFresh>=1){ combo++; const base=(ch===2?4:2)*state.bet; const mult=comboMult(); const w=Math.round(base*mult*winMult()); const net=applyWin(w); updateUI(); setCombo(); setMsg((ch===2?'2 CEREZAS':'1 CEREZA')+(mult>1?' x'+fmtMult(mult):'')+' +'+fmt(w), mult>=2.5?'big':''); celebrate(mult>=2.5); offerGamble(net); saveState(); return; }
    combo=0; setCombo(); setMsg('SUERTE LA PROXIMA',false); saveState(); checkBroke();
  }

  function setBet(v){ v=Math.floor(v); if(isNaN(v)||v<MIN_BET)v=MIN_BET; if(v>1000)v=1000; state.bet=v; var bi=document.getElementById('betInput'); if(bi) bi.value=v; renderBetPresets(); updateUI(); saveState(); }
  function loanAvailable(){ return state.debt + LOAN <= creditLimit(); }
  function canLoan(){ return loanAvailable() && state.credits < state.bet; }
  function takeLoan(){ if(spinning) return; if(!loanAvailable()){ setMsg('LÍMITE DE PRÉSTAMOS ($'+fmt(creditLimit())+')',false); return; } if(state.credits>=state.bet){ setMsg('Solo podés pedir préstamo si te quedás corto',false); return; } state.credits+=LOAN; state.debt+=Math.round(LOAN*(1+LOAN_FEE)); updateUI(); renderBank(); setMsg('PRÉSTAMO: +$'+fmt(LOAN)+' (debés $'+fmt(Math.round(LOAN*(1+LOAN_FEE)))+')',false); saveState(); }
  function buyVault(){ if(state.vault||state.debt>0||state.credits<CAJA_COST) return; state.credits-=CAJA_COST; state.vault=true; updateUI(); renderBank(); saveState(); }
  function deposit(a){ if(!state.vault) return; a=Math.floor(a); if(!a||a<1) return; a=Math.min(a,state.credits); if(a<=0) return; state.credits-=a; state.bank+=a; updateUI(); renderBank(); saveState(); }
  function withdraw(a){ if(!state.vault) return; a=Math.floor(a); if(!a||a<1) return; a=Math.min(a,state.bank); if(a<=0) return; state.bank-=a; state.credits+=a; updateUI(); renderBank(); saveState(); }
  function payDebt(fromBank){ if(state.debt<=0) return; const src=fromBank?state.bank:state.credits; const pp=Math.min(state.debt,src); if(pp<=0) return; state.debt-=pp; if(fromBank) state.bank-=pp; else state.credits-=pp; updateUI(); renderBank(); saveState(); }
  function renderBank(){
    const el=document.getElementById('bankBody'); if(!el) return;
    const v=state.vault; let h='';
    h+='<div class="bank-bal">💰 Guardado: <b>$'+fmt(state.bank)+'</b></div>';
    h+='<div class="shop-section">CAJA FUERTE</div>';
    if(!v){
      h+='<div class="bank-note">Guardá plata a salvo: lo que está en el banco <b>no se pierde</b> con las espinas 🦴.</div>';
      h+='<div class="bank-row"><span>Comprar Caja fuerte</span><button id="bkVault" class="bank-btn"'+((state.credits<CAJA_COST||state.debt>0)?' disabled':'')+'>$'+fmt(CAJA_COST)+'</button></div>';
      if(state.debt>0) h+='<div class="bank-note">Pagá tu deuda antes de comprar la caja fuerte.</div>';
    } else {
      h+='<div class="bank-io"><input id="bkAmt" class="bank-input" type="number" min="1" placeholder="monto"><button id="bkDep" class="bank-btn">Depositar</button><button id="bkWit" class="bank-btn">Retirar</button></div>';
      h+='<div class="bank-quick"><button id="bkDepAll" class="bank-mini">Depositar todo</button><button id="bkWitAll" class="bank-mini">Retirar todo</button></div>';
    }
    h+='<div class="shop-section">PRÉSTAMO</div>';
    if(state.debt>0) h+='<div class="bank-bal" style="color:var(--red)">Deuda: <b>-$'+fmt(state.debt)+'</b> <span style="font-size:13px;color:var(--muted)">(crece 3%/giro)</span></div>';
    const canLoan=loanAvailable() && state.credits<state.bet;
    h+='<div class="bank-row"><span>Pedir préstamo</span><button id="bkLoan" class="bank-btn"'+(canLoan?'':' disabled')+'>+$'+fmt(LOAN)+'</button></div>';
    h+='<div class="bank-note">Recibís $'+fmt(LOAN)+' pero sumás $'+fmt(Math.round(LOAN*(1+LOAN_FEE)))+' de deuda (interés inicial 10%, después crece 3%/giro).</div>';
    if(!loanAvailable()) h+='<div class="bank-note">Llegaste al tope de tu línea de crédito ($'+fmt(creditLimit())+').</div>';
    else if(state.credits>=state.bet) h+='<div class="bank-note">El préstamo solo aparece si te quedás corto de créditos.</div>';
    if(state.debt>0){ h+='<div class="bank-io"><button id="bkPayC" class="bank-btn"'+((state.credits<=0)?' disabled':'')+'>Pagar con créditos</button><button id="bkPayB" class="bank-btn"'+((!v||state.bank<=0)?' disabled':'')+'>Pagar con ahorros</button></div>'; }
    h+='<div class="shop-section">⬆️ MEJORAS DEL BANCO</div>';
    const cmax=state.creditLevel>=CREDIT_LIMITS.length-1;
    const ccost=cmax?0:CREDIT_COSTS[state.creditLevel];
    h+='<div class="bank-row"><div class="info">Línea de crédito<span class="ds-sm">Tope: $'+fmt(creditLimit())+(cmax?' (MÁX)':' → $'+fmt(CREDIT_LIMITS[state.creditLevel+1]))+'</span></div><button id="bkCredit" class="bank-btn"'+((cmax||state.debt>0||state.credits<ccost)?' disabled':'')+'>'+(cmax?'MÁX':'$'+fmt(ccost))+'</button></div>';
    if(!v){
      h+='<div class="bank-row"><div class="info">Interés bancario<span class="ds-sm">requiere la Caja fuerte</span></div><button class="bank-btn" disabled>—</button></div>';
    } else {
      const imax=state.interestLevel>=INT_RATES.length-1;
      const icost=imax?0:INT_COSTS[state.interestLevel];
      const icur=state.interestLevel>0?(Math.round(INT_RATES[state.interestLevel]*1000)/10+'% cada '+INT_INTERVALS[state.interestLevel]+' giros'):'sin activar';
      const inext=imax?'':(' → '+(Math.round(INT_RATES[state.interestLevel+1]*1000)/10)+'% / '+INT_INTERVALS[state.interestLevel+1]+' giros');
      h+='<div class="bank-row"><div class="info">Interés bancario<span class="ds-sm">'+icur+(imax?' (MÁX)':inext)+'</span></div><button id="bkInterest" class="bank-btn"'+((imax||state.debt>0||state.credits<icost)?' disabled':'')+'>'+(imax?'MÁX':'$'+fmt(icost))+'</button></div>';
    }
    if(state.debt>0) h+='<div class="bank-note">Pagá tu deuda para comprar mejoras.</div>';
    el.innerHTML=h;
    function bind(id,fn){ const e=document.getElementById(id); if(e) e.addEventListener('click',fn); }
    bind('bkVault',buyVault);
    bind('bkDep',function(){ deposit(parseInt(document.getElementById('bkAmt').value,10)); });
    bind('bkWit',function(){ withdraw(parseInt(document.getElementById('bkAmt').value,10)); });
    bind('bkDepAll',function(){ deposit(state.credits); });
    bind('bkWitAll',function(){ withdraw(state.bank); });
    bind('bkLoan',takeLoan);
    bind('bkPayC',function(){ payDebt(false); });
    bind('bkPayB',function(){ payDebt(true); });
    bind('bkCredit',buyCredit);
    bind('bkInterest',buyInterest);
  }
  function creditLimit(){ return CREDIT_LIMITS[Math.min(state.creditLevel||0, CREDIT_LIMITS.length-1)]; }
  function interestRate(){ return INT_RATES[Math.min(state.interestLevel||0, INT_RATES.length-1)]; }
  function interestInterval(){ return INT_INTERVALS[Math.min(state.interestLevel||0, INT_INTERVALS.length-1)]; }
  function accrueInterest(){ if((state.interestLevel||0)<=0 || state.bank<=0) return; state.intSpins=(state.intSpins||0)+1; if(state.intSpins>=interestInterval()){ state.intSpins=0; const g=Math.floor(state.bank*interestRate()); if(g>0) state.bank+=g; } }
  function buyCredit(){ if(state.debt>0||state.creditLevel>=CREDIT_LIMITS.length-1) return; const cost=CREDIT_COSTS[state.creditLevel]; if(state.credits<cost) return; state.credits-=cost; state.creditLevel++; updateUI(); renderBank(); saveState(); }
  function buyInterest(){ if(state.debt>0||!state.vault||state.interestLevel>=INT_RATES.length-1) return; const cost=INT_COSTS[state.interestLevel]; if(state.credits<cost) return; state.credits-=cost; state.interestLevel++; updateUI(); renderBank(); saveState(); }
  function fullReset(){ state.credits=START; state.jackpot=JP_BASE; state.bet=50; state.debt=0; state.bank=0; state.vault=false; state.creditLevel=0; state.interestLevel=0; state.intSpins=0; state.upg={win:0,combo:0,cat:0,bone:0}; state.abilities={hold:false,gamble:false}; state.holdLevel=0; state.superLevel=0; state.bankUnlocked=false; state.introSeen=false; state.helpSeen=[]; luckyUntil=0; superReadyAt=0; document.body.classList.remove('supersuerte'); state.skillsUnlocked=false; combo=0; rebuildPool(); renderBetPresets(); updateUI(); setCombo(); renderPaytable(); renderShop(); renderHold(); updateSuperUI(); saveState(); }
  const TXT_INTRO="¡MIAU! SOY KITTY. 🐱 BIENVENIDO A KITTY'S SLOTS.||TIRÁ LA PALANCA O TOCÁ GIRAR PARA JUGAR. ANTES, AJUSTÁ TU APUESTA.||PARA GANAR, FIJATE EN LA LISTA DE COMBINACIONES Y ARMÁ LAS QUE MÁS PAGAN. ¡3 GATOS = JACKPOT! 🐱||Y OJO CON LOS HUESOS DE PESCADO 🦴 — SUS ESPINAS PINCHAN TU BOLSILLO.||EN LA TIENDA ★ MEJORÁS TUS CHANCES. ¡SUERTE! 🐾";
  const TXT_BANK_BROKE="¡MIAU! 🙀 TE QUEDASTE SIN CRÉDITOS...||TRANQUI, TE ABRÍ EL BANCO. PEDÍ UN PRÉSTAMO Y SEGUÍ JUGANDO.||VAS A DEBER UN POCO MÁS Y LA DEUDA CRECE CADA GIRO. PAGALA CUANDO GANES.||¡LA PRÓXIMA LA SACÁS! 🐾";
  const TXT_BANK_RICH="¡MIAU! 😺 ¡MIRÁ CÓMO CRECÉS!||TE ABRÍ EL BANCO 🏦. GUARDÁ PLATA EN LA CAJA FUERTE Y QUEDA A SALVO DE LOS HUESITOS 🦴.||Y SI ALGUNA VEZ TE QUEDÁS CORTO, PEDÍ UN PRÉSTAMO PARA SEGUIR.||¡SEGUÍ ASÍ! 🐾";
  const TXT_BANK="EL BANCO 🏦 TIENE DOS COSAS:||💰 CAJA FUERTE: GUARDÁ PLATA A SALVO DE LOS HUESITOS 🦴.||🪙 PRÉSTAMO: SI TE QUEDÁS CORTO, PEDÍS $1.000 (DEBÉS UN POCO MÁS Y LA DEUDA CRECE CADA GIRO).||PAGALA CUANDO GANES.";
  const HELP_TOPICS=[ {id:'intro',label:'🎮 Cómo jugar',text:TXT_INTRO}, {id:'bank',label:'🏦 Banco y préstamos',text:TXT_BANK} ];
  function unlockHelp(id){ if(!state.helpSeen) state.helpSeen=[]; if(state.helpSeen.indexOf(id)<0){ state.helpSeen.push(id); saveState(); } }
  function renderHelp(){ var el=document.getElementById('helpBody'); if(!el) return; var seen=state.helpSeen||[]; var h=''; if(!seen.length){ h+='<div class="bank-note">Todavía no desbloqueaste explicaciones. ¡Jugá y Kitty te irá enseñando! 🐱</div>'; } else { h+='<div class="bank-note">¿Qué querés que te explique Kitty? 🐱</div>'; HELP_TOPICS.forEach(function(t){ if(seen.indexOf(t.id)>=0) h+='<button class="help-item" data-id="'+t.id+'">'+t.label+'</button>'; }); } el.innerHTML=h; var bs=el.querySelectorAll('.help-item'); for(var i=0;i<bs.length;i++){ bs[i].addEventListener('click', function(){ var id=this.getAttribute('data-id'); document.getElementById('helpModal').classList.remove('open'); var t=null,j; for(j=0;j<HELP_TOPICS.length;j++){ if(HELP_TOPICS[j].id===id) t=HELP_TOPICS[j]; } if(t) showCat(t.text); }); } }
  var _catTimer=null, _catFull='', _catTyping=false, _catWaiting=false, _introText='';
  function typeCat(text){ _catFull=text; _catTyping=true; var el=document.getElementById('catSpeech'), cont=document.getElementById('catOk'); if(cont) cont.style.visibility='hidden'; if(el) el.textContent=''; var i=0; clearInterval(_catTimer); _catTimer=setInterval(function(){ if(i>=_catFull.length){ clearInterval(_catTimer); _catTyping=false; if(cont) cont.style.visibility='visible'; return; } var ch=_catFull.charAt(i); if(el){ el.textContent += (ch==='|') ? String.fromCharCode(10) : ch; } if(ch!==' ' && ch!=='|') sfx(715+Math.random()*90,0.02,0.035,'square'); i++; }, 42); }
  function catSkip(){ if(!_catTyping) return; clearInterval(_catTimer); _catTyping=false; var el=document.getElementById('catSpeech'), cont=document.getElementById('catOk'); if(el) el.textContent=_catFull.split('|').join(String.fromCharCode(10)); if(cont) cont.style.visibility='visible'; }
  function closeCat(){ var m=document.getElementById('catModal'); if(m) m.classList.remove('open'); catMode=false; }
  function showCat(text){ var m=document.getElementById('catModal'); if(!m) return; var cont=document.getElementById('catOk'); if(cont) cont.textContent='▶ TOCÁ PARA SEGUIR'; m.classList.add('open'); if(state.musicOn){ catMode=true; if(!musicPlaying) startMusic(); } typeCat(text); }
  function showIntro(){ var m=document.getElementById('catModal'); if(!m) return; unlockHelp('intro'); _introText=TXT_INTRO; _catWaiting=true; var el=document.getElementById('catSpeech'); if(el) el.textContent=''; var cont=document.getElementById('catOk'); if(cont){ cont.textContent='▶ TOCÁ PARA EMPEZAR'; cont.style.visibility='visible'; } m.classList.add('open'); }
  function unlockBank(reason){ if(state.bankUnlocked) return; state.bankUnlocked=true; var b=document.getElementById('bankBtn'); if(b){ b.disabled=false; b.textContent='🏦 BANCO'; } unlockHelp('bank'); setMsg('🏦 ¡BANCO DESBLOQUEADO!',false); showCat(reason==='rich'?TXT_BANK_RICH:TXT_BANK_BROKE); saveState(); }
  function gameOver(){ document.getElementById('goDebt').textContent=fmt(state.debt); document.getElementById('gameover').classList.add('open'); }
  function checkBroke(){ if(state.credits<MIN_BET && !state.bankUnlocked) unlockBank(); if(state.credits<MIN_BET && state.bank<1 && !loanAvailable()){ gameOver(); } }
  function buyUpg(k){ const u=UPG[k], lv=state.upg[k]; if(lv>=u.max||state.debt>0) return; const cost=u.cost(lv); if(state.credits<cost) return; state.credits-=cost; state.upg[k]++; rebuildPool(); updateUI(); renderShop(); renderPaytable(); saveState(); }
  const HOLD_COSTS=[2000,6000];
  const ABIL={ gamble:{name:'Doble o nada',desc:'Tras ganar, girás de nuevo: si sale premio, multiplica tus ganancias.',cost:3000} };
  function buyAbility(k){ const a=ABIL[k]; if(!state.skillsUnlocked||state.abilities[k]||state.debt>0||state.credits<a.cost) return; state.credits-=a.cost; state.abilities[k]=true; updateUI(); renderShop(); renderHold(); saveState(); }
  function buyHold(){ if(!state.skillsUnlocked||state.debt>0||state.holdLevel>=2) return; const cost=HOLD_COSTS[state.holdLevel]; if(state.credits<cost) return; state.credits-=cost; state.holdLevel++; state.abilities.hold=true; updateUI(); renderShop(); renderHold(); saveState(); }
  const SUPER_CD=30;
  function superDur(lv){ return 6+lv*2; }
  function superCost(lv){ return Math.round(4000*Math.pow(1.4,lv)/100)*100; }
  function buySuper(){ if(!state.skillsUnlocked||state.debt>0||state.superLevel>=20) return; var cost=superCost(state.superLevel); if(state.credits<cost) return; state.credits-=cost; state.superLevel++; rebuildPool(); updateUI(); renderShop(); updateSuperUI(); saveState(); }
  function activateSuper(){ if(state.superLevel<1) return; var now=Date.now(); if(now<luckyUntil||now<superReadyAt) return; var dur=superDur(state.superLevel); luckyUntil=now+dur*1000; superReadyAt=luckyUntil+SUPER_CD*1000; document.body.classList.add('supersuerte'); setMsg('🍀 ¡SUPERSUERTE! '+dur+'s',false); sSuper(); updateSuperUI(); }
  function updateSuperUI(){ var row=document.getElementById('superRow'), btn=document.getElementById('superBtn'); if(row) row.style.display=state.superLevel>0?'flex':'none'; if(!btn) return; if(state.superLevel<1){ document.body.classList.remove('supersuerte'); return; } var now=Date.now(); if(now<luckyUntil){ document.body.classList.add('supersuerte'); btn.disabled=true; btn.textContent='🍀 ACTIVA '+Math.ceil((luckyUntil-now)/1000)+'s'; } else if(spinning){ document.body.classList.remove('supersuerte'); btn.disabled=true; btn.textContent='🍀 SUPERSUERTE'; } else { document.body.classList.remove('supersuerte'); if(now<superReadyAt){ btn.disabled=true; btn.textContent='⏳ '+Math.ceil((superReadyAt-now)/1000)+'s'; } else { btn.disabled=false; btn.textContent='🍀 SUPERSUERTE'; } } }
  function jackpotRain(){ var c=document.createElement('div'); c.className='jp-rain'; for(var i=0;i<26;i++){ var sp=document.createElement('span'); sp.textContent='🐱'; sp.style.left=(Math.random()*100)+'%'; sp.style.animationDelay=(Math.random()*0.8)+'s'; sp.style.animationDuration=(1.8+Math.random()*1.4)+'s'; sp.style.fontSize=(20+Math.random()*22)+'px'; c.appendChild(sp); } document.body.appendChild(c); setTimeout(function(){ if(c.parentNode) c.parentNode.removeChild(c); }, 3600); }
  function toggleHold(i){ if(state.holdLevel<1||spinning||holdCD>0) return; if(!held[i] && held.filter(Boolean).length>=state.holdLevel){ setMsg('MÁX '+state.holdLevel+' RETENIDO'+(state.holdLevel>1?'S':''),false); return; } held[i]=!held[i]; renderHold(); }
  function renderHold(){ const on=state.holdLevel>0; for(let i=0;i<3;i++){ REEL[i].classList.toggle('held', !!held[i]); } const hint=document.getElementById('holdHint'); if(!on){ hint.style.display='none'; return; } hint.style.display='block'; if(spinning){ hint.style.visibility='hidden'; } else if(holdCD>0){ hint.style.visibility='visible'; hint.classList.add('cd'); hint.textContent='🔒 Retener disponible en '+holdCD+' giro(s)'; } else { hint.style.visibility='visible'; hint.classList.remove('cd'); hint.textContent='🔒 Retené hasta '+state.holdLevel+' — deben combinar con la tirada nueva'; } }
  function showGamble(){ document.getElementById('gambleTxt').textContent='Ganaste $'+fmt(gambleAmount)+' — ¿girás para multiplicar?'; document.getElementById('gambleCash').textContent='✓ COBRAR $'+fmt(gambleAmount); document.getElementById('holdHint').style.display='none'; document.getElementById('gambleBar').classList.add('on'); }
  function hideGamble(){ gambleAmount=0; document.getElementById('gambleBar').classList.remove('on'); renderHold(); }
  function offerGamble(w){ if(state.abilities.gamble && state.debt===0 && w>0){ gambleAmount=w; showGamble(); } else { hideGamble(); } }
  function gambleMult(t){ if(t.indexOf('🦴')>=0) return 0; const a=t[0],b=t[1],c=t[2]; if(a===b&&b===c){ return a==='🐱'?50:PAY3[a]; } const ch=t.filter(function(s){return s==='🍒';}).length; if(ch===2) return 4; if(ch===1) return 2; return 0; }
  function doGamble(){ if(gambleAmount<=0||spinning) return; gambling=true; spinning=true; setSpinUI(true); document.getElementById('gambleBar').classList.remove('on'); setMsg('🎲 girando...',false); const t=[randSym(),randSym(),randSym()]; spinReel(REEL[0],CV[0],t[0],700,null); spinReel(REEL[1],CV[1],t[1],1050,null); spinReel(REEL[2],CV[2],t[2],1450,function(){ gambleResult(t); }); }
  function gambleResult(t){ spinning=false; setSpinUI(false); gambling=false; cur=t.slice(); const M=gambleMult(t); if(M>0){ const gain=gambleAmount*(M-1); state.credits+=gain; gambleAmount*=M; updateUI(); setMsg('🎲 x'+M+'!  $'+fmt(gambleAmount),'big'); celebrate(M>=10); saveState(); showGamble(); } else { const lost=gambleAmount; state.credits-=gambleAmount; gambleAmount=0; updateUI(); setMsg('🎲 PERDISTE $'+fmt(lost),'bad'); sBad(); hideGamble(); saveState(); checkBroke(); } }
  function pull(){ if(spinning) return; const l=document.getElementById('lever'); l.classList.add('pulled'); setTimeout(function(){l.classList.remove('pulled');},320); spin(); }

  document.getElementById('spinBtn').addEventListener('click', spin);
  document.getElementById('lever').addEventListener('click', pull);
  var _mb=document.getElementById('maxBet'); if(_mb) _mb.addEventListener('click', function(){ setBet(state.credits); });
  var _bi2=document.getElementById('betInput'); if(_bi2) _bi2.addEventListener('change', function(){ setBet(parseInt(this.value,10)); });
  document.getElementById('bankBtn').addEventListener('click', function(){ if(!state.bankUnlocked) return; renderBank(); document.getElementById('bank').classList.add('open'); });
  document.getElementById('bankClose').addEventListener('click', function(){ document.getElementById('bank').classList.remove('open'); });
  document.getElementById('bank').addEventListener('click', function(e){ if(e.target===this) this.classList.remove('open'); });
  document.getElementById('catModal').addEventListener('click', function(){ if(_catWaiting){ _catWaiting=false; var c=ac(); if(c&&c.state==='suspended') c.resume(); if(state.musicOn){ catMode=true; if(!musicPlaying) startMusic(); } var cont=document.getElementById('catOk'); if(cont) cont.textContent='▶ TOCÁ PARA SEGUIR'; if(!state.introSeen){ state.introSeen=true; saveState(); } typeCat(_introText); return; } if(_catTyping){ catSkip(); return; } closeCat(); });
  document.getElementById('shopBtn').addEventListener('click', function(){ renderShop(); document.getElementById('shop').classList.add('open'); });
  document.getElementById('shopClose').addEventListener('click', function(){ document.getElementById('shop').classList.remove('open'); });
  document.getElementById('shop').addEventListener('click', function(e){ if(e.target===this) this.classList.remove('open'); });
  document.getElementById('musicIcon').addEventListener('click', function(){ state.musicOn=!state.musicOn; if(state.musicOn){ musicStarted=true; startMusic(); } else stopMusic(); syncSoundIcons(); saveState(); });
  document.getElementById('sfxIcon').addEventListener('click', function(){ state.sfxOn=!state.sfxOn; if(state.sfxOn) ac(); syncSoundIcons(); saveState(); });
  document.getElementById('accIcon').addEventListener('click', function(){ setAuthMsg('',''); renderAccount(); document.getElementById('authModal').classList.add('open'); });
  document.getElementById('helpIcon').addEventListener('click', function(){ renderHelp(); document.getElementById('helpModal').classList.add('open'); });
  document.getElementById('helpClose').addEventListener('click', function(){ document.getElementById('helpModal').classList.remove('open'); });
  document.getElementById('helpModal').addEventListener('click', function(e){ if(e.target===this) this.classList.remove('open'); });
  document.getElementById('authClose').addEventListener('click', function(){ document.getElementById('authModal').classList.remove('open'); });
  document.getElementById('authModal').addEventListener('click', function(e){ if(e.target===this) this.classList.remove('open'); });
  document.getElementById('authSignIn').addEventListener('click', function(){ signIn(document.getElementById('authEmailInput').value.trim(), document.getElementById('authPassInput').value); });
  document.getElementById('authSignUp').addEventListener('click', function(){ signUp(document.getElementById('authEmailInput').value.trim(), document.getElementById('authPassInput').value); });
  document.getElementById('authSignOut').addEventListener('click', function(){ signOutUser(); });
  document.getElementById('goReset').addEventListener('click', function(){ fullReset(); document.getElementById('gameover').classList.remove('open'); setMsg('NUEVA PARTIDA',false); });
  var _sb=document.getElementById('superBtn'); if(_sb){ _sb.addEventListener('click', activateSuper); }
  setInterval(updateSuperUI, 300);
  REEL.forEach(function(r,i){ r.addEventListener('click', function(){ toggleHold(i); }); });
  document.getElementById('gambleDbl').addEventListener('click', doGamble);
  document.getElementById('gambleCash').addEventListener('click', hideGamble);
  window.addEventListener('pointerdown', firstGesture, {once:false});

  renderLights(); renderBetPresets(); renderPalette(); renderPaytable(); var _ver=document.getElementById('ver'); if(_ver) _ver.textContent='v'+VERSION;
  rebuildPool();
  loadState().then(function(){
    refreshAfterLoad();
    initFirebase();
  });
