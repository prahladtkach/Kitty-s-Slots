// ═══════════════════════════════════════════════════════════════════
// 🧩 Extras de UI · ui-extras.js
// ───────────────────────────────────────────────────────────────────
// Ayudantes chicos de interfaz agrupados: splash, fondo del menú,
// panel racha+logros y botón de ayuda. Se juntan acá para no tener
// varios archivos minúsculos sueltos.
// ═══════════════════════════════════════════════════════════════════
// ─── SPLASH (pantalla de bienvenida) ───
(function(){ var s=document.getElementById('smSplash'); if(!s) return;
  var go=function(){ if(s._done) return; s._done=true; s.classList.add('sm-splash-go'); setTimeout(function(){ s.style.display='none'; }, 520); };
  s.addEventListener('pointerdown', go, {once:true});
  setTimeout(go, 2600);
})();


// ─── FONDO DEL MENÚ (detección de color) ───
(function(){ var m=document.getElementById('startMenu'); if(!m) return;
  function chk(){ try{ var bg=getComputedStyle(document.documentElement).getPropertyValue('--bg').trim().toLowerCase(); m.classList.toggle('sm-arg', bg==='#0e2a47'); }catch(_e){} }
  chk();
  try{ new MutationObserver(chk).observe(document.documentElement,{attributes:true,attributeFilter:['style']}); }catch(_e){}
  setInterval(chk, 1200);
})();


// ─── PANEL RACHA + LOGROS (modal combinado) ───
/* Panel combinado Racha + Logros (no toca la logica del juego; reubica + engancha) */
(function(){
  try{
    var rew=document.getElementById('rewardsModal');
    var rPane=document.getElementById('rewRacha'), lPane=document.getElementById('rewLogros');
    var dBody=document.getElementById('dailyBody');
    var lTabs=document.getElementById('logTabs'), lBody=document.getElementById('logrosBody');
    var dM=document.getElementById('dailyModal'), lM=document.getElementById('logrosModal');
    if(!(rew&&rPane&&lPane&&dBody&&lTabs&&lBody&&dM&&lM)) return; /* fallback: dejar los originales */
    /* reubicar el contenido (el juego sigue renderizando por ID) */
    rPane.appendChild(dBody);
    lPane.appendChild(lTabs); lPane.appendChild(lBody);
    /* ocultar los modales viejos (siguen en el DOM para que el juego no rompa) */
    dM.classList.add('sm-merged'); lM.classList.add('sm-merged');

    var tabs=rew.querySelectorAll('.rew-tab');
    function setTab(t){ for(var i=0;i<tabs.length;i++){ tabs[i].classList.toggle('active', tabs[i].getAttribute('data-rt')===t); } rPane.style.display=(t==='racha')?'':'none'; lPane.style.display=(t==='logros')?'':'none'; }
    var _busy=false;
    function renderBoth(){ _busy=true; try{ var d=document.getElementById('dailyIcon'); if(d) d.click(); var l=document.getElementById('logrosIcon'); if(l) l.click(); }catch(e){} _busy=false; }
    function openRew(t){ setTab(t||'racha'); rew.classList.add('open'); renderBoth(); }
    function closeRew(){ rew.classList.remove('open'); try{ dM.classList.remove('open'); lM.classList.remove('open'); }catch(e){} }

    for(var i=0;i<tabs.length;i++){ (function(b){ b.addEventListener('click', function(){ setTab(b.getAttribute('data-rt')); }); })(tabs[i]); }
    var x=document.getElementById('rewardsClose'); if(x) x.addEventListener('click', closeRew);
    rew.addEventListener('click', function(e){ if(e.target===rew) closeRew(); });

    function onOpen(which){ if(_busy || rew.classList.contains('open')) return; openRew(which==='d'?'racha':'logros'); }
    function watch(el,w){ new MutationObserver(function(ms){ for(var i=0;i<ms.length;i++){ if(ms[i].attributeName==='class' && el.classList.contains('open')){ onOpen(w); break; } } }).observe(el,{attributes:true,attributeFilter:['class']}); }
    watch(dM,'d'); watch(lM,'l');

    /* que el icono de logros del menu abra el panel combinado */
    var smLog=document.getElementById('smLogIco');
    if(smLog){ var c=smLog.cloneNode(true); smLog.parentNode.replaceChild(c,smLog); c.addEventListener('click', function(e){ if(e&&e.preventDefault)e.preventDefault(); openRew('logros'); }); }

    window.__openRewards=openRew;
  }catch(e){}
})();


// ─── CÓMO JUGAR (botón de ayuda) ───

(function(){ var h=document.getElementById('howto'); if(!h) return;
  document.getElementById('helpBtn').addEventListener('click', function(){ h.style.display='flex'; });
  document.getElementById('howtoClose').addEventListener('click', function(){ h.style.display='none'; });
  h.addEventListener('click', function(e){ if(e.target===h) h.style.display='none'; });
})();

