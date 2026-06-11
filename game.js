// Kitty's Slots Deluxe · versión pública (v2.67) · Tanda 3 de Sugerencias: hilo de debate por sugerencia (subcolección «comments» en suggestions/{id}/comments). Se carga al abrir el hilo; comentar pide el mismo candado que postear/votar; autor o staff pueden borrar. Requiere agregar regla de Firestore para la subcolección. Cache busting → 2.67.
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
  const PAY3={'🐟':30,'💎':12,'7️⃣':20,'⭐':7,'🔔':4,'🍒':6,'🍋':2.5};
  const PAIR2={'🍒':3,'🍋':0.5,'🔔':1,'⭐':1.5,'💎':3,'🐟':4};
  const CH1=1.5;
  const PRESETS=[50,100,500];
  const LOAN=1000, START=3000, JP_BASE=10000, JP_BASE_MULT=90, KEY='kitty-slots-deluxe', INTEREST=0.03, LOAN_FEE=0.1, SKILL_UNLOCK=5000, CAJA_COST=2000, DISCOUNT_BASE=10800000;
  const CREDIT_LIMITS=[6000,12000,22000,40000,70000,110000,170000];
  const CREDIT_COSTS=[800,2000,5000,12000,25000,45000];
  const BANK_UNLOCK_CREDITS=10000;
  // Versión de la economía. Si subís este número, TODOS los jugadores resetean su progreso una vez (para testear cambios de balance).
  const ECON_VERSION=3;
  const CAP_TIERS=[1e6,2.5e6,6e6,15e6,40e6,100e6,300e6,1e9];
  const BANK_TIERS=[50000,250000,1000000,5000000,25000000];
  const MIN_BET=50;
  const VERSION="2.75";
  const LOGROS_ON=false; // Fase 2: poner en true cuando el panel de logros esté listo para producción
  const INT_RATES=[0,0.01,0.015,0.02,0.025,0.03];
  const INT_INTERVALS=[0,25,22,19,16,13];
  const INT_COSTS=[3500,6000,10000,16000,24000];
  const PALETTES={
    synthwave:{bg:'#1a1033',bg2:'#0d0820',panel:'#2d1b54',panel2:'#241046',violet:'#a45cff',magenta:'#ff3d8b',cyan:'#39e0e6',gold:'#ffd23f',green:'#5bd75b',red:'#ff5b79',text:'#fdf6ff',muted:'#b3a7dd',cream:'#f4ead2',dark:'#0a0618'},
    gameboy:{bg:'#143a14',bg2:'#0f380f',panel:'#306230',panel2:'#27512a',violet:'#8bac0f',magenta:'#8bac0f',cyan:'#9bbc0f',gold:'#9bbc0f',green:'#8bac0f',red:'#8bac0f',text:'#9bbc0f',muted:'#8bac0f',cream:'#9bbc0f',dark:'#0f380f'},
    nes:{bg:'#14142e',bg2:'#0b0b1a',panel:'#2c2c7a',panel2:'#22225e',violet:'#5c7cff',magenta:'#e23b5b',cyan:'#3cc0e0',gold:'#f0c040',green:'#50c050',red:'#e23b5b',text:'#fdfdff',muted:'#9aa0d0',cream:'#e8d8b0',dark:'#08081a'},
    vapor:{bg:'#241046',bg2:'#160a2e',panel:'#3a2a6e',panel2:'#2e1f5a',violet:'#b07bff',magenta:'#ff6ad5',cyan:'#26d4d4',gold:'#ffe06a',green:'#6affc0',red:'#ff6ad5',text:'#fdf0ff',muted:'#c4a7e8',cream:'#f0e0f8',dark:'#0d0620'},
    lava:{bg:'#2e0d0d',bg2:'#1f0707',panel:'#4a1818',panel2:'#3a1212',violet:'#ff7a3c',magenta:'#ff4d4d',cyan:'#ffb03c',gold:'#ffd23f',green:'#ff8c3c',red:'#ff4d4d',text:'#fff0e8',muted:'#e0a890',cream:'#f4dcc0',dark:'#160404'},
    mono:{bg:'#1c1c1c',bg2:'#0e0e0e',panel:'#363636',panel2:'#2a2a2a',violet:'#e8e8e8',magenta:'#bdbdbd',cyan:'#ffffff',gold:'#d4d4d4',green:'#cfcfcf',red:'#8a8a8a',text:'#fafafa',muted:'#9a9a9a',cream:'#e0e0e0',dark:'#000000'},
    galaxy:{bg:'#0e1b3a',bg2:'#070d1f',panel:'#1a2a52',panel2:'#121f40',violet:'#6c8cff',magenta:'#c06aff',cyan:'#4fd6ff',gold:'#ffd86a',green:'#5be0c0',red:'#ff6a8a',text:'#eef3ff',muted:'#8fa0cc',cream:'#d8e0f8',dark:'#050912'},
    casino:{bg:'#280a18',bg2:'#180510',panel:'#421426',panel2:'#33101e',violet:'#f0c850',magenta:'#e8506e',cyan:'#ffe08a',gold:'#ffd23f',green:'#6ad88a',red:'#ff4d6a',text:'#fff4e6',muted:'#c4a878',cream:'#f0dcc0',dark:'#100208'}
  };
  const PALNAMES=['synthwave','gameboy','nes','vapor','lava','mono','galaxy','casino'];
  function curve(base,g){ return function(l){ return Math.round(base*Math.pow(g,l)/10)*10; }; }
  const UPG={
    win:{name:'Multiplicador',desc:'+5% a todo lo que ganás',max:50,cost:curve(1350,1.18)},
    combo:{name:'Tope de combo',desc:'+0.1 al tope del multiplicador',max:50,cost:curve(1650,1.18)},
    cat:{name:'Suerte del gato',desc:'los premios salen más seguido',max:50,cost:curve(1500,1.18)},
    bone:{name:'Menos espinas',desc:'aparecen menos espinas 🦴',max:25,cost:curve(1000,1.16)}
  };

  let state={credits:START,jackpot:JP_BASE,bet:50,debt:0,palette:'synthwave',upg:{win:0,combo:0,cat:0,bone:0},abilities:{hold:false,gamble:false},holdLevel:0,superLevel:0,musicOn:true,sfxOn:true,musicTheme:'suave',skillsUnlocked:false,bankUnlocked:false,introSeen:false,kattoSeen:false,discount:null,bank:0,vault:false,creditLevel:0,interestLevel:0,intSpins:0,meta:{spirits:0,chest:0,credit:0,luck:0,cap:0,armor:0,jpboost:0,respin:0,banktope:0,ninevidas:0,ectoboost:0,bankopen:0,vaultopen:0,banker:0,premiumvault:0,regular:0},eq:{avatar:'calico',frame:'violet',title:'novato',nick:'Jugador'},badges:{},life:{asc:0,ecto:0,bestJP:0,bestWorth:0,runs:0,deaths:0,bestGamble:0,bestCombo:0,got777:false,holyJackpot:false,spins:0,gotJackpot:false,boneHits:0,maxBoneLoss:0,survivedBigBone:false,maxBank:0,bankFilled:false,firstDeposit:false,gotInterest:false,usedSpinBtn:false,usedLever:false,logros:{}},peak:START,runJackpots:0,helpSeen:[],limboUnlocked:false,runStart:Date.now(),runStartWorth:START,limboIntroV2:false,pibble:false,econVersion:ECON_VERSION};
  let spinning=false, combo=0, audioCtx=null, musicTimer=null, mi=0, musicStarted=false;
  let held=[false,false,false], holdCD=0, gambleAmount=0, gambling=false, cur=['🍋','🍒','💎'], _broke=false, _lifeUsed=false, _tripleStreak=0, _econReset=false, _rkRows=[], _hiddenRows=[];
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
    if(typeof state.introSeen!=='boolean') state.introSeen = false; if(typeof state.kattoSeen!=='boolean') state.kattoSeen=false; if(typeof state.discount==='undefined') state.discount=null;
    if(!state.meta||typeof state.meta!=='object') state.meta={spirits:0,chest:0,credit:0,luck:0};
    if(typeof state.meta.spirits!=='number') state.meta.spirits=0; if(typeof state.meta.chest!=='number') state.meta.chest=0; if(typeof state.meta.credit!=='number') state.meta.credit=0; if(typeof state.meta.luck!=='number') state.meta.luck=0; if(typeof state.meta.cap!=='number') state.meta.cap=0; if(typeof state.meta.armor!=='number') state.meta.armor=0; if(typeof state.meta.jpboost!=='number') state.meta.jpboost=0; if(typeof state.limboIntroV2!=='boolean') state.limboIntroV2=false; if(typeof state.meta.respin!=='number') state.meta.respin=0; if(typeof state.meta.banktope!=='number') state.meta.banktope=0; if(!state.eq||typeof state.eq!=='object') state.eq={avatar:'calico',frame:'violet',title:'novato',nick:'Jugador'}; if(typeof state.eq.nick!=='string') state.eq.nick='Jugador'; if(!state.life||typeof state.life!=='object') state.life={asc:0,ecto:0,bestJP:0,bestWorth:0,runs:0,deaths:0,bestGamble:0,bestCombo:0,got777:false,holyJackpot:false}; if(typeof state.life.deaths!=='number') state.life.deaths=0; if(typeof state.life.bestGamble!=='number') state.life.bestGamble=0; if(typeof state.life.bestCombo!=='number') state.life.bestCombo=0; if(typeof state.life.got777!=='boolean') state.life.got777=false; if(typeof state.life.holyJackpot!=='boolean') state.life.holyJackpot=false; if(typeof state.life.spins!=='number') state.life.spins=0; if(typeof state.life.gotJackpot!=='boolean') state.life.gotJackpot=false; if(typeof state.life.boneHits!=='number') state.life.boneHits=0; if(typeof state.life.maxBoneLoss!=='number') state.life.maxBoneLoss=0; if(typeof state.life.survivedBigBone!=='boolean') state.life.survivedBigBone=false; if(typeof state.life.maxBank!=='number') state.life.maxBank=0; if(typeof state.life.bankFilled!=='boolean') state.life.bankFilled=false; if(typeof state.life.firstDeposit!=='boolean') state.life.firstDeposit=false; if(typeof state.life.gotInterest!=='boolean') state.life.gotInterest=false; if(typeof state.life.usedSpinBtn!=='boolean') state.life.usedSpinBtn=false; if(typeof state.life.usedLever!=='boolean') state.life.usedLever=false; if(!state.life.logros||typeof state.life.logros!=='object') state.life.logros={}; if(state.eq && state.eq.frame==='arcoiris') state.eq.frame='neon'; if(typeof state.musicTheme!=='string'||['suave','remix','densa','pibble'].indexOf(state.musicTheme)<0) state.musicTheme='suave'; if(!state.badges||typeof state.badges!=='object') state.badges={}; var _avok=['calico','tuxedo','blanco','negro','naranja','luckycat','mitimiti','alien','retro','sinfoto','highroller','raddkatt','diablitty','grisoscuro','crtty','blacknoir','dicekatt','cubo']; if(_avok.indexOf(state.eq.avatar)<0) state.eq.avatar='calico';
    if(typeof state.peak!=='number') state.peak=state.credits||START;
    if(typeof state.runJackpots!=='number') state.runJackpots=0; if(typeof state.bet!=='number'||state.bet<MIN_BET) state.bet=MIN_BET;
    if(!Array.isArray(state.helpSeen)) state.helpSeen=[];
    if(typeof state.limboUnlocked!=='boolean') state.limboUnlocked=true; if(typeof state.pibble!=='boolean') state.pibble=false; if(state.musicTheme==='pibble' && !state.pibble) state.musicTheme='suave';
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
    // ===== Reset automático por versión de economía =====
    // Si el save viene de una economía anterior, resetea el PROGRESO una sola vez (preserva look, medallas, nick y preferencias).
    if((d.econVersion||0) < ECON_VERSION){
      state.credits=START; state.jackpot=JP_BASE; state.bet=MIN_BET; state.debt=0; state.bank=0; state.vault=false;
      state.creditLevel=0; state.interestLevel=0; state.intSpins=0; state.upg={win:0,combo:0,cat:0,bone:0};
      state.abilities={hold:false,gamble:false}; state.holdLevel=0; state.superLevel=0; state.bankUnlocked=false;
      state.discount=null; state.skillsUnlocked=false;
      state.meta={spirits:0,chest:0,credit:0,luck:0,cap:0,armor:0,jpboost:0,respin:0,banktope:0,ninevidas:0,ectoboost:0,bankopen:0,vaultopen:0,banker:0,premiumvault:0,regular:0};
      state.life={asc:0,ecto:0,bestJP:0,bestWorth:0,runs:0,deaths:0,bestGamble:0,bestCombo:0,got777:false,holyJackpot:false,spins:0,gotJackpot:false,boneHits:0,maxBoneLoss:0,survivedBigBone:false,maxBank:0,bankFilled:false,firstDeposit:false,gotInterest:false,usedSpinBtn:false,usedLever:false,logros:{}};
      state.peak=START; state.runStartWorth=START; state.runJackpots=0; state.runStart=Date.now();
      state.limboUnlocked=false;
      state.econVersion=ECON_VERSION;
      _econReset=true;
    }
  }
  async function loadState(){ try{ const v=await lsGet(KEY); if(v) applySave(JSON.parse(v)); }catch(e){} }
  async function saveStateLocalOnly(){ try{ await lsSet(KEY, JSON.stringify(state)); }catch(e){} }
  async function saveState(){ await saveStateLocalOnly(); cloudSaveSoon(); }

  // ===== LOGROS (achievements) =====
  let _logrosReady=false, _logroQ=[], _logroShowing=false;
  const LOGROS=[
    // Giros y suerte
    {id:'first_spin',cat:'Giros y suerte',icon:'🎉',name:'¡Que empiece la ludopatía!',desc:'Realizá tu primer giro.',tier:'facil',secret:false,chk:function(L){return (L.spins||0)>=1;}},
    {id:'first_jp',cat:'Giros y suerte',icon:'🐱',name:'Miau-pot',desc:'Conseguí tu primer jackpot.',tier:'facil',secret:false,chk:function(L){return !!L.gotJackpot;}},
    {id:'big_win',cat:'Giros y suerte',icon:'💎',name:'¿Eso estaba balanceado?',desc:'Conseguí un premio de más de $1.000.000 en un giro.',tier:'dificil',secret:false,chk:function(L){return (L.bestJP||0)>=1000000;}},
    {id:'good_win',cat:'Giros y suerte',icon:'🍀',name:'Hoy es mi día',desc:'Conseguí un gran premio.',tier:'medio',secret:false,chk:function(L){return (L.bestJP||0)>=50000;}},
    {id:'impossible',cat:'Giros y suerte',icon:'🎲',name:'Imposible',desc:'Conseguí una combinación con menos de 1% de probabilidad.',tier:'secreto',secret:true,chk:function(L){return !!L.got777;}},
    {id:'combo10',cat:'Giros y suerte',icon:'😻',name:'Favorito de Kitty',desc:'Ganá 10 veces seguidas.',tier:'medio',secret:false,chk:function(L){return (L.bestCombo||0)>=10;}},
    {id:'combo25',cat:'Giros y suerte',icon:'🤨',name:'Sospechoso',desc:'Ganá 25 veces seguidas.',tier:'dificil',secret:false,chk:function(L){return (L.bestCombo||0)>=25;}},
    {id:'combo30',cat:'Giros y suerte',icon:'🎰',name:'Revisen sus dados',desc:'Ganá 30 veces seguidas.',tier:'dificil',secret:false,chk:function(L){return (L.bestCombo||0)>=30;}},
    // Espinas
    {id:'bone1',cat:'Espinas',icon:'😖',name:'Eso dolió',desc:'Recibí daño de una espina.',tier:'facil',secret:false,chk:function(L){return (L.boneHits||0)>=1;}},
    {id:'bone_big',cat:'Espinas',icon:'🐟',name:'Pescado traicionero',desc:'Perdé más de $100.000 por una espina.',tier:'medio',secret:false,chk:function(L){return (L.maxBoneLoss||0)>100000;}},
    {id:'bone100',cat:'Espinas',icon:'🙄',name:'¿En serio otra vez?',desc:'Recibí daño de espinas 100 veces.',tier:'medio',secret:false,chk:function(L){return (L.boneHits||0)>=100;}},
    {id:'bone500',cat:'Espinas',icon:'🦔',name:'Erizo honorario',desc:'Recibí daño de espinas 500 veces.',tier:'dificil',secret:false,chk:function(L){return (L.boneHits||0)>=500;}},
    {id:'bone_survive',cat:'Espinas',icon:'💪',name:'Las espinas me fortalecen',desc:'Sobreviví a una espina enorme.',tier:'secreto',secret:true,chk:function(L){return !!L.survivedBigBone;}},
    // Limbo
    {id:'limbo_enter',cat:'Limbo',icon:'❓',name:'¿Qué es este lugar?',desc:'Entrá al Limbo.',tier:'facil',secret:false,chk:function(L,s){return !!s.limboUnlocked;}},
    {id:'asc1',cat:'Limbo',icon:'👋',name:'Nos volveremos a ver',desc:'Ascendé por primera vez.',tier:'facil',secret:false,chk:function(L){return (L.asc||0)>=1;}},
    {id:'asc10',cat:'Limbo',icon:'🗺️',name:'Ya conozco el camino',desc:'Ascendé 10 veces.',tier:'medio',secret:false,chk:function(L){return (L.asc||0)>=10;}},
    {id:'asc50',cat:'Limbo',icon:'🏠',name:'Dirección permanente',desc:'Ascendé 50 veces.',tier:'dificil',secret:false,chk:function(L){return (L.asc||0)>=50;}},
    {id:'asc100',cat:'Limbo',icon:'🏚️',name:'Propiedad del Limbo',desc:'Ascendé 100 veces.',tier:'dificil',secret:false,chk:function(L){return (L.asc||0)>=100;}},
    // Banco
    {id:'first_dep',cat:'Banco',icon:'🛏️',name:'Debajo del colchón',desc:'Hacé tu primer depósito.',tier:'facil',secret:false,chk:function(L){return !!L.firstDeposit;}},
    {id:'bank1m',cat:'Banco',icon:'💼',name:'Ahorrador profesional',desc:'Guardá $1.000.000.',tier:'medio',secret:false,chk:function(L){return (L.maxBank||0)>=1000000;}},
    {id:'bank10m',cat:'Banco',icon:'🏦',name:'Ya casi soy un banco',desc:'Guardá $10.000.000.',tier:'dificil',secret:false,chk:function(L){return (L.maxBank||0)>=10000000;}},
    {id:'bank_full',cat:'Banco',icon:'🏛️',name:'Kitty National Bank',desc:'Llená la caja fuerte.',tier:'dificil',secret:false,chk:function(L){return !!L.bankFilled;}},
    {id:'interest',cat:'Banco',icon:'📈',name:'Dinero que genera dinero',desc:'Obtené intereses por primera vez.',tier:'medio',secret:false,chk:function(L){return !!L.gotInterest;}},
    // Dinero
    {id:'money10k',cat:'Dinero',icon:'🍭',name:'Ya alcanza para un chupetín',desc:'Conseguí $10.000.',tier:'facil',secret:false,chk:function(L){return (L.bestWorth||0)>=10000;}},
    {id:'money100k',cat:'Dinero',icon:'👀',name:'Ahí va...',desc:'Conseguí $100.000.',tier:'facil',secret:false,chk:function(L){return (L.bestWorth||0)>=100000;}},
    {id:'money1m',cat:'Dinero',icon:'😮',name:'Esto se está poniendo serio',desc:'Conseguí $1.000.000.',tier:'medio',secret:false,chk:function(L){return (L.bestWorth||0)>=1000000;}},
    {id:'money10m',cat:'Dinero',icon:'🤑',name:'Ahora hablamos de plata',desc:'Conseguí $10.000.000.',tier:'dificil',secret:false,chk:function(L){return (L.bestWorth||0)>=10000000;}},
    {id:'money100m',cat:'Dinero',icon:'💼',name:'El gato emprendedor',desc:'Conseguí $100.000.000.',tier:'dificil',secret:false,chk:function(L){return (L.bestWorth||0)>=100000000;}},
    {id:'house_loses',cat:'Dinero',icon:'🎰',name:'La casa pierde',desc:'Alcanzá el tope de plata.',tier:'dificil',secret:false,chk:function(L,s){return (s.credits+s.bank-s.debt)>=capValue();}},
    // Secretos
    {id:'diff',cat:'Secretos',icon:'🤔',name:'¿Cuál es la diferencia?',desc:'Girá con el botón y con la palanca.',tier:'secreto',secret:true,chk:function(L){return !!L.usedSpinBtn && !!L.usedLever;}}
  ];
  function checkLogros(silent){
    if(!LOGROS_ON) return;
    var L=state.life; if(!L) return;
    if(!L.logros||typeof L.logros!=='object') L.logros={};
    var changed=false;
    for(var i=0;i<LOGROS.length;i++){ var lo=LOGROS[i];
      if(L.logros[lo.id]) continue;
      var ok=false; try{ ok=!!lo.chk(L,state); }catch(e){ ok=false; }
      if(ok){ L.logros[lo.id]=Date.now(); changed=true; if(!silent) queueLogroToast(lo); }
    }
    if(changed) saveState();
  }
  function logrosCount(){ var L=(state.life&&state.life.logros)||{}; var n=0; for(var k in L){ if(L.hasOwnProperty(k)) n++; } return n; }
  function queueLogroToast(lo){ _logroQ.push(lo); if(!_logroShowing) nextLogroToast(); }
  function nextLogroToast(){ if(!_logroQ.length){ _logroShowing=false; return; } _logroShowing=true; showLogroToast(_logroQ.shift()); setTimeout(nextLogroToast, 3500); }
  function showLogroToast(lo){
    var wrap=document.getElementById('logroToast');
    if(!wrap){ wrap=document.createElement('div'); wrap.id='logroToast'; document.body.appendChild(wrap); }
    var el=document.createElement('div'); el.className='logro-toast';
    el.innerHTML='<div class="lt-ico">'+lo.icon+'</div><div class="lt-txt"><div class="lt-top">🏆 ¡LOGRO DESBLOQUEADO!</div><div class="lt-name">'+_rkEsc(lo.name)+'</div></div>';
    wrap.appendChild(el);
    requestAnimationFrame(function(){ el.classList.add('show'); });
    setTimeout(function(){ el.classList.remove('show'); el.classList.add('hide'); setTimeout(function(){ if(el.parentNode) el.parentNode.removeChild(el); }, 480); }, 3000);
  }


  function refreshAfterLoad(){
    applyPalette(state.palette); pfUpdateIcon();
    renderBetPresets(); renderPalette(); rebuildPool(); updateUI(); updateLimboBtn();
    const bi=document.getElementById('betInput'); if(bi) bi.value=state.bet;
    syncSoundIcons(); renderHold(); updateSuperUI();
    if(_econReset){ _econReset=false; saveState(); setTimeout(function(){ setMsg('🔄 Progreso reiniciado por la nueva economía',false); }, 600); }
    if(!state.introSeen) showIntro();
    checkLogros(true); _logrosReady=true;
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
  async function pushLeaderboard(){ if(!fbReady||!fbUser) return; try{ var L=state.life||{}, e=state.eq||{}; await _fbFsMod.setDoc(_fbFsMod.doc(fbDB,'leaderboard',fbUser.uid), { nick:(e.nick||'Jugador'), avatar:(e.avatar||'calico'), frame:(e.frame||'none'), title:(e.title||'none'), asc:(L.asc||0), ecto:(L.ecto||0), bestJP:(L.bestJP||0), bestWorth:(L.bestWorth||0), runs:(L.runs||0), score:lbScore(L), palette:(state.palette||'synthwave'), updated:Date.now() }, {merge:true}); }catch(_e){} }
  async function fetchTop(metric,n){ var out=[]; try{ var q=_fbFsMod.query(_fbFsMod.collection(fbDB,'leaderboard'), _fbFsMod.orderBy(metric,'desc'), _fbFsMod.limit(n)); var snap=await _fbFsMod.getDocs(q); snap.forEach(function(d){ var x=d.data()||{}; x._uid=d.id; out.push(x); }); }catch(_e){ return null; } return out; }
  async function fetchMyRank(){ if(!fbReady||!fbUser) return null; var sc=lbScore(state.life); if(_fbFsMod.getCountFromServer && _fbFsMod.where){ try{ var qy=_fbFsMod.query(_fbFsMod.collection(fbDB,'leaderboard'), _fbFsMod.where('score','>',sc)); var snap=await _fbFsMod.getCountFromServer(qy); return (snap.data().count||0)+1; }catch(_e){} } try{ var rows=await fetchTop('score',30); if(rows){ for(var i=0;i<rows.length;i++){ if(rows[i]._uid===fbUser.uid) return i+1; } if(rows.length>=30) return 31; } }catch(_e2){} return null; }
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
  let musicPlaying=false, schedTimer=null, nextNoteT=0, step16=0, catMode=false, bankMode=false, shopMode=false, pibbleMode=false;
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
  [ {s:0,n:'E5',d:6},{s:8,n:'C5',d:6},{s:16,n:'D5',d:6},{s:24,n:'F5',d:6},{s:32,n:'E5',d:6},{s:40,n:'G5',d:4},{s:44,n:'E5',d:4},{s:48,n:'D5',d:6},{s:56,n:'B4',d:8} ].forEach(function(e){ LEAD[e.s]=e; });
  const LEAD_SOFT=LEAD;
  const LEAD_DENSE={};
  [ {s:0,n:'E5',d:2},{s:2,n:'A4',d:2},{s:4,n:'C5',d:2},{s:6,n:'E5',d:2},{s:8,n:'D5',d:4},{s:12,n:'C5',d:4},{s:16,n:'C5',d:2},{s:18,n:'A4',d:2},{s:20,n:'F4',d:4},{s:24,n:'A4',d:2},{s:26,n:'C5',d:2},{s:28,n:'F5',d:4},{s:32,n:'E5',d:2},{s:34,n:'G5',d:2},{s:36,n:'E5',d:2},{s:38,n:'C5',d:2},{s:40,n:'G4',d:4},{s:44,n:'E5',d:4},{s:48,n:'D5',d:2},{s:50,n:'B4',d:2},{s:52,n:'G4',d:2},{s:54,n:'D5',d:2},{s:56,n:'G5',d:4},{s:60,n:'D5',d:2},{s:62,n:'B4',d:2} ].forEach(function(e){ LEAD_DENSE[e.s]=e; });
  const MUSIC_THEMES={ suave:{lead:LEAD_SOFT, wave:'triangle', vol:0.20, base:'soft', nom:'Suave', ver:'v2.13'}, remix:{lead:LEAD_SOFT, wave:'triangle', vol:0.20, base:'dense', nom:'Remix', ver:'v2.27'}, densa:{lead:LEAD_DENSE, wave:'square', vol:0.36, base:'dense', nom:'Densa', ver:'v2.19'}, pibble:{nom:'Mr.PIBBLE', ver:'🐽'} };
  const MUSIC_ORDER=['suave','remix','densa','pibble'];
  const CHORDS_CAT=[ {root:'D2',triad:['D4','F4','A4']}, {root:'A2',triad:['A3','C4','E4']}, {root:'A#2',triad:['A#3','D4','F4']}, {root:'C2',triad:['C4','E4','G4']} ]; var CHORDS_PIBBLE=[ {root:'C2',triad:['C4','E4','G4']}, {root:'A2',triad:['A3','C4','E4']}, {root:'F2',triad:['F3','A3','C4']}, {root:'G2',triad:['G3','B3','D4']} ]; var LEAD_PIBBLE=[]; [[0,'G4',3],[6,'E4',2],[12,'C5',2],[16,'A4',3],[22,'C5',2],[28,'E4',2],[32,'A4',3],[38,'F4',2],[44,'C5',2],[48,'B4',3],[54,'G4',2],[60,'D4',4]].forEach(function(e){ LEAD_PIBBLE[e[0]]={n:e[1],d:e[2]}; }); function pibbleVoice(idx,t,bar,within,drums){ var cp=CHORDS_PIBBLE[bar]; if(within%4===0){ mnote(noteFreq(cp.root), t, STEP*3.6, 'sine', 0.30); mnote(noteFreq(cp.triad[1]), t, STEP*3.2, 'sine', 0.06); } var pe=LEAD_PIBBLE[idx]; if(pe) mnote(noteFreq(pe.n), t, STEP*pe.d*0.92, 'sine', 0.24); if(drums){ if(within%4===0) kick(t); if(within%2===1) hat(t,0.045); } }
  const LEAD_CAT={};
  [ {s:0,n:'A4',d:6},{s:8,n:'D5',d:6},{s:16,n:'C5',d:6},{s:24,n:'E5',d:4},{s:28,n:'A4',d:2},{s:32,n:'A#4',d:6},{s:40,n:'D5',d:6},{s:48,n:'C5',d:4},{s:52,n:'G4',d:4},{s:56,n:'A4',d:8} ].forEach(function(e){ LEAD_CAT[e.s]=e; });
  const CHORDS_BANK=[ {root:'D2',triad:['D4','F4','A4']}, {root:'G2',triad:['G3','B3','D4']}, {root:'C2',triad:['C4','E4','G4']}, {root:'A2',triad:['A3','C4','E4']} ];
  const LEAD_BANK={};
  [ {s:0,n:'A4',d:4},{s:4,n:'D5',d:4},{s:8,n:'F5',d:4},{s:12,n:'D5',d:4},{s:16,n:'B4',d:4},{s:20,n:'D5',d:4},{s:24,n:'G4',d:6},{s:30,n:'B4',d:2},{s:32,n:'C5',d:4},{s:36,n:'E5',d:4},{s:40,n:'G4',d:6},{s:46,n:'E5',d:2},{s:48,n:'A4',d:4},{s:52,n:'C5',d:4},{s:56,n:'E5',d:6},{s:62,n:'C5',d:2} ].forEach(function(e){ LEAD_BANK[e.s]=e; });
  const CHORDS_SHOP=[ {root:'C2',triad:['C4','E4','G4']}, {root:'A2',triad:['A3','C4','E4']}, {root:'F2',triad:['F3','A3','C4']}, {root:'G2',triad:['G3','B3','D4']} ];
  const LEAD_SHOP={};
  [ {s:0,n:'C5',d:2},{s:2,n:'E5',d:2},{s:4,n:'G5',d:2},{s:6,n:'E5',d:2},{s:8,n:'G5',d:1},{s:9,n:'A5',d:1},{s:10,n:'G5',d:2},{s:12,n:'E5',d:4},{s:16,n:'A4',d:2},{s:18,n:'C5',d:2},{s:20,n:'E5',d:2},{s:22,n:'C5',d:2},{s:24,n:'E5',d:2},{s:26,n:'D5',d:2},{s:28,n:'C5',d:4},{s:32,n:'F5',d:2},{s:34,n:'A5',d:2},{s:36,n:'G5',d:2},{s:38,n:'F5',d:2},{s:40,n:'E5',d:2},{s:42,n:'F5',d:2},{s:44,n:'A4',d:4},{s:48,n:'B4',d:2},{s:50,n:'D5',d:2},{s:52,n:'G5',d:2},{s:54,n:'D5',d:2},{s:56,n:'B4',d:1},{s:57,n:'C5',d:1},{s:58,n:'D5',d:2},{s:60,n:'G4',d:4} ].forEach(function(e){ LEAD_SHOP[e.s]=e; });
  function scheduleStep(idx,t){
    const bar=Math.floor(idx/16), within=idx%16; if(bankMode){ const cb=CHORDS_BANK[bar]; if(within%4===0){ mnote(noteFreq(cb.root), t, STEP*3.8, 'triangle', 0.40); mnote(noteFreq(cb.triad[0]), t, STEP*3.4, 'sine', 0.10); mnote(noteFreq(cb.triad[2]), t, STEP*3.4, 'sine', 0.08); } if(within%2===0) mnote(noteFreq(cb.triad[ARP[within]]), t, STEP*0.9, 'sine', 0.06); var be=LEAD_BANK[idx]; if(be) mnote(noteFreq(be.n), t, STEP*be.d*0.9, 'triangle', 0.26); if(within===4||within===12) hat(t,0.05); return; } if(pibbleMode){ pibbleVoice(idx,t,bar,within,false); return; } if(catMode){ const cc=CHORDS_CAT[bar]; if(within%4===0){ mnote(noteFreq(cc.root), t, STEP*3.6, 'triangle', 0.5); mnote(noteFreq(cc.triad[1]), t, STEP*3.0, 'sine', 0.07); } var ce=LEAD_CAT[idx]; if(ce) mnote(noteFreq(ce.n), t, STEP*ce.d*0.9, 'triangle', 0.30); return; } if(shopMode){ const cs=CHORDS_SHOP[bar]; if(within%4===0) mnote(noteFreq(cs.root), t, STEP*1.5, 'triangle', 0.42); if(within%4===2) cs.triad.forEach(function(nn){ mnote(noteFreq(nn), t, STEP*1.1, 'square', 0.09); }); if(within%2===0) mnote(noteFreq(cs.triad[ARP[within]]), t, STEP*0.7, 'square', 0.07); var se=LEAD_SHOP[idx]; if(se) mnote(noteFreq(se.n), t, STEP*se.d*0.9, 'square', 0.30); if(within%4===0) kick(t); if(within%2===1) hat(t, (within===6||within===14)?0.12:0.07); return; } const ch=CHORDS[bar];
    if(state.musicTheme==='pibble'){ pibbleVoice(idx,t,bar,within,true); return; } var _TH=MUSIC_THEMES[state.musicTheme]||MUSIC_THEMES.suave; var _ev=_TH.lead[idx];
    if(_TH.base==='soft'){
      if(within===0){ mnote(noteFreq(ch.triad[0]), t, STEP*14, 'sine', 0.09); mnote(noteFreq(ch.triad[1]), t, STEP*14, 'sine', 0.07); mnote(noteFreq(ch.triad[2]), t, STEP*14, 'sine', 0.05); }  // pad cálido
      if(within%4===0) mnote(noteFreq(ch.root), t, STEP*3.4, 'triangle', within===0?0.34:0.24);  // bajo suave
      if(_ev) mnote(noteFreq(_ev.n), t, STEP*_ev.d*0.92, _TH.wave, _TH.vol);  // melodía
      if(within===0) kick(t);
      if(within===4||within===12) hat(t, 0.045);
    } else {
      if(within%2===0) mnote(noteFreq(ch.root), t, STEP*1.7, 'triangle', within===0?0.55:0.42);   // bass
      mnote(noteFreq(ch.triad[ARP[within]]), t, STEP*0.85, 'square', 0.10);                        // arp
      if(_ev) mnote(noteFreq(_ev.n), t, STEP*_ev.d*0.92, _TH.wave, _TH.vol);  // melodía
      if(within===0||within===8) kick(t);
      if(within===4||within===12) snare(t);
      if(within%2===1) hat(t, (within===6||within===14)?0.14:0.08);
    }
  }
  function scheduler(){ const c=ac(); if(!c) return; while(nextNoteT < c.currentTime + 0.12){ scheduleStep(step16%64, nextNoteT); nextNoteT+=STEP; step16++; } }
  function startMusic(){ const c=ac(); if(!c) return; if(c.state==='suspended') c.resume(); if(musicPlaying) return; musicPlaying=true; step16=0; nextNoteT=c.currentTime+0.06; schedTimer=setInterval(scheduler,25); }
  function stopMusic(){ musicPlaying=false; if(schedTimer){ clearInterval(schedTimer); schedTimer=null; } }
  function firstGesture(){ if(musicStarted) return; musicStarted=true; const c=ac(); if(c&&c.state==='suspended') c.resume(); if(state.musicOn) startMusic(); }
  function syncSoundIcons(){ const m=document.getElementById('musicIcon'), s=document.getElementById('sfxIcon'); if(m) m.classList.toggle('off', !state.musicOn); if(s) s.classList.toggle('off', !state.sfxOn); }

  const sheet=new Image(); let sheetReady=false;
  sheet.onload=function(){ sheetReady=true; CV.forEach(function(cv,i){ drawSym(cv, SYMS[[0,1,5][i]]); }); };
  sheet.src='assets/kitty-sprites.png';
  const CV=[document.getElementById('cv0'),document.getElementById('cv1'),document.getElementById('cv2')];
  const REEL=[document.getElementById('reel0'),document.getElementById('reel1'),document.getElementById('reel2')];
  function drawSym(cv, sym){ const x=cv.getContext('2d'); x.imageSmoothingEnabled=false; x.clearRect(0,0,cv.width,cv.height); const idx=SPRITE_ORDER.indexOf(sym); if(idx<0||!sheetReady) return; x.drawImage(sheet, idx*32,0,32,32, 0,0,cv.width,cv.height); }

  function renderLights(){ const el=document.getElementById('lights'); el.innerHTML=''; const cols=['var(--gold)','var(--magenta)','var(--cyan)','var(--violet)']; for(let i=0;i<14;i++){ const d=document.createElement('div'); d.className='light'; d.style.background=cols[i%cols.length]; d.style.animationDelay=(i*0.09)+'s'; el.appendChild(d); } }
  function renderBetPresets(){ const el=document.getElementById('betbar'); el.innerHTML=''; PRESETS.forEach(function(b){ const btn=document.createElement('div'); btn.className='bet'+(b===state.bet?' active':''); btn.textContent='$'+b; btn.addEventListener('click',function(){ setBet(b); }); el.appendChild(btn); }); }
  function renderPalette(){ const el=document.getElementById('palrow'); el.querySelectorAll('.swatch').forEach(function(s){s.remove();}); PALNAMES.forEach(function(n){ if(!temaUnlocked(n)) return; const sw=document.createElement('div'); sw.className='swatch'+(n===state.palette?' active':''); sw.title=n; sw.style.background=PALETTES[n].violet; sw.style.boxShadow='0 0 0 2px '+PALETTES[n].dark+(n===state.palette?',0 0 0 4px '+PALETTES[n].gold:''); sw.addEventListener('click',function(){ applyPalette(n); }); el.appendChild(sw); }); }
  function renderPaytable(){ const el=document.getElementById('ptBody'); const rows=[{s:'🐱',v2:'—',v3:'JACKPOT',k:'jp'},{s:'🐟',v2:'x4',v3:'x30'},{s:'7️⃣',v2:'—',v3:'x20',n:'solo 777 (no paga de a 2)'},{s:'💎',v2:'x3',v3:'x12'},{s:'⭐',v2:'x1.5',v3:'x7'},{s:'🍒',v2:'x3',v3:'x6',n:'¡1 sola cereza ya paga x1.5!'},{s:'🔔',v2:'x1',v3:'x4'},{s:'🍋',v2:'x0.5',v3:'x2.5'},{s:'🦴',v2:'−apuesta',v3:'PIERDES TODO',k:'bones'}]; el.innerHTML=''; var head=document.createElement('div'); head.className='pt-head'; head.innerHTML='<span></span><span>2 IGUALES</span><span>3 IGUALES</span>'; el.appendChild(head); rows.forEach(function(r){ var row=document.createElement('div'); row.className='pt-r'+(r.k==='jp'?' jackpot':'')+(r.k==='bones'?' bones':''); var sy=document.createElement('span'); sy.className='sym'; sy.textContent=r.s; var v2=document.createElement('span'); v2.className='v'+(r.v2==='—'?' none':'')+(r.k==='bones'?' bad':''); v2.textContent=r.v2; var v3=document.createElement('span'); v3.className='v'+(r.k==='jp'?' jp':'')+(r.k==='bones'?' bad':''); v3.textContent=r.v3; row.appendChild(sy); row.appendChild(v2); row.appendChild(v3); if(r.n){ var nt=document.createElement('span'); nt.className='pt-note'; nt.textContent='↳ '+r.n; row.appendChild(nt); } el.appendChild(row); }); var note=document.createElement('div'); note.style.cssText='margin-top:11px;color:var(--muted);line-height:1.45;font-family:VT323;font-size:15px'; note.innerHTML='⚡ COMBO: 2+ premios seguidos multiplican (hasta x'+fmtMult(comboCap())+'). 🦴 Las espinas pegan más fuerte con cada renacimiento — subí la armadura 🛡️ en el Limbo para compensar.'; el.appendChild(note); }
  var KATTO_STALL_SVG='<svg viewBox="0 0 360 360" shape-rendering="crispEdges" xmlns="http://www.w3.org/2000/svg"><rect x="27" y="90" width="306" height="153" fill="#241046"/><rect x="9" y="9" width="342" height="9" fill="#ffd23f" stroke="#0a0618" stroke-width="1.5"/><rect x="9" y="18" width="18" height="45" fill="#ff3d8b"/><rect x="27" y="18" width="18" height="45" fill="#a45cff"/><rect x="45" y="18" width="18" height="45" fill="#ff3d8b"/><rect x="63" y="18" width="18" height="45" fill="#a45cff"/><rect x="81" y="18" width="18" height="45" fill="#ff3d8b"/><rect x="99" y="18" width="18" height="45" fill="#a45cff"/><rect x="117" y="18" width="18" height="45" fill="#ff3d8b"/><rect x="135" y="18" width="18" height="45" fill="#a45cff"/><rect x="153" y="18" width="18" height="45" fill="#ff3d8b"/><rect x="171" y="18" width="18" height="45" fill="#a45cff"/><rect x="189" y="18" width="18" height="45" fill="#ff3d8b"/><rect x="207" y="18" width="18" height="45" fill="#a45cff"/><rect x="225" y="18" width="18" height="45" fill="#ff3d8b"/><rect x="243" y="18" width="18" height="45" fill="#a45cff"/><rect x="261" y="18" width="18" height="45" fill="#ff3d8b"/><rect x="279" y="18" width="18" height="45" fill="#a45cff"/><rect x="297" y="18" width="18" height="45" fill="#ff3d8b"/><rect x="315" y="18" width="18" height="45" fill="#a45cff"/><rect x="333" y="18" width="18" height="45" fill="#ff3d8b"/><rect x="9" y="18" width="342" height="45" fill="none" stroke="#0a0618" stroke-width="3"/><rect x="9" y="63" width="9" height="9" fill="#ff3d8b" stroke="#0a0618" stroke-width="1"/><rect x="36" y="63" width="9" height="9" fill="#a45cff" stroke="#0a0618" stroke-width="1"/><rect x="45" y="63" width="9" height="9" fill="#ff3d8b" stroke="#0a0618" stroke-width="1"/><rect x="72" y="63" width="9" height="9" fill="#a45cff" stroke="#0a0618" stroke-width="1"/><rect x="81" y="63" width="9" height="9" fill="#ff3d8b" stroke="#0a0618" stroke-width="1"/><rect x="108" y="63" width="9" height="9" fill="#a45cff" stroke="#0a0618" stroke-width="1"/><rect x="117" y="63" width="9" height="9" fill="#ff3d8b" stroke="#0a0618" stroke-width="1"/><rect x="144" y="63" width="9" height="9" fill="#a45cff" stroke="#0a0618" stroke-width="1"/><rect x="153" y="63" width="9" height="9" fill="#ff3d8b" stroke="#0a0618" stroke-width="1"/><rect x="180" y="63" width="9" height="9" fill="#a45cff" stroke="#0a0618" stroke-width="1"/><rect x="189" y="63" width="9" height="9" fill="#ff3d8b" stroke="#0a0618" stroke-width="1"/><rect x="216" y="63" width="9" height="9" fill="#a45cff" stroke="#0a0618" stroke-width="1"/><rect x="225" y="63" width="9" height="9" fill="#ff3d8b" stroke="#0a0618" stroke-width="1"/><rect x="252" y="63" width="9" height="9" fill="#a45cff" stroke="#0a0618" stroke-width="1"/><rect x="261" y="63" width="9" height="9" fill="#ff3d8b" stroke="#0a0618" stroke-width="1"/><rect x="288" y="63" width="9" height="9" fill="#a45cff" stroke="#0a0618" stroke-width="1"/><rect x="297" y="63" width="9" height="9" fill="#ff3d8b" stroke="#0a0618" stroke-width="1"/><rect x="324" y="63" width="9" height="9" fill="#a45cff" stroke="#0a0618" stroke-width="1"/><rect x="333" y="63" width="9" height="9" fill="#ff3d8b" stroke="#0a0618" stroke-width="1"/><rect x="9" y="81" width="9" height="9" fill="#39e0e6"/><rect x="27" y="81" width="9" height="9" fill="#ffd23f"/><rect x="45" y="81" width="9" height="9" fill="#39e0e6"/><rect x="63" y="81" width="9" height="9" fill="#ffd23f"/><rect x="81" y="81" width="9" height="9" fill="#39e0e6"/><rect x="99" y="81" width="9" height="9" fill="#ffd23f"/><rect x="117" y="81" width="9" height="9" fill="#39e0e6"/><rect x="135" y="81" width="9" height="9" fill="#ffd23f"/><rect x="153" y="81" width="9" height="9" fill="#39e0e6"/><rect x="171" y="81" width="9" height="9" fill="#ffd23f"/><rect x="189" y="81" width="9" height="9" fill="#39e0e6"/><rect x="207" y="81" width="9" height="9" fill="#ffd23f"/><rect x="225" y="81" width="9" height="9" fill="#39e0e6"/><rect x="243" y="81" width="9" height="9" fill="#ffd23f"/><rect x="261" y="81" width="9" height="9" fill="#39e0e6"/><rect x="279" y="81" width="9" height="9" fill="#ffd23f"/><rect x="297" y="81" width="9" height="9" fill="#39e0e6"/><rect x="315" y="81" width="9" height="9" fill="#ffd23f"/><rect x="333" y="81" width="9" height="9" fill="#39e0e6"/><rect x="18" y="90" width="9" height="153" fill="#6d34c4"/><rect x="27" y="90" width="9" height="153" fill="#2d1b54"/><rect x="36" y="90" width="9" height="153" fill="#241046"/><rect x="18" y="90" width="27" height="153" fill="none" stroke="#0a0618" stroke-width="3"/><rect x="315" y="90" width="9" height="153" fill="#6d34c4"/><rect x="324" y="90" width="9" height="153" fill="#2d1b54"/><rect x="333" y="90" width="9" height="153" fill="#241046"/><rect x="315" y="90" width="27" height="153" fill="none" stroke="#0a0618" stroke-width="3"/><rect x="9" y="234" width="342" height="18" fill="#2d1b54" stroke="#0a0618" stroke-width="3"/><rect x="18" y="252" width="324" height="90" fill="#241046" stroke="#0a0618" stroke-width="3"/><line x1="90" y1="252" x2="90" y2="342" stroke="#0a0618" stroke-width="2" opacity=".55"/><line x1="144" y1="252" x2="144" y2="342" stroke="#0a0618" stroke-width="2" opacity=".55"/><line x1="198" y1="252" x2="198" y2="342" stroke="#0a0618" stroke-width="2" opacity=".55"/><line x1="252" y1="252" x2="252" y2="342" stroke="#0a0618" stroke-width="2" opacity=".55"/><rect x="117" y="270" width="126" height="45" fill="#ffd23f" stroke="#0a0618" stroke-width="3"/><rect x="126" y="279" width="108" height="27" fill="none" stroke="#0a0618" stroke-width="2"/><line x1="333" y1="117" x2="333" y2="135" stroke="#0a0618" stroke-width="2"/><rect x="315" y="135" width="45" height="27" fill="#ff3d8b" stroke="#0a0618" stroke-width="3"/><rect x="324" y="144" width="9" height="9" fill="#0a0618"/></svg>';
  function shopItemCost(id){ if(id==='hold') return HOLD_COSTS[Math.min(state.holdLevel,HOLD_COSTS.length-1)]; if(id==='super') return superCost(state.superLevel); if(ABIL[id]) return ABIL[id].cost; return UPG[id]?UPG[id].cost(state.upg[id]):0; }
  function shopItemLevel(id){ if(id==='hold') return state.holdLevel; if(id==='super') return state.superLevel; if(ABIL[id]) return state.abilities[id]?1:0; return UPG[id]?state.upg[id]:0; }
  function shopItemMaxed(id){ if(id==='hold') return state.holdLevel>=2; if(id==='super') return state.superLevel>=SUPER_MAX; if(ABIL[id]) return !!state.abilities[id]; return UPG[id]?state.upg[id]>=UPG[id].max:true; }
  function shopItemName(id){ if(id==='hold') return 'Retener (Hold)'; if(id==='super') return 'Supersuerte 🍀'; if(ABIL[id]) return ABIL[id].name; return UPG[id]?UPG[id].name:id; }
  function rollDiscount(){ var ids=['win','combo','cat','bone']; if(state.skillsUnlocked) ids=ids.concat(['hold','super','gamble']); var avail=ids.filter(function(id){ return !shopItemMaxed(id); }); if(!avail.length){ state.discount=null; saveState(); return; } var id=avail[Math.floor(Math.random()*avail.length)]; var cr=(state.meta.regular||0); var pct=Math.min(45, 5+Math.floor(Math.random()*36)+cr*5); var interval=DISCOUNT_BASE - cr*1200000; state.discount={ id:id, lv:shopItemLevel(id), pct:pct, nextAt:Date.now()+interval }; saveState(); }
  function checkDiscount(){ if(!state.discount || Date.now()>=state.discount.nextAt || shopItemMaxed(state.discount.id)) rollDiscount(); }
  function discountActive(){ var d=state.discount; return !!(d && Date.now()<d.nextAt && !shopItemMaxed(d.id) && shopItemLevel(d.id)===d.lv); }
  function discountFor(id){ return (discountActive() && state.discount.id===id) ? state.discount.pct : 0; }
  function discountedCost(id, base){ var p=discountFor(id); return p? Math.round(base*(1-p/100)) : base; }
  function discountTimeLeft(){ if(!state.discount) return ''; var ms=Math.max(0, state.discount.nextAt-Date.now()); var h=Math.floor(ms/3600000), m=Math.floor((ms%3600000)/60000); return h>0?(h+'h '+m+'m'):(m+'m'); }
  function shopBuy(id){ if(id==='hold') buyHold(); else if(id==='super') buySuper(); else if(ABIL[id]) buyAbility(id); else if(UPG[id]) buyUpg(id); }
  function priceTxt(id, base){ var p=discountFor(id), cost=discountedCost(id,base); return p?('<s>$'+fmt(base)+'</s> $'+fmt(cost)):('$'+fmt(cost)); }
  function shopRowHTML(id, name, desc, sub, btnTxt, disabled, deal, cls){ return '<div class="upg'+(deal?' deal':'')+(cls?(' '+cls):'')+'"><div class="info"><div class="nm">'+name+'</div><div class="ds">'+desc+'</div><div class="lv">'+sub+'</div></div><button class="shop-buy" data-buy="'+id+'"'+(disabled?' disabled':'')+'>'+btnTxt+'</button></div>'; }
  function updateModalMoney(){ var t='💰 Tenés <b>$'+fmt(state.credits)+'</b>'+(state.debt>0?' · <span class="mm-debt">deuda -$'+fmt(state.debt)+'</span>':''); var sm=document.getElementById('shopMoney'); if(sm) sm.innerHTML=t; var bm=document.getElementById('bankMoney'); if(bm) bm.innerHTML=t; }
  function renderShop(){ checkDiscount(); updateModalMoney(); var el=document.getElementById('upgList'); if(!el) return;
    var mh='<div class="shop-section">🔧 MEJORAS</div>';
    Object.keys(UPG).forEach(function(k){ var u=UPG[k], lv=state.upg[k], maxed=lv>=u.max, base=u.cost(lv), cost=discountedCost(k,base), p=discountFor(k); var dis=maxed||state.debt>0||state.credits<cost; mh+=shopRowHTML(k, u.name+(p?' <span class="deal-badge">-'+p+'%</span>':''), u.desc, 'Nivel '+lv+'/'+u.max, maxed?'MÁX':priceTxt(k,base), dis, p>0); });
    var hh='<div class="shop-section">⚡ HABILIDADES</div>';
    if(!state.skillsUnlocked){ var falta=Math.max(0, SKILL_UNLOCK-state.credits); hh+='<div class="shop-lock">🔒 Llegá a <b>$'+fmt(SKILL_UNLOCK)+'</b> para desbloquear las habilidades.'+(falta>0?'<br>Te faltan $'+fmt(falta)+'.':'')+'</div>'; }
    else { var hl=state.holdLevel||0, hmax=hl>=2, hbase=hmax?0:HOLD_COSTS[hl], hcost=discountedCost('hold',hbase), hp=discountFor('hold'); var hdesc=hl===0?'Trabá 1 rodillo y volvé a girar el resto. Enfría 3 giros.':(hl===1?'MEJORA: trabá 2 rodillos a la vez':'Trabás hasta 2 rodillos a la vez'); var hsub=hl===0?'habilidad nueva — Nivel 1/2':('Nivel '+hl+'/2 — retenés '+hl); hh+=shopRowHTML('hold','Retener (Hold)'+(hp?' <span class="deal-badge">-'+hp+'%</span>':''), hdesc, hsub, hmax?'MÁX':(hl===0?priceTxt('hold',hbase):'Mejorar '+priceTxt('hold',hbase)), hmax||state.debt>0||state.credits<hcost, hp>0, 'abil');
      var sl=state.superLevel||0, smax=sl>=SUPER_MAX, sbase=smax?0:superCost(sl), scost=discountedCost('super',sbase), sp=discountFor('super'); var sdesc=sl===0?'Activala para una racha de suerte: suben las chances de TODOS los premios y jackpots.':'Mejorar sube la duración (hasta 85s) y la frecuencia de jackpots.'; var ssub=sl===0?'habilidad nueva — dura 10s':('Nivel '+sl+'/'+SUPER_MAX+' — dura '+superDur(sl)+'s'); hh+=shopRowHTML('super','Supersuerte 🍀'+(sp?' <span class="deal-badge">-'+sp+'%</span>':''), sdesc, ssub, smax?'MÁX':(sl===0?priceTxt('super',sbase):'Mejorar '+priceTxt('super',sbase)), smax||state.debt>0||state.credits<scost, sp>0, 'abil');
      Object.keys(ABIL).forEach(function(k){ var a=ABIL[k], owned=state.abilities[k], cost=discountedCost(k,a.cost), p=discountFor(k); hh+=shopRowHTML(k, a.name+((p&&!owned)?' <span class="deal-badge">-'+p+'%</span>':''), a.desc, owned?'\u2713 desbloqueada':'habilidad nueva', owned?'OK':priceTxt(k,a.cost), owned||state.debt>0||state.credits<cost, (p>0&&!owned), 'abil'); }); }
    var kh='<div class="katto-stall">'+KATTO_STALL_SVG+'<img class="katto-face" id="kattoFace" src="assets/katto-mascot.png" alt="Katto"></div><div class="katto-bubble" id="kattoBubble"></div>';
    if(discountActive()){ var did=state.discount.id, dbase=shopItemCost(did), dcost=discountedCost(did,dbase); kh+='<div class="katto-deal"><div class="kd-title">🏷️ REBAJA DE KATTO</div><div class="kd-item">'+shopItemName(did)+'</div><div class="kd-price"><s>$'+fmt(dbase)+'</s> → <b>$'+fmt(dcost)+'</b> <span class="kd-pct">-'+state.discount.pct+'%</span></div><button class="shop-buy kd-buy" data-buy="'+did+'"'+((state.debt>0||state.credits<dcost)?' disabled':'')+'>COMPRAR</button><div class="kd-timer">⏰ Nueva rebaja en '+discountTimeLeft()+'</div></div>'; }
    else if(state.discount && shopItemLevel(state.discount.id)!==state.discount.lv){ kh+='<div class="katto-deal"><div class="kd-title">🏷️ ¡APROVECHASTE LA REBAJA DE HOY!</div><div class="kd-timer">⏰ Nueva rebaja en '+discountTimeLeft()+'</div></div>'; }
    else { kh+='<div class="katto-deal"><div class="kd-title">😺 Katto está preparando ofertas...</div></div>'; }
    var th='<div class="shop-tabs"><button class="shop-tab'+(_shopTab==='mejoras'?' on':'')+'" data-stab="mejoras">🔧 MEJORAS</button><button class="shop-tab'+(_shopTab==='habilidades'?' on':'')+'" data-stab="habilidades">⚡ SKILLS</button><button class="shop-tab'+(_shopTab==='katto'?' on':'')+'" data-stab="katto">😺 KATTO</button></div>';
    function hid(t){ return _shopTab===t?'':' style="display:none"'; }
    el.innerHTML = th+'<div class="shop-grid"><div class="shop-left"><div id="shopMejoras" class="shop-pane"'+hid('mejoras')+'>'+mh+'</div><div id="shopHabilidades" class="shop-pane"'+hid('habilidades')+'>'+hh+'</div></div><div class="shop-right"><div id="shopKatto" class="shop-pane"'+hid('katto')+'>'+kh+'</div></div></div>';
    var bs=el.querySelectorAll('.shop-buy[data-buy]'); for(var i=0;i<bs.length;i++){ bs[i].addEventListener('click', function(){ shopBuy(this.getAttribute('data-buy')); }); }
    var tb=el.querySelectorAll('.shop-tab[data-stab]'); for(var j=0;j<tb.length;j++){ tb[j].addEventListener('click', function(){ _shopTab=this.getAttribute('data-stab'); renderShop(); }); }
    var kf=document.getElementById('kattoFace'); if(kf) kf.addEventListener('click', kattoSpeak);
    document.getElementById('shopNote').textContent = state.debt>0 ? 'Pagá tu deuda antes de comprar.' : 'Comprás con tus créditos.'; }
  function updateUI(){ var _cap=capValue(); var _w0=state.credits+state.bank-state.debt; if(_w0>_cap){ if(!state.limboUnlocked){ state.limboUnlocked=true; updateLimboBtn(); } state.credits=Math.max(0, state.credits-(_w0-_cap)); if(!_capMsgShown){ _capMsgShown=true; if(!state.limboIntroV2){ setTimeout(function(){ explainLimboOnce(null, TXT_LIMBO_CAP); }, 1700); } else { setTimeout(function(){ setMsg('¡TOPE '+fmtCap(_cap)+'! Ascendé en el Limbo 🏔️','big'); },1400); } } } if(!state.skillsUnlocked && state.credits>=SKILL_UNLOCK) state.skillsUnlocked=true; var _nw=state.credits+state.bank-state.debt; if(_nw>(state.peak||0)) state.peak=_nw; if(_nw>((state.life&&state.life.bestWorth)||0)){ state.life.bestWorth=_nw; } if(!state.bankUnlocked && state.credits>=BANK_UNLOCK_CREDITS) unlockBank('rich'); document.getElementById('credits').textContent='$'+fmt(state.credits); document.getElementById('debt').textContent=fmt(state.debt); const ind=state.debt>0; document.getElementById('debtBox').classList.toggle('on', ind); document.getElementById('danger').classList.toggle('on', ind); document.getElementById('debtWarn').style.display=ind?'block':'none'; if(document.getElementById('bank').classList.contains('open')) renderBank(); document.getElementById('jpAmount').textContent='$'+fmt(Math.round(Math.max(state.jackpot, state.bet*jpMult())*winMult())); var _bb=document.getElementById('bankBtn'); if(_bb){ _bb.disabled=!state.bankUnlocked; _bb.textContent=state.bankUnlocked?'🏦 BANCO':'🔒 BANCO'; } updateModalMoney(); updatePet(); if(state.life){ if(state.bank>(state.life.maxBank||0)) state.life.maxBank=state.bank; if(state.vault && bankCap()>0 && state.bank>=bankCap()) state.life.bankFilled=true; } if(_logrosReady && !_applyingCloud) checkLogros(); }
  function setSpinUI(on){ document.getElementById('spinBtn').disabled=on; document.body.classList.toggle('spin-lock', on); updateSuperUI(); }
  function setMsg(t,cls){ const el=document.getElementById('winMsg'); el.textContent=t; el.className='win-msg'+(cls?(' '+cls):''); }
  function setCombo(){ const el=document.getElementById('combo'); const m=comboMult(); if(combo>=2){ const ONO=['','','¡ZAS!','¡PUM!','¡PAM!','¡BOOM!','¡KABOOM!']; const o=ONO[Math.min(combo,ONO.length-1)]; el.textContent=o+' x'+fmtMult(m); el.classList.add('on'); } else { el.classList.remove('on'); } }
  function applyPalette(name){ const p=PALETTES[name]||PALETTES.synthwave; for(const k in p){ document.documentElement.style.setProperty('--'+k,p[k]); } document.body.classList.remove('th-galaxy','th-casino','th-mono'); if(name==='galaxy') document.body.classList.add('th-galaxy'); else if(name==='casino') document.body.classList.add('th-casino'); else if(name==='mono') document.body.classList.add('th-mono'); state.palette=name; renderPalette(); saveState(); }
  function applyPaletteTo(el, name){ var pp=PALETTES[name]||PALETTES.synthwave; for(var kk in pp){ el.style.setProperty('--'+kk, pp[kk]); } }

  // ===== PERFIL / COSMÉTICOS =====
  var PF_AVATARS=[ {id:'calico', name:'KITTY', idx:0}, {id:'tuxedo', name:'TUXEDO', idx:1}, {id:'blanco', name:'BLANCO', idx:2}, {id:'negro', name:'NEGRO', idx:3}, {id:'naranja', name:'MORADO', idx:4}, {id:'luckycat', name:'LUCKY CAT', idx:5, req:function(){return (state.life.bestJP||0)>=50000;}, lk:'Ganá $50k de una'}, {id:'mitimiti', name:'MITI MITI', idx:6}, {id:'alien', name:'ALIEN', idx:7, req:function(){return (state.life.asc||0)>=15;}, lk:'15 ascensiones'}, {id:'retro', name:'RETRO', idx:8}, {id:'sinfoto', name:'ANÓNIMO', idx:9}, {id:'highroller', name:'HIGH ROLLER', idx:10, req:function(){return (state.life.bestWorth||0)>=10000000 && (state.life.bestGamble||0)>=100000;}, lk:'$10M patrimonio + un doble o nada de $100k'}, {id:'raddkatt', name:'RADD KATT', idx:11}, {id:'diablitty', name:'DIABLITTY', idx:12, req:function(){return (state.life.asc||0)>=5;}, lk:'5 ascensiones'}, {id:'grisoscuro', name:'GRIS OSCURO', idx:13}, {id:'crtty', name:'CRTTY', idx:14, req:function(){return (state.life.asc||0)>=15;}, lk:'15 renacimientos'}, {id:'blacknoir', name:'BLACKNOIR', idx:15, req:function(){return (state.life.deaths||0)>=15;}, lk:'??? secreto'}, {id:'dicekatt', name:'DICEKATT', idx:16, req:function(){return (state.life.bestGamble||0)>=1000000;}, lk:'$1M en un doble o nada'}, {id:'cubo', name:'CUBO', idx:17, req:function(){return (state.life.bestWorth||0)>=50000000;}, lk:'$50.000.000 de patrimonio'} ];
  var PF_FRAMES=[ {id:'none', name:'NINGUNO', cls:''}, {id:'violet', name:'VIOLETA', cls:'fr-violet'}, {id:'magenta', name:'MAGENTA', cls:'fr-magenta'}, {id:'hielo', name:'CYAN', cls:'fr-hielo', req:function(){return (state.life.bestJP||0)>=100000;}, lk:'Ganá $100k de una'}, {id:'esmeralda', name:'VERDE', cls:'fr-esmeralda', req:function(){return (state.life.runs||0)>=25;}, lk:'Jugá 25 partidas'}, {id:'rojo', name:'ROJO', cls:'fr-rojo', req:function(){return (state.life.deaths||0)>=5;}, lk:'5 bancarrotas'}, {id:'naranja', name:'NARANJA', cls:'fr-naranja', req:function(){return (state.life.bestGamble||0)>=250000;}, lk:'$250k en un doble o nada'}, {id:'gold', name:'DORADO', cls:'fr-gold', req:function(){return (state.life.asc||0)>=15;}, lk:'15 ascensiones'}, {id:'fuego', name:'FUEGO', cls:'fr-fuego', req:function(){return (state.life.bestCombo||0)>=8;}, lk:'Combo de 8 seguidas'}, {id:'neon', name:'NEÓN', cls:'fr-neon', req:function(){return (state.life.bestJP||0)>=500000;}, lk:'Ganá $500k de una'} ];

  // ===== MEDALLAS EXCLUSIVAS (betatester por código · staff por UID) =====
  // ⬇️ STAFF: pegá acá los UID de Firebase de tu equipo (los ves en la consola de Firebase → Authentication). Ej: ['abc123...','def456...']
  var STAFF_UIDS=[
    '6IXpxyjLvkTBA0Wu8VWnvGiVH1m2', // LwkPurrfect
    'npEGnBsHNAMgSNEznHg1DCog6vt2'  // Mishiiii
  ];
  // ⬇️ BETATESTER: pegá acá los UID de Firebase de tus betatesters. Ej: ['abc123...','def456...']
  var BETA_UIDS=[
    'kFjvlpCOJvcqF6ZYaSNaR3HwftE3', // Eze ludopata
    '2ytl98LxSQRjQe0jFWGAXgPpNql1', // Patysito
    'SBcUonJAmNgFFEXJU8fYKRcvLya2', // Lucas Torres
    'yvScNO9jO9UfhL0nRwuAAOEfUSA3', // ._.
    'nbjkQOlwUIPjwVhaZWkbHYWfqPv2', // Roli uwu
    'isglcswcJ4TSaUJjBy5nT3onRud2'  // Dan
  ];
  // ⬇️ CÓDIGOS para ocasiones especiales (eventos, etc). Mapea código → id de medalla. La medalla debe existir en MEDALS.
  //    Ejemplo: var MEDAL_CODES={ 'NAVIDAD2025':'evento' };  (y agregás evento:{...} en MEDALS abajo)
  var MEDAL_CODES={};
  var MEDALS={
    betatester:{ name:'Betatester', desc:'Probó el juego antes que nadie 🧪', svg:'<svg viewBox="0 0 64 64" class="medal-svg"><circle cx="32" cy="32" r="28" fill="#1a1030" stroke="#39e0e6" stroke-width="3"/><rect x="28" y="14" width="8" height="10" fill="#cfd8e8" stroke="#0a0618" stroke-width="1.5"/><rect x="26" y="12" width="12" height="3" fill="#e8eef5" stroke="#0a0618" stroke-width="1.5"/><path d="M 28 24 L 18 44 Q 18 48 22 48 L 42 48 Q 46 48 46 44 L 36 24 Z" fill="#1a2438" stroke="#0a0618" stroke-width="1.5"/><path d="M 24 36 L 21 43 Q 21 46 24 46 L 40 46 Q 43 46 43 43 L 40 36 Z" fill="#39e0e6"/><circle cx="28" cy="40" r="2" fill="#9af0f4"/><circle cx="34" cy="42" r="1.5" fill="#9af0f4"/><circle cx="31" cy="38" r="1" fill="#e8feff"/></svg>' },
    staff:{ name:'Staff Team', desc:'Parte del equipo de Kitty\u2019s 👑', svg:'<svg viewBox="0 0 64 64" class="medal-svg"><circle cx="32" cy="32" r="28" fill="#1a1030" stroke="#ffd23f" stroke-width="3"/><path d="M 16 40 L 14 22 L 23 30 L 32 18 L 41 30 L 50 22 L 48 40 Z" fill="#ffd23f" stroke="#0a0618" stroke-width="2"/><rect x="16" y="40" width="32" height="6" fill="#f0b020" stroke="#0a0618" stroke-width="2"/><circle cx="14" cy="22" r="2.5" fill="#ff3d8b" stroke="#0a0618" stroke-width="1"/><circle cx="32" cy="18" r="3" fill="#a45cff" stroke="#0a0618" stroke-width="1"/><circle cx="50" cy="22" r="2.5" fill="#ff3d8b" stroke="#0a0618" stroke-width="1"/><rect x="29" y="40" width="6" height="6" fill="#39e0e6" stroke="#0a0618" stroke-width="1"/></svg>' }
  };
  function hasMedal(id){ if(id==='staff') return !!(fbUser && STAFF_UIDS.indexOf(fbUser.uid)>=0); if(id==='betatester') return !!(fbUser && BETA_UIDS.indexOf(fbUser.uid)>=0); return !!(state.badges && state.badges[id]); }
  function userMedals(){ var out=[]; for(var k in MEDALS){ if(hasMedal(k)) out.push(k); } return out; }
  function redeemCode(code){ code=(code||'').trim().toUpperCase(); var mid=MEDAL_CODES[code]; if(!mid || !MEDALS[mid]) return 'mal'; if(!state.badges) state.badges={}; if(state.badges[mid]) return 'ya'; state.badges[mid]=true; saveState(); return 'ok'; }

  var PF_TITLES=[ {id:'none', name:'(Sin título)'}, {id:'novato', name:'Novato 🐣'}, {id:'apostador', name:'Apostador 🎲'}, {id:'bendecido', name:'Bendecido por Kitty 😻', req:function(){return (state.life.bestCombo||0)>=8;}, lk:'Combo de 8 seguidas'}, {id:'millonario', name:'Millonario 💵', req:function(){return (state.life.bestWorth||0)>=1000000;}, lk:'Tu primer millón'}, {id:'rey', name:'Rey del Bote 🎰', req:function(){return (state.life.bestJP||0)>=1000000;}, lk:'Ganá $1M de una'}, {id:'holyjackpot', name:'Holy Jackpot 🙏', req:function(){return !!(state.life&&state.life.holyJackpot);}, lk:'3 triples seguidos'}, {id:'sietes', name:'777 🎰', req:function(){return !!(state.life&&state.life.got777);}, lk:'Sacá 7️⃣7️⃣7️⃣'}, {id:'midas', name:'Toque de Midas ✨', req:function(){return (state.life.bestJP||0)>=10000000;}, lk:'Ganá $10M de una'}, {id:'habitual', name:'Cliente Habitual del Limbo 👻', req:function(){return (state.life.asc||0)>=15 && (state.life.deaths||0)>=15;}, lk:'15 ascensiones + 15 bancarrotas'}, {id:'billonario', name:'Billonario 💰', req:function(){return (state.life.bestWorth||0)>=1000000000;}, lk:'$1.000M de patrimonio'}, {id:'alma', name:'Alma en Pena 👻', req:function(){return (state.life.asc||0)>=15;}, lk:'15 ascensiones'} ];
  var PF_TEMANOM={synthwave:'MORADO', gameboy:'GAMEBOY', nes:'AZUL', vapor:'VAPOR', lava:'LAVA', mono:'MONOCROMO', galaxy:'GALAXY', casino:'CASINO CLASSIC'};
  var PF_TEMA_REQ={ mono:{req:function(){return (state.life.deaths||0)>=3;}, lk:'3 bancarrotas'}, casino:{req:function(){return (state.life.bestWorth||0)>=1000000;}, lk:'Tu primer millón'}, galaxy:{req:function(){return (state.life.asc||0)>=15;}, lk:'15 ascensiones'} };
  function temaUnlocked(n){ var r=PF_TEMA_REQ[n]; return !r || r.req(); }
  var _pfTab='avatar';
  function pfUnlocked(it){ return it.req? it.req() : true; }
  function pfCatPos(id){ var idx=0; PF_AVATARS.forEach(function(x){ if(x.id===id) idx=x.idx; }); var c=idx%10, r=Math.floor(idx/10); return (c/9*100)+'% '+(r*100)+'%'; }
  function pfFrameCls(id){ var f=''; PF_FRAMES.forEach(function(x){if(x.id===id)f=x.cls;}); return f; }
  function pfTitleName(id){ var n=''; PF_TITLES.forEach(function(x){if(x.id===id && x.id!=='none')n=x.name;}); return n; }
  function pfUpdateIcon(){ var pic=document.getElementById('profIconImg'); if(pic && state.eq) pic.style.backgroundPosition=pfCatPos(state.eq.avatar); }
  function updateRankBtn(){ var g=document.getElementById('pfGoRank'); if(!g) return; var p=g.querySelector('.pos'), s=g.querySelector('.sub'); if(!(fbReady&&fbUser)){ if(p)p.textContent='🏆'; if(s)s.innerHTML='Ver rankings<br>globales →'; return; } fetchMyRank().then(function(rk){ var g2=document.getElementById('pfGoRank'); if(!g2) return; var p2=g2.querySelector('.pos'), s2=g2.querySelector('.sub'); if(rk!=null){ if(p2)p2.textContent='#'+rk; if(s2)s2.innerHTML='Tu puesto<br>ver ranking →'; } else { if(p2)p2.textContent='🏆'; if(s2)s2.innerHTML='Ver rankings<br>globales →'; } }); }
  function renderProfile(){ var eq=state.eq; document.getElementById('pfAvatarImg').style.backgroundPosition=pfCatPos(eq.avatar); document.getElementById('pfAvatar').className='pf-avatar '+pfFrameCls(eq.frame); document.getElementById('pfName').textContent=eq.nick||'Jugador'; var tn=pfTitleName(eq.title); document.getElementById('pfTitle').innerHTML = tn? '<span class="title-pill">'+tn+'</span>' : ''; var md=document.getElementById('pfMedals'); if(md){ var meds=userMedals(); if(meds.length){ var mh=''; meds.forEach(function(k){ mh+='<span class="pf-medal" data-medal="'+k+'" title="'+MEDALS[k].name+' — '+MEDALS[k].desc+'">'+MEDALS[k].svg+'</span>'; }); md.innerHTML=mh; md.style.display='flex'; var mels=md.querySelectorAll('.pf-medal'); for(var mi=0;mi<mels.length;mi++){ mels[mi].addEventListener('click', function(){ var k=this.getAttribute('data-medal'); var dt=document.getElementById('pfMedalDetail'); if(dt&&MEDALS[k]){ if(dt.style.display==='block'&&dt.getAttribute('data-shown')===k){ dt.style.display='none'; dt.removeAttribute('data-shown'); } else { dt.innerHTML='<b>'+MEDALS[k].name+'</b><br>'+MEDALS[k].desc; dt.style.display='block'; dt.setAttribute('data-shown',k); } } }); } } else { md.innerHTML=''; md.style.display='none'; var dt0=document.getElementById('pfMedalDetail'); if(dt0) dt0.style.display='none'; } } var L=state.life||{}; document.getElementById('pfEcto').textContent=fmt(L.ecto||0); document.getElementById('pfAsc').textContent=(L.asc||0); document.getElementById('pfRuns').textContent=(L.runs||0); document.getElementById('pfWorth').textContent='$'+fmt(L.bestWorth||0); document.getElementById('pfJP').textContent='$'+fmt(L.bestJP||0); var _pc=document.getElementById('pfCode'); if(_pc) _pc.style.display='block'; var _pb=document.getElementById('pfPibbleBtn'); if(_pb) _pb.style.display = state.pibble ? 'block' : 'none'; updateRankBtn(); pfUpdateIcon(); }
  function renderCos(){ var eq=state.eq, h=''; if(_pfTab==='tema'){ PALNAMES.forEach(function(n){ var equipped=state.palette===n, p=PALETTES[n], unl=temaUnlocked(n); var status= unl ? (equipped?'EQUIPADO':'tocá para equipar') : ('🔒 '+(PF_TEMA_REQ[n]?PF_TEMA_REQ[n].lk:'Bloqueado')); var badge= equipped?'✓':(unl?'':'🔒'); h+='<div class="pf-cos-card'+(equipped?' equipped':'')+(unl?'':' locked')+'" data-id="'+n+'">'+(badge?'<div class="pf-cos-badge">'+badge+'</div>':'')+'<div class="pf-cos-prev"><span class="pf-swatch" style="background:'+p.panel+'; box-shadow:0 0 0 3px '+p.violet+'"></span></div><div class="pf-cos-name">'+(PF_TEMANOM[n]||n)+'</div><div class="pf-cos-status">'+status+'</div></div>'; }); } else { var arr = _pfTab==='avatar'?PF_AVATARS : _pfTab==='frame'?PF_FRAMES : PF_TITLES; arr.forEach(function(it){ var equipped=eq[_pfTab]===it.id, unl=pfUnlocked(it) && !it.locked; var prev=''; if(_pfTab==='avatar'){ prev = '<span class="cat" style="background-position:'+pfCatPos(it.id)+'"></span>'; } else if(_pfTab==='frame'){ prev='<span class="mini '+(it.cls||'')+'"><span class="cat" style="background-position:'+pfCatPos(eq.avatar)+'"></span></span>'; } else { prev='<span class="title-pill">'+(it.id==='none'?'—':it.name)+'</span>'; } var lockTxt = it.locked? it.locked : (it.lk||'Bloqueado'); var status = unl ? (equipped?'EQUIPADO':'tocá para equipar') : ('🔒 '+lockTxt); var badge = equipped? '✓' : (unl?'':'🔒'); var nm = (_pfTab==='title' && it.id==='none')?'Sin título':it.name; h+='<div class="pf-cos-card'+(equipped?' equipped':'')+(unl?'':' locked')+'" data-id="'+it.id+'">'+(badge?'<div class="pf-cos-badge">'+badge+'</div>':'')+'<div class="pf-cos-prev">'+prev+'</div><div class="pf-cos-name">'+nm+'</div><div class="pf-cos-status">'+status+'</div></div>'; }); } document.getElementById('pfCosGrid').innerHTML=h; var cards=document.querySelectorAll('#pfCosGrid .pf-cos-card'); for(var i=0;i<cards.length;i++){ cards[i].addEventListener('click', function(){ var id=this.getAttribute('data-id'); if(_pfTab==='tema'){ if(!temaUnlocked(id)) return; applyPalette(id); renderCos(); return; } var arr2 = _pfTab==='avatar'?PF_AVATARS : _pfTab==='frame'?PF_FRAMES : PF_TITLES; var it=null; arr2.forEach(function(x){if(x.id===id)it=x;}); if(!it || it.locked || !pfUnlocked(it)) return; state.eq[_pfTab]=id; saveState(); renderCos(); renderProfile(); }); } }
  function openProfile(){ if(spinning) return; _pfTab='avatar'; var t=document.querySelectorAll('.pf-cos-tab'); for(var j=0;j<t.length;j++) t[j].classList.toggle('on', t[j].getAttribute('data-ct')==='avatar'); document.getElementById('profileView').style.display='block'; document.getElementById('cosmeticsView').style.display='none'; var _rv=document.getElementById('rankingsView'); if(_rv) _rv.style.display='none'; renderProfile(); document.getElementById('profile').classList.add('open'); }
  function lbScore(L){ L=L||{}; var ecto=L.ecto||0, jp=L.bestJP||0, worth=L.bestWorth||0; return Math.round(ecto + Math.floor(Math.sqrt(worth)/10) + Math.floor(Math.sqrt(jp)/10)); }
  function _rkEsc(x){ return String(x==null?'':x).replace(/[&<>"']/g, function(c){ return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]; }); }
  async function fetchHidden(){ var out=[]; try{ var q=_fbFsMod.query(_fbFsMod.collection(fbDB,'leaderboard'), _fbFsMod.where('hidden','==',true)); var snap=await _fbFsMod.getDocs(q); snap.forEach(function(d){ var x=d.data()||{}; x._uid=d.id; out.push(x); }); }catch(_e){ return null; } return out; }
  function renderHiddenList(){ var box=document.getElementById('pfRkList'); if(!box) return; var _u=document.getElementById('pfRkUser'); if(_u) _u.style.display='none'; box.style.display='block'; box.innerHTML='<div class="pf-rk-msg">Cargando ocultos…</div>'; fetchHidden().then(function(rows){ if(rows===null){ box.innerHTML='<button class="pf-rku-back" id="pfRkBackTop">← Volver al ranking</button><div class="pf-rk-msg">No se pudo cargar (revisá permisos).</div>'; var _b0=document.getElementById('pfRkBackTop'); if(_b0) _b0.addEventListener('click', renderRankings); return; } _hiddenRows=rows; var h='<button class="pf-rku-back" id="pfRkBackTop">← Volver al ranking</button>'; if(!rows.length){ h+='<div class="pf-rk-msg">No hay perfiles ocultos. 🐱</div>'; } else { h+='<div class="pf-rk-msg" style="margin-bottom:8px">Perfiles ocultos ('+rows.length+'). Tocá uno para verlo y restaurarlo.</div>'; for(var i=0;i<rows.length;i++){ var r=rows[i]; h+='<div class="pf-rk-row hidden-row" data-rkuid="'+r._uid+'"><span class="pf-rk-pos">🚫</span><span class="cat" style="background-position:'+pfCatPos(r.avatar||'calico')+'"></span><span class="pf-rk-nick">'+_rkEsc(r.nick||'Jugador')+'</span><span class="pf-rk-val">'+fmt(r.score||0)+' pts</span></div>'; } } box.innerHTML=h; var _bk=document.getElementById('pfRkBackTop'); if(_bk) _bk.addEventListener('click', renderRankings); var rws=box.querySelectorAll('.pf-rk-row[data-rkuid]'); for(var j=0;j<rws.length;j++){ rws[j].addEventListener('click', function(){ showRkUser(this.getAttribute('data-rkuid')); }); } }); }
  function renderRankings(){ var box=document.getElementById('pfRkList'); if(!box) return; var _u=document.getElementById('pfRkUser'); if(_u){ _u.style.display='none'; } box.style.display='block'; if(!fbReady||!fbUser){ box.innerHTML='<div class="pf-rk-msg">🔒 Iniciá sesión (arriba, en el ícono de cuenta) para ver y competir en el ranking global.</div>'; return; } box.innerHTML='<div class="pf-rk-msg">Cargando ranking…</div>'; fetchTop('score',30).then(function(rows){ if(rows===null){ box.innerHTML='<div class="pf-rk-msg">No se pudo cargar el ranking.<br>(¿Pegaste las reglas de Firebase para «leaderboard»?)</div>'; return; } if(!rows.length){ box.innerHTML='<div class="pf-rk-msg">Nadie en el ranking todavía.<br>¡Sé el primero! 🐱</div>'; return; } _rkRows=rows; var vis=[], i; for(i=0;i<rows.length;i++){ if(!rows[i].hidden) vis.push(rows[i]); } var h='', inTop=false; if(vis.length){ h+='<div class="rk-podium">'; var _ord=[1,0,2], _cls=['gold','silver','bronze'], _med=['🥇','🥈','🥉'], _hgt=[92,62,42]; for(var oi=0;oi<_ord.length;oi++){ var _ix=_ord[oi]; if(_ix>=vis.length) continue; var pr=vis[_ix], rn=_ix+1, pme=(pr._uid===fbUser.uid); if(pme) inTop=true; h+='<div class="rk-pcol'+(pme?' me':'')+'" data-rkuid="'+pr._uid+'">'; if(rn===1) h+='<div class="rk-pcrown">👑</div>'; h+='<div class="rk-pava '+_cls[rn-1]+(rn===1?' big':'')+'"><span class="cat" style="background-position:'+pfCatPos(pr.avatar||'calico')+'"></span></div>'; h+='<div class="rk-pname'+(rn===1?' gt':'')+'">'+_rkEsc(pr.nick||'Jugador')+'</div>'; h+='<div class="rk-pscore">'+fmt(pr.score||0)+' pts</div>'; h+='<div class="rk-pbase '+_cls[rn-1]+'" style="height:'+_hgt[rn-1]+'px"><span class="rk-pr">'+rn+'</span><span class="rk-pm">'+_med[rn-1]+'</span></div>'; h+='</div>'; } h+='</div>'; } if(vis.length>3){ h+='<div class="rk-list">'; for(i=3;i<vis.length;i++){ var lr=vis[i], lp=i+1, lme=(lr._uid===fbUser.uid); if(lme) inTop=true; h+='<div class="pf-rk-row'+(lme?' me':'')+'" data-rkuid="'+lr._uid+'"><span class="pf-rk-pos">#'+lp+'</span><span class="cat" style="background-position:'+pfCatPos(lr.avatar||'calico')+'"></span><span class="pf-rk-nick">'+_rkEsc(lr.nick||'Jugador')+'</span><span class="pf-rk-val">'+fmt(lr.score||0)+' pts</span></div>'; } h+='</div>'; } if(!inTop){ var e=state.eq||{}; h+='<div class="pf-rk-foot"><div class="pf-rk-row me"><span class="pf-rk-pos">Vos</span><span class="cat" style="background-position:'+pfCatPos(e.avatar||'calico')+'"></span><span class="pf-rk-nick">'+_rkEsc(e.nick||'Jugador')+'</span><span class="pf-rk-val">'+fmt(lbScore(state.life))+' pts</span></div></div>'; } if(hasMedal('staff')){ h+='<button class="pf-rk-hidden-btn" id="pfRkHiddenBtn">👁️ Ver perfiles ocultos</button>'; } box.innerHTML=h; var pcs=box.querySelectorAll('.rk-pcol[data-rkuid]'); for(var pj=0;pj<pcs.length;pj++){ pcs[pj].addEventListener('click', function(){ showRkUser(this.getAttribute('data-rkuid')); }); } var rws=box.querySelectorAll('.pf-rk-row[data-rkuid]'); for(var j=0;j<rws.length;j++){ rws[j].addEventListener('click', function(){ showRkUser(this.getAttribute('data-rkuid')); }); } var _hb=document.getElementById('pfRkHiddenBtn'); if(_hb) _hb.addEventListener('click', renderHiddenList); }); }
  function medalsForUID(uid){ var out=[]; if(STAFF_UIDS.indexOf(uid)>=0) out.push('staff'); if(BETA_UIDS.indexOf(uid)>=0) out.push('betatester'); return out; }
  function avatarName(id){ for(var i=0;i<PF_AVATARS.length;i++){ if(PF_AVATARS[i].id===id) return PF_AVATARS[i].name; } return (id||'').toUpperCase(); }
  function showRkUser(uid){ var r=null, pos=0, _vis=0; for(var i=0;i<(_rkRows||[]).length;i++){ if(!_rkRows[i].hidden) _vis++; if(_rkRows[i]._uid===uid){ r=_rkRows[i]; pos=_rkRows[i].hidden?0:_vis; break; } } if(!r){ for(var k=0;k<(_hiddenRows||[]).length;k++){ if(_hiddenRows[k]._uid===uid){ r=_hiddenRows[k]; pos=0; break; } } } if(!r) return; var box=document.getElementById('pfRkList'), pane=document.getElementById('pfRkUser'); if(!pane) return; var tn=pfTitleName(r.title||'none'); var meds=medalsForUID(uid); var medHTML=''; if(meds.length){ meds.forEach(function(k){ medHTML+='<span class="pf-medal" data-medal="'+k+'" title="'+MEDALS[k].name+' — '+MEDALS[k].desc+'">'+MEDALS[k].svg+'</span>'; }); } var h='<button class="pf-rku-back" id="pfRkuBack">← Volver al ranking</button>';
    h+='<div class="pf-rku-card">';
    h+='<div class="pf-avatar '+pfFrameCls(r.frame||'none')+'" style="margin:0 auto 10px"><span class="cat" style="background-position:'+pfCatPos(r.avatar||'calico')+'"></span></div>';
    h+='<div class="pf-rku-nick">'+_rkEsc(r.nick||'Jugador')+'</div>';
    h+= tn? '<div class="pf-title"><span class="title-pill">'+tn+'</span></div>' : '';
    h+= medHTML? '<div class="pf-medals" style="display:flex">'+medHTML+'</div>' : '';
    h+= medHTML? '<div class="pf-medal-detail" id="rkuMedalDetail"></div>' : '';
    h+='<div class="pf-rku-meta">'+(pos>0?'🏆 Puesto #'+pos:'🚫 Oculto del ranking')+'<br>🐾 '+avatarName(r.avatar||'calico')+(r.palette?'<br>🎨 '+(PF_TEMANOM[r.palette]||r.palette):'')+'</div>';
    h+='<div class="pf-stats">';
    h+='<div class="pf-stat wide"><span class="lbl">👻 Ectofichas ganadas</span><span class="val">'+fmt(r.ecto||0)+'</span></div>';
    h+='<div class="pf-stat"><div class="lbl">✨ Ascensiones</div><div class="val">'+fmt(r.asc||0)+'</div></div>';
    h+='<div class="pf-stat"><div class="lbl">🎲 Partidas</div><div class="val">'+fmt(r.runs||0)+'</div></div>';
    h+='<div class="pf-stat"><div class="lbl">💰 Récord plata</div><div class="val">$'+fmt(r.bestWorth||0)+'</div></div>';
    h+='<div class="pf-stat"><div class="lbl">🎰 Mayor ganancia</div><div class="val">$'+fmt(r.bestJP||0)+'</div></div>';
    h+='</div>';
    if(hasMedal('staff') && uid!==fbUser.uid){ h+='<button class="pf-rku-act recalc" id="pfRkuRecalc" data-uid="'+uid+'">🔄 Recalcular puntos</button>'; h+='<button class="pf-rku-act '+(r.hidden?'restore':'hide')+'" id="pfRkuToggle" data-uid="'+uid+'">'+(r.hidden?'↩️ Restaurar al ranking':'🚫 Sacar del ranking')+'</button>'; }
    h+='</div>';
    pane.innerHTML=h; var _rkc=pane.querySelector('.pf-rku-card'); if(_rkc) applyPaletteTo(_rkc, r.palette||'synthwave'); box.style.display='none'; pane.style.display='block';
    var bk=document.getElementById('pfRkuBack'); if(bk) bk.addEventListener('click', function(){ pane.style.display='none'; box.style.display='block'; });
    var _rc=document.getElementById('pfRkuRecalc'); if(_rc) _rc.addEventListener('click', function(){ var b=this, u=b.getAttribute('data-uid'); var ns=lbScore(r); b.disabled=true; b.textContent='🔄 Recalculando…'; _fbFsMod.setDoc(_fbFsMod.doc(fbDB,'leaderboard',u), {score:ns, updated:Date.now()}, {merge:true}).then(function(){ b.textContent='✅ Puntos: '+fmt(ns); setTimeout(function(){ pane.style.display='none'; box.style.display='block'; renderRankings(); }, 950); }).catch(function(_e){ b.disabled=false; b.textContent='❌ No se pudo (revisá permisos)'; }); });
    var _tg=document.getElementById('pfRkuToggle'); if(_tg) _tg.addEventListener('click', function(){ var b=this, u=b.getAttribute('data-uid'), toHide=!r.hidden; if(b.getAttribute('data-armed')==='1'){ b.disabled=true; b.textContent=toHide?'🚫 Sacando…':'↩️ Restaurando…'; _fbFsMod.setDoc(_fbFsMod.doc(fbDB,'leaderboard',u), {hidden:toHide}, {merge:true}).then(function(){ pane.style.display='none'; box.style.display='block'; renderRankings(); }).catch(function(_e){ b.disabled=false; b.removeAttribute('data-armed'); b.textContent=toHide?'🚫 Sacar del ranking':'↩️ Restaurar al ranking'; }); } else { b.setAttribute('data-armed','1'); b.textContent='⚠️ Tocá de nuevo para confirmar'; setTimeout(function(){ if(b){ b.removeAttribute('data-armed'); b.textContent=toHide?'🚫 Sacar del ranking':'↩️ Restaurar al ranking'; } }, 4000); } });
    var mels=pane.querySelectorAll('.pf-medal[data-medal]'); for(var mi=0;mi<mels.length;mi++){ mels[mi].addEventListener('click', function(){ var k=this.getAttribute('data-medal'); var dt=document.getElementById('rkuMedalDetail'); if(dt&&MEDALS[k]){ if(dt.style.display==='block'&&dt.getAttribute('data-shown')===k){ dt.style.display='none'; dt.removeAttribute('data-shown'); } else { dt.innerHTML='<b>'+MEDALS[k].name+'</b><br>'+MEDALS[k].desc; dt.style.display='block'; dt.setAttribute('data-shown',k); } } }); } }


  function confetti(n){ const real=['#ffd23f','#ff3d8b','#39e0e6','#a45cff','#5bd75b']; for(let i=0;i<n;i++){ const c=document.createElement('div'); c.className='confetti'; c.style.left=(50+(Math.random()*44-22))+'vw'; c.style.top='30vh'; c.style.background=real[i%real.length]; c.style.transform='translateX('+((Math.random()*2-1)*250)+'px)'; c.style.animation='fall '+(0.9+Math.random())+'s steps(12) forwards'; c.style.animationDelay=(Math.random()*0.2)+'s'; document.body.appendChild(c); setTimeout(function(){c.remove();},2300); } }

  function applyWin(w){ if(w>((state.life&&state.life.bestJP)||0)) state.life.bestJP=w; /* bestJP = mayor ganancia de una tirada (cualquier premio; el doble-o-nada se trackea en gambleResult) */ if(state.debt>0){ const p=Math.min(w,state.debt); state.debt-=p; w-=p; } state.credits+=w; return w; }
  function celebrate(big){ const l=document.getElementById('lights'); l.classList.add('win'); setTimeout(function(){l.classList.remove('win');},1400); confetti(big?55:22); sWin(big); }

  function spinReel(reelEl, cv, target, duration, onDone){ reelEl.classList.remove('stop'); reelEl.classList.add('spinning'); let elapsed=0, delay=55; (function tick(){ drawSym(cv, randSym()); elapsed+=delay; if(elapsed>=duration){ drawSym(cv,target); reelEl.classList.remove('spinning'); reelEl.classList.add('stop'); sStop(); if(onDone)onDone(); return; } if(elapsed>duration*0.55) delay+=13; setTimeout(tick,delay); })(); }

  function spin(src){
    if(_broke){ if(!explainLimboOnce(function(){ openLimboPanel(true); })){ openLimboPanel(true); } return; }
    if(spinning) return;
    hideGamble();
    if(state.credits<MIN_BET){ if(!state.bankUnlocked) unlockBank(); if(loanAvailable()){ setMsg('TE FALTA PARA APOSTAR — PEDÍ PRÉSTAMO',false); } else { if(!tryNineLives()) gameOver(); } return; }
    if(state.bet>state.credits){ setMsg('TE FALTA — BAJÁ LA APUESTA O PEDÍ PRÉSTAMO',false); return; }
    if(state.bet<MIN_BET){ setMsg('SUBÍ LA APUESTA',false); return; }
    if(state.debt>0){ state.debt+=Math.ceil(state.debt*INTEREST); }
    spinning=true; setSpinUI(true); setMsg('',false); renderHold(); state.life.spins=(state.life.spins||0)+1; if(src==='lever'){ state.life.usedLever=true; } else if(src==='btn'){ state.life.usedSpinBtn=true; }
    state.credits-=state.bet; state.jackpot+=Math.max(2,Math.round(state.bet*0.2)); accrueInterest(); updateUI(); tickLoginToast();
    const t=[0,1,2].map(function(i){ return held[i]?cur[i]:randSym(); });
    const idx=[0,1,2].filter(function(i){ return !held[i]; });
    if(idx.length===0){ finish(t); return; }
    let done=0;
    idx.forEach(function(i,k){ spinReel(REEL[i],CV[i],t[i],800+k*450,function(){ done++; if(done===idx.length) finish(t); }); });
  }

  function finish(t, isRespin, keepMask){
    spinning=false; setSpinUI(false);
    const wasHeld = keepMask ? keepMask.slice() : (isRespin?[false,false,false]:held.slice());
    cur=t.slice(); if(!isRespin){ if(held.indexOf(true)>=0){ holdCD=3; } else { holdCD=Math.max(0,holdCD-1); } held=[false,false,false]; renderHold(); }
    const a=t[0],b=t[1],c=t[2];
    if(a===b && b===c){
      if(a==='🐱'){ state.life.gotJackpot=true; combo++; if(combo>(state.life.bestCombo||0))state.life.bestCombo=combo; _tripleStreak++; if(_tripleStreak>=3)state.life.holyJackpot=true; state.runJackpots=(state.runJackpots||0)+1; const w=Math.round(Math.max(state.jackpot, state.bet*jpMult())*winMult()); state.jackpot=JP_BASE; const net=applyWin(w); updateUI(); setCombo(); setMsg('¡JACKPOT! +'+fmt(w),'big'); confetti(75); sJackpot(); jackpotRain(); const jp=document.getElementById('jpAmount'); jp.classList.add('flash'); setTimeout(function(){jp.classList.remove('flash');},2600); offerGamble(net); saveState(); return; }
      if(a==='🦴'){ if(!isRespin && respinProcs()){ respin(wasHeld); return; } combo=0; _tripleStreak=0; var _lost=state.credits; state.credits=Math.round(state.credits*(1-boneLoseFrac())); _lost-=state.credits; state.life.boneHits=(state.life.boneHits||0)+1; if(_lost>(state.life.maxBoneLoss||0)) state.life.maxBoneLoss=_lost; if(_lost>=250000 && state.credits>=MIN_BET) state.life.survivedBigBone=true; updateUI(); setCombo(); setMsg('¡ESPINAS! -'+fmt(_lost)+'$ 💀','big bad'); const cab=document.getElementById('cabinet'); cab.classList.add('bad'); setTimeout(function(){cab.classList.remove('bad');},900); sBad(); saveState(); checkBroke(); return; }
      combo++; if(combo>(state.life.bestCombo||0))state.life.bestCombo=combo; _tripleStreak++; if(_tripleStreak>=3)state.life.holyJackpot=true; if(a==='7️⃣')state.life.got777=true; const mult=comboMult(); const w=Math.round(state.bet*PAY3[a]*mult*winMult()); const net=applyWin(w); updateUI(); setCombo(); const big=PAY3[a]>=25||mult>=2.5; setMsg('TRIPLE'+(mult>1?' x'+fmtMult(mult):'')+' +'+fmt(w), big?'big':''); celebrate(big); offerGamble(net); saveState(); return;
    }
    const bones=t.filter(function(s){return s==='🦴';}).length;
    if(bones>0){ if(!isRespin && respinProcs()){ respin(wasHeld); return; } combo=0; _tripleStreak=0; const _p=boneEscPct(); const pen=Math.max(1,Math.round(state.bet*bones*(1+_p))); var _bprev=state.credits; state.credits=Math.max(0,state.credits-pen); var _bloss=_bprev-state.credits; state.life.boneHits=(state.life.boneHits||0)+1; if(_bloss>(state.life.maxBoneLoss||0)) state.life.maxBoneLoss=_bloss; if(_bloss>=250000 && state.credits>=MIN_BET) state.life.survivedBigBone=true; updateUI(); setCombo(); setMsg('-'+fmt(pen)+'$','bad'); const cab=document.getElementById('cabinet'); cab.classList.add('bad'); setTimeout(function(){cab.classList.remove('bad');},600); sBad(); saveState(); checkBroke(); return; }
    const ch=t.filter(function(s){return s==='🍒';}).length;
    const chFresh=[0,1,2].filter(function(i){ return t[i]==='🍒' && !wasHeld[i]; }).length;
    var _cnt={}; for(var _i=0;_i<3;_i++){ _cnt[t[_i]]=(_cnt[t[_i]]||0)+1; } var _ws=null,_pv=0; for(var _s in _cnt){ if(_cnt[_s]===2 && PAIR2[_s]!=null && PAIR2[_s]>_pv){ _pv=PAIR2[_s]; _ws=_s; } } if(ch===1 && CH1>_pv){ _pv=CH1; _ws='🍒'; } var _fr=_ws!==null && [0,1,2].some(function(i){ return t[i]===_ws && !wasHeld[i]; }); if(_pv>0 && _fr){ combo++; if(combo>(state.life.bestCombo||0))state.life.bestCombo=combo; _tripleStreak=0; var _mult=comboMult(); var _w=Math.round(state.bet*_pv*_mult*winMult()); var _net=applyWin(_w); updateUI(); setCombo(); var _lbl=(_ws==='🍒'&&ch===1)?'1 CEREZA':('PAR '+_ws); setMsg(_lbl+(_mult>1?' x'+fmtMult(_mult):'')+' +'+fmt(_w), _mult>=2.5?'big':''); celebrate(_mult>=2.5); offerGamble(_net); saveState(); return; }
    combo=0; _tripleStreak=0; setCombo(); setMsg('SUERTE LA PROXIMA',false); saveState(); checkBroke();
  }

  function setBet(v){ v=Math.floor(v); if(isNaN(v)||v<MIN_BET)v=MIN_BET; if(state.credits>=MIN_BET && v>state.credits) v=state.credits; state.bet=v; document.getElementById('betInput').value=v; renderBetPresets(); updateUI(); saveState(); }
  function loanAvailable(){ return state.debt + LOAN <= creditLimit(); }
  function canLoan(){ return loanAvailable() && state.credits < MIN_BET; }
  function takeLoan(){ if(spinning) return; if(!loanAvailable()){ setMsg('LÍMITE DE PRÉSTAMOS ($'+fmt(creditLimit())+')',false); return; } if(state.credits>=MIN_BET){ setMsg('Solo podés pedir préstamo si no te alcanza para la apuesta mínima ($'+MIN_BET+')',false); return; } state.credits+=LOAN; state.debt+=Math.round(LOAN*(1+LOAN_FEE)); updateUI(); renderBank(); setMsg('PRÉSTAMO: +$'+fmt(LOAN)+' (debés $'+fmt(Math.round(LOAN*(1+LOAN_FEE)))+')',false); saveState(); }
  function buyVault(){ if(state.vault||state.debt>0||state.credits<CAJA_COST) return; state.credits-=CAJA_COST; state.vault=true; updateUI(); renderBank(); saveState(); }
  function deposit(a){ if(!state.vault) return; a=Math.floor(a); if(!a||a<1) return; a=Math.min(a, state.credits, Math.max(0, bankCap()-state.bank)); if(a<=0) return; state.credits-=a; state.bank+=a; state.life.firstDeposit=true; updateUI(); renderBank(); saveState(); }
  function withdraw(a){ if(!state.vault) return; a=Math.floor(a); if(!a||a<1) return; a=Math.min(a,state.bank); if(a<=0) return; state.bank-=a; state.credits+=a; updateUI(); renderBank(); saveState(); }
  function payDebt(fromBank){ if(state.debt<=0) return; const src=fromBank?state.bank:state.credits; const pp=Math.min(state.debt,src); if(pp<=0) return; state.debt-=pp; if(fromBank) state.bank-=pp; else state.credits-=pp; updateUI(); renderBank(); saveState(); }
  function renderBank(){
    const el=document.getElementById('bankBody'); if(!el) return; updateModalMoney();
    const v=state.vault; let h='';
    h+='<div class="bank-layout"><div class="bank-vault-col">';
    h+='<div class="shop-section">CAJA FUERTE</div>';
    var _ti=vaultSkinIdx(), _sk=VAULT_SKINS[_ti];
    if(!v){
      h+='<div class="vault-tier">'+VAULT_NAMES[_ti]+'</div><div class="vault">'+buildVaultSVG(_sk,false)+'</div>';
      h+='<div class="bank-note">Guardá plata a salvo: lo que está en el banco <b>no se pierde</b> con las espinas 🦴.</div>';
      h+='<div class="bank-row"><span>Comprar Caja fuerte</span><button id="bkVault" class="bank-btn"'+((state.credits<CAJA_COST||state.debt>0)?' disabled':'')+'>$'+fmt(CAJA_COST)+'</button></div>';
      if(state.debt>0) h+='<div class="bank-note">Pagá tu deuda antes de comprar la caja fuerte.</div>';
    } else {
      var _vpct=bankCap()>0?Math.min(100,Math.round(state.bank/bankCap()*100)):0; h+='<div class="vault-tier">'+VAULT_NAMES[_ti]+'</div><div class="vault">'+buildVaultSVG(_sk,true,_vpct)+'<div class="vault-label">💰 <b>$'+fmt(state.bank)+'</b> / $'+fmt(bankCap())+' · '+_vpct+'%</div></div>'; h+='<div class="bank-io"><input id="bkAmt" class="bank-input" type="number" min="1" placeholder="monto"><button id="bkDep" class="bank-btn">Depositar</button><button id="bkWit" class="bank-btn">Retirar</button></div>';
      h+='<div class="bank-quick"><button id="bkDepAll" class="bank-mini">Depositar todo</button><button id="bkWitAll" class="bank-mini">Retirar todo</button></div>';
      h+='<div class="bank-note">'+(state.bank>=bankCap()?'¡Caja fuerte llena! ':'')+'Subí el tope con 🔒 Tope del banco (en el Limbo).</div>';
    }
    h+='</div><div class="bank-ops-col">';
    h+='<div class="shop-section">PRÉSTAMO</div>';
    if(state.debt>0) h+='<div class="bank-bal" style="color:var(--red)">Deuda: <b>-$'+fmt(state.debt)+'</b> <span style="font-size:13px;color:var(--muted)">(crece 3%/giro)</span></div>';
    const canLoan=loanAvailable() && state.credits<MIN_BET;
    h+='<div class="bank-row"><span>Pedir préstamo</span><button id="bkLoan" class="bank-btn"'+(canLoan?'':' disabled')+'>+$'+fmt(LOAN)+'</button></div>';
    h+='<div class="bank-note">Recibís $'+fmt(LOAN)+' pero sumás $'+fmt(Math.round(LOAN*(1+LOAN_FEE)))+' de deuda (interés inicial 10%, después crece 3%/giro).</div>';
    if(!loanAvailable()) h+='<div class="bank-note">Llegaste al tope de tu línea de crédito ($'+fmt(creditLimit())+').</div>';
    else if(state.credits>=MIN_BET) h+='<div class="bank-note">El préstamo solo aparece si no te alcanza para la apuesta mínima ($'+MIN_BET+').</div>';
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
    h+='</div></div>';
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
  function interestRate(){ return INT_RATES[Math.min(state.interestLevel||0, INT_RATES.length-1)] * (1 + 0.20*(state.meta.banker||0)); }
  function interestInterval(){ var base=INT_INTERVALS[Math.min(state.interestLevel||0, INT_INTERVALS.length-1)]; if(base<=0) return base; return Math.max(5, base - 3*(state.meta.premiumvault||0)); }
  function accrueInterest(){ if((state.interestLevel||0)<=0 || state.bank<=0) return; state.intSpins=(state.intSpins||0)+1; if(state.intSpins>=interestInterval()){ state.intSpins=0; const g=Math.floor(state.bank*interestRate()); if(g>0){ state.bank+=g; state.life.gotInterest=true; } } }
  function buyCredit(){ if(state.debt>0||state.creditLevel>=CREDIT_LIMITS.length-1) return; const cost=CREDIT_COSTS[state.creditLevel]; if(state.credits<cost) return; state.credits-=cost; state.creditLevel++; updateUI(); renderBank(); saveState(); }
  function buyInterest(){ if(state.debt>0||!state.vault||state.interestLevel>=INT_RATES.length-1) return; const cost=INT_COSTS[state.interestLevel]; if(state.credits<cost) return; state.credits-=cost; state.interestLevel++; updateUI(); renderBank(); saveState(); }
  function fullReset(){ exitBankruptcy(); state.credits=START; state.jackpot=JP_BASE; state.bet=MIN_BET; state.debt=0; state.bank=0; state.vault=false; state.creditLevel=0; state.interestLevel=0; state.intSpins=0; state.upg={win:0,combo:0,cat:0,bone:0}; state.abilities={hold:false,gamble:false}; state.holdLevel=0; state.superLevel=0; state.bankUnlocked=false; _lifeUsed=false; state.introSeen=false; state.kattoSeen=false; state.discount=null; state.meta={spirits:0,chest:0,credit:0,luck:0,cap:0,armor:0,jpboost:0,respin:0,banktope:0,ninevidas:0,ectoboost:0,bankopen:0,vaultopen:0,banker:0,premiumvault:0,regular:0}; state.life={asc:0,ecto:0,bestJP:0,bestWorth:0,runs:0,deaths:0,bestGamble:0,bestCombo:0,got777:false,holyJackpot:false}; state.peak=START; state.runStartWorth=START; state.runJackpots=0; state.helpSeen=[]; state.runStart=Date.now(); _capMsgShown=false; luckyUntil=0; superReadyAt=0; document.body.classList.remove('supersuerte'); state.skillsUnlocked=false; combo=0; rebuildPool(); renderBetPresets(); document.getElementById('betInput').value=25; updateUI(); setCombo(); renderPaytable(); renderShop(); renderHold(); updateSuperUI(); saveState(); }
  const TXT_INTRO="¡MIAU! SOY KITTY. 🐱 BIENVENIDO A KITTY'S SLOTS.||TIRÁ LA PALANCA O TOCÁ GIRAR PARA JUGAR. ANTES, AJUSTÁ TU APUESTA.||PARA GANAR, FIJATE EN LA LISTA DE COMBINACIONES Y ARMÁ LAS QUE MÁS PAGAN. ¡3 GATOS = JACKPOT! 🐱||Y OJO CON LOS HUESOS DE PESCADO 🦴 — SUS ESPINAS PINCHAN TU BOLSILLO.||EN LA TIENDA ★ MEJORÁS TUS CHANCES. ¡SUERTE! 🐾";
  const TXT_KATTO_INTRO="¡EH, HOLA! SOY KATTO, EL HERMANO DE KITTY. 😺||ESTE ES MI PUESTITO: TODOS LOS DÍAS PONGO ALGO EN OFERTA.||EL DESCUENTO VARÍA — A VECES CHIQUITO, A VECES ENORME (HASTA -45%).||DATE UNA VUELTA SEGUIDO Y APROVECHÁ LAS REBAJAS. 🏷️||¡QUE TE VAYA BIEN! 🐾";
  var KATTO_MSGS=["¡Volviste! Pasá, mirá las ofertas de hoy. 😺","Vos tirás la palanca, yo me encargo de la tienda. 💰","Mi bigote es marca registrada, ¿eh? 🥸","Hoy la rebaja está buenísima, no te la pierdas.","Rebajas nuevas todos los días, fresquitas. 🐟","Tomate tu tiempo, igual la oferta dura un rato nomás.","Si encontrás algo más barato, te lo regalo. (Mentira, pero está barato.)","Un gusto tenerte por el puesto.","¿Buscás algo en especial? Capaz hoy está en oferta.","Llevátelo, te lo dejo a buen precio. 🏷️","Solía trabajar de bartender antes de ser dueño de este puestito..."]; var KATTO_HINTS=["¿Un secreto entre nosotros? El número del código de Mr.PIBBLE es el del cambio de milenio: 2000. 👀","A Mr.PIBBLE hay que llamarlo gritando: su nombre TODO en mayúsculas. El numerito ya lo escuchaste por ahí."];
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
  var _catWho='kitty';
  function typeCat(text){ _catFull=text; _catTyping=true; var el=document.getElementById('catSpeech'), cont=document.getElementById('catOk'); if(cont) cont.style.visibility='hidden'; if(el) el.textContent=''; var i=0; clearInterval(_catTimer); _catTimer=setInterval(function(){ if(i>=_catFull.length){ clearInterval(_catTimer); _catTyping=false; if(cont) cont.style.visibility='visible'; return; } var ch=_catFull.charAt(i); if(el){ el.textContent += (ch==='|') ? String.fromCharCode(10) : ch; } if(ch!==' ' && ch!=='|') sfx((_catWho==='katto'?330:715)+Math.random()*90,0.02,0.035,'square'); i++; }, 42); }
  function catSkip(){ if(!_catTyping) return; clearInterval(_catTimer); _catTyping=false; var el=document.getElementById('catSpeech'), cont=document.getElementById('catOk'); if(el) el.textContent=_catFull.split('|').join(String.fromCharCode(10)); if(cont) cont.style.visibility='visible'; }
  function closeCat(){ var m=document.getElementById('catModal'); if(m){ m.classList.remove('open'); m.classList.remove('katto'); } _catWho='kitty'; catMode=false; pibbleMode=false; setCatLogin(false); if(_afterCat){ var f=_afterCat; _afterCat=null; setTimeout(f,120); } }
  function showCat(text, who){ var m=document.getElementById('catModal'); if(!m) return; _catWho=who||'kitty'; _introStep=-1; _catWaiting=false; setCatLogin(false); var cont=document.getElementById('catOk'); if(cont) cont.textContent='▶ TOCÁ PARA SEGUIR'; var ci=m.querySelector('.cat-img'); if(ci){ ci.onerror=function(){ this.onerror=null; this.src='assets/cat-mascot.png'; }; ci.src=(_catWho==='katto')?'assets/katto-mascot.png':(_catWho==='pibble')?'assets/pibble-mascot.png':'assets/cat-mascot.png'; } m.classList.toggle('katto', _catWho==='katto'); var _cn=document.getElementById('catName'); if(_cn) _cn.textContent = (_catWho==='pibble')?'Mr.PIBBLE':''; m.classList.add('open'); if(state.musicOn){ if(_catWho==='katto'){ shopMode=true; catMode=false; pibbleMode=false; } else if(_catWho==='pibble'){ pibbleMode=true; catMode=false; shopMode=false; } else { catMode=true; pibbleMode=false; } if(!musicPlaying) startMusic(); } typeCat(text); }
  function kattoTalk(){ showCat(KATTO_MSGS[Math.floor(Math.random()*KATTO_MSGS.length)], 'katto'); }
  var _kattoTimer=null, _kattoTypeT=null;
  function kattoSpeak(){ var b=document.getElementById('kattoBubble'); if(!b){ kattoTalk(); return; } clearTimeout(_kattoTimer); clearInterval(_kattoTypeT); var _kp=state.pibble?KATTO_MSGS:KATTO_MSGS.concat(KATTO_HINTS); var msg=_kp[Math.floor(Math.random()*_kp.length)]; b.classList.add('show'); b.textContent=''; var i=0; _kattoTypeT=setInterval(function(){ if(i>=msg.length){ clearInterval(_kattoTypeT); _kattoTimer=setTimeout(function(){ b.classList.remove('show'); }, 3500); return; } var ch=msg.charAt(i); b.textContent+=ch; if(ch!==' ' && typeof sfx==='function') sfx(330+Math.random()*90,0.02,0.035,'square'); i++; }, 42); }
  function kattoIntroOnce(){ if(state.kattoSeen) return; state.kattoSeen=true; saveState(); showCat(TXT_KATTO_INTRO, 'katto'); }
  function advancePastLogin(){ if(_introStep!==0) return; setCatLogin(false); _introStep=1; _introText=TXT_INTRO; if(_catWaiting) return; var cont=document.getElementById('catOk'); if(cont) cont.textContent='▶ ¡A JUGAR!'; typeCat(TXT_INTRO); }
  function showIntro(){ var m=document.getElementById('catModal'); if(!m) return; unlockHelp('intro'); unlockHelp('cuenta'); if(fbUser){ _introStep=1; _introText=TXT_INTRO; } else { _introStep=0; _introText=TXT_LOGIN; } setCatLogin(false); _catWaiting=true; var el=document.getElementById('catSpeech'); if(el) el.textContent=''; var cont=document.getElementById('catOk'); if(cont){ cont.textContent='▶ TOCÁ PARA EMPEZAR'; cont.style.visibility='visible'; } m.classList.add('open'); }
  function unlockBank(reason){ if(state.bankUnlocked) return; state.bankUnlocked=true; var b=document.getElementById('bankBtn'); if(b){ b.disabled=false; b.textContent='🏦 BANCO'; } unlockHelp('bank'); setMsg('🏦 ¡BANCO DESBLOQUEADO!',false); showCat(reason==='rich'?TXT_BANK_RICH:TXT_BANK_BROKE); saveState(); }
  var META={ armor:{name:'🛡️ Protección anti-espinas', desc:'Las espinas pegan menos fuerte (compensa el daño que sube por cada renacimiento)', max:100, cost:function(l){return Math.round(25+l*8+l*l*0.6);}}, respin:{name:'🔄 Re-giro', desc:'Si salen espinas, probabilidad de volver a girar gratis (+8% por nivel)', max:5, cost:function(l){return Math.round(60+l*40);}, req:{k:'armor',n:2}}, chest:{name:'🪙 Cofre inicial', desc:'Empezás con +$500 por nivel', max:20, cost:function(l){return Math.round(25+l*18);}}, luck:{name:'✨ Patita de la suerte', desc:'+5% a TODO lo que ganás, para siempre', max:16, cost:function(l){return Math.round(30+l*22);}, req:{k:'armor',n:1}}, cap:{name:'🏔️ Techo de plata', desc:'Sube el tope de plata de la partida', max:CAP_TIERS.length-1, cost:function(l){return Math.round(220*Math.pow(1.55,l));}, req:{k:'luck',n:1}}, banktope:{name:'🔒 Tope del banco', desc:'Subí cuánta plata podés guardar a salvo en la caja fuerte', max:BANK_TIERS.length-1, cost:function(l){return Math.round(130*Math.pow(1.7,l));}, req:{k:'chest',n:1}}, jpboost:{name:'🎰 Bote mayor', desc:'Sube el multiplicador del bote (+20 por nivel)', max:16, cost:function(l){return Math.round(45+l*34);}, req:{k:'luck',n:1}}, credit:{name:'🏦 Crédito inicial', desc:'Arrancás con más préstamos disponibles', max:5, cost:function(l){return Math.round(60+l*50);}, req:{k:'chest',n:1}}, ninevidas:{name:'👻 Nueve vidas', desc:'1 vez por partida: chance de zafar de la bancarrota', max:5, cost:function(l){return Math.round(150*Math.pow(1.65,l));}, req:{k:'armor',n:3}}, ectoboost:{name:'👻 Ectofichas+', desc:'+3% ectofichas al terminar, por nivel', max:10, cost:function(l){return Math.round(45+l*36);}, req:{k:'luck',n:2}}, bankopen:{name:'🏦 Banco desbloqueado', desc:'Arrancás con el panel del banco abierto', max:1, cost:function(l){return 500;}}, vaultopen:{name:'🔓 Caja fuerte lista', desc:'Arrancás con la caja fuerte ya comprada', max:1, cost:function(l){return 1200;}, req:{k:'bankopen',n:1}}, banker:{name:'💰 Banquero experto', desc:'+20% a la tasa del interés por nivel', max:6, cost:function(l){return Math.round(110*Math.pow(1.6,l));}, req:{k:'vaultopen',n:1}}, premiumvault:{name:'🏦 Caja fuerte premium', desc:'El interés ocurre más seguido (-3 giros/nivel)', max:4, cost:function(l){return Math.round(160*Math.pow(1.7,l));}, req:{k:'banker',n:2}}, regular:{name:'🛒 Cliente regular', desc:'Sube un poco la chance de mejores descuentos y acorta la espera de la próxima rebaja', max:6, cost:function(l){return Math.round(80*Math.pow(1.55,l));}, req:{k:'chest',n:1}} };
  var _lastEarned=0, _limboMode='death', _capMsgShown=false, _limboTab='resumen', _shopTab='mejoras';
  function jpMult(){ return JP_BASE_MULT + ((state.meta&&state.meta.jpboost)||0)*20; }
  function capValue(){ return CAP_TIERS[Math.min(state.meta.cap||0, CAP_TIERS.length-1)]; }
  function bankCap(){ return BANK_TIERS[Math.min(state.meta.banktope||0, BANK_TIERS.length-1)]; }
  // ===== Skins de boveda (evolucionan con el Tope del banco; Kitty por ascensiones) =====
  var _VD='#0a0618';
  var VAULT_NAMES=['🏦 Boveda de Hierro','🔒 Boveda Reforzada','💰 Boveda Dorada','💎 Boveda Diamante','👻 Boveda del Limbo','🐱 Boveda de Kitty'];
  var VAULT_SKINS=[
    // 0 Hierro — gris
    { f:['#f1f1f6','#c6c6d3','#8e8e9d','#676775'], rim:'#52525f', rim2:'#2b2b36', metal:'#9a9aa8', bolt:'#7a7a88', sp:['#edeef3','#b7b7c4','#7c7c8b'], accent:'#39e0e6', x:{} },
    // 1 Reforzada — gris más oscuro + más remaches
    { f:['#d6d6df','#a6a6b4','#70707e','#43434f'], rim:'#34343f', rim2:'#1d1d25', metal:'#7e7e8c', bolt:'#56566280', sp:['#cfcfd8','#9a9aa8','#62626f'], accent:'#39e0e6', x:{rivets:true} },
    // 2 Dorada — dorada + ornamentos
    { f:['#fff4cc','#ffd23f','#d9a521','#9c7414'], rim:'#7a5c12', rim2:'#4a3608', metal:'#e8be4e', bolt:'#c89a2a', sp:['#ffe9a8','#ffce5a','#c89a2a'], accent:'#fff0b0', x:{ornate:true} },
    // 3 Diamante — azulada + brillos
    { f:['#eef8ff','#bce4fb','#7fc0ec','#4a90c2'], rim:'#2e5a78', rim2:'#16344a', metal:'#a9d4ee', bolt:'#7aa9c8', sp:['#e6f5ff','#aadcf7','#6aa6cc'], accent:'#eaffff', x:{sparkle:true} },
    // 4 Limbo — violeta + runas + ojos de gato
    { f:['#e0ccff','#a45cff','#6d34c4','#3f1d7a'], rim:'#2a1352', rim2:'#160830', metal:'#9a6ce0', bolt:'#7a4fc0', sp:['#d8c2ff','#a45cff','#6d34c4'], accent:'#ff3d8b', eye:'#b6ff5a', x:{runes:true, eyes:true} },
    // 5 Kitty — legendaria + orejitas
    { f:['#ffe6f4','#ff9ed6','#f06bb0','#c43d86'], rim:'#9c2d6e', rim2:'#5e1843', metal:'#ffc4e6', bolt:'#ff9ed6', sp:['#ffd8ee','#ff9ed6','#e06bb0'], accent:'#ffd23f', x:{ears:true, ornate:true} },
  ];

  // extras dibujados sobre la cara de la puerta (centrada en cx,cy con radio r)
  function vaultExtras(s, cx, cy){
    var x=s.x, h='';
    if(x.rivets){ // anillo extra de remaches entre los existentes (r76)
      var pts=[[170.2,125.1],[129.1,166.2],[70.9,166.2],[29.8,125.1],[29.8,66.9],[70.9,25.8],[129.1,25.8],[170.2,66.9]];
      h+='<g fill="'+s.bolt+'" stroke="'+_VD+'" stroke-width="1.5">'; pts.forEach(function(p){ h+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="3"/>'; }); h+='</g>';
    }
    if(x.ornate){ // anillo de cuentas ornamental
      h+='<circle cx="'+cx+'" cy="'+cy+'" r="76" fill="none" stroke="'+s.accent+'" stroke-width="3" stroke-dasharray="2 7" opacity=".75"/>';
      h+='<circle cx="'+cx+'" cy="'+cy+'" r="55" fill="none" stroke="'+s.accent+'" stroke-width="1.5" stroke-dasharray="1 5" opacity=".55"/>';
    }
    if(x.sparkle){ // destellos de diamante
      var st=[[78,52,7],[150,70,5],[64,128,5],[140,140,6]];
      h+='<g fill="#ffffff">'; st.forEach(function(p){ var X=p[0],Y=p[1],R=p[2]; h+='<path d="M'+X+' '+(Y-R)+' L'+(X+R*0.28)+' '+(Y-R*0.28)+' L'+(X+R)+' '+Y+' L'+(X+R*0.28)+' '+(Y+R*0.28)+' L'+X+' '+(Y+R)+' L'+(X-R*0.28)+' '+(Y+R*0.28)+' L'+(X-R)+' '+Y+' L'+(X-R*0.28)+' '+(Y-R*0.28)+' Z"/>'; }); h+='</g>';
    }
    if(x.runes){ // runas espectrales alrededor del anillo interno
      var ru=[[100,30,'M-4 -5 L4 -5 L-1 2 L5 2'],[143,55,'M-3 -5 L3 -6 L0 0 L4 4'],[160,118,'M-4 -4 L4 -4 M0 -4 L0 5'],[122,160,'M-4 -5 L0 4 L4 -5'],[58,160,'M-3 -5 L3 -5 L3 4 L-3 4'],[40,78,'M-4 4 L0 -5 L4 4 M-2 0 L2 0']];
      h+='<g stroke="'+s.accent+'" stroke-width="3.4" fill="none" stroke-linecap="round" opacity=".35">'; ru.forEach(function(r){ h+='<g transform="translate('+r[0]+','+r[1]+')"><path d="'+r[2]+'"/></g>'; }); h+='</g>';
      h+='<g stroke="'+s.accent+'" stroke-width="1.6" fill="none" stroke-linecap="round">'; ru.forEach(function(r){ h+='<g transform="translate('+r[0]+','+r[1]+')"><path d="'+r[2]+'"/></g>'; }); h+='</g>';
    }
    if(x.eyes){ // ojos de gato grabados (flanquean el cubo central)
      [[68,74],[132,74]].forEach(function(e){ var X=e[0],Y=e[1];
        h+='<g transform="translate('+X+','+Y+')">';
        h+='<ellipse cx="0" cy="0" rx="13" ry="8" fill="'+s.eye+'" opacity=".22"/>';
        h+='<path d="M-12 0 Q0 -9 12 0 Q0 9 -12 0 Z" fill="'+s.eye+'"/>';
        h+='<ellipse cx="0" cy="0" rx="2.6" ry="6.5" fill="'+_VD+'"/>';
        h+='</g>';
      });
    }
    return h;
  }

  // orejitas de gato (van por fuera del círculo, arriba) — solo Kitty
  function vaultEars(s){
    return '<g stroke="'+_VD+'" stroke-width="3.5" stroke-linejoin="round">'+
      '<path d="M58 44 L70 5 L97 35 Z" fill="'+s.metal+'"/>'+
      '<path d="M142 44 L130 5 L103 35 Z" fill="'+s.metal+'"/>'+
      '<path d="M67 38 L73 16 L88 33 Z" fill="'+s.f[2]+'" stroke="none"/>'+
      '<path d="M133 38 L127 16 L112 33 Z" fill="'+s.f[2]+'" stroke="none"/>'+
      '</g>';
  }

  function buildVaultSVG(s, open, fillPct){
    var faceStops='<stop offset="0%" stop-color="'+s.f[0]+'"/><stop offset="42%" stop-color="'+s.f[1]+'"/><stop offset="78%" stop-color="'+s.f[2]+'"/><stop offset="100%" stop-color="'+s.f[3]+'"/>';
    var spStops='<stop offset="0%" stop-color="'+s.sp[0]+'"/><stop offset="50%" stop-color="'+s.sp[1]+'"/><stop offset="100%" stop-color="'+s.sp[2]+'"/>';
    var _fp=(typeof fillPct==='number')?Math.max(0,Math.min(100,fillPct)):60;
    var _sy=Math.round(166-_fp*1.28);
    var _coins=(_fp>6)?('<g fill="#ffe27a" stroke="#b8881c" stroke-width="1"><circle cx="62" cy="'+(_sy+7)+'" r="6"/><circle cx="86" cy="'+(_sy+1)+'" r="6.5"/><circle cx="110" cy="'+(_sy+7)+'" r="6"/></g>'):'';
    var goldGroup='<g clip-path="url(#voCav)"><path d="M 12 '+_sy+' Q 86 '+(_sy+12)+' 160 '+_sy+' L 160 174 L 12 174 Z" fill="url(#voGold)"/>'+_coins+'</g>';
    if(!open){
      // ---------- CERRADA (centro 100,96, envuelto en translate(20,0)) ----------
      return '<svg viewBox="0 0 240 192" class="vault-svg" xmlns="http://www.w3.org/2000/svg">'+
        '<defs>'+
        '<radialGradient id="vcFace" cx="38%" cy="30%" r="78%">'+faceStops+'</radialGradient>'+
        '<linearGradient id="vcSpoke" x1="0" y1="0" x2="0" y2="1">'+spStops+'</linearGradient>'+
        '<radialGradient id="vcHub" cx="40%" cy="34%" r="72%"><stop offset="0%" stop-color="#3c2d62"/><stop offset="100%" stop-color="#1b1136"/></radialGradient>'+
        '</defs>'+
        '<g transform="translate(20,0)">'+
        (s.x.ears?vaultEars(s):'')+
        '<circle cx="100" cy="96" r="90" fill="'+s.rim+'" stroke="'+_VD+'" stroke-width="4"/>'+
        '<circle cx="100" cy="96" r="90" fill="none" stroke="'+s.rim2+'" stroke-width="2"/>'+
        '<rect x="2" y="44" width="20" height="26" rx="2" fill="'+s.metal+'" stroke="'+_VD+'" stroke-width="3"/>'+
        '<rect x="2" y="122" width="20" height="26" rx="2" fill="'+s.metal+'" stroke="'+_VD+'" stroke-width="3"/>'+
        '<circle cx="100" cy="96" r="82" fill="url(#vcFace)" stroke="'+_VD+'" stroke-width="4"/>'+
        '<circle cx="100" cy="96" r="72" fill="none" stroke="rgba(255,255,255,.45)" stroke-width="2"/>'+
        '<circle cx="100" cy="96" r="67" fill="none" stroke="rgba(0,0,0,.18)" stroke-width="1.5"/>'+
        '<g fill="'+s.bolt+'" stroke="'+_VD+'" stroke-width="1.5"><circle cx="176" cy="96" r="3.5"/><circle cx="154" cy="150" r="3.5"/><circle cx="100" cy="172" r="3.5"/><circle cx="46" cy="150" r="3.5"/><circle cx="24" cy="96" r="3.5"/><circle cx="46" cy="42" r="3.5"/><circle cx="100" cy="20" r="3.5"/><circle cx="154" cy="42" r="3.5"/></g>'+
        vaultExtras(s,100,96)+
        '<g stroke="url(#vcSpoke)" stroke-width="7" stroke-linecap="round"><line x1="100" y1="30" x2="100" y2="162"/><line x1="34" y1="96" x2="166" y2="96"/><line x1="53" y1="49" x2="147" y2="143"/><line x1="147" y1="49" x2="53" y2="143"/></g>'+
        '<circle cx="148" cy="96" r="13" fill="'+s.metal+'" stroke="'+_VD+'" stroke-width="3"/><circle cx="148" cy="96" r="4" fill="#241046"/>'+
        '<circle cx="100" cy="96" r="24" fill="url(#vcHub)" stroke="'+_VD+'" stroke-width="3"/>'+
        '<circle cx="100" cy="96" r="24" fill="none" stroke="'+s.accent+'" stroke-width="2" opacity=".9"/>'+
        '<g stroke="'+s.accent+'" stroke-width="3" stroke-linecap="round" opacity=".92"><line x1="100" y1="78" x2="100" y2="114"/><line x1="84" y1="96" x2="116" y2="96"/><line x1="89" y1="85" x2="111" y2="107"/><line x1="111" y1="85" x2="89" y2="107"/></g>'+
        '<circle cx="100" cy="96" r="6" fill="#241046" stroke="'+s.accent+'" stroke-width="1.5"/>'+
        '<ellipse cx="72" cy="60" rx="34" ry="19" fill="#ffffff" opacity=".12"/>'+
        '</g></svg>';
    } else {
      // ---------- ABIERTA (frame en 86,96; puerta en translate(156,96); todo en translate(6,0)) ----------
      return '<svg viewBox="0 0 240 192" class="vault-svg" xmlns="http://www.w3.org/2000/svg">'+
        '<defs>'+
        '<radialGradient id="voFace" cx="38%" cy="30%" r="78%">'+faceStops+'</radialGradient>'+
        '<linearGradient id="voSpoke" x1="0" y1="0" x2="0" y2="1">'+spStops+'</linearGradient>'+
        '<radialGradient id="voHub" cx="40%" cy="34%" r="72%"><stop offset="0%" stop-color="#3c2d62"/><stop offset="100%" stop-color="#1b1136"/></radialGradient>'+
        '<radialGradient id="voInside" cx="50%" cy="40%" r="75%"><stop offset="0%" stop-color="#241046"/><stop offset="100%" stop-color="#0a0618"/></radialGradient>'+
        '<linearGradient id="voGold" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#ffe27a"/><stop offset="55%" stop-color="#ffd23f"/><stop offset="100%" stop-color="#b8881c"/></linearGradient>'+
        '<clipPath id="voCav"><circle cx="86" cy="96" r="74"/></clipPath>'+
        '</defs>'+
        '<g transform="translate(6,0)">'+
        '<circle cx="86" cy="96" r="88" fill="'+s.rim+'" stroke="'+_VD+'" stroke-width="4"/>'+
        '<circle cx="86" cy="96" r="74" fill="url(#voInside)" stroke="'+_VD+'" stroke-width="3"/>'+
        '<path d="M 86 22 A 74 74 0 0 1 86 170 A 60 74 0 0 0 86 22 Z" fill="'+s.rim+'" opacity=".95"/>'+
        '<path d="M 86 22 A 74 74 0 0 1 86 170 A 60 74 0 0 0 86 22 Z" fill="none" stroke="'+_VD+'" stroke-width="2"/>'+
        goldGroup+
        '<rect x="120" y="50" width="34" height="13" rx="2" fill="'+s.metal+'" stroke="'+_VD+'" stroke-width="3"/>'+
        '<rect x="120" y="129" width="34" height="13" rx="2" fill="'+s.metal+'" stroke="'+_VD+'" stroke-width="3"/>'+
        '<g transform="translate(156,96) rotate(7)">'+
        (s.x.ears?'<g stroke="'+_VD+'" stroke-width="3.5" stroke-linejoin="round"><path d="M-42 -52 L-30 -88 L-3 -58 Z" fill="'+s.metal+'"/><path d="M42 -52 L30 -88 L3 -58 Z" fill="'+s.metal+'"/><path d="M-33 -58 L-27 -78 L-12 -60 Z" fill="'+s.f[2]+'" stroke="none"/><path d="M33 -58 L27 -78 L12 -60 Z" fill="'+s.f[2]+'" stroke="none"/></g>':'')+
        '<ellipse cx="-4" cy="0" rx="13" ry="78" fill="'+s.f[2]+'" stroke="'+_VD+'" stroke-width="3"/>'+
        '<g fill="'+s.metal+'" stroke="'+_VD+'" stroke-width="2"><rect x="-26" y="-46" width="16" height="9" rx="2"/><rect x="-26" y="-6" width="16" height="9" rx="2"/><rect x="-26" y="34" width="16" height="9" rx="2"/></g>'+
        '<circle cx="0" cy="0" r="76" fill="url(#voFace)" stroke="'+_VD+'" stroke-width="4"/>'+
        '<circle cx="0" cy="0" r="66" fill="none" stroke="rgba(255,255,255,.45)" stroke-width="2"/>'+
        '<circle cx="0" cy="0" r="61" fill="none" stroke="rgba(0,0,0,.18)" stroke-width="1.5"/>'+
        '<g fill="'+s.bolt+'" stroke="'+_VD+'" stroke-width="1.5"><circle cx="70" cy="0" r="3.3"/><circle cx="49" cy="49" r="3.3"/><circle cx="0" cy="70" r="3.3"/><circle cx="-49" cy="49" r="3.3"/><circle cx="-49" cy="-49" r="3.3"/><circle cx="0" cy="-70" r="3.3"/><circle cx="49" cy="-49" r="3.3"/></g>'+
        (s.x.ornate?'<circle cx="0" cy="0" r="70" fill="none" stroke="'+s.accent+'" stroke-width="3" stroke-dasharray="2 7" opacity=".75"/>':'')+
        (s.x.sparkle?'<g fill="#ffffff"><path d="M-20 -44 L-14 -38 L-8 -44 L-14 -50 Z"/><path d="M40 -10 L45 -5 L50 -10 L45 -15 Z"/><path d="M-30 30 L-25 35 L-20 30 L-25 25 Z"/></g>':'')+
        (s.x.runes?'<g stroke="'+s.accent+'" stroke-width="1.6" fill="none" stroke-linecap="round"><g transform="translate(0,-58)"><path d="M-4 -5 L4 -5 L-1 2 L5 2"/></g><g transform="translate(52,-20)"><path d="M-4 -4 L4 -4 M0 -4 L0 5"/></g><g transform="translate(-52,30)"><path d="M-3 -5 L3 -5 L3 4 L-3 4"/></g></g>':'')+
        (s.x.eyes?'<g transform="translate(-34,-22)"><path d="M-11 0 Q0 -8 11 0 Q0 8 -11 0 Z" fill="'+s.eye+'"/><ellipse rx="2.3" ry="5.6" fill="'+_VD+'"/></g><g transform="translate(34,-22)"><path d="M-11 0 Q0 -8 11 0 Q0 8 -11 0 Z" fill="'+s.eye+'"/><ellipse rx="2.3" ry="5.6" fill="'+_VD+'"/></g>':'')+
        '<g stroke="url(#voSpoke)" stroke-width="6.5" stroke-linecap="round"><line x1="0" y1="-62" x2="0" y2="62"/><line x1="-62" y1="0" x2="62" y2="0"/><line x1="-44" y1="-44" x2="44" y2="44"/><line x1="44" y1="-44" x2="-44" y2="44"/></g>'+
        '<circle cx="42" cy="0" r="12" fill="'+s.metal+'" stroke="'+_VD+'" stroke-width="3"/><circle cx="42" cy="0" r="4" fill="#3c2d62"/>'+
        '<circle cx="0" cy="0" r="22" fill="url(#voHub)" stroke="'+_VD+'" stroke-width="3"/>'+
        '<circle cx="0" cy="0" r="22" fill="none" stroke="'+s.accent+'" stroke-width="2" opacity=".9"/>'+
        '<g stroke="'+s.accent+'" stroke-width="3" stroke-linecap="round" opacity=".92"><line x1="0" y1="-16" x2="0" y2="16"/><line x1="-16" y1="0" x2="16" y2="0"/><line x1="-11" y1="-11" x2="11" y2="11"/><line x1="11" y1="-11" x2="-11" y2="11"/></g>'+
        '<circle cx="0" cy="0" r="5.5" fill="#241046" stroke="'+s.accent+'" stroke-width="1.5"/>'+
        '<ellipse cx="-26" cy="-34" rx="30" ry="17" fill="#ffffff" opacity=".12"/>'+
        '</g></g></svg>';
    }
  }
  function vaultSkinIdx(){ var asc=(state.life&&state.life.asc)||0; if(asc>=15) return 5; return Math.min(4, (state.meta&&state.meta.banktope)||0); }

  function fmtCap(n){ if(n>=1e6) return '$'+(n/1e6).toLocaleString('es-AR')+'M'; return '$'+fmt(n); }
  function boneEscPct(){ var asc=(state.life&&state.life.asc)||0; var arm=state.meta.armor||0; var r=Math.max(0, Math.min(1, (asc-arm)/100)); return 0.10 + 0.30*r; }
  function boneLoseFrac(){ return Math.max(0.25, 1-(state.meta.armor||0)*0.0075); }
  function respinChance(){ return Math.min(0.5, (state.meta.respin||0)*0.08); }
  function respinProcs(){ return (state.meta.respin||0)>0 && Math.random()<respinChance(); }
  function respin(keep){ keep=keep||[false,false,false]; spinning=true; setSpinUI(true); setMsg('🔄 ¡RE-GIRO!',false); held=keep.slice(); renderHold(); var t=[0,1,2].map(function(i){ return keep[i]?cur[i]:randSym(); }); var spinIdx=[0,1,2].filter(function(i){ return !keep[i]; }); if(spinIdx.length===0){ held=[false,false,false]; renderHold(); finish(t,true,keep); return; } var done=0; spinIdx.forEach(function(i,k){ spinReel(REEL[i],CV[i],t[i],600+k*350,function(){ done++; if(done===spinIdx.length){ held=[false,false,false]; renderHold(); finish(t,true,keep); } }); }); }
  function fmtDur(ms){ var s=Math.max(0,Math.floor(ms/1000)); var m=Math.floor(s/60); s=s%60; return (m>0?(m+'m '):'')+(s<10&&m>0?'0':'')+s+'s'; }
  function limboEarn(){ var _div=3000*Math.sqrt(capValue()/1e6); var base=Math.max(0, Math.floor(((state.peak||0)-(state.runStartWorth||START))/_div))+(state.runJackpots||0)*5; return Math.round(base*(1+0.03*(state.meta.ectoboost||0))); }
  function limboMusic(){ if(state.musicOn){ catMode=true; if(!musicPlaying) startMusic(); } }
  function bankMusic(){ bankMode=true; catMode=false; if(state.musicOn && !musicPlaying) startMusic(); }
  function updateLimboBtn(){ var b=document.getElementById('limboBtn'); if(!b) return; if(state.limboUnlocked){ b.disabled=false; b.textContent='👻 LIMBO'; } else { b.disabled=true; b.textContent='🔒 LIMBO'; } }
  function openLimboHub(){ if(spinning) return; if(!explainLimboOnce(function(){ openLimboPanel(false); })){ openLimboPanel(false); } }
  function ascend(){ var earned=limboEarn(); if(earned<=0) return; if(!confirm('¿ASCENDER? Perdés esta partida pero te llevás +'+earned+' 👻 y reiniciás con tus mejoras permanentes.')) return; state.meta.spirits+=earned; state.life.asc=(state.life.asc||0)+1; state.life.ecto=(state.life.ecto||0)+earned; _lastEarned=earned; _limboMode='death'; renderLimbo(); if(_logrosReady) checkLogros(); saveState(); }
  function closeLimbo(){ document.getElementById('limbo').classList.remove('open'); catMode=false; clearInterval(_cornerTypeT); clearTimeout(_cornerTimer); var _cb=document.getElementById('cornerCatBubble'); if(_cb) _cb.classList.remove('show'); }
  var _afterCat=null; var PET_LINES=['Zzz','Im pibble','Wash my belly','Clean my belly','Belly belly']; var _petTimer=null; function petTalk(){ var pet=document.getElementById('pet'), b=document.getElementById('petBubble'); if(!pet||!b) return; var line=PET_LINES[Math.floor(Math.random()*PET_LINES.length)]; b.textContent=line; b.classList.add('show'); pokePet(); if(typeof sfx==='function') sfx(620+Math.random()*120, 0.03, 0.06, 'sine'); clearTimeout(_petTimer); _petTimer=setTimeout(function(){ b.classList.remove('show'); }, 2200); } var _pibbleSeq=[], _pibbleStep=0; function updatePet(){ var pet=document.getElementById('pet'); if(pet) pet.style.display = state.pibble ? 'block' : 'none'; } var _petLifeT=null, _pokeT=null; function pokePet(){ var pet=document.getElementById('pet'); if(pet){ clearTimeout(_pokeT); pet.classList.remove('poke'); void pet.offsetWidth; pet.classList.add('poke'); _pokeT=setTimeout(function(){ pet.classList.remove('poke'); }, 520); } } function petSay(txt,ms){ var b=document.getElementById('petBubble'); if(b){ b.textContent=txt; b.classList.add('show'); clearTimeout(_petTimer); _petTimer=setTimeout(function(){ b.classList.remove('show'); }, ms||1800); } } function petLifeTick(){ var pet=document.getElementById('pet'); var vis = state.pibble && pet && pet.style.display!=='none' && !document.querySelector('.overlay.open'); if(vis){ if(Math.random()<0.5){ pokePet(); } else { petSay('Zzz', 1700); } } scheduleNextPetLife(); } function scheduleNextPetLife(){ clearTimeout(_petLifeT); _petLifeT=setTimeout(petLifeTick, 7000+Math.random()*9000); } function startPibble(){ _pibbleSeq=[ {msg:'...', btn:'▶ ¿...?'}, {msg:'WASH MY BELLY|WAAASHH MY BELLY', btn:'🫧 lavarle la pancita'}, {msg:'CLEAN MY BELLY', btn:'🧼 limpiarle la pancita'}, {msg:'Yaaay! :D|*Mr.PIBBLE quedó limpio y feliz*', btn:'▶ awww 🤍'} ]; _pibbleStep=0; _afterCat=function(){ unlockPibble(); }; showCat(_pibbleSeq[0].msg, 'pibble'); var cont=document.getElementById('catOk'); if(cont) cont.textContent=_pibbleSeq[0].btn; } function unlockPibble(){ var nuevo=!state.pibble; if(nuevo){ state.pibble=true; saveState(); } updatePet(); var pm=document.getElementById('pfCodeMsg'); if(pm){ pm.textContent= nuevo ? '🐽 ¡Mr.PIBBLE ahora vive en tu pantalla principal! Tocalo para acariciarlo 🤍' : 'Mr.PIBBLE ya está con vos 🐽'; pm.className='pf-code-msg ok'; } }
  var CAT_FRASES=["La muzza de la pizzería es infinita... como mis ganas de Ectofichas. 🍕","Si la suerte se te pincha, en el taller la inflamos de nuevo. 🚲","En las cuevas más oscuras brillan las mejores fichas... no mires atrás. ⛏️","Yo también arranqué fundido. Hoy tengo locales por todos lados. 😎","Un jackpot sabe mejor que una porción recién salida del horno. 🍕","Pedaleá fuerte y el tope te queda cerca. 🚲","Algo se mueve allá abajo en la mina... vos seguí juntando. 👻","Las Ectofichas no se enfrían ni se pinchan. Por eso me encantan. ✨"]; var CAT_HINTS=["Escuché de una bolita blanca escondida por ahí... Mr.PIBBLE. Dicen que aparece si le tipeás un código secreto.","El código de Mr.PIBBLE empieza con su nombre, PIBBLE, y termina en un número bien redondo. 🤔"];
  var _cornerTimer=null, _cornerTypeT=null;
  function cornerCatSpeak(){ var b=document.getElementById('cornerCatBubble'); if(!b) return; clearTimeout(_cornerTimer); clearInterval(_cornerTypeT); var _cp=state.pibble?CAT_FRASES:CAT_FRASES.concat(CAT_HINTS); var msg=_cp[Math.floor(Math.random()*_cp.length)]; b.classList.add('show'); b.textContent=''; var i=0; _cornerTypeT=setInterval(function(){ if(i>=msg.length){ clearInterval(_cornerTypeT); _cornerTimer=setTimeout(function(){ b.classList.remove('show'); }, 4000); return; } var ch=msg.charAt(i); b.textContent+=ch; if(ch!==' ' && typeof sfx==='function') sfx(330+Math.random()*90,0.02,0.035,'square'); i++; }, 42); }
  function openLimboPanel(deathMode){ _limboTab='resumen'; _limboMode=deathMode?'death':'hub'; renderLimbo(); var _ov=document.getElementById('limbo'); _ov.classList.toggle('death-bg', !!deathMode); _ov.classList.add('open'); limboMusic(); }
  function explainLimboOnce(thenOpen, text){ if(state.limboIntroV2) return false; state.limboIntroV2=true; unlockHelp('limbo'); _afterCat=thenOpen||null; saveState(); showCat(text||TXT_LIMBO_TUT); return true; }
  // ===== BANCARROTA épica =====
  function drawSkull(cv){ if(!cv) return; var x=cv.getContext('2d'); x.imageSmoothingEnabled=false; x.clearRect(0,0,cv.width,cv.height); var sc=cv.width/32; x.save(); x.scale(sc,sc); x.fillStyle='#e9e9f2'; x.fillRect(9,4,14,3); x.fillRect(7,6,18,3); x.fillRect(6,9,20,7); x.fillRect(7,16,18,2); x.fillRect(8,18,16,2); x.fillRect(9,20,5,4); x.fillRect(18,20,5,4); x.fillRect(12,23,8,2); x.fillStyle='#b0b0c2'; x.fillRect(22,9,3,7); x.fillRect(20,18,4,2); x.fillRect(18,20,5,4); x.fillStyle='#140e26'; x.fillRect(9,9,6,5); x.fillRect(17,9,6,5); x.fillRect(14,15,4,3); x.fillRect(12,20,1,5); x.fillRect(15,20,1,5); x.fillRect(18,20,1,5); x.restore(); }
  function deathSpin(done){ var fin=0; [0,1,2].forEach(function(i,k){ var cv=CV[i], reel=REEL[i]; if(reel){ reel.classList.remove('stop'); reel.classList.add('spinning'); } var elapsed=0, delay=60, dur=650+k*330; (function tick(){ if(sheetReady) drawSym(cv, randSym()); elapsed+=delay; if(elapsed>=dur){ drawSkull(cv); if(reel){ reel.classList.remove('spinning'); reel.classList.add('stop'); } if(typeof sStop==='function') sStop(); fin++; if(fin===3 && done) done(); return; } setTimeout(tick, delay); })(); }); }
  function enterBankruptcy(){ if(_broke) return; _broke=true; document.body.classList.add('broke'); bankMode=false; catMode=true; if(state.musicOn && !musicPlaying) startMusic(); if(typeof sBad==='function') sBad(); spinning=true; setSpinUI(true); deathSpin(function(){ spinning=false; setSpinUI(false); var sb=document.getElementById('spinBtn'); if(sb){ sb.disabled=false; sb.textContent='👻 IR AL LIMBO'; sb.classList.add('to-limbo'); } setMsg('💀 BANCARROTA — te fundiste 💀','big bad'); }); }
  function exitBankruptcy(){ if(!_broke) return; _broke=false; document.body.classList.remove('broke'); document.body.classList.remove('spin-lock'); var sb=document.getElementById('spinBtn'); if(sb){ sb.textContent='GIRAR'; sb.classList.remove('to-limbo'); sb.disabled=false; } if(sheetReady){ [0,1,2].forEach(function(i){ drawSym(CV[i], SYMS[[0,1,5][i]]); }); } }
  var NINE_CHANCE=[0,0.30,0.55,0.80];
  function tryNineLives(){ var lv=state.meta.ninevidas||0; if(lv<1 || _lifeUsed) return false; _lifeUsed=true; if(Math.random() < NINE_CHANCE[Math.min(lv,3)]){ state.credits=Math.max(state.credits,500); updateUI(); saveState(); setMsg('🐱 ¡NUEVE VIDAS! Zafaste de la bancarrota 💚 +$500','big'); if(typeof celebrate==='function') celebrate(false); return true; } return false; }
  function gameOver(){ if(_broke) return; if(document.getElementById('limbo').classList.contains('open')) return; state.limboUnlocked=true; var earned=limboEarn(); state.meta.spirits+=earned; state.life.asc=(state.life.asc||0)+1; state.life.ecto=(state.life.ecto||0)+earned; _lastEarned=earned; _limboMode='death'; state.life.deaths=(state.life.deaths||0)+1; updateLimboBtn(); if(_logrosReady) checkLogros(); saveState(); enterBankruptcy(); }
  // ===== Árbol del Limbo (4 ramas, paneable + zoom) =====
  var META_TREE={ armor:[90,40], respin:[20,200], ninevidas:[160,200], luck:[370,40], jpboost:[310,200], cap:[440,200], ectoboost:[375,360], chest:[670,40], credit:[610,200], banktope:[740,200], regular:[675,360], bankopen:[920,40], vaultopen:[920,200], banker:[920,360], premiumvault:[920,520] };
  var TREE_BRANCH={ armor:'#ff5b79', respin:'#ff5b79', ninevidas:'#ff5b79', luck:'#39e0e6', jpboost:'#39e0e6', cap:'#39e0e6', ectoboost:'#39e0e6', chest:'#ffd23f', credit:'#ffd23f', banktope:'#ffd23f', regular:'#ffd23f', bankopen:'#ff3d8b', vaultopen:'#ff3d8b', banker:'#ff3d8b', premiumvault:'#ff3d8b' };
  var TREE_LBL={ armor:'Protección', respin:'Re-giro', ninevidas:'Nueve vidas', luck:'Patita', jpboost:'Bote mayor', cap:'Techo', ectoboost:'Ectofichas+', chest:'Cofre', credit:'Crédito', banktope:'Tope banco', regular:'Cliente regular', bankopen:'Banco abierto', vaultopen:'Caja lista', banker:'Banquero', premiumvault:'Caja premium' };
  var TREE_W=116, TREE_H=86, _treeX=null, _treeY=null, _treeZoom=null;
  function metaTreeHTML(){
    var lines='';
    for(var k in META){ var u=META[k]; if(u.req && META_TREE[k] && META_TREE[u.req.k]){ var p=META_TREE[u.req.k], c=META_TREE[k]; var x1=p[0]+TREE_W/2, y1=p[1]+TREE_H, x2=c[0]+TREE_W/2, y2=c[1], my=(y1+y2)/2; var on=metaUnlocked(k); lines+='<path d="M '+x1+' '+y1+' C '+x1+' '+my+' '+x2+' '+my+' '+x2+' '+y2+'" stroke="'+(on?(TREE_BRANCH[k]||'#39e0e6'):'#5a3d8c')+'" stroke-width="4" fill="none" opacity="'+(on?'.85':'.45')+'"/>'; } }
    var svg='<svg class="lt-lines" viewBox="0 0 1060 640">'+lines+'</svg>';
    var nodes='';
    for(var k in META){ if(!META_TREE[k]) continue; var u=META[k], lv=state.meta[k]||0, pos=META_TREE[k]; var unl=metaUnlocked(k), maxed=lv>=u.max, cost=u.cost(lv), can=unl&&!maxed&&state.meta.spirits>=cost; var bc=TREE_BRANCH[k]||'#39e0e6';
      var cls='lt-node '+(!unl?'locked':(maxed?'maxed':(can?'can':'unlocked')));
      var btn= !unl ? '<button class="lt-buy" disabled>🔒</button>' : (maxed?'<button class="lt-buy" disabled>MÁX</button>':'<button class="lt-buy lm-buy" data-k="'+k+'"'+(can?'':' disabled')+'>'+cost+' 👻</button>');
      var ico=u.name.split(' ')[0];
      nodes+='<div class="'+cls+' lt-tap" data-desc="'+k+'" style="left:'+pos[0]+'px;top:'+pos[1]+'px;--bc:'+bc+'"><div class="lt-ic">'+ico+'</div><div class="lt-lbl">'+(TREE_LBL[k]||u.name)+'</div><div class="lt-lv">Lv '+lv+'/'+u.max+'</div>'+btn+'</div>';
    }
    return '<div class="lt-wrap"><button class="lt-center" id="ltCenter">⊙ Centrar</button><div class="lt-vp" id="ltVP"><div class="lt-canvas" id="ltCanvas">'+svg+nodes+'</div></div><div class="lt-detail" id="ltDetail"><span class="lt-detail-hint">👆 Tocá una mejora para ver qué hace</span></div><div class="lt-hint">Arrastrá para moverte · rueda o pellizco para zoom</div></div>';
  }
  function _treeFit(vp){ var vw=vp.clientWidth||340; _treeZoom=Math.max(0.32, Math.min(1.6, vw/1100)); _treeX=Math.max(6,(vw-1060*_treeZoom)/2); _treeY=8; }
  function setupTree(){
    var vp=document.getElementById('ltVP'), cv=document.getElementById('ltCanvas'); if(!vp||!cv) return;
    function clampZ(z){ return Math.max(0.32, Math.min(1.6, z)); }
    if(_treeZoom==null) _treeFit(vp);
    function apply(){ cv.style.transform='translate('+_treeX+'px,'+_treeY+'px) scale('+_treeZoom+')'; }
    apply();
    var pts={}, dragId=null, sx=0, sy=0, ox=0, oy=0, pinchD=0, pinchZ=0;
    function dist(a,b){ var dx=a.x-b.x, dy=a.y-b.y; return Math.sqrt(dx*dx+dy*dy); }
    vp.onpointerdown=function(e){ if(e.target.closest('.lt-buy')) return; pts[e.pointerId]={x:e.clientX,y:e.clientY}; var ids=Object.keys(pts); if(ids.length===1){ dragId=e.pointerId; sx=e.clientX; sy=e.clientY; ox=_treeX; oy=_treeY; vp.classList.add('grabbing'); } else if(ids.length===2){ var p=Object.values(pts); pinchD=dist(p[0],p[1]); pinchZ=_treeZoom; } };
    vp.onpointermove=function(e){ if(!pts[e.pointerId]) return; pts[e.pointerId]={x:e.clientX,y:e.clientY}; var ids=Object.keys(pts); var r=vp.getBoundingClientRect(); if(ids.length>=2){ var p=Object.values(pts); var nd=dist(p[0],p[1]); var mx=(p[0].x+p[1].x)/2-r.left, my=(p[0].y+p[1].y)/2-r.top; var wx=(mx-_treeX)/_treeZoom, wy=(my-_treeY)/_treeZoom; _treeZoom=clampZ(pinchZ*(nd/(pinchD||nd))); _treeX=mx-wx*_treeZoom; _treeY=my-wy*_treeZoom; apply(); } else if(e.pointerId===dragId){ _treeX=ox+(e.clientX-sx); _treeY=oy+(e.clientY-sy); apply(); } };
    function up(e){ delete pts[e.pointerId]; if(e.pointerId===dragId) dragId=null; if(Object.keys(pts).length<2) pinchD=0; if(Object.keys(pts).length===0) vp.classList.remove('grabbing'); }
    vp.onpointerup=up; vp.onpointercancel=up;
    vp.onwheel=function(e){ e.preventDefault(); var r=vp.getBoundingClientRect(); var cx=e.clientX-r.left, cy=e.clientY-r.top; var wx=(cx-_treeX)/_treeZoom, wy=(cy-_treeY)/_treeZoom; _treeZoom=clampZ(_treeZoom*(e.deltaY<0?1.12:0.89)); _treeX=cx-wx*_treeZoom; _treeY=cy-wy*_treeZoom; apply(); };
    var cb=document.getElementById('ltCenter'); if(cb) cb.onclick=function(){ _treeFit(vp); apply(); };
    var det=document.getElementById('ltDetail');
    function showNodeDetail(k){ if(!det) return; var u=META[k]; if(!u) return; var lv=state.meta[k]||0, maxed=lv>=u.max, cost=u.cost(lv); var costLine = maxed ? '<span class="lt-detail-cost maxed">✓ Nivel máximo</span>' : '<span class="lt-detail-cost">Próximo nivel: '+cost+' 👻</span>'; var reqLine=''; if(u.req && !metaUnlocked(k)){ var ru=META[u.req.k]; reqLine='<div class="lt-detail-req">🔒 Requiere '+(ru?ru.name.split(" ").slice(1).join(" ")||ru.name:u.req.k)+' nivel '+u.req.n+'</div>'; } det.innerHTML='<div class="lt-detail-name">'+u.name+'</div><div class="lt-detail-desc">'+u.desc+'</div><div class="lt-detail-foot"><span class="lt-detail-lv">Lv '+lv+'/'+u.max+'</span>'+costLine+'</div>'+reqLine; det.classList.add('on'); }
    var nn=cv.querySelectorAll('.lt-tap'); for(var ni=0;ni<nn.length;ni++){ (function(node){ var downX=0, downY=0, moved=false; node.addEventListener('pointerdown', function(e){ downX=e.clientX; downY=e.clientY; moved=false; }); node.addEventListener('pointermove', function(e){ if(Math.abs(e.clientX-downX)>6||Math.abs(e.clientY-downY)>6) moved=true; }); node.addEventListener('pointerup', function(e){ if(moved) return; if(e.target.closest('.lt-buy')) return; showNodeDetail(node.getAttribute('data-desc')); }); })(nn[ni]); }
  }
  function renderLimbo(){ var tabsEl=document.getElementById('limboTabs'), el=document.getElementById('limboBody'); if(!el) return; var dur=fmtDur(Date.now()-(state.runStart||Date.now())), _pe=limboEarn(); if(tabsEl){ tabsEl.innerHTML='<button class="limbo-tab'+(_limboTab==="mejoras"?"":" on")+'" data-tab="resumen">RESUMEN</button><button class="limbo-tab'+(_limboTab==="mejoras"?" on":"")+'" data-tab="mejoras">MEJORAS</button>'; var tb=tabsEl.querySelectorAll('.limbo-tab'); for(var j=0;j<tb.length;j++){ tb[j].addEventListener('click', function(){ _limboTab=this.getAttribute('data-tab'); renderLimbo(); }); } } var h='<div class="limbo-ect">👻 Ectofichas: <b>'+state.meta.spirits+'</b></div>'; if(_limboTab!=='mejoras'){ if(_limboMode==='death'){ h+='<div class="limbo-earn">¡Partida terminada! Te llevás <b>+'+_lastEarned+' 👻</b></div>'; } h+='<div class="limbo-stat-row"><div class="limbo-chip">⏱️ <b>'+dur+'</b></div><div class="limbo-chip">💰 <b>$'+fmt(state.peak||0)+'</b></div><div class="limbo-chip">🎰 <b>'+(state.runJackpots||0)+'</b></div><div class="limbo-chip">🏔️ <b>'+fmtCap(capValue())+'</b></div></div>'; } else { h+=metaTreeHTML(); } if(_limboMode==='hub'){ h+='<div class="limbo-foot"><button class="limbo-asc" id="limboAscend"'+(_pe<=0?' disabled':'')+'>'+(_pe<=0?'✨ ASCENDER<br>sin fichas aún':('✨ ASCENDER<br>+'+_pe+' 👻'))+'</button><button class="limbo-seg" id="limboSeguir">▶ SEGUIR<br>JUGANDO</button></div>'; } else { h+='<div class="limbo-foot"><button class="limbo-asc" id="limboGo">🔄 NUEVA PARTIDA</button></div>'; } el.innerHTML=h; var bs=el.querySelectorAll('.lm-buy'); for(var i=0;i<bs.length;i++){ bs[i].addEventListener('click', function(){ buyMeta(this.getAttribute('data-k')); }); } if(_limboTab==='mejoras') setupTree(); if(_limboMode==='hub'){ var a=document.getElementById('limboAscend'); if(a) a.addEventListener('click', ascend); var sg=document.getElementById('limboSeguir'); if(sg) sg.addEventListener('click', closeLimbo); } else { var g=document.getElementById('limboGo'); if(g) g.addEventListener('click', startRun); } }
  function metaUnlocked(k){ var r=META[k].req; return !r || (state.meta[r.k]||0) >= r.n; }
  function clienteRegularLvl(){ return state.meta.regular||0; }
  function buyMeta(k){ if(!metaUnlocked(k)) return; var u=META[k], lv=state.meta[k]||0; if(lv>=u.max) return; var cost=u.cost(lv); if(state.meta.spirits<cost) return; state.meta.spirits-=cost; state.meta[k]=lv+1; renderLimbo(); saveState(); }
  function startRun(){ exitBankruptcy(); state.life.runs=(state.life.runs||0)+1; state.credits=START+(state.meta.chest||0)*500; state.jackpot=JP_BASE; state.bet=MIN_BET; state.debt=0; state.bank=0; state.vault=false; state.creditLevel=Math.min((state.meta.credit||0), CREDIT_LIMITS.length-1); state.interestLevel=0; state.intSpins=0; state.upg={win:0,combo:0,cat:0,bone:0}; state.abilities={hold:false,gamble:false}; state.holdLevel=0; state.superLevel=0; state.skillsUnlocked=false; state.bankUnlocked=false; if(state.meta.bankopen) state.bankUnlocked=true; if(state.meta.vaultopen){ state.vault=true; state.bankUnlocked=true; } _lifeUsed=false; state.runStartWorth=state.credits; state.peak=state.credits; state.runJackpots=0; combo=0; luckyUntil=0; superReadyAt=0; document.body.classList.remove('supersuerte'); rebuildPool(); renderBetPresets(); document.getElementById('betInput').value=25; updateUI(); setCombo(); renderPaytable(); renderShop(); renderHold(); updateSuperUI(); document.getElementById('limbo').classList.remove('open'); catMode=false; clearInterval(_cornerTypeT); clearTimeout(_cornerTimer); var _cb2=document.getElementById('cornerCatBubble'); if(_cb2) _cb2.classList.remove('show'); state.runStart=Date.now(); _capMsgShown=false; _tripleStreak=0; setMsg('NUEVA PARTIDA',false); saveState(); }
  function checkBroke(){ if(state.credits<MIN_BET && !state.bankUnlocked) unlockBank(); if(state.credits<MIN_BET && state.bank<1 && !loanAvailable()){ if(!tryNineLives()) gameOver(); } }
  function buyUpg(k){ const u=UPG[k], lv=state.upg[k]; if(lv>=u.max||state.debt>0) return; const cost=discountedCost(k, u.cost(lv)); if(state.credits<cost) return; state.credits-=cost; state.upg[k]++; rebuildPool(); updateUI(); renderShop(); renderPaytable(); saveState(); }
  const HOLD_COSTS=[6650,20000];
  const ABIL={ gamble:{name:'Doble o nada',desc:'Tras ganar, girás de nuevo: si sale premio, multiplica tus ganancias.',cost:10000} };
  function buyAbility(k){ const a=ABIL[k], cost=discountedCost(k,a.cost); if(!state.skillsUnlocked||state.abilities[k]||state.debt>0||state.credits<cost) return; state.credits-=cost; state.abilities[k]=true; updateUI(); renderShop(); renderHold(); saveState(); }
  function buyHold(){ if(!state.skillsUnlocked||state.debt>0||state.holdLevel>=2) return; const cost=discountedCost('hold', HOLD_COSTS[state.holdLevel]); if(state.credits<cost) return; state.credits-=cost; state.holdLevel++; state.abilities.hold=true; updateUI(); renderShop(); renderHold(); saveState(); }
  const SUPER_CD=120;
  const SUPER_MAX=150;
  function superDur(lv){ return Math.min(85, 10+Math.round(lv*0.5)); }
  function superCost(lv){ return Math.round((3350 + lv*lv*100)/100)*100; }
  function buySuper(){ if(!state.skillsUnlocked||state.debt>0||state.superLevel>=SUPER_MAX) return; var cost=discountedCost('super', superCost(state.superLevel)); if(state.credits<cost) return; state.credits-=cost; state.superLevel++; rebuildPool(); updateUI(); renderShop(); updateSuperUI(); saveState(); }
  function activateSuper(){ if(state.superLevel<1) return; var now=Date.now(); if(now<luckyUntil||now<superReadyAt) return; var dur=superDur(state.superLevel); luckyUntil=now+dur*1000; superReadyAt=luckyUntil+SUPER_CD*1000; document.body.classList.add('supersuerte'); setMsg('🍀 ¡SUPERSUERTE! '+dur+'s',false); sSuper(); updateSuperUI(); }
  function updateSuperUI(){ var row=document.getElementById('superRow'), btn=document.getElementById('superBtn'); if(row) row.style.display=state.superLevel>0?'flex':'none'; if(!btn) return; if(state.superLevel<1){ document.body.classList.remove('supersuerte'); return; } var now=Date.now(); if(now<luckyUntil){ document.body.classList.add('supersuerte'); btn.disabled=true; btn.textContent='🍀 ACTIVA '+Math.ceil((luckyUntil-now)/1000)+'s'; } else if(spinning){ document.body.classList.remove('supersuerte'); btn.disabled=true; btn.textContent='🍀 SUPERSUERTE'; } else { document.body.classList.remove('supersuerte'); if(now<superReadyAt){ btn.disabled=true; btn.textContent='⏳ '+Math.ceil((superReadyAt-now)/1000)+'s'; } else { btn.disabled=false; btn.textContent='🍀 SUPERSUERTE'; } } }
  function jackpotRain(){ var c=document.createElement('div'); c.className='jp-rain'; for(var i=0;i<26;i++){ var sp=document.createElement('span'); sp.textContent='🐱'; sp.style.left=(Math.random()*100)+'%'; sp.style.animationDelay=(Math.random()*0.8)+'s'; sp.style.animationDuration=(1.8+Math.random()*1.4)+'s'; sp.style.fontSize=(20+Math.random()*22)+'px'; c.appendChild(sp); } document.body.appendChild(c); setTimeout(function(){ if(c.parentNode) c.parentNode.removeChild(c); }, 3600); }
  function toggleHold(i){ if(state.holdLevel<1||spinning||holdCD>0||gambleAmount>0) return; if(!held[i] && held.filter(Boolean).length>=state.holdLevel){ setMsg('MÁX '+state.holdLevel+' RETENIDO'+(state.holdLevel>1?'S':''),false); return; } held[i]=!held[i]; renderHold(); }
  function renderHold(){ const on=state.holdLevel>0; for(let i=0;i<3;i++){ REEL[i].classList.toggle('held', !!held[i]); } const hint=document.getElementById('holdHint'); if(!on){ hint.style.display='none'; return; } hint.style.display='block'; if(spinning){ hint.style.visibility='hidden'; } else if(holdCD>0){ hint.style.visibility='visible'; hint.classList.add('cd'); hint.textContent='🔒 Retener disponible en '+holdCD+' giro(s)'; } else { hint.style.visibility='visible'; hint.classList.remove('cd'); hint.textContent='🔒 Retené hasta '+state.holdLevel+' — deben combinar con la tirada nueva'; } }
  function showGamble(){ document.getElementById('gambleTxt').textContent='Ganaste $'+fmt(gambleAmount)+' — ¿girás para multiplicar?'; document.getElementById('gambleCash').textContent='✓ COBRAR $'+fmt(gambleAmount); document.getElementById('holdHint').style.display='none'; document.getElementById('gambleBar').classList.add('on'); }
  function hideGamble(){ gambleAmount=0; document.getElementById('gambleBar').classList.remove('on'); renderHold(); }
  function offerGamble(w){ if(state.abilities.gamble && state.debt===0 && w>0){ gambleAmount=w; showGamble(); } else { hideGamble(); } }
  function gambleMult(t){ if(t.indexOf('🦴')>=0) return 0; const a=t[0],b=t[1],c=t[2]; if(a===b&&b===c){ return a==='🐱'?50:PAY3[a]; } var cnt={}; for(var i=0;i<3;i++){ cnt[t[i]]=(cnt[t[i]]||0)+1; } var pv=0; for(var s in cnt){ if(cnt[s]===2 && PAIR2[s]!=null && PAIR2[s]>pv) pv=PAIR2[s]; } var ch=t.filter(function(x){return x==='🍒';}).length; if(ch===1 && CH1>pv) pv=CH1; return pv; }
  function doGamble(){ if(gambleAmount<=0||spinning) return; gambling=true; spinning=true; setSpinUI(true); held=[false,false,false]; renderHold(); document.getElementById('gambleBar').classList.remove('on'); setMsg('🎲 girando...',false); const t=[randSym(),randSym(),randSym()]; spinReel(REEL[0],CV[0],t[0],700,null); spinReel(REEL[1],CV[1],t[1],1050,null); spinReel(REEL[2],CV[2],t[2],1450,function(){ gambleResult(t); }); }
  function gambleResult(t){ spinning=false; setSpinUI(false); gambling=false; cur=t.slice(); const M=gambleMult(t); if(M>0){ const gain=gambleAmount*(M-1); state.credits+=gain; gambleAmount*=M; if(gambleAmount>((state.life&&state.life.bestJP)||0)) state.life.bestJP=gambleAmount; if(gambleAmount>((state.life&&state.life.bestGamble)||0)) state.life.bestGamble=gambleAmount; updateUI(); setMsg('🎲 x'+M+'!  $'+fmt(gambleAmount),'big'); celebrate(M>=10); saveState(); showGamble(); } else { const lost=gambleAmount; state.credits-=gambleAmount; gambleAmount=0; updateUI(); setMsg('🎲 PERDISTE $'+fmt(lost),'bad'); sBad(); hideGamble(); saveState(); checkBroke(); } }
  function pull(){ if(spinning) return; const l=document.getElementById('lever'); l.classList.add('pulled'); setTimeout(function(){l.classList.remove('pulled');},320); spin('lever'); }

  document.getElementById('spinBtn').addEventListener('click', function(){ spin('btn'); });
  document.getElementById('lever').addEventListener('click', pull);
  document.getElementById('maxBet').addEventListener('click', function(){ setBet(state.credits); });
  document.getElementById('betInput').addEventListener('change', function(){ setBet(parseInt(this.value,10)); });
  // ===== SUGERENCIAS + REPORTES (v2.64 · Tanda 1) =====
  var SUGG_MAX=280, BUG_MAX=600, FEED_GATE=500000;
  var _feedTab='board'; var _sgRows=[]; var _bugRows=[]; var _threadId=null;
  var SG_STATUS={ pending:{t:'⏳ Pendiente',c:'pend'}, approved:{t:'✅ Aprobada',c:'ok'}, rejected:{t:'❌ Rechazada',c:'no'}, done:{t:'🚀 Implementada',c:'done'} };
  var SG_CLOSED={ approved:1, rejected:1, done:1 }; // estados que cierran voto + debate
  var SG_ORDER=['pending','approved','rejected','done'];
  function feedCanPost(){ if(!(fbReady&&fbUser)) return false; if(hasMedal('staff')) return true; return (((state.life&&state.life.bestWorth)||0) >= FEED_GATE); }
  function feedGateTxt(){ if(!(fbReady&&fbUser)) return '🔒 Iniciá sesión (ícono de cuenta, arriba a la derecha) para participar.'; var w=(state.life&&state.life.bestWorth)||0; if(w<FEED_GATE) return '🔒 Alcanzá <b>$'+fmt(FEED_GATE)+'</b> de patrimonio para sugerir, votar y comentar.<br>Vas $'+fmt(w)+'.'; return ''; }
  function feedMsg(t,cls){ var m=document.getElementById('feedMsg'); if(m){ m.innerHTML=t; m.className='feed-msg '+(cls||''); } }
  function bugMsg(t,cls){ var m=document.getElementById('bugMsg'); if(m){ m.innerHTML=t; m.className='feed-msg '+(cls||''); } }
  function openFeedback(){ if(spinning) return; _feedTab='board'; document.getElementById('feedback').classList.add('open'); renderFeedback(); }
  function closeFeedback(){ document.getElementById('feedback').classList.remove('open'); }
  function renderFeedback(){
    var tabs=document.getElementById('feedTabs');
    if(tabs){ tabs.innerHTML='<button class="feed-tab'+(_feedTab==='board'?' on':'')+'" data-ft="board">💡 Sugerencias</button><button class="feed-tab'+(_feedTab==='bug'?' on':'')+'" data-ft="bug">🐞 Reportar bug</button>'; var tb=tabs.querySelectorAll('.feed-tab'); for(var i=0;i<tb.length;i++){ tb[i].addEventListener('click', function(){ _feedTab=this.getAttribute('data-ft'); renderFeedback(); }); } }
    var body=document.getElementById('feedBody'); if(!body) return;
    if(_feedTab==='bug'){
      var hb='<div class="bank-note">🔒 Esto lo ve <b>solo el dev</b> (es privado). Contanos el bug con el mayor detalle: qué pasó, qué esperabas y cómo repetirlo. 🐞</div>';
      if(!(fbReady&&fbUser)){ hb+='<div class="feed-gate">🔒 Iniciá sesión (ícono de cuenta, arriba a la derecha) para reportar.</div>'; }
      else { hb+='<textarea id="bugInput" class="feed-ta" maxlength="'+BUG_MAX+'" placeholder="Describí el bug…"></textarea><button class="feed-send bug" id="bugSend">🐞 Enviar reporte</button>'; }
      hb+='<div class="feed-msg" id="bugMsg"></div>';
      if(hasMedal('staff')) hb+='<div id="bugList" style="margin-top:16px"></div>';
      body.innerHTML=hb;
      var bbtn=document.getElementById('bugSend'); if(bbtn) bbtn.addEventListener('click', submitBug);
      if(hasMedal('staff')) renderBugList();
    } else {
      var hs='';
      if(feedCanPost()){ hs+='<div class="feed-compose"><textarea id="suggInput" class="feed-ta" maxlength="'+SUGG_MAX+'" placeholder="Tu idea para Kitty\u2019s Slots…"></textarea><button class="feed-send" id="suggSend">✦ Enviar sugerencia</button></div>'; }
      else { hs+='<div class="feed-gate">'+feedGateTxt()+'</div>'; }
      hs+='<div class="feed-msg" id="feedMsg"></div>';
      hs+='<div class="sg-legend">⏳ Pendiente · ✅ Aprobada · ❌ Rechazada · 🚀 Implementada</div>';
      hs+='<div id="boardList"></div>';
      body.innerHTML=hs;
      var sbtn=document.getElementById('suggSend'); if(sbtn) sbtn.addEventListener('click', submitSuggestion);
      renderBoard();
    }
  }
  function sgCardHTML(r, staff){
    var st=SG_STATUS[r.status]||SG_STATUS.pending, closed=!!SG_CLOSED[r.status];
    var V=r.voters||{}, myUid=(fbUser&&fbUser.uid)||null, up=0, down=0, myDir=null;
    for(var u in V){ if(!V[u]) continue; if(V[u].d==='down') down++; else up++; if(u===myUid) myDir=V[u].d; }
    var total=up+down;
    var h='<div class="sg-card sg-'+st.c+'">';
    h+='<div class="sg-head">💡 Sugerencia</div>';
    h+='<div class="sg-text">'+_rkEsc(r.text||'')+'</div>';
    h+='<div class="sg-div"></div>';
    h+='<div class="sg-meta"><span class="sg-who'+(r.uid?' sg-who-btn':'')+'" data-uid="'+_rkEsc(r.uid||'')+'" data-nick="'+_rkEsc(r.nick||'Jugador')+'" data-av="'+_rkEsc(r.avatar||'calico')+'"><span class="cat" style="background-position:'+pfCatPos(r.avatar||'calico')+'"></span><b>'+_rkEsc(r.nick||'Jugador')+'</b></span><span class="sg-badge sg-b-'+st.c+'">'+st.t+'</span><span class="sg-id">#'+(r.n||'?')+'</span></div>';
    h+='<div class="sg-votes'+(closed?' closed':'')+'"><button class="sg-vote up'+(myDir==='up'?' mine':'')+'" data-id="'+r._id+'" data-dir="up"'+(closed?' disabled':'')+'>👍 <b>'+up+'</b></button><button class="sg-vote down'+(myDir==='down'?' mine':'')+'" data-id="'+r._id+'" data-dir="down"'+(closed?' disabled':'')+'>👎 <b>'+down+'</b></button></div>';
    h+='<div class="sg-actions"><button class="sg-thread-btn" data-id="'+r._id+'">'+(closed?'💬 Ver debate':'💬 Debatir')+'</button>'+(total?'<button class="sg-voters-btn" data-id="'+r._id+'">👀 quién votó ('+total+')</button>':'')+'</div>';
    if(staff){ h+='<div class="sg-staff">'; for(var i=0;i<SG_ORDER.length;i++){ var k=SG_ORDER[i]; h+='<button class="sg-st-btn'+(r.status===k?' on':'')+'" data-id="'+r._id+'" data-st="'+k+'">'+SG_STATUS[k].t+'</button>'; } h+='<button class="sg-del-btn" data-id="'+r._id+'">🗑️ Borrar sugerencia</button></div>'; }
    h+='</div>';
    return h;
  }
  function renderBoard(){
    var box=document.getElementById('boardList'); if(!box) return;
    if(!fbReady){ box.innerHTML='<div class="bank-note">Conectando con Firebase…</div>'; return; }
    box.innerHTML='<div class="bank-note">Cargando sugerencias…</div>';
    var q=_fbFsMod.query(_fbFsMod.collection(fbDB,'suggestions'), _fbFsMod.orderBy('created','desc'), _fbFsMod.limit(40));
    _fbFsMod.getDocs(q).then(function(snap){
      _sgRows=[]; snap.forEach(function(d){ var x=d.data()||{}; x._id=d.id; _sgRows.push(x); });
      paintBoard();
    }).catch(function(){ box.innerHTML='<div class="bank-note">No se pudo cargar.<br>(¿Pegaste las reglas de Firebase para «suggestions»?)</div>'; });
  }
  function paintBoard(){
    var box=document.getElementById('boardList'); if(!box) return;
    if(!_sgRows.length){ box.innerHTML='<div class="bank-note">Todavía no hay sugerencias.<br>¡Sé el primero en proponer algo! 🐱</div>'; return; }
    var staff=hasMedal('staff'), h='';
    for(var i=0;i<_sgRows.length;i++) h+=sgCardHTML(_sgRows[i], staff);
    box.innerHTML=h;
    if(staff){ var bs=box.querySelectorAll('.sg-st-btn'); for(var j=0;j<bs.length;j++){ bs[j].addEventListener('click', function(){ sgSetStatus(this.getAttribute('data-id'), this.getAttribute('data-st')); }); } }
    var vbs=box.querySelectorAll('.sg-vote'); for(var k=0;k<vbs.length;k++){ vbs[k].addEventListener('click', function(){ sgVote(this.getAttribute('data-id'), this.getAttribute('data-dir')); }); }
    var vvs=box.querySelectorAll('.sg-voters-btn'); for(var m=0;m<vvs.length;m++){ vvs[m].addEventListener('click', function(){ openVoters(this.getAttribute('data-id')); }); }
    var ths=box.querySelectorAll('.sg-thread-btn'); for(var p=0;p<ths.length;p++){ ths[p].addEventListener('click', function(){ openThread(this.getAttribute('data-id')); }); }
    var whos=box.querySelectorAll('.sg-who-btn'); for(var w=0;w<whos.length;w++){ whos[w].addEventListener('click', function(){ openUserCard(this.getAttribute('data-uid'), this.getAttribute('data-nick'), this.getAttribute('data-av')); }); }
    if(staff){ var dls=box.querySelectorAll('.sg-del-btn'); for(var d=0;d<dls.length;d++){ dls[d].addEventListener('click', function(){ deleteSuggestion(this.getAttribute('data-id')); }); } }
  }
  function sgVote(id, dir){
    if(!feedCanPost()){ feedMsg(feedGateTxt(),'err'); return; }
    if(dir!=='up'&&dir!=='down') return;
    var row=null; for(var i=0;i<_sgRows.length;i++){ if(_sgRows[i]._id===id){ row=_sgRows[i]; break; } }
    if(!row||!fbUser) return;
    if(SG_CLOSED[row.status]){ feedMsg('Esta sugerencia ya fue resuelta — la votación está cerrada.','err'); return; }
    var uid=fbUser.uid, e=state.eq||{};
    if(!row.voters) row.voters={};
    var prevEntry=row.voters[uid]?{ d:row.voters[uid].d, n:row.voters[uid].n }:null;
    var remove=(prevEntry&&prevEntry.d===dir), upd={};
    if(remove){ delete row.voters[uid]; upd['voters.'+uid]=_fbFsMod.deleteField(); }
    else { row.voters[uid]={ d:dir, n:(e.nick||'Jugador') }; upd['voters.'+uid]={ d:dir, n:(e.nick||'Jugador') }; }
    paintBoard();
    _fbFsMod.updateDoc(_fbFsMod.doc(fbDB,'suggestions',id), upd).catch(function(){ if(prevEntry){ row.voters[uid]=prevEntry; } else { delete row.voters[uid]; } paintBoard(); feedMsg('No se pudo votar (permisos o conexión).','err'); });
  }
  function sgSetStatus(id, st){ if(!hasMedal('staff')||!SG_STATUS[st]) return; _fbFsMod.setDoc(_fbFsMod.doc(fbDB,'suggestions',id), {status:st}, {merge:true}).then(function(){ renderBoard(); }).catch(function(){ feedMsg('No se pudo cambiar el estado (permisos).','err'); }); }
  function deleteSuggestion(id){
    if(!hasMedal('staff')||!id) return;
    if(!confirm('¿Borrar esta sugerencia para siempre? También se borra su debate.')) return;
    _fbFsMod.deleteDoc(_fbFsMod.doc(fbDB,'suggestions',id)).then(function(){
      feedMsg('Sugerencia borrada. 🗑️','ok'); renderBoard();
      fetchComments(id).then(function(rows){ for(var i=0;i<rows.length;i++){ _fbFsMod.deleteDoc(_fbFsMod.doc(fbDB,'suggestions',id,'comments',rows[i]._id)).catch(function(){}); } }).catch(function(){});
    }).catch(function(){ feedMsg('No se pudo borrar (permisos).','err'); });
  }
  function openVoters(id){
    var row=null; for(var i=0;i<_sgRows.length;i++){ if(_sgRows[i]._id===id){ row=_sgRows[i]; break; } }
    if(!row) return;
    var V=row.voters||{}, myUid=(fbUser&&fbUser.uid)||null, ups=[], downs=[];
    for(var u in V){ if(!V[u]) continue; var nm=(u===myUid)?'vos':_rkEsc(V[u].n||'?'); if(V[u].d==='down') downs.push(nm); else ups.push(nm); }
    function sec(cls, ic, lbl, arr){ var hh='<div class="vt-sec"><div class="vt-sec-h '+cls+'">'+ic+' '+lbl+' · '+arr.length+'</div>'; if(arr.length){ hh+='<div class="vt-list">'; for(var i=0;i<arr.length;i++) hh+='<span class="vt-name">'+arr[i]+'</span>'; hh+='</div>'; } else { hh+='<div class="vt-empty">Nadie todavía</div>'; } return hh+'</div>'; }
    var body=document.getElementById('votersBody'); if(body) body.innerHTML='<div class="vt-id">Sugerencia #'+(row.n||'?')+'</div>'+sec('y','👍','A favor',ups)+sec('n','👎','En contra',downs);
    document.getElementById('votersModal').classList.add('open');
  }
  function closeVoters(){ document.getElementById('votersModal').classList.remove('open'); }
  function rankForScore(sc){
    if(!(fbReady&&_fbFsMod&&_fbFsMod.getCountFromServer&&_fbFsMod.where)) return Promise.resolve(0);
    try{ var qy=_fbFsMod.query(_fbFsMod.collection(fbDB,'leaderboard'), _fbFsMod.where('score','>',sc)); return _fbFsMod.getCountFromServer(qy).then(function(snap){ return (snap.data().count||0)+1; }).catch(function(){ return 0; }); }catch(_e){ return Promise.resolve(0); }
  }
  function openUserCard(uid, fbNick, fbAvatar){
    if(!uid) return;
    var modal=document.getElementById('userCardModal'), body=document.getElementById('userCardBody');
    if(!modal||!body) return;
    body.innerHTML='<div class="pf-rk-msg">Cargando perfil…</div>';
    modal.classList.add('open');
    if(!(fbReady&&_fbFsMod&&fbDB)){ renderUserCard(uid, null, 0, fbNick, fbAvatar); return; }
    _fbFsMod.getDoc(_fbFsMod.doc(fbDB,'leaderboard',uid)).then(function(snap){
      var r=(snap&&snap.exists())?(snap.data()||{}):null;
      if(r && !r.hidden){ rankForScore(r.score||0).then(function(pos){ renderUserCard(uid, r, pos||0, fbNick, fbAvatar); }); }
      else { renderUserCard(uid, r, 0, fbNick, fbAvatar); }
    }).catch(function(){ renderUserCard(uid, null, 0, fbNick, fbAvatar); });
  }
  function renderUserCard(uid, r, pos, fbNick, fbAvatar){
    var body=document.getElementById('userCardBody'); if(!body) return;
    if(!r){
      var ba=fbAvatar||'calico';
      body.innerHTML='<div class="pf-rku-card"><div class="pf-avatar" style="margin:0 auto 10px"><span class="cat" style="background-position:'+pfCatPos(ba)+'"></span></div><div class="pf-rku-nick">'+_rkEsc(fbNick||'Jugador')+'</div><div class="pf-rku-meta">🐾 '+avatarName(ba)+'<br>Todavía sin datos en el ranking.</div></div>';
      return;
    }
    var tn=pfTitleName(r.title||'none'), meds=medalsForUID(uid), medHTML='';
    if(meds.length){ meds.forEach(function(k){ medHTML+='<span class="pf-medal" data-medal="'+k+'" title="'+MEDALS[k].name+' — '+MEDALS[k].desc+'">'+MEDALS[k].svg+'</span>'; }); }
    var h='<div class="pf-rku-card">';
    h+='<div class="pf-avatar '+pfFrameCls(r.frame||'none')+'" style="margin:0 auto 10px"><span class="cat" style="background-position:'+pfCatPos(r.avatar||'calico')+'"></span></div>';
    h+='<div class="pf-rku-nick">'+_rkEsc(r.nick||'Jugador')+'</div>';
    h+= tn? '<div class="pf-title"><span class="title-pill">'+tn+'</span></div>' : '';
    h+= medHTML? '<div class="pf-medals" style="display:flex">'+medHTML+'</div>' : '';
    h+= medHTML? '<div class="pf-medal-detail" id="ucMedalDetail"></div>' : '';
    var posTxt=r.hidden?'🚫 Oculto del ranking':(pos>0?'🏆 Puesto #'+pos:''); h+='<div class="pf-rku-meta">'+(posTxt?posTxt+'<br>':'')+'🐾 '+avatarName(r.avatar||'calico')+(r.palette?'<br>🎨 '+(PF_TEMANOM[r.palette]||r.palette):'')+'</div>';
    h+='<div class="pf-stats">';
    h+='<div class="pf-stat wide"><span class="lbl">👻 Ectofichas ganadas</span><span class="val">'+fmt(r.ecto||0)+'</span></div>';
    h+='<div class="pf-stat"><div class="lbl">✨ Ascensiones</div><div class="val">'+fmt(r.asc||0)+'</div></div>';
    h+='<div class="pf-stat"><div class="lbl">🎲 Partidas</div><div class="val">'+fmt(r.runs||0)+'</div></div>';
    h+='<div class="pf-stat"><div class="lbl">💰 Récord plata</div><div class="val">$'+fmt(r.bestWorth||0)+'</div></div>';
    h+='<div class="pf-stat"><div class="lbl">🎰 Mayor ganancia</div><div class="val">$'+fmt(r.bestJP||0)+'</div></div>';
    h+='</div></div>';
    body.innerHTML=h;
    var _c=body.querySelector('.pf-rku-card'); if(_c&&typeof applyPaletteTo==='function') applyPaletteTo(_c, r.palette||'synthwave');
    var mels=body.querySelectorAll('.pf-medal[data-medal]'); for(var mi=0;mi<mels.length;mi++){ mels[mi].addEventListener('click', function(){ var k=this.getAttribute('data-medal'); var dt=document.getElementById('ucMedalDetail'); if(dt&&MEDALS[k]){ if(dt.style.display==='block'&&dt.getAttribute('data-shown')===k){ dt.style.display='none'; dt.removeAttribute('data-shown'); } else { dt.innerHTML='<b>'+MEDALS[k].name+'</b><br>'+MEDALS[k].desc; dt.style.display='block'; dt.setAttribute('data-shown',k); } } }); }
  }
  function closeUserCard(){ var m=document.getElementById('userCardModal'); if(m) m.classList.remove('open'); }
  function thTime(ts){ if(!ts) return ''; var diff=Math.floor((Date.now()-ts)/1000); if(diff<60) return 'recién'; if(diff<3600) return Math.floor(diff/60)+' min'; if(diff<86400) return Math.floor(diff/3600)+' h'; return new Date(ts).toLocaleDateString('es-AR'); }
  function thMsg(t,cls){ var m=document.getElementById('thMsg'); if(m){ m.innerHTML=t; m.className='feed-msg '+(cls||''); } }
  function openThread(id){ var row=null; for(var i=0;i<_sgRows.length;i++){ if(_sgRows[i]._id===id){ row=_sgRows[i]; break; } } if(!row) return; _threadId=id; document.getElementById('threadModal').classList.add('open'); renderThread(row); }
  function closeThread(){ document.getElementById('threadModal').classList.remove('open'); _threadId=null; }
  function renderThread(row){
    var head=document.getElementById('threadHead'), body=document.getElementById('threadBody');
    if(head) head.innerHTML='<div class="th-ctx"><div class="th-ctx-id">💡 Sugerencia #'+(row.n||'?')+'</div><div class="th-ctx-text">'+_rkEsc(row.text||'')+'</div></div>';
    if(body) body.innerHTML='<div class="bank-note">Cargando comentarios…</div>';
    var id=_threadId;
    fetchComments(id).then(function(rows){ if(_threadId===id) paintThread(rows); }).catch(function(){ if(body&&_threadId===id) body.innerHTML='<div class="bank-note">No se pudo cargar el debate.<br>(¿Pegaste la regla de Firebase para «comments»?)</div>'; });
  }
  function fetchComments(id){ var q=_fbFsMod.query(_fbFsMod.collection(fbDB,'suggestions',id,'comments'), _fbFsMod.orderBy('created','asc'), _fbFsMod.limit(80)); return _fbFsMod.getDocs(q).then(function(snap){ var rows=[]; snap.forEach(function(d){ var x=d.data()||{}; x._id=d.id; rows.push(x); }); return rows; }); }
  function paintThread(rows){
    var body=document.getElementById('threadBody'); if(!body) return;
    var _sg=null; for(var _q=0;_q<_sgRows.length;_q++){ if(_sgRows[_q]._id===_threadId){ _sg=_sgRows[_q]; break; } } var _closed=!!(_sg&&SG_CLOSED[_sg.status]);
    var staff=hasMedal('staff'), myUid=(fbUser&&fbUser.uid)||null, h='<div class="th-list">';
    if(!rows.length){ h+='<div class="bank-note">Todavía no hay mensajes en este hilo.<br>¡Arrancá el debate! 💬</div>'; }
    else { for(var i=0;i<rows.length;i++){ var c=rows[i], canDel=staff||(myUid&&c.uid===myUid); var _cu=_rkEsc(c.uid||''), _cn=_rkEsc(c.nick||'Jugador'), _ca=_rkEsc(c.avatar||'calico'); h+='<div class="th-msg"><span class="cat th-ava'+(c.uid?' th-who-btn':'')+'" data-uid="'+_cu+'" data-nick="'+_cn+'" data-av="'+_ca+'" style="background-position:'+pfCatPos(c.avatar||'calico')+'"></span><div class="th-msg-b"><div class="th-msg-top"><b'+(c.uid?' class="th-who-btn"':'')+' data-uid="'+_cu+'" data-nick="'+_cn+'" data-av="'+_ca+'">'+_rkEsc(c.nick||'Jugador')+'</b><span class="th-time">'+thTime(c.created)+'</span>'+(canDel?'<button class="th-del" data-cid="'+c._id+'" title="Borrar">✕</button>':'')+'</div><div class="th-msg-text">'+_rkEsc(c.text||'')+'</div></div></div>'; } }
    h+='</div>';
    if(_closed){ h+='<div class="feed-gate">🔒 Esta sugerencia ya fue resuelta — el debate quedó cerrado.</div>'; }
    else if(feedCanPost()){ h+='<div class="th-compose"><textarea id="thInput" class="feed-ta" maxlength="300" placeholder="Escribí un comentario…"></textarea><button class="feed-send" id="thSend">💬 Comentar</button></div>'; }
    else { h+='<div class="feed-gate">'+feedGateTxt()+'</div>'; }
    h+='<div class="feed-msg" id="thMsg"></div>';
    body.innerHTML=h;
    var s=document.getElementById('thSend'); if(s) s.addEventListener('click', submitComment);
    var dels=body.querySelectorAll('.th-del'); for(var j=0;j<dels.length;j++){ dels[j].addEventListener('click', function(){ deleteComment(this.getAttribute('data-cid')); }); }
    var twh=body.querySelectorAll('.th-who-btn'); for(var w=0;w<twh.length;w++){ twh[w].addEventListener('click', function(){ openUserCard(this.getAttribute('data-uid'), this.getAttribute('data-nick'), this.getAttribute('data-av')); }); }
  }
  function submitComment(){
    if(!feedCanPost()){ thMsg(feedGateTxt(),'err'); return; }
    if(!_threadId) return;
    var _scg=null; for(var _q=0;_q<_sgRows.length;_q++){ if(_sgRows[_q]._id===_threadId){ _scg=_sgRows[_q]; break; } } if(_scg&&SG_CLOSED[_scg.status]){ thMsg('El debate de esta sugerencia está cerrado.','err'); return; }
    var ta=document.getElementById('thInput'); if(!ta) return; var txt=(ta.value||'').trim();
    if(txt.length<1) return; if(txt.length>300) txt=txt.slice(0,300);
    var btn=document.getElementById('thSend'); if(btn){ btn.disabled=true; btn.textContent='Enviando…'; }
    function restore(){ if(btn){ btn.disabled=false; btn.textContent='💬 Comentar'; } }
    var e=state.eq||{}, id=_threadId;
    _fbFsMod.addDoc(_fbFsMod.collection(fbDB,'suggestions',id,'comments'), { text:txt, uid:fbUser.uid, nick:(e.nick||'Jugador'), avatar:(e.avatar||'calico'), created:Date.now() }).then(function(){ if(ta) ta.value=''; if(_threadId===id) fetchComments(id).then(function(rows){ if(_threadId===id) paintThread(rows); }); restore(); }).catch(function(){ thMsg('No se pudo comentar (revisá la regla de «comments»).','err'); restore(); });
  }
  function deleteComment(cid){ if(!_threadId||!cid) return; if(!confirm('¿Borrar este comentario?')) return; var id=_threadId; _fbFsMod.deleteDoc(_fbFsMod.doc(fbDB,'suggestions',id,'comments',cid)).then(function(){ if(_threadId===id) fetchComments(id).then(function(rows){ if(_threadId===id) paintThread(rows); }); }).catch(function(){ thMsg('No se pudo borrar (permisos).','err'); }); }
  function submitSuggestion(){
    if(!feedCanPost()){ feedMsg(feedGateTxt(),'err'); return; }
    var ta=document.getElementById('suggInput'); if(!ta) return; var txt=(ta.value||'').trim();
    if(txt.length<6){ feedMsg('Escribí un poco más tu idea 🐱','err'); return; }
    if(txt.length>SUGG_MAX) txt=txt.slice(0,SUGG_MAX);
    var btn=document.getElementById('suggSend'); if(btn){ btn.disabled=true; btn.textContent='Enviando…'; }
    function restore(){ if(btn){ btn.disabled=false; btn.textContent='✦ Enviar sugerencia'; } }
    var e=state.eq||{}, cRef=_fbFsMod.doc(fbDB,'counters','suggestions'), sRef=_fbFsMod.doc(_fbFsMod.collection(fbDB,'suggestions'));
    _fbFsMod.runTransaction(fbDB, function(tx){ return tx.get(cRef).then(function(snap){ var cur=(snap.exists()&&typeof snap.data().n==='number')?snap.data().n:0; var next=cur+1; tx.set(cRef,{n:next},{merge:true}); tx.set(sRef,{ n:next, text:txt, uid:fbUser.uid, nick:(e.nick||'Jugador'), avatar:(e.avatar||'calico'), status:'pending', up:0, down:0, created:Date.now() }); return next; }); }).then(function(n){ ta.value=''; feedMsg('¡Sugerencia #'+n+' enviada! 🎉','ok'); renderBoard(); restore(); }).catch(function(){ feedMsg('No se pudo enviar (revisá las reglas de Firebase).','err'); restore(); });
  }
  function submitBug(){
    if(!(fbReady&&fbUser)){ bugMsg('🔒 Iniciá sesión para reportar un bug.','err'); return; }
    var ta=document.getElementById('bugInput'); if(!ta) return; var txt=(ta.value||'').trim();
    if(txt.length<6){ bugMsg('Contanos un poco más del bug 🐞','err'); return; }
    if(txt.length>BUG_MAX) txt=txt.slice(0,BUG_MAX);
    var btn=document.getElementById('bugSend'); if(btn){ btn.disabled=true; btn.textContent='Enviando…'; }
    function restore(){ if(btn){ btn.disabled=false; btn.textContent='🐞 Enviar reporte'; } }
    var e=state.eq||{}, L=state.life||{};
    _fbFsMod.addDoc(_fbFsMod.collection(fbDB,'bugs'), { text:txt, uid:fbUser.uid, nick:(e.nick||'Jugador'), email:(fbUser.email||''), ver:VERSION, ua:String(navigator.userAgent||'').slice(0,300), snap:{ credits:state.credits, worth:(state.credits+state.bank-state.debt), asc:(L.asc||0), runs:(L.runs||0) }, created:Date.now() }).then(function(){ ta.value=''; bugMsg('¡Gracias! Reporte enviado al dev 🐞✓','ok'); restore(); }).catch(function(){ bugMsg('No se pudo enviar (revisá las reglas de «bugs»).','err'); restore(); });
  }
  function fetchBugs(){ var q=_fbFsMod.query(_fbFsMod.collection(fbDB,'bugs'), _fbFsMod.orderBy('created','desc'), _fbFsMod.limit(40)); return _fbFsMod.getDocs(q).then(function(snap){ var rows=[]; snap.forEach(function(d){ var x=d.data()||{}; x._id=d.id; rows.push(x); }); return rows; }); }
  function renderBugList(){ var box=document.getElementById('bugList'); if(!box) return; if(!hasMedal('staff')){ box.innerHTML=''; return; } box.innerHTML='<div class="bank-note">Cargando reportes…</div>'; fetchBugs().then(function(rows){ _bugRows=rows; paintBugList(); }).catch(function(){ box.innerHTML='<div class="bank-note">No se pudo cargar los reportes.<br>(¿La regla de «bugs» permite leer al staff?)</div>'; }); }
  function paintBugList(){ var box=document.getElementById('bugList'); if(!box) return; var rows=_bugRows||[]; if(!rows.length){ box.innerHTML='<div class="bug-list-h">🐞 Reportes recibidos</div><div class="bank-note">No hay reportes todavía. 🎉</div>'; return; } var h='<div class="bug-list-h">🐞 Reportes recibidos ('+rows.length+')</div>'; for(var i=0;i<rows.length;i++){ var b=rows[i], s=b.snap||{}; var _bu=_rkEsc(b.uid||''), _bn=_rkEsc(b.nick||'Jugador'), _ba=_rkEsc(b.avatar||'calico'); h+='<div class="bug-card">'; h+='<div class="bug-top"><span class="sg-who'+(b.uid?' sg-who-btn':'')+'" data-uid="'+_bu+'" data-nick="'+_bn+'" data-av="'+_ba+'"><span class="cat" style="background-position:'+pfCatPos(b.avatar||'calico')+'"></span><b>'+_rkEsc(b.nick||'Jugador')+'</b></span><span class="bug-ver">'+_rkEsc(b.ver||'?')+'</span><span class="bug-time">'+thTime(b.created)+'</span></div>'; h+='<div class="bug-text">'+_rkEsc(b.text||'')+'</div>'; h+='<div class="bug-meta">💰 $'+fmt(s.worth||0)+' · ✨ '+fmt(s.asc||0)+' asc · 🎲 '+fmt(s.runs||0)+' part.'+(b.email?' · ✉️ '+_rkEsc(b.email):'')+'</div>'; h+='<button class="bug-del-btn" data-id="'+b._id+'">🗑️ Borrar reporte</button>'; h+='</div>'; } box.innerHTML=h; var whos=box.querySelectorAll('.sg-who-btn'); for(var w=0;w<whos.length;w++){ whos[w].addEventListener('click', function(){ openUserCard(this.getAttribute('data-uid'), this.getAttribute('data-nick'), this.getAttribute('data-av')); }); } var dls=box.querySelectorAll('.bug-del-btn'); for(var d=0;d<dls.length;d++){ dls[d].addEventListener('click', function(){ deleteBug(this.getAttribute('data-id')); }); } }
  function deleteBug(id){ if(!hasMedal('staff')||!id) return; if(!confirm('¿Borrar este reporte de bug?')) return; _fbFsMod.deleteDoc(_fbFsMod.doc(fbDB,'bugs',id)).then(function(){ renderBugList(); }).catch(function(){ bugMsg('No se pudo borrar (permisos).','err'); }); }

  document.getElementById('bankBtn').addEventListener('click', function(){ if(!state.bankUnlocked) return; renderBank(); document.getElementById('bank').classList.add('open'); bankMusic(); });
  document.getElementById('bankClose').addEventListener('click', function(){ document.getElementById('bank').classList.remove('open'); bankMode=false; });
  document.getElementById('bank').addEventListener('click', function(e){ if(e.target===this){ this.classList.remove('open'); bankMode=false; } });
  document.getElementById('catModal').addEventListener('click', function(){ if(_catWaiting){ _catWaiting=false; var c=ac(); if(c&&c.state==='suspended') c.resume(); if(state.musicOn){ catMode=true; if(!musicPlaying) startMusic(); } var cont=document.getElementById('catOk'); if(cont) cont.textContent='▶ SEGUIR'; if(!state.introSeen){ state.introSeen=true; saveState(); } typeCat(_introText); if(_introStep===0) setCatLogin(true); return; } if(_catTyping){ catSkip(); return; } if(_introStep===0){ _introStep=1; setCatLogin(false); var cont2=document.getElementById('catOk'); if(cont2) cont2.textContent='▶ ¡A JUGAR!'; typeCat(TXT_INTRO); return; } if(_catWho==='pibble' && _pibbleStep < _pibbleSeq.length-1){ _pibbleStep++; var stp=_pibbleSeq[_pibbleStep]; var cob=document.getElementById('catOk'); if(cob) cob.textContent=stp.btn; typeCat(stp.msg); return; } closeCat(); }); (function(){ var _pet=document.getElementById('pet'); if(_pet) _pet.addEventListener('click', petTalk); scheduleNextPetLife(); })();
  document.getElementById('shopBtn').addEventListener('click', function(){ renderShop(); document.getElementById('shop').classList.add('open'); if(state.musicOn){ shopMode=true; catMode=false; bankMode=false; if(!musicPlaying) startMusic(); } if(state.kattoSeen){ setTimeout(kattoSpeak, 350); } else { kattoIntroOnce(); } });
  document.getElementById('shopClose').addEventListener('click', function(){ document.getElementById('shop').classList.remove('open'); shopMode=false; clearInterval(_kattoTypeT); clearTimeout(_kattoTimer); var _kb=document.getElementById('kattoBubble'); if(_kb) _kb.classList.remove('show'); });
  document.getElementById('shop').addEventListener('click', function(e){ if(e.target===this){ this.classList.remove('open'); shopMode=false; clearInterval(_kattoTypeT); clearTimeout(_kattoTimer); var _kb=document.getElementById('kattoBubble'); if(_kb) _kb.classList.remove('show'); } });
  function renderMusicModal(){ var th=document.getElementById('ttThemes'); if(th){ var h=''; MUSIC_ORDER.forEach(function(k){ if(k==='pibble' && !state.pibble) return; var T=MUSIC_THEMES[k]; h+='<button class="tt-theme'+(state.musicTheme===k?' sel':'')+'" data-th="'+k+'">'+(state.musicTheme===k?'▶ ':'')+T.nom+' <span class="tt-ver">'+T.ver+'</span></button>'; }); th.innerHTML=h; var bs=th.querySelectorAll('.tt-theme'); for(var i=0;i<bs.length;i++){ bs[i].addEventListener('click', function(){ state.musicTheme=this.getAttribute('data-th'); if(!state.musicOn){ state.musicOn=true; musicStarted=true; } stopMusic(); startMusic(); syncSoundIcons(); renderMusicModal(); saveState(); }); } } var nm=document.getElementById('ttNow'); if(nm) nm.textContent=state.musicOn?(MUSIC_THEMES[state.musicTheme].nom+' '+MUSIC_THEMES[state.musicTheme].ver):'En pausa'; var tt=document.getElementById('turntable'); if(tt) tt.classList.toggle('spinning', state.musicOn); var ms=document.getElementById('ttMusicSt'); if(ms) ms.textContent=state.musicOn?'ON':'OFF'; var mb=document.getElementById('ttMusic'); if(mb) mb.classList.toggle('off', !state.musicOn); var ss=document.getElementById('ttSfxSt'); if(ss) ss.textContent=state.sfxOn?'ON':'OFF'; var sb=document.getElementById('ttSfx'); if(sb) sb.classList.toggle('off', !state.sfxOn); }
  document.getElementById('musicIcon').addEventListener('click', function(){ renderMusicModal(); document.getElementById('musicModal').classList.add('open'); });
  document.getElementById('musicClose').addEventListener('click', function(){ document.getElementById('musicModal').classList.remove('open'); });
  document.getElementById('musicModal').addEventListener('click', function(e){ if(e.target===this) this.classList.remove('open'); });
  document.getElementById('ttMusic').addEventListener('click', function(){ state.musicOn=!state.musicOn; if(state.musicOn){ musicStarted=true; startMusic(); } else stopMusic(); syncSoundIcons(); renderMusicModal(); saveState(); });
  document.getElementById('ttSfx').addEventListener('click', function(){ state.sfxOn=!state.sfxOn; if(state.sfxOn) ac(); renderMusicModal(); saveState(); });
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
  (function(){ var btn=document.getElementById('pfCodeBtn'), inp=document.getElementById('pfCodeInput'), msg=document.getElementById('pfCodeMsg'); if(!btn||!inp) return; function doRedeem(){ var _raw=(inp.value||'').trim().toUpperCase(); if(_raw==='PIBBLE2000'){ inp.value=''; if(state.pibble){ msg.textContent='Ya conociste a Mr.PIBBLE 🐽 saludalo con el botón de acá abajo'; msg.className='pf-code-msg'; return; } msg.textContent=''; startPibble(); return; } var r=redeemCode(inp.value); if(r==='ok'){ msg.textContent='🎉 ¡Medalla desbloqueada!'; msg.className='pf-code-msg ok'; inp.value=''; renderProfile(); if(typeof sfx==='function') sfx(660,0.05,0.12,'triangle'); } else if(r==='ya'){ msg.textContent='Ya tenías esta medalla 😺'; msg.className='pf-code-msg'; } else { msg.textContent='❌ Código incorrecto'; msg.className='pf-code-msg err'; } } btn.addEventListener('click', doRedeem); inp.addEventListener('keydown', function(e){ if(e.key==='Enter') doRedeem(); }); var pbtn=document.getElementById('pfPibbleBtn'); if(pbtn) pbtn.addEventListener('click', function(){ startPibble(); }); })();
  document.getElementById('pfEdit').addEventListener('click', function(){ var span=document.getElementById('pfName'), cur=span.textContent; var inp=document.createElement('input'); inp.value=cur; inp.maxLength=14; span.replaceWith(inp); inp.focus(); inp.select(); function save(){ var v=(inp.value||'Jugador').trim()||'Jugador'; state.eq.nick=v; saveState(); var sp=document.createElement('span'); sp.id='pfName'; sp.textContent=v; inp.replaceWith(sp); } inp.addEventListener('blur', save); inp.addEventListener('keydown', function(e){ if(e.key==='Enter') inp.blur(); }); });

  document.getElementById('helpClose').addEventListener('click', function(){ document.getElementById('helpModal').classList.remove('open'); });
  document.getElementById('helpModal').addEventListener('click', function(e){ if(e.target===this) this.classList.remove('open'); });
  document.getElementById('authClose').addEventListener('click', function(){ document.getElementById('authModal').classList.remove('open'); });
  document.getElementById('authModal').addEventListener('click', function(e){ if(e.target===this) this.classList.remove('open'); });
  document.getElementById('suggestIcon').addEventListener('click', openFeedback);
  document.getElementById('feedClose').addEventListener('click', closeFeedback);
  document.getElementById('feedback').addEventListener('click', function(e){ if(e.target===this) closeFeedback(); });
  document.getElementById('votersClose').addEventListener('click', closeVoters);
  document.getElementById('votersModal').addEventListener('click', function(e){ if(e.target===this) closeVoters(); });
  document.getElementById('threadClose').addEventListener('click', closeThread);
  document.getElementById('userCardClose').addEventListener('click', closeUserCard);
  document.getElementById('userCardModal').addEventListener('click', function(e){ if(e.target===this) closeUserCard(); });
  document.getElementById('threadModal').addEventListener('click', function(e){ if(e.target===this) closeThread(); });
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
  function verNum(v){ var p=String(v||'0').split('.'); return (parseInt(p[0],10)||0)*1000 + (parseInt(p[1],10)||0); }
  function forceUpdate(){ try{ sessionStorage.setItem('ks-upd','1'); }catch(_e){} location.href=location.pathname+'?u='+Date.now()+location.hash; }
  function showUpdatePrompt(newVer){ var m=document.getElementById('catModal'); if(!m||m.classList.contains('open')) return; try{ if(sessionStorage.getItem('ks-upd')) return; }catch(_e){} _catWho='kitty'; _introStep=-1; _catWaiting=false; _afterCat=function(){ forceUpdate(); }; setCatLogin(false); var ci=m.querySelector('.cat-img'); if(ci){ ci.onerror=function(){ this.onerror=null; this.src='assets/cat-mascot.png'; }; ci.src='assets/cat-mascot.png'; } m.classList.remove('katto'); m.classList.add('open'); if(state.musicOn){ catMode=true; if(!musicPlaying) startMusic(); } var cont=document.getElementById('catOk'); if(cont) cont.textContent='🔄 ACTUALIZAR'; typeCat('¡Actualicé el juego a la v'+newVer+'! 🎮✨|Tocá ACTUALIZAR acá abajo para refrescar y ver las novedades.|(Si en la compu no se actualiza, probá Ctrl+Shift+R)'); }
  function checkVersion(){ fetch('version.json?t='+Date.now(), {cache:'no-store'}).then(function(r){ return r.ok?r.json():null; }).then(function(d){ if(d && d.version && verNum(d.version) > verNum(VERSION)) showUpdatePrompt(d.version); }).catch(function(){}); }
  loadState().then(function(){
    refreshAfterLoad();
    initFirebase();
    setTimeout(checkVersion, 1500);
  });
