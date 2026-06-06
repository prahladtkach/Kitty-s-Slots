// Kitty's Slots Deluxe · DESARROLLO (v1.1-dev) · para TESTEAR, no subir
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
  const PRESETS=[10,50,100,500];
  const LOAN=1000, START=3000, JP_BASE=10000, JP_BASE_MULT=90, KEY='kitty-slots-deluxe', INTEREST=0.03, LOAN_FEE=0.1, SKILL_UNLOCK=5000, CAJA_COST=2000;
  const CREDIT_LIMITS=[6000,12000,22000,40000,70000,110000,170000];
  const CREDIT_COSTS=[800,2000,5000,12000,25000,45000];
  const BANK_UNLOCK_CREDITS=6000;
  const CAP_TIERS=[1e6,1e7,1e8,1e9];
  const BANK_TIERS=[50000,250000,1000000,5000000,25000000];
  const MIN_BET=1;
  const VERSION="1.1-dev";
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
    win:{name:'Multiplicador',desc:'+5% a todo lo que ganás',max:50,cost:curve(800,1.18)},
    combo:{name:'Tope de combo',desc:'+0.1 al tope del multiplicador',max:50,cost:curve(1000,1.18)},
    cat:{name:'Suerte del gato',desc:'los premios salen más seguido',max:50,cost:curve(900,1.18)},
    bone:{name:'Menos espinas',desc:'aparecen menos espinas 🦴',max:25,cost:curve(600,1.16)}
  };

  let state={credits:START,jackpot:JP_BASE,bet:25,debt:0,palette:'synthwave',upg:{win:0,combo:0,cat:0,bone:0},abilities:{hold:false,gamble:false},holdLevel:0,superLevel:0,musicOn:true,sfxOn:true,skillsUnlocked:false,bankUnlocked:false,introSeen:false,bank:0,vault:false,creditLevel:0,interestLevel:0,intSpins:0,meta:{spirits:0,chest:0,credit:0,luck:0,cap:0,armor:0,jpboost:0,respin:0,banktope:0},eq:{avatar:'calico',frame:'violet',title:'novato',nick:'Jugador'},life:{asc:0,ecto:0,bestJP:0,bestWorth:0,runs:0},peak:START,runJackpots:0,helpSeen:[],limboUnlocked:true,runStart:Date.now(),runStartWorth:START,limboIntroV2:false};
  let spinning=false, combo=0, audioCtx=null, musicTimer=null, mi=0, musicStarted=false;
  let held=[false,false,false], holdCD=0, gambleAmount=0, gambling=false, cur=['🍋','🍒','💎'];
  const pool=[];
  const luckyPool=[];
  let luckyUntil=0, superReadyAt=0;

  function comboMult(){ if(combo<2) return 1; return Math.min(1+0.5*(combo-1), 3+0.5*state.upg.combo); }
  function comboCap(){ return 3 + 0.5*state.upg.combo; }
  function fmtMult(m){ return Number.isInteger(m)? (''+m) : m.toFixed(1); }
  function winMult(){ return 1 + 0.05*state.upg.win + 0.05*((state.meta&&state.meta.luck)||0); }
  function rebuildPool(){ pool.length=0; luckyPool.length=0; var slv=Math.max(1,state.superLevel||1); var k=1+(slv-1)*0.02; SYMS.forEach(function(s){ let w=WEIGHTS[s]; if(s==='🍒') w+=Math.round(state.upg.cat*0.5); else if(s==='🐟'||s==='💎'||s==='7️⃣') w+=Math.round(state.upg.cat*0.3); if(s==='🦴') w=Math.max(1,Math.round(w-state.upg.bone*0.32)); for(let i=0;i<w;i++) pool.push(s); let m=1; if(s==='🐱') m=10; else if(s==='🐟'||s==='💎') m=4; else if(s==='7️⃣') m=3; else if(s==='🍒'||s==='⭐') m=2.5; else if(s==='🔔') m=1.5; var em=1+(m-1)*k; if(s==='🐱'&&slv>50) em+=(slv-50)*2.5; var lw=Math.round(w*em); for(let i=0;i<lw;i++) luckyPool.push(s); }); }
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
    if(!state.meta||typeof state.meta!=='object') state.meta={spirits:0,chest:0,credit:0,luck:0};
    if(typeof state.meta.spirits!=='number') state.meta.spirits=0; if(typeof state.meta.chest!=='number') state.meta.chest=0; if(typeof state.meta.credit!=='number') state.meta.credit=0; if(typeof state.meta.luck!=='number') state.meta.luck=0; if(typeof state.meta.cap!=='number') state.meta.cap=0; if(typeof state.meta.armor!=='number') state.meta.armor=0; if(typeof state.meta.jpboost!=='number') state.meta.jpboost=0; if(typeof state.limboIntroV2!=='boolean') state.limboIntroV2=false; if(typeof state.meta.respin!=='number') state.meta.respin=0; if(typeof state.meta.banktope!=='number') state.meta.banktope=0; if(!state.eq||typeof state.eq!=='object') state.eq={avatar:'calico',frame:'violet',title:'novato',nick:'Jugador'}; if(typeof state.eq.nick!=='string') state.eq.nick='Jugador'; if(!state.life||typeof state.life!=='object') state.life={asc:0,ecto:0,bestJP:0,bestWorth:0,runs:0}; var _avok=['calico','tuxedo','blanco','negro','naranja','luckycat','mitimiti','alien','retro','sinfoto','highroller','raddkatt','diablitty','grisoscuro']; if(_avok.indexOf(state.eq.avatar)<0) state.eq.avatar='calico';
    if(typeof state.peak!=='number') state.peak=state.credits||START;
    if(typeof state.runJackpots!=='number') state.runJackpots=0;
    if(!Array.isArray(state.helpSeen)) state.helpSeen=[];
    if(typeof state.limboUnlocked!=='boolean') state.limboUnlocked=true;
    if(!state.runStart) state.runStart=Date.now();
    if(typeof state.runStartWorth!=='number') state.runStartWorth=START;
    if(state.bankUnlocked && state.helpSeen.indexOf('bank')<0) state.helpSeen.push('bank'); if(state.introSeen && state.helpSeen.indexOf('intro')<0) state.helpSeen.push('intro'); if(state.introSeen && state.helpSeen.indexOf('cuenta')<0) state.helpSeen.push('cuenta');
    if(!state.bankUnlocked && state.credits>=BANK_UNLOCK_CREDITS) state.bankUnlocked=true;
    if(!state.bankUnlocked && state.credits<MIN_BET) state.bankUnlocked=true;
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
    applyPalette(state.palette); pfUpdateIcon();
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
      _fbAuthMod.onAuthStateChanged(fbAuth, function(u){ fbUser=u||null; renderAccount(); if(fbUser){ cloudLoad(); advancePastLogin(); hideLoginToast(); } });
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
  async function signInGoogle(){
    if(!fbReady){ setAuthMsg('Firebase no está listo (revisá la config).','err'); return; }
    try{ const provider=new _fbAuthMod.GoogleAuthProvider(); await _fbAuthMod.signInWithPopup(fbAuth, provider); setAuthMsg('',''); }
    catch(e){ var code=(e&&e.code)||''; if(code==='auth/popup-closed-by-user'||code==='auth/cancelled-popup-request') return; setAuthMsg('No se pudo entrar con Google. '+(code||''),'err'); }
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
    try{ await _fbFsMod.setDoc(userDoc(), { state: JSON.stringify(state), updated: Date.now() }); }catch(e){} pushLeaderboard();
  }
  async function pushLeaderboard(){ if(!fbReady||!fbUser) return; try{ var L=state.life||{}, e=state.eq||{}; await _fbFsMod.setDoc(_fbFsMod.doc(fbDB,'leaderboard',fbUser.uid), { nick:(e.nick||'Jugador'), avatar:(e.avatar||'calico'), frame:(e.frame||'none'), title:(e.title||'none'), asc:(L.asc||0), ecto:(L.ecto||0), bestJP:(L.bestJP||0), bestWorth:(L.bestWorth||0), runs:(L.runs||0), score:lbScore(L), updated:Date.now() }); }catch(_e){} }
  async function fetchTop(metric,n){ var out=[]; try{ var q=_fbFsMod.query(_fbFsMod.collection(fbDB,'leaderboard'), _fbFsMod.orderBy(metric,'desc'), _fbFsMod.limit(n)); var snap=await _fbFsMod.getDocs(q); snap.forEach(function(d){ var x=d.data()||{}; x._uid=d.id; out.push(x); }); }catch(_e){ return null; } return out; }
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
  let musicPlaying=false, schedTimer=null, nextNoteT=0, step16=0, catMode=false, bankMode=false;
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
  const CHORDS_BANK=[ {root:'D2',triad:['D4','F4','A4']}, {root:'G2',triad:['G3','B3','D4']}, {root:'C2',triad:['C4','E4','G4']}, {root:'A2',triad:['A3','C4','E4']} ];
  const LEAD_BANK={};
  [ {s:0,n:'A4',d:4},{s:4,n:'D5',d:4},{s:8,n:'F5',d:4},{s:12,n:'D5',d:4},{s:16,n:'B4',d:4},{s:20,n:'D5',d:4},{s:24,n:'G4',d:6},{s:30,n:'B4',d:2},{s:32,n:'C5',d:4},{s:36,n:'E5',d:4},{s:40,n:'G4',d:6},{s:46,n:'E5',d:2},{s:48,n:'A4',d:4},{s:52,n:'C5',d:4},{s:56,n:'E5',d:6},{s:62,n:'C5',d:2} ].forEach(function(e){ LEAD_BANK[e.s]=e; });
  function scheduleStep(idx,t){
    const bar=Math.floor(idx/16), within=idx%16; if(bankMode){ const cb=CHORDS_BANK[bar]; if(within%4===0){ mnote(noteFreq(cb.root), t, STEP*3.8, 'triangle', 0.40); mnote(noteFreq(cb.triad[0]), t, STEP*3.4, 'sine', 0.10); mnote(noteFreq(cb.triad[2]), t, STEP*3.4, 'sine', 0.08); } if(within%2===0) mnote(noteFreq(cb.triad[ARP[within]]), t, STEP*0.9, 'sine', 0.06); var be=LEAD_BANK[idx]; if(be) mnote(noteFreq(be.n), t, STEP*be.d*0.9, 'triangle', 0.26); if(within===4||within===12) hat(t,0.05); return; } if(catMode){ const cc=CHORDS_CAT[bar]; if(within%4===0){ mnote(noteFreq(cc.root), t, STEP*3.6, 'triangle', 0.5); mnote(noteFreq(cc.triad[1]), t, STEP*3.0, 'sine', 0.07); } var ce=LEAD_CAT[idx]; if(ce) mnote(noteFreq(ce.n), t, STEP*ce.d*0.9, 'triangle', 0.30); return; } const ch=CHORDS[bar];
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
  function renderShop(){ const el=document.getElementById('upgList'); el.innerHTML=''; function header(t){ const h=document.createElement('div'); h.className='shop-section'; h.textContent=t; el.appendChild(h); } function row(name,desc,sub,btnTxt,disabled,onBuy,cls){ const r=document.createElement('div'); r.className='upg'+(cls?(' '+cls):''); const info=document.createElement('div'); info.className='info'; info.innerHTML='<div class="nm">'+name+'</div><div class="ds">'+desc+'</div><div class="lv">'+sub+'</div>'; const b=document.createElement('button'); b.textContent=btnTxt; b.disabled=disabled; if(onBuy) b.addEventListener('click',onBuy); r.appendChild(info); r.appendChild(b); el.appendChild(r); } header('🔧 MEJORAS'); Object.keys(UPG).forEach(function(k){ const u=UPG[k], lv=state.upg[k], maxed=lv>=u.max, cost=u.cost(lv); row(u.name,u.desc,'Nivel '+lv+'/'+u.max, maxed?'MÁX':'$'+fmt(cost), maxed||state.debt>0||state.credits<cost, function(){ buyUpg(k); }); }); header('⚡ HABILIDADES'); if(!state.skillsUnlocked){ const lock=document.createElement('div'); lock.className='shop-lock'; const falta=Math.max(0, SKILL_UNLOCK-state.credits); lock.innerHTML='🔒 Llegá a <b>$'+fmt(SKILL_UNLOCK)+'</b> para desbloquear las habilidades.'+(falta>0?'<br>Te faltan $'+fmt(falta)+'.':''); el.appendChild(lock); } else { var hl=state.holdLevel||0; var hmax=hl>=2; var hcost=hmax?0:HOLD_COSTS[hl]; var hdesc=hl===0?'Trabá 1 rodillo y volvé a girar el resto. Enfría 3 giros.':(hl===1?'MEJORA: trabá 2 rodillos a la vez':'Trabás hasta 2 rodillos a la vez'); var hsub=hl===0?'habilidad nueva — Nivel 1/2':('Nivel '+hl+'/2 — retenés '+hl); row('Retener (Hold)', hdesc, hsub, hmax?'MÁX':(hl===0?'$'+fmt(hcost):'Mejorar $'+fmt(hcost)), hmax||state.debt>0||state.credits<hcost, function(){ buyHold(); }, 'abil'); var sl=state.superLevel||0; var smax=sl>=SUPER_MAX; var scost=smax?0:superCost(sl); var sdesc=sl===0?'Activala para una racha de suerte: suben las chances de TODOS los premios y jackpots (no garantizado).':'Activala para una racha de suerte. Mejorar sube la duración (hasta 85s) y la frecuencia de jackpots.'; var ssub=sl===0?'habilidad nueva — dura 10s':('Nivel '+sl+'/'+SUPER_MAX+' — dura '+superDur(sl)+'s'); row('Supersuerte 🍀', sdesc, ssub, smax?'MÁX':(sl===0?'$'+fmt(scost):'Mejorar $'+fmt(scost)), smax||state.debt>0||state.credits<scost, function(){ buySuper(); }, 'abil'); Object.keys(ABIL).forEach(function(k){ const a=ABIL[k], owned=state.abilities[k]; row(a.name,a.desc, owned?'\u2713 desbloqueada':'habilidad nueva', owned?'OK':'$'+fmt(a.cost), owned||state.debt>0||state.credits<a.cost, function(){ buyAbility(k); }, 'abil'); }); } document.getElementById('shopNote').textContent = state.debt>0 ? 'Pagá tu deuda antes de comprar.' : 'Comprás con tus créditos.'; }
  function updateUI(){ var _cap=capValue(); var _w0=state.credits+state.bank-state.debt; if(_w0>_cap){ state.credits=Math.max(0, state.credits-(_w0-_cap)); if(!_capMsgShown){ _capMsgShown=true; if(!state.limboIntroV2){ setTimeout(function(){ explainLimboOnce(null, TXT_LIMBO_CAP); }, 1700); } else { setTimeout(function(){ setMsg('¡TOPE '+fmtCap(_cap)+'! Ascendé en el Limbo 🏔️','big'); },1400); } } } if(!state.skillsUnlocked && state.credits>=SKILL_UNLOCK) state.skillsUnlocked=true; var _nw=state.credits+state.bank-state.debt; if(_nw>(state.peak||0)) state.peak=_nw; if(_nw>((state.life&&state.life.bestWorth)||0)){ state.life.bestWorth=_nw; } if(!state.bankUnlocked && state.credits>=BANK_UNLOCK_CREDITS) unlockBank('rich'); document.getElementById('credits').textContent='$'+fmt(state.credits); document.getElementById('debt').textContent=fmt(state.debt); const ind=state.debt>0; document.getElementById('debtBox').classList.toggle('on', ind); document.getElementById('danger').classList.toggle('on', ind); document.getElementById('debtWarn').style.display=ind?'block':'none'; if(document.getElementById('bank').classList.contains('open')) renderBank(); document.getElementById('jpAmount').textContent='$'+fmt(Math.round(Math.max(state.jackpot, state.bet*jpMult())*winMult())); var _bb=document.getElementById('bankBtn'); if(_bb){ _bb.disabled=!state.bankUnlocked; _bb.textContent=state.bankUnlocked?'🏦 BANCO':'🔒 BANCO'; } }
  function setSpinUI(on){ document.getElementById('spinBtn').disabled=on; document.body.classList.toggle('spin-lock', on); updateSuperUI(); }
  function setMsg(t,cls){ const el=document.getElementById('winMsg'); el.textContent=t; el.className='win-msg'+(cls?(' '+cls):''); }
  function setCombo(){ const el=document.getElementById('combo'); const m=comboMult(); if(combo>=2){ const ONO=['','','¡ZAS!','¡PUM!','¡PAM!','¡BOOM!','¡KABOOM!']; const o=ONO[Math.min(combo,ONO.length-1)]; el.textContent=o+' x'+fmtMult(m); el.classList.add('on'); } else { el.classList.remove('on'); } }
  function applyPalette(name){ const p=PALETTES[name]||PALETTES.synthwave; for(const k in p){ document.documentElement.style.setProperty('--'+k,p[k]); } state.palette=name; renderPalette(); saveState(); }

  // ===== PERFIL / COSMÉTICOS =====
  var PF_AVATARS=[ {id:'calico', name:'CALICO', idx:0}, {id:'tuxedo', name:'TUXEDO', idx:1}, {id:'blanco', name:'BLANCO', idx:2}, {id:'negro', name:'NEGRO', idx:3}, {id:'naranja', name:'NARANJA', idx:4}, {id:'luckycat', name:'LUCKY CAT', idx:5, req:function(){return (state.life.bestJP||0)>=50000;}, lk:'Bote de $50k'}, {id:'mitimiti', name:'MITI MITI', idx:6}, {id:'alien', name:'ALIEN', idx:7, req:function(){return (state.life.asc||0)>=10;}, lk:'10 ascensiones'}, {id:'retro', name:'RETRO', idx:8}, {id:'sinfoto', name:'ANÓNIMO', idx:9}, {id:'highroller', name:'HIGH ROLLER', idx:10, req:function(){return (state.life.bestWorth||0)>=1000000;}, lk:'$1M patrimonio'}, {id:'raddkatt', name:'RADD KATT', idx:11}, {id:'diablitty', name:'DIABLITTY', idx:12, req:function(){return (state.life.asc||0)>=5;}, lk:'5 ascensiones'}, {id:'grisoscuro', name:'GRIS OSCURO', idx:13} ];
  var PF_FRAMES=[ {id:'none', name:'NINGUNO', cls:''}, {id:'violet', name:'VIOLETA', cls:'fr-violet'}, {id:'magenta', name:'MAGENTA', cls:'fr-magenta'}, {id:'gold', name:'DORADO', cls:'fr-gold', req:function(){return (state.life.asc||0)>=10;}, lk:'10 ascensiones'}, {id:'neon', name:'NEÓN', cls:'fr-neon', req:function(){return (state.life.bestJP||0)>=500000;}, lk:'Bote de $500k'} ];
  var PF_TITLES=[ {id:'none', name:'(Sin título)'}, {id:'novato', name:'Novato 🐣'}, {id:'apostador', name:'Apostador 🎲'}, {id:'rey', name:'Rey del Bote 🎰', req:function(){return (state.life.bestJP||0)>=1000000;}, lk:'Bote de $1M'}, {id:'alma', name:'Alma en Pena 👻', req:function(){return (state.life.asc||0)>=15;}, lk:'15 ascensiones'}, {id:'oro', name:'Manos de Oro ✨', req:function(){return (state.life.bestWorth||0)>=1000000000;}, lk:'$1.000M patrimonio'} ];
  var PF_TEMANOM={synthwave:'MORADO', gameboy:'GAMEBOY', nes:'AZUL', vapor:'VAPOR', lava:'LAVA'};
  var _pfTab='avatar';
  function pfUnlocked(it){ return it.req? it.req() : true; }
  function pfCatPos(id){ var idx=0; PF_AVATARS.forEach(function(x){ if(x.id===id) idx=x.idx; }); var c=idx%10, r=Math.floor(idx/10); return (c/9*100)+'% '+(r*100)+'%'; }
  function pfFrameCls(id){ var f=''; PF_FRAMES.forEach(function(x){if(x.id===id)f=x.cls;}); return f; }
  function pfTitleName(id){ var n=''; PF_TITLES.forEach(function(x){if(x.id===id && x.id!=='none')n=x.name;}); return n; }
  function pfUpdateIcon(){ var pic=document.getElementById('profIconImg'); if(pic && state.eq) pic.style.backgroundPosition=pfCatPos(state.eq.avatar); }
  function renderProfile(){ var eq=state.eq; document.getElementById('pfAvatarImg').style.backgroundPosition=pfCatPos(eq.avatar); document.getElementById('pfAvatar').className='pf-avatar '+pfFrameCls(eq.frame); document.getElementById('pfName').textContent=eq.nick||'Jugador'; var tn=pfTitleName(eq.title); document.getElementById('pfTitle').innerHTML = tn? '<span class="title-pill">'+tn+'</span>' : ''; var L=state.life||{}; document.getElementById('pfEcto').textContent=fmt(L.ecto||0); document.getElementById('pfAsc').textContent=(L.asc||0); document.getElementById('pfRuns').textContent=(L.runs||0); document.getElementById('pfWorth').textContent='$'+fmt(L.bestWorth||0); document.getElementById('pfJP').textContent='$'+fmt(L.bestJP||0); pfUpdateIcon(); }
  function renderCos(){ var eq=state.eq, h=''; if(_pfTab==='tema'){ PALNAMES.forEach(function(n){ var equipped=state.palette===n, p=PALETTES[n]; h+='<div class="pf-cos-card'+(equipped?' equipped':'')+'" data-id="'+n+'">'+(equipped?'<div class="pf-cos-badge">✓</div>':'')+'<div class="pf-cos-prev"><span class="pf-swatch" style="background:'+p.panel+'; box-shadow:0 0 0 3px '+p.violet+'"></span></div><div class="pf-cos-name">'+(PF_TEMANOM[n]||n)+'</div><div class="pf-cos-status">'+(equipped?'EQUIPADO':'tocá para equipar')+'</div></div>'; }); } else { var arr = _pfTab==='avatar'?PF_AVATARS : _pfTab==='frame'?PF_FRAMES : PF_TITLES; arr.forEach(function(it){ var equipped=eq[_pfTab]===it.id, unl=pfUnlocked(it) && !it.locked; var prev=''; if(_pfTab==='avatar'){ prev = '<span class="cat" style="background-position:'+pfCatPos(it.id)+'"></span>'; } else if(_pfTab==='frame'){ prev='<span class="mini '+(it.cls||'')+'"><span class="cat" style="background-position:'+pfCatPos(eq.avatar)+'"></span></span>'; } else { prev='<span class="title-pill">'+(it.id==='none'?'—':it.name)+'</span>'; } var lockTxt = it.locked? it.locked : (it.lk||'Bloqueado'); var status = unl ? (equipped?'EQUIPADO':'tocá para equipar') : ('🔒 '+lockTxt); var badge = equipped? '✓' : (unl?'':'🔒'); var nm = (_pfTab==='title' && it.id==='none')?'Sin título':it.name; h+='<div class="pf-cos-card'+(equipped?' equipped':'')+(unl?'':' locked')+'" data-id="'+it.id+'">'+(badge?'<div class="pf-cos-badge">'+badge+'</div>':'')+'<div class="pf-cos-prev">'+prev+'</div><div class="pf-cos-name">'+nm+'</div><div class="pf-cos-status">'+status+'</div></div>'; }); } document.getElementById('pfCosGrid').innerHTML=h; var cards=document.querySelectorAll('#pfCosGrid .pf-cos-card'); for(var i=0;i<cards.length;i++){ cards[i].addEventListener('click', function(){ var id=this.getAttribute('data-id'); if(_pfTab==='tema'){ applyPalette(id); renderCos(); return; } var arr2 = _pfTab==='avatar'?PF_AVATARS : _pfTab==='frame'?PF_FRAMES : PF_TITLES; var it=null; arr2.forEach(function(x){if(x.id===id)it=x;}); if(!it || it.locked || !pfUnlocked(it)) return; state.eq[_pfTab]=id; saveState(); renderCos(); renderProfile(); }); } }
  function openProfile(){ if(spinning) return; _pfTab='avatar'; var t=document.querySelectorAll('.pf-cos-tab'); for(var j=0;j<t.length;j++) t[j].classList.toggle('on', t[j].getAttribute('data-ct')==='avatar'); document.getElementById('profileView').style.display='block'; document.getElementById('cosmeticsView').style.display='none'; var _rv=document.getElementById('rankingsView'); if(_rv) _rv.style.display='none'; renderProfile(); document.getElementById('profile').classList.add('open'); }
  function lbScore(L){ L=L||{}; return Math.round((L.asc||0)*100 + (L.ecto||0) + Math.floor((L.bestJP||0)/5000) + Math.floor((L.bestWorth||0)/1000000)); }
  function _rkEsc(x){ return String(x==null?'':x).replace(/[&<>"']/g, function(c){ return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]; }); }
  function renderRankings(){ var box=document.getElementById('pfRkList'); if(!box) return; if(!fbReady||!fbUser){ box.innerHTML='<div class="pf-rk-msg">🔒 Iniciá sesión (arriba, en el ícono de cuenta) para ver y competir en el ranking global.</div>'; return; } box.innerHTML='<div class="pf-rk-msg">Cargando ranking…</div>'; fetchTop('score',30).then(function(rows){ if(rows===null){ box.innerHTML='<div class="pf-rk-msg">No se pudo cargar el ranking.<br>(¿Pegaste las reglas de Firebase para «leaderboard»?)</div>'; return; } if(!rows.length){ box.innerHTML='<div class="pf-rk-msg">Nadie en el ranking todavía.<br>¡Sé el primero! 🐱</div>'; return; } var h='', inTop=false, i; for(i=0;i<rows.length;i++){ var r=rows[i], me=(r._uid===fbUser.uid); if(me) inTop=true; h+='<div class="pf-rk-row'+(me?' me':'')+'"><span class="pf-rk-pos">#'+(i+1)+'</span><span class="cat" style="background-position:'+pfCatPos(r.avatar||'calico')+'"></span><span class="pf-rk-nick">'+_rkEsc(r.nick||'Jugador')+'</span><span class="pf-rk-val">'+fmt(r.score||0)+' pts</span></div>'; } if(!inTop){ var e=state.eq||{}; h+='<div class="pf-rk-foot"><div class="pf-rk-row me"><span class="pf-rk-pos">Vos</span><span class="cat" style="background-position:'+pfCatPos(e.avatar||'calico')+'"></span><span class="pf-rk-nick">'+_rkEsc(e.nick||'Jugador')+'</span><span class="pf-rk-val">'+fmt(lbScore(state.life))+' pts</span></div></div>'; } box.innerHTML=h; }); }


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
    state.credits-=state.bet; state.jackpot+=Math.max(2,Math.round(state.bet*0.2)); accrueInterest(); updateUI(); tickLoginToast();
    const t=[0,1,2].map(function(i){ return held[i]?cur[i]:randSym(); });
    const idx=[0,1,2].filter(function(i){ return !held[i]; });
    if(idx.length===0){ finish(t); return; }
    let done=0;
    idx.forEach(function(i,k){ spinReel(REEL[i],CV[i],t[i],800+k*450,function(){ done++; if(done===idx.length) finish(t); }); });
  }

  function finish(t, isRespin){
    spinning=false; setSpinUI(false);
    const wasHeld=isRespin?[false,false,false]:held.slice();
    cur=t.slice(); if(!isRespin){ if(held.indexOf(true)>=0){ holdCD=3; } else { holdCD=Math.max(0,holdCD-1); } held=[false,false,false]; renderHold(); }
    const a=t[0],b=t[1],c=t[2];
    if(a===b && b===c){
      if(a==='🐱'){ combo++; state.runJackpots=(state.runJackpots||0)+1; const w=Math.round(Math.max(state.jackpot, state.bet*jpMult())*winMult()); if(w>((state.life&&state.life.bestJP)||0)){ state.life.bestJP=w; } state.jackpot=JP_BASE; const net=applyWin(w); updateUI(); setCombo(); setMsg('¡JACKPOT! +'+fmt(w),'big'); confetti(75); sJackpot(); jackpotRain(); const jp=document.getElementById('jpAmount'); jp.classList.add('flash'); setTimeout(function(){jp.classList.remove('flash');},2600); offerGamble(net); saveState(); return; }
      if(a==='🦴'){ if(!isRespin && respinProcs()){ respin(); return; } combo=0; var _lost=state.credits; state.credits=Math.round(state.credits*(1-boneLoseFrac())); _lost-=state.credits; updateUI(); setCombo(); setMsg('¡ESPINAS! -'+fmt(_lost)+'$ 💀','big bad'); const cab=document.getElementById('cabinet'); cab.classList.add('bad'); setTimeout(function(){cab.classList.remove('bad');},900); sBad(); saveState(); checkBroke(); return; }
      combo++; const mult=comboMult(); const w=Math.round(state.bet*PAY3[a]*mult*winMult()); const net=applyWin(w); updateUI(); setCombo(); const big=PAY3[a]>=25||mult>=2.5; setMsg('TRIPLE'+(mult>1?' x'+fmtMult(mult):'')+' +'+fmt(w), big?'big':''); celebrate(big); offerGamble(net); saveState(); return;
    }
    const bones=t.filter(function(s){return s==='🦴';}).length;
    if(bones>0){ if(!isRespin && respinProcs()){ respin(); return; } combo=0; const pen=Math.max(1,Math.round(state.bet*boneLooseFactor()*bones)); state.credits=Math.max(0,state.credits-pen); updateUI(); setCombo(); setMsg('-'+fmt(pen)+'$','bad'); const cab=document.getElementById('cabinet'); cab.classList.add('bad'); setTimeout(function(){cab.classList.remove('bad');},600); sBad(); saveState(); checkBroke(); return; }
    const ch=t.filter(function(s){return s==='🍒';}).length;
    const chFresh=[0,1,2].filter(function(i){ return t[i]==='🍒' && !wasHeld[i]; }).length;
    if(ch>=1 && chFresh>=1){ combo++; const base=(ch===2?4:2)*state.bet; const mult=comboMult(); const w=Math.round(base*mult*winMult()); const net=applyWin(w); updateUI(); setCombo(); setMsg((ch===2?'2 CEREZAS':'1 CEREZA')+(mult>1?' x'+fmtMult(mult):'')+' +'+fmt(w), mult>=2.5?'big':''); celebrate(mult>=2.5); offerGamble(net); saveState(); return; }
    combo=0; setCombo(); setMsg('SUERTE LA PROXIMA',false); saveState(); checkBroke();
  }

  function setBet(v){ v=Math.floor(v); if(isNaN(v)||v<MIN_BET)v=MIN_BET; if(state.credits>0 && v>state.credits) v=state.credits; state.bet=v; document.getElementById('betInput').value=v; renderBetPresets(); updateUI(); saveState(); }
  function loanAvailable(){ return state.debt + LOAN <= creditLimit(); }
  function canLoan(){ return loanAvailable() && state.credits < state.bet; }
  function takeLoan(){ if(spinning) return; if(!loanAvailable()){ setMsg('LÍMITE DE PRÉSTAMOS ($'+fmt(creditLimit())+')',false); return; } if(state.credits>=state.bet){ setMsg('Solo podés pedir préstamo si te quedás corto',false); return; } state.credits+=LOAN; state.debt+=Math.round(LOAN*(1+LOAN_FEE)); updateUI(); renderBank(); setMsg('PRÉSTAMO: +$'+fmt(LOAN)+' (debés $'+fmt(Math.round(LOAN*(1+LOAN_FEE)))+')',false); saveState(); }
  function buyVault(){ if(state.vault||state.debt>0||state.credits<CAJA_COST) return; state.credits-=CAJA_COST; state.vault=true; updateUI(); renderBank(); saveState(); }
  function deposit(a){ if(!state.vault) return; a=Math.floor(a); if(!a||a<1) return; a=Math.min(a, state.credits, Math.max(0, bankCap()-state.bank)); if(a<=0) return; state.credits-=a; state.bank+=a; updateUI(); renderBank(); saveState(); }
  function withdraw(a){ if(!state.vault) return; a=Math.floor(a); if(!a||a<1) return; a=Math.min(a,state.bank); if(a<=0) return; state.bank-=a; state.credits+=a; updateUI(); renderBank(); saveState(); }
  function payDebt(fromBank){ if(state.debt<=0) return; const src=fromBank?state.bank:state.credits; const pp=Math.min(state.debt,src); if(pp<=0) return; state.debt-=pp; if(fromBank) state.bank-=pp; else state.credits-=pp; updateUI(); renderBank(); saveState(); }
  function renderBank(){
    const el=document.getElementById('bankBody'); if(!el) return;
    const v=state.vault; let h='';
    h+='<div class="shop-section">CAJA FUERTE</div>';
    if(!v){
      h+='<div class="bank-note">Guardá plata a salvo: lo que está en el banco <b>no se pierde</b> con las espinas 🦴.</div>';
      h+='<div class="bank-row"><span>Comprar Caja fuerte</span><button id="bkVault" class="bank-btn"'+((state.credits<CAJA_COST||state.debt>0)?' disabled':'')+'>$'+fmt(CAJA_COST)+'</button></div>';
      if(state.debt>0) h+='<div class="bank-note">Pagá tu deuda antes de comprar la caja fuerte.</div>';
    } else {
      var _vpct=bankCap()>0?Math.min(100,Math.round(state.bank/bankCap()*100)):0; h+='<div class="vault"><div class="vault-body"><div class="vault-fill" style="height:'+_vpct+'%"></div><div class="vault-shine"></div><div class="vault-dial"><span></span></div><i class="vb vb1"></i><i class="vb vb2"></i><i class="vb vb3"></i><i class="vb vb4"></i></div><div class="vault-label">💰 <b>$'+fmt(state.bank)+'</b> / $'+fmt(bankCap())+' · '+_vpct+'%</div></div>'; h+='<div class="bank-io"><input id="bkAmt" class="bank-input" type="number" min="1" placeholder="monto"><button id="bkDep" class="bank-btn">Depositar</button><button id="bkWit" class="bank-btn">Retirar</button></div>';
      h+='<div class="bank-quick"><button id="bkDepAll" class="bank-mini">Depositar todo</button><button id="bkWitAll" class="bank-mini">Retirar todo</button></div>';
      h+='<div class="bank-note">'+(state.bank>=bankCap()?'¡Caja fuerte llena! ':'')+'Subí el tope con 🔒 Tope del banco (en el Limbo).</div>';
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
  function fullReset(){ state.credits=START; state.jackpot=JP_BASE; state.bet=25; state.debt=0; state.bank=0; state.vault=false; state.creditLevel=0; state.interestLevel=0; state.intSpins=0; state.upg={win:0,combo:0,cat:0,bone:0}; state.abilities={hold:false,gamble:false}; state.holdLevel=0; state.superLevel=0; state.bankUnlocked=false; state.introSeen=false; state.meta={spirits:0,chest:0,credit:0,luck:0,cap:0,armor:0,jpboost:0,respin:0,banktope:0}; state.life={asc:0,ecto:0,bestJP:0,bestWorth:0,runs:0}; state.peak=START; state.runStartWorth=START; state.runJackpots=0; state.helpSeen=[]; state.runStart=Date.now(); _capMsgShown=false; luckyUntil=0; superReadyAt=0; document.body.classList.remove('supersuerte'); state.skillsUnlocked=false; combo=0; rebuildPool(); renderBetPresets(); document.getElementById('betInput').value=25; updateUI(); setCombo(); renderPaytable(); renderShop(); renderHold(); updateSuperUI(); saveState(); }
  const TXT_INTRO="¡MIAU! SOY KITTY. 🐱 BIENVENIDO A KITTY'S SLOTS.||TIRÁ LA PALANCA O TOCÁ GIRAR PARA JUGAR. ANTES, AJUSTÁ TU APUESTA.||PARA GANAR, FIJATE EN LA LISTA DE COMBINACIONES Y ARMÁ LAS QUE MÁS PAGAN. ¡3 GATOS = JACKPOT! 🐱||Y OJO CON LOS HUESOS DE PESCADO 🦴 — SUS ESPINAS PINCHAN TU BOLSILLO.||EN LA TIENDA ★ MEJORÁS TUS CHANCES. ¡SUERTE! 🐾";
  const TXT_BANK_BROKE="¡MIAU! 🙀 ¡NO TE ALCANZA PARA APOSTAR!||TRANQUI, TE ABRÍ EL BANCO. PEDÍ UN PRÉSTAMO Y SEGUÍ JUGANDO.||VAS A DEBER UN POCO MÁS Y LA DEUDA CRECE CADA GIRO. PAGALA CUANDO GANES.||¡LA PRÓXIMA LA SACÁS! 🐾";
  const TXT_BANK_RICH="¡MIAU! 😺 ¡MIRÁ CÓMO CRECÉS!||TE ABRÍ EL BANCO 🏦. GUARDÁ PLATA EN LA CAJA FUERTE Y QUEDA A SALVO DE LOS HUESITOS 🦴.||Y SI ALGUNA VEZ TE QUEDÁS CORTO, PEDÍ UN PRÉSTAMO PARA SEGUIR.||¡SEGUÍ ASÍ! 🐾";
  const TXT_BANK="EL BANCO 🏦 TIENE DOS COSAS:||💰 CAJA FUERTE: GUARDÁ PLATA A SALVO DE LOS HUESITOS 🦴.||🪙 PRÉSTAMO: SI TE QUEDÁS CORTO, PEDÍS $1.000 (DEBÉS UN POCO MÁS Y LA DEUDA CRECE CADA GIRO).||PAGALA CUANDO GANES.";
  const TXT_LOGIN="¡MIAU! 🐱 ANTES DE EMPEZAR, UN CONSEJO:||CREÁ TU CUENTA O ENTRÁ CON EL BOTÓN DE ACÁ ABAJO 👇||ASÍ GUARDÁS TU PROGRESO EN LA NUBE — SI NO, TU PARTIDA QUEDA SOLO EN ESTE APARATO.||¡Y PRONTO VA A HABER UN RANKING DE LOS QUE MÁS PLATA JUNTAN! 👑 ¿VAS A ESTAR EN EL TOP?";
  const TXT_CUENTA="GUARDÁ TU PROGRESO EN LA NUBE ☁️||TOCÁ EL BOTÓN 👤 DE ARRIBA A LA DERECHA PARA CREAR TU CUENTA O ENTRAR (CON GOOGLE O EMAIL).||SI NO TENÉS CUENTA, TU PARTIDA QUEDA SOLO EN ESTE APARATO.||¡Y PRONTO VA A HABER UN RANKING DE LOS QUE MÁS PLATA JUNTAN! 👑";
  var TXT_LIMBO_TUT="¡MIAU! 🐱 Esto es EL LIMBO 👻||Tu PICO de plata de la partida se convierte en Ectofichas. Con ellas comprás mejoras PERMANENTES para cada partida nueva.||🏔️ Subí el techo de plata para romper topes más grandes. 🛡️ Comprá protección anti-espinas para que las espinas peguen menos.||Cuando quieras, ASCENDÉ: cobrás todo y arrancás de nuevo, más fuerte. 😼";
  var TXT_LIMBO_CAP="¡MIAU! 🐱 ¡LLEGASTE AL TOPE! 🏔️👑||Tocaste el techo de plata de esta partida, ¡crack! Más arriba no se puede... salvo en el LIMBO.||Andá al LIMBO 👻 (botón al lado de RESET): tu PICO de plata se vuelve Ectofichas, y con ellas comprás mejoras PERMANENTES para cada partida.||🏔️ Subí el techo para topes más grandes. 🛡️ Protección anti-espinas = los huesitos pegan menos.||ASCENDÉ cuando quieras: cobrás y arrancás de nuevo, más fuerte. 😼";
  const HELP_TOPICS=[ {id:'intro',label:'🎮 Cómo jugar',text:TXT_INTRO}, {id:'cuenta',label:'👤 Cuenta y progreso',text:TXT_CUENTA}, {id:'bank',label:'🏦 Banco y préstamos',text:TXT_BANK}, {id:'limbo',label:'👻 El Limbo',text:TXT_LIMBO_TUT} ];
  function unlockHelp(id){ if(!state.helpSeen) state.helpSeen=[]; if(state.helpSeen.indexOf(id)<0){ state.helpSeen.push(id); saveState(); } }
  function renderHelp(){ var el=document.getElementById('helpBody'); if(!el) return; var seen=state.helpSeen||[]; var h=''; if(!seen.length){ h+='<div class="bank-note">Todavía no desbloqueaste explicaciones. ¡Jugá y Kitty te irá enseñando! 🐱</div>'; } else { h+='<div class="bank-note">¿Qué querés que te explique Kitty? 🐱</div>'; HELP_TOPICS.forEach(function(t){ if(seen.indexOf(t.id)>=0) h+='<button class="help-item" data-id="'+t.id+'">'+t.label+'</button>'; }); } el.innerHTML=h; var bs=el.querySelectorAll('.help-item'); for(var i=0;i<bs.length;i++){ bs[i].addEventListener('click', function(){ var id=this.getAttribute('data-id'); document.getElementById('helpModal').classList.remove('open'); var t=null,j; for(j=0;j<HELP_TOPICS.length;j++){ if(HELP_TOPICS[j].id===id) t=HELP_TOPICS[j]; } if(t) showCat(t.text); }); } }
  var _catTimer=null, _catFull='', _catTyping=false, _catWaiting=false, _introText='', _introStep=-1;
  function setCatLogin(v){ var b=document.getElementById('catLogin'); if(b) b.style.display=v?'block':'none'; }
  var _toastSpins=0, _toastTimer=null, _toastShownCount=0;
  function tickLoginToast(){ if(fbUser) return; _toastSpins++; if(_toastSpins>=25){ _toastSpins=0; showLoginToast(); } }
  function showLoginToast(){ if(fbUser||_toastShownCount>=4) return; if(document.querySelector('.overlay.open')) return; var t=document.getElementById('loginToast'); if(!t) return; t.classList.add('show'); _toastShownCount++; clearTimeout(_toastTimer); _toastTimer=setTimeout(hideLoginToast,9000); }
  function hideLoginToast(){ var t=document.getElementById('loginToast'); if(t) t.classList.remove('show'); clearTimeout(_toastTimer); }
  function typeCat(text){ _catFull=text; _catTyping=true; var el=document.getElementById('catSpeech'), cont=document.getElementById('catOk'); if(cont) cont.style.visibility='hidden'; if(el) el.textContent=''; var i=0; clearInterval(_catTimer); _catTimer=setInterval(function(){ if(i>=_catFull.length){ clearInterval(_catTimer); _catTyping=false; if(cont) cont.style.visibility='visible'; return; } var ch=_catFull.charAt(i); if(el){ el.textContent += (ch==='|') ? String.fromCharCode(10) : ch; } if(ch!==' ' && ch!=='|') sfx(715+Math.random()*90,0.02,0.035,'square'); i++; }, 42); }
  function catSkip(){ if(!_catTyping) return; clearInterval(_catTimer); _catTyping=false; var el=document.getElementById('catSpeech'), cont=document.getElementById('catOk'); if(el) el.textContent=_catFull.split('|').join(String.fromCharCode(10)); if(cont) cont.style.visibility='visible'; }
  function closeCat(){ var m=document.getElementById('catModal'); if(m) m.classList.remove('open'); catMode=false; setCatLogin(false); if(_afterCat){ var f=_afterCat; _afterCat=null; setTimeout(f,120); } }
  function showCat(text){ var m=document.getElementById('catModal'); if(!m) return; _introStep=-1; _catWaiting=false; setCatLogin(false); var cont=document.getElementById('catOk'); if(cont) cont.textContent='▶ TOCÁ PARA SEGUIR'; m.classList.add('open'); if(state.musicOn){ catMode=true; if(!musicPlaying) startMusic(); } typeCat(text); }
  function advancePastLogin(){ if(_introStep!==0) return; setCatLogin(false); _introStep=1; _introText=TXT_INTRO; if(_catWaiting) return; var cont=document.getElementById('catOk'); if(cont) cont.textContent='▶ ¡A JUGAR!'; typeCat(TXT_INTRO); }
  function showIntro(){ var m=document.getElementById('catModal'); if(!m) return; unlockHelp('intro'); unlockHelp('cuenta'); if(fbUser){ _introStep=1; _introText=TXT_INTRO; } else { _introStep=0; _introText=TXT_LOGIN; } setCatLogin(false); _catWaiting=true; var el=document.getElementById('catSpeech'); if(el) el.textContent=''; var cont=document.getElementById('catOk'); if(cont){ cont.textContent='▶ TOCÁ PARA EMPEZAR'; cont.style.visibility='visible'; } m.classList.add('open'); }
  function unlockBank(reason){ if(state.bankUnlocked) return; state.bankUnlocked=true; var b=document.getElementById('bankBtn'); if(b){ b.disabled=false; b.textContent='🏦 BANCO'; } unlockHelp('bank'); setMsg('🏦 ¡BANCO DESBLOQUEADO!',false); showCat(reason==='rich'?TXT_BANK_RICH:TXT_BANK_BROKE); saveState(); }
  var META={ armor:{name:'🛡️ Protección anti-espinas', desc:'Las espinas pegan menos fuerte', max:5, cost:function(l){return Math.round(20*Math.pow(1.9,l));}}, respin:{name:'🔄 Re-giro', desc:'Si salen espinas, probabilidad de volver a girar gratis (+8% por nivel)', max:5, cost:function(l){return Math.round(35+l*22);}, req:{k:'armor',n:2}}, chest:{name:'🪙 Cofre inicial', desc:'Empezás con +$500 por nivel', max:10, cost:function(l){return Math.round(15+l*12);}}, luck:{name:'✨ Patita de la suerte', desc:'+5% a TODO lo que ganás, para siempre', max:8, cost:function(l){return Math.round(20+l*16);}, req:{k:'armor',n:1}}, cap:{name:'🏔️ Techo de plata', desc:'Sube el tope de plata de la partida (x10 por nivel)', max:CAP_TIERS.length-1, cost:function(l){return Math.round(40*Math.pow(1.9,l));}, req:{k:'luck',n:1}}, banktope:{name:'🔒 Tope del banco', desc:'Subí cuánta plata podés guardar a salvo en la caja fuerte', max:BANK_TIERS.length-1, cost:function(l){return Math.round(30+l*30);}}, jpboost:{name:'🎰 Bote mayor', desc:'Sube el multiplicador del bote (+20 por nivel)', max:8, cost:function(l){return Math.round(30+l*24);}, req:{k:'luck',n:1}}, credit:{name:'🏦 Crédito inicial', desc:'Arrancás con más préstamos disponibles', max:5, cost:function(l){return Math.round(25+l*20);}, req:{k:'cap',n:1}} };
  var _lastEarned=0, _limboMode='death', _capMsgShown=false, _limboTab='resumen';
  function jpMult(){ return JP_BASE_MULT + ((state.meta&&state.meta.jpboost)||0)*20; }
  function capValue(){ return CAP_TIERS[Math.min(state.meta.cap||0, CAP_TIERS.length-1)]; }
  function bankCap(){ return BANK_TIERS[Math.min(state.meta.banktope||0, BANK_TIERS.length-1)]; }
  function fmtCap(n){ if(n>=1e6) return '$'+(n/1e6).toLocaleString('es-AR')+'M'; return '$'+fmt(n); }
  function boneLooseFactor(){ return Math.max(0.05, 1-(state.meta.armor||0)*0.19); }
  function boneLoseFrac(){ return Math.max(0.25, 1-(state.meta.armor||0)*0.15); }
  function respinChance(){ return Math.min(0.5, (state.meta.respin||0)*0.08); }
  function respinProcs(){ return (state.meta.respin||0)>0 && Math.random()<respinChance(); }
  function respin(){ spinning=true; setSpinUI(true); setMsg('🔄 ¡RE-GIRO!',false); held=[false,false,false]; var t=[0,1,2].map(function(){ return randSym(); }); var done=0; [0,1,2].forEach(function(i,k){ spinReel(REEL[i],CV[i],t[i],600+k*350,function(){ done++; if(done===3) finish(t,true); }); }); }
  function fmtDur(ms){ var s=Math.max(0,Math.floor(ms/1000)); var m=Math.floor(s/60); s=s%60; return (m>0?(m+'m '):'')+(s<10&&m>0?'0':'')+s+'s'; }
  function limboEarn(){ return Math.max(0, Math.floor(((state.peak||0)-(state.runStartWorth||START))/3000))+(state.runJackpots||0)*5; }
  function limboMusic(){ if(state.musicOn){ catMode=true; if(!musicPlaying) startMusic(); } }
  function bankMusic(){ bankMode=true; catMode=false; if(state.musicOn && !musicPlaying) startMusic(); }
  function updateLimboBtn(){ var b=document.getElementById('limboBtn'); if(!b) return; if(state.limboUnlocked){ b.disabled=false; b.textContent='👻 LIMBO'; } else { b.disabled=true; b.textContent='🔒 LIMBO'; } }
  function openLimboHub(){ if(spinning) return; if(!explainLimboOnce(function(){ openLimboPanel(false); })){ openLimboPanel(false); } }
  function ascend(){ var earned=limboEarn(); if(earned<=0) return; if(!confirm('¿ASCENDER? Perdés esta partida pero te llevás +'+earned+' 👻 y reiniciás con tus mejoras permanentes.')) return; state.meta.spirits+=earned; state.life.asc=(state.life.asc||0)+1; state.life.ecto=(state.life.ecto||0)+earned; _lastEarned=earned; _limboMode='death'; renderLimbo(); saveState(); }
  function closeLimbo(){ document.getElementById('limbo').classList.remove('open'); catMode=false; }
  var _afterCat=null;
  var CAT_FRASES=["La muzza de la pizzería es infinita... como mis ganas de Ectofichas. 🍕","Si la suerte se te pincha, en el taller la inflamos de nuevo. 🚲","En las cuevas más oscuras brillan las mejores fichas... no mires atrás. ⛏️","Yo también arranqué fundido. Hoy tengo locales por todos lados. 😎","Un jackpot sabe mejor que una porción recién salida del horno. 🍕","Pedaleá fuerte y el tope te queda cerca. 🚲","Algo se mueve allá abajo en la mina... vos seguí juntando. 👻","Las Ectofichas no se enfrían ni se pinchan. Por eso me encantan. ✨"];
  var _cornerTimer=null;
  function cornerCatSpeak(){ var b=document.getElementById('cornerCatBubble'); if(!b) return; b.textContent=CAT_FRASES[Math.floor(Math.random()*CAT_FRASES.length)]; b.classList.add('show'); clearTimeout(_cornerTimer); _cornerTimer=setTimeout(function(){ b.classList.remove('show'); }, 5000); }
  function openLimboPanel(deathMode){ _limboTab='resumen'; _limboMode=deathMode?'death':'hub'; renderLimbo(); document.getElementById('limbo').classList.add('open'); limboMusic(); }
  function explainLimboOnce(thenOpen, text){ if(state.limboIntroV2) return false; state.limboIntroV2=true; unlockHelp('limbo'); _afterCat=thenOpen||null; saveState(); showCat(text||TXT_LIMBO_TUT); return true; }
  function gameOver(){ if(document.getElementById('limbo').classList.contains('open')) return; state.limboUnlocked=true; var earned=limboEarn(); state.meta.spirits+=earned; state.life.asc=(state.life.asc||0)+1; state.life.ecto=(state.life.ecto||0)+earned; _lastEarned=earned; _limboMode='death'; updateLimboBtn(); if(!explainLimboOnce(function(){ openLimboPanel(true); })){ openLimboPanel(true); } saveState(); }
  function renderLimbo(){ var el=document.getElementById('limboBody'); if(!el) return; var h='', dur=fmtDur(Date.now()-(state.runStart||Date.now())), _pe=limboEarn(); h+='<div class="limbo-spirits">👻 Ectofichas: <b>'+state.meta.spirits+'</b></div>'; h+='<div class="limbo-tabs"><button class="lt-tab'+(_limboTab==="mejoras"?"":" on")+'" data-tab="resumen">📊 Resumen</button><button class="lt-tab'+(_limboTab==="mejoras"?" on":"")+'" data-tab="mejoras">🛒 Mejoras</button></div>'; if(_limboTab!=='mejoras'){ if(_limboMode==='death'){ h+='<div class="limbo-earn">¡Partida terminada! Te llevás <b>+'+_lastEarned+' 👻</b></div>'; } h+='<div class="limbo-stats"><span>⏱️ <b>'+dur+'</b></span><span>💰 <b>$'+fmt(state.peak||0)+'</b></span><span>🎰 <b>'+(state.runJackpots||0)+'</b></span><span>🏔️ <b>'+fmtCap(capValue())+'</b></span></div>'; } else { h+='<div class="shop-section">MEJORAS PERMANENTES</div>'; Object.keys(META).forEach(function(k){ var u=META[k], lv=state.meta[k]||0, maxed=lv>=u.max, cost=u.cost(lv); if(!metaUnlocked(k)){ var rk=META[u.req.k]; h+='<div class="bank-row locked"><div class="info">🔒 '+u.name+'<span class="ds-sm">Subí '+rk.name+' a nivel '+u.req.n+' para desbloquear</span></div><button class="bank-btn" disabled>🔒</button></div>'; return; } var can=!maxed && state.meta.spirits>=cost; h+='<div class="bank-row"><div class="info">'+u.name+'<span class="ds-sm">'+u.desc+' · Nivel '+lv+'/'+u.max+'</span></div><button class="bank-btn lm-buy" data-k="'+k+'"'+((maxed||!can)?' disabled':'')+'>'+(maxed?'MÁX':(cost+' 👻'))+'</button></div>'; }); } if(_limboMode==='hub'){ h+='<button class="limbo-go" id="limboAscend"'+(_pe<=0?' disabled':'')+'>'+(_pe<=0?'✨ ASCENDER · todavía sin fichas':('✨ ASCENDER · cobrar +'+_pe+' 👻'))+'</button><button class="limbo-seguir" id="limboSeguir">▶ SEGUIR JUGANDO</button>'; } else { h+='<button class="limbo-go" id="limboGo">🔄 NUEVA PARTIDA</button>'; } el.innerHTML=h; var tb=el.querySelectorAll('.lt-tab'); for(var j=0;j<tb.length;j++){ tb[j].addEventListener('click', function(){ _limboTab=this.getAttribute('data-tab'); renderLimbo(); }); } var bs=el.querySelectorAll('.lm-buy'); for(var i=0;i<bs.length;i++){ bs[i].addEventListener('click', function(){ buyMeta(this.getAttribute('data-k')); }); } if(_limboMode==='hub'){ var a=document.getElementById('limboAscend'); if(a) a.addEventListener('click', ascend); var sg=document.getElementById('limboSeguir'); if(sg) sg.addEventListener('click', closeLimbo); } else { var g=document.getElementById('limboGo'); if(g) g.addEventListener('click', startRun); } }
  function metaUnlocked(k){ var r=META[k].req; return !r || (state.meta[r.k]||0) >= r.n; }
  function buyMeta(k){ if(!metaUnlocked(k)) return; var u=META[k], lv=state.meta[k]||0; if(lv>=u.max) return; var cost=u.cost(lv); if(state.meta.spirits<cost) return; state.meta.spirits-=cost; state.meta[k]=lv+1; renderLimbo(); saveState(); }
  function startRun(){ state.life.runs=(state.life.runs||0)+1; state.credits=START+(state.meta.chest||0)*500; state.jackpot=JP_BASE; state.bet=25; state.debt=0; state.bank=0; state.vault=false; state.creditLevel=Math.min((state.meta.credit||0), CREDIT_LIMITS.length-1); state.interestLevel=0; state.intSpins=0; state.upg={win:0,combo:0,cat:0,bone:0}; state.abilities={hold:false,gamble:false}; state.holdLevel=0; state.superLevel=0; state.skillsUnlocked=false; state.bankUnlocked=false; state.runStartWorth=state.credits; state.peak=state.credits; state.runJackpots=0; combo=0; luckyUntil=0; superReadyAt=0; document.body.classList.remove('supersuerte'); rebuildPool(); renderBetPresets(); document.getElementById('betInput').value=25; updateUI(); setCombo(); renderPaytable(); renderShop(); renderHold(); updateSuperUI(); document.getElementById('limbo').classList.remove('open'); catMode=false; state.runStart=Date.now(); _capMsgShown=false; setMsg('NUEVA PARTIDA',false); saveState(); }
  function checkBroke(){ if(state.credits<MIN_BET && !state.bankUnlocked) unlockBank(); if(state.credits<MIN_BET && state.bank<1 && !loanAvailable()){ gameOver(); } }
  function buyUpg(k){ const u=UPG[k], lv=state.upg[k]; if(lv>=u.max||state.debt>0) return; const cost=u.cost(lv); if(state.credits<cost) return; state.credits-=cost; state.upg[k]++; rebuildPool(); updateUI(); renderShop(); renderPaytable(); saveState(); }
  const HOLD_COSTS=[4000,12000];
  const ABIL={ gamble:{name:'Doble o nada',desc:'Tras ganar, girás de nuevo: si sale premio, multiplica tus ganancias.',cost:6000} };
  function buyAbility(k){ const a=ABIL[k]; if(!state.skillsUnlocked||state.abilities[k]||state.debt>0||state.credits<a.cost) return; state.credits-=a.cost; state.abilities[k]=true; updateUI(); renderShop(); renderHold(); saveState(); }
  function buyHold(){ if(!state.skillsUnlocked||state.debt>0||state.holdLevel>=2) return; const cost=HOLD_COSTS[state.holdLevel]; if(state.credits<cost) return; state.credits-=cost; state.holdLevel++; state.abilities.hold=true; updateUI(); renderShop(); renderHold(); saveState(); }
  const SUPER_CD=120;
  const SUPER_MAX=150;
  function superDur(lv){ return Math.min(85, 10+Math.round(lv*0.5)); }
  function superCost(lv){ return Math.round((2000 + lv*lv*60)/100)*100; }
  function buySuper(){ if(!state.skillsUnlocked||state.debt>0||state.superLevel>=SUPER_MAX) return; var cost=superCost(state.superLevel); if(state.credits<cost) return; state.credits-=cost; state.superLevel++; rebuildPool(); updateUI(); renderShop(); updateSuperUI(); saveState(); }
  function activateSuper(){ if(state.superLevel<1) return; var now=Date.now(); if(now<luckyUntil||now<superReadyAt) return; var dur=superDur(state.superLevel); luckyUntil=now+dur*1000; superReadyAt=luckyUntil+SUPER_CD*1000; document.body.classList.add('supersuerte'); setMsg('🍀 ¡SUPERSUERTE! '+dur+'s',false); sSuper(); updateSuperUI(); }
  function updateSuperUI(){ var row=document.getElementById('superRow'), btn=document.getElementById('superBtn'); if(row) row.style.display=state.superLevel>0?'flex':'none'; if(!btn) return; if(state.superLevel<1){ document.body.classList.remove('supersuerte'); return; } var now=Date.now(); if(now<luckyUntil){ document.body.classList.add('supersuerte'); btn.disabled=true; btn.textContent='🍀 ACTIVA '+Math.ceil((luckyUntil-now)/1000)+'s'; } else if(spinning){ document.body.classList.remove('supersuerte'); btn.disabled=true; btn.textContent='🍀 SUPERSUERTE'; } else { document.body.classList.remove('supersuerte'); if(now<superReadyAt){ btn.disabled=true; btn.textContent='⏳ '+Math.ceil((superReadyAt-now)/1000)+'s'; } else { btn.disabled=false; btn.textContent='🍀 SUPERSUERTE'; } } }
  function jackpotRain(){ var c=document.createElement('div'); c.className='jp-rain'; for(var i=0;i<26;i++){ var sp=document.createElement('span'); sp.textContent='🐱'; sp.style.left=(Math.random()*100)+'%'; sp.style.animationDelay=(Math.random()*0.8)+'s'; sp.style.animationDuration=(1.8+Math.random()*1.4)+'s'; sp.style.fontSize=(20+Math.random()*22)+'px'; c.appendChild(sp); } document.body.appendChild(c); setTimeout(function(){ if(c.parentNode) c.parentNode.removeChild(c); }, 3600); }
  function toggleHold(i){ if(state.holdLevel<1||spinning||holdCD>0||gambleAmount>0) return; if(!held[i] && held.filter(Boolean).length>=state.holdLevel){ setMsg('MÁX '+state.holdLevel+' RETENIDO'+(state.holdLevel>1?'S':''),false); return; } held[i]=!held[i]; renderHold(); }
  function renderHold(){ const on=state.holdLevel>0; for(let i=0;i<3;i++){ REEL[i].classList.toggle('held', !!held[i]); } const hint=document.getElementById('holdHint'); if(!on){ hint.style.display='none'; return; } hint.style.display='block'; if(spinning){ hint.style.visibility='hidden'; } else if(holdCD>0){ hint.style.visibility='visible'; hint.classList.add('cd'); hint.textContent='🔒 Retener disponible en '+holdCD+' giro(s)'; } else { hint.style.visibility='visible'; hint.classList.remove('cd'); hint.textContent='🔒 Retené hasta '+state.holdLevel+' — deben combinar con la tirada nueva'; } }
  function showGamble(){ document.getElementById('gambleTxt').textContent='Ganaste $'+fmt(gambleAmount)+' — ¿girás para multiplicar?'; document.getElementById('gambleCash').textContent='✓ COBRAR $'+fmt(gambleAmount); document.getElementById('holdHint').style.display='none'; document.getElementById('gambleBar').classList.add('on'); }
  function hideGamble(){ gambleAmount=0; document.getElementById('gambleBar').classList.remove('on'); renderHold(); }
  function offerGamble(w){ if(state.abilities.gamble && state.debt===0 && w>0){ gambleAmount=w; showGamble(); } else { hideGamble(); } }
  function gambleMult(t){ if(t.indexOf('🦴')>=0) return 0; const a=t[0],b=t[1],c=t[2]; if(a===b&&b===c){ return a==='🐱'?50:PAY3[a]; } const ch=t.filter(function(s){return s==='🍒';}).length; if(ch===2) return 4; if(ch===1) return 2; return 0; }
  function doGamble(){ if(gambleAmount<=0||spinning) return; gambling=true; spinning=true; setSpinUI(true); held=[false,false,false]; renderHold(); document.getElementById('gambleBar').classList.remove('on'); setMsg('🎲 girando...',false); const t=[randSym(),randSym(),randSym()]; spinReel(REEL[0],CV[0],t[0],700,null); spinReel(REEL[1],CV[1],t[1],1050,null); spinReel(REEL[2],CV[2],t[2],1450,function(){ gambleResult(t); }); }
  function gambleResult(t){ spinning=false; setSpinUI(false); gambling=false; cur=t.slice(); const M=gambleMult(t); if(M>0){ const gain=gambleAmount*(M-1); state.credits+=gain; gambleAmount*=M; updateUI(); setMsg('🎲 x'+M+'!  $'+fmt(gambleAmount),'big'); celebrate(M>=10); saveState(); showGamble(); } else { const lost=gambleAmount; state.credits-=gambleAmount; gambleAmount=0; updateUI(); setMsg('🎲 PERDISTE $'+fmt(lost),'bad'); sBad(); hideGamble(); saveState(); checkBroke(); } }
  function pull(){ if(spinning) return; const l=document.getElementById('lever'); l.classList.add('pulled'); setTimeout(function(){l.classList.remove('pulled');},320); spin(); }

  document.getElementById('spinBtn').addEventListener('click', spin);
  document.getElementById('lever').addEventListener('click', pull);
  document.getElementById('maxBet').addEventListener('click', function(){ setBet(state.credits); });
  document.getElementById('betInput').addEventListener('change', function(){ setBet(parseInt(this.value,10)); });
  document.getElementById('bankBtn').addEventListener('click', function(){ if(!state.bankUnlocked) return; renderBank(); document.getElementById('bank').classList.add('open'); bankMusic(); });
  document.getElementById('bankClose').addEventListener('click', function(){ document.getElementById('bank').classList.remove('open'); bankMode=false; });
  document.getElementById('bank').addEventListener('click', function(e){ if(e.target===this){ this.classList.remove('open'); bankMode=false; } });
  document.getElementById('catModal').addEventListener('click', function(){ if(_catWaiting){ _catWaiting=false; var c=ac(); if(c&&c.state==='suspended') c.resume(); if(state.musicOn){ catMode=true; if(!musicPlaying) startMusic(); } var cont=document.getElementById('catOk'); if(cont) cont.textContent='▶ SEGUIR'; if(!state.introSeen){ state.introSeen=true; saveState(); } typeCat(_introText); if(_introStep===0) setCatLogin(true); return; } if(_catTyping){ catSkip(); return; } if(_introStep===0){ _introStep=1; setCatLogin(false); var cont2=document.getElementById('catOk'); if(cont2) cont2.textContent='▶ ¡A JUGAR!'; typeCat(TXT_INTRO); return; } closeCat(); });
  document.getElementById('shopBtn').addEventListener('click', function(){ renderShop(); document.getElementById('shop').classList.add('open'); });
  document.getElementById('shopClose').addEventListener('click', function(){ document.getElementById('shop').classList.remove('open'); });
  document.getElementById('shop').addEventListener('click', function(e){ if(e.target===this) this.classList.remove('open'); });
  document.getElementById('musicIcon').addEventListener('click', function(){ state.musicOn=!state.musicOn; if(state.musicOn){ musicStarted=true; startMusic(); } else stopMusic(); syncSoundIcons(); saveState(); });
  document.getElementById('sfxIcon').addEventListener('click', function(){ state.sfxOn=!state.sfxOn; if(state.sfxOn) ac(); syncSoundIcons(); saveState(); });
  document.getElementById('accIcon').addEventListener('click', function(){ setAuthMsg('',''); renderAccount(); document.getElementById('authModal').classList.add('open'); });
  document.getElementById('helpIcon').addEventListener('click', function(){ renderHelp(); document.getElementById('helpModal').classList.add('open'); });

  document.getElementById('profIcon').addEventListener('click', openProfile);
  document.getElementById('profileClose').addEventListener('click', function(){ document.getElementById('profile').classList.remove('open'); });
  document.getElementById('profile').addEventListener('click', function(e){ if(e.target===this) this.classList.remove('open'); });
  document.getElementById('pfGoCos').addEventListener('click', function(){ document.getElementById('profileView').style.display='none'; document.getElementById('cosmeticsView').style.display='block'; renderCos(); });
  document.getElementById('pfGoProfile').addEventListener('click', function(){ document.getElementById('cosmeticsView').style.display='none'; document.getElementById('profileView').style.display='block'; renderProfile(); });
  document.getElementById('pfGoRank').addEventListener('click', function(){ document.getElementById('profileView').style.display='none'; document.getElementById('rankingsView').style.display='block'; renderRankings(); });
  document.getElementById('pfRankBack').addEventListener('click', function(){ document.getElementById('rankingsView').style.display='none'; document.getElementById('profileView').style.display='block'; renderProfile(); });
  (function(){ var tabs=document.querySelectorAll('.pf-cos-tab'); for(var i=0;i<tabs.length;i++){ tabs[i].addEventListener('click', function(){ var t=document.querySelectorAll('.pf-cos-tab'); for(var j=0;j<t.length;j++) t[j].classList.remove('on'); this.classList.add('on'); _pfTab=this.getAttribute('data-ct'); renderCos(); }); } })();
  document.getElementById('pfEdit').addEventListener('click', function(){ var span=document.getElementById('pfName'), cur=span.textContent; var inp=document.createElement('input'); inp.value=cur; inp.maxLength=14; span.replaceWith(inp); inp.focus(); inp.select(); function save(){ var v=(inp.value||'Jugador').trim()||'Jugador'; state.eq.nick=v; saveState(); var sp=document.createElement('span'); sp.id='pfName'; sp.textContent=v; inp.replaceWith(sp); } inp.addEventListener('blur', save); inp.addEventListener('keydown', function(e){ if(e.key==='Enter') inp.blur(); }); });

  document.getElementById('helpClose').addEventListener('click', function(){ document.getElementById('helpModal').classList.remove('open'); });
  document.getElementById('helpModal').addEventListener('click', function(e){ if(e.target===this) this.classList.remove('open'); });
  document.getElementById('authClose').addEventListener('click', function(){ document.getElementById('authModal').classList.remove('open'); });
  document.getElementById('authModal').addEventListener('click', function(e){ if(e.target===this) this.classList.remove('open'); });
  document.getElementById('authSignIn').addEventListener('click', function(){ signIn(document.getElementById('authEmailInput').value.trim(), document.getElementById('authPassInput').value); });
  document.getElementById('authSignUp').addEventListener('click', function(){ signUp(document.getElementById('authEmailInput').value.trim(), document.getElementById('authPassInput').value); });
  document.getElementById('authGoogle').addEventListener('click', function(){ signInGoogle(); });
  document.getElementById('catLogin').addEventListener('click', function(e){ e.stopPropagation(); setAuthMsg('',''); renderAccount(); document.getElementById('authModal').classList.add('open'); });
  document.getElementById('toastLogin').addEventListener('click', function(){ hideLoginToast(); setAuthMsg('',''); renderAccount(); document.getElementById('authModal').classList.add('open'); });
  document.getElementById('toastClose').addEventListener('click', hideLoginToast);
  document.getElementById('authSignOut').addEventListener('click', function(){ signOutUser(); });
  document.getElementById('goReset').addEventListener('click', function(){ fullReset(); document.getElementById('gameover').classList.remove('open'); setMsg('NUEVA PARTIDA',false); });
  var _rb=document.getElementById('resetBtn'); if(_rb){ _rb.addEventListener('click', function(){ if(spinning) return; if(confirm('¿Resetear TODO a cero? (botón temporal de prueba)')){ fullReset(); setMsg('PARTIDA REINICIADA',false); } }); }
  var _lb=document.getElementById('limboBtn'); if(_lb){ _lb.addEventListener('click', openLimboHub); }
  var _sb=document.getElementById('superBtn'); if(_sb){ _sb.addEventListener('click', activateSuper); }
  setInterval(updateSuperUI, 300);
  REEL.forEach(function(r,i){ r.addEventListener('click', function(){ toggleHold(i); }); });
  document.getElementById('gambleDbl').addEventListener('click', doGamble);
  document.getElementById('gambleCash').addEventListener('click', hideGamble);
  window.addEventListener('pointerdown', firstGesture, {once:false});

  renderLights(); renderBetPresets(); renderPalette(); renderPaytable(); updateLimboBtn(); var _cc=document.getElementById('cornerCat'); if(_cc){ _cc.addEventListener('click', cornerCatSpeak); } var _ver=document.getElementById('ver'); if(_ver) _ver.textContent='v'+VERSION;
  rebuildPool();
  loadState().then(function(){
    refreshAfterLoad();
    initFirebase();
  });
