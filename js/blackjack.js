// ═══════════════════════════════════════════════════════════════════
// 🃏 Kitty's Blackjack · blackjack.js
// ───────────────────────────────────────────────────────────────────
// Juego de blackjack del Casino. Se comunica con el juego principal
// (slots) a través de window.__casino — la billetera compartida.
// Extraído de index.html para mantener el HTML liviano.
// ═══════════════════════════════════════════════════════════════════

(function(){
  "use strict";

  var SUITS = [ {s:'♠',c:'dark'}, {s:'♥',c:'red'}, {s:'♦',c:'red'}, {s:'♣',c:'dark'} ];
  var RANKS = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];

  var balance = 1000;
  var bet = 0;
  var shoe = [];
  var player = [];
  var dealer = [];
  var phase = 'bet';        // bet | play | result
  var holeHidden = true;
  var kbEl=null, kbReturnT=null, kbCol=2, kbRow=4, lastCards=0;

  // ---- deck / shoe ----
  function buildShoe(){
    shoe = [];
    for(var d=0; d<4; d++){
      for(var s=0; s<SUITS.length; s++){
        for(var r=0; r<RANKS.length; r++){
          shoe.push({ r:RANKS[r], s:SUITS[s].s, c:SUITS[s].c });
        }
      }
    }
    // Fisher-Yates
    for(var i=shoe.length-1; i>0; i--){
      var j = Math.floor(Math.random()*(i+1));
      var t = shoe[i]; shoe[i] = shoe[j]; shoe[j] = t;
    }
  }
  function draw(){
    if(shoe.length < 20) buildShoe();
    return shoe.pop();
  }

  // ---- hand value (soft-ace aware) ----
  function rankVal(r){ if(r==='A') return 1; if(r==='J'||r==='Q'||r==='K') return 10; return parseInt(r,10); }
  function evalHand(cards){
    var sum=0, aces=0;
    for(var i=0;i<cards.length;i++){ sum += rankVal(cards[i].r); if(cards[i].r==='A') aces++; }
    var soft=false;
    if(aces>0 && sum+10<=21){ sum+=10; soft=true; }
    return { value:sum, soft:soft };
  }
  function isBlackjack(cards){ return cards.length===2 && evalHand(cards).value===21; }

  // ---- dealer eyes ----
  function kbRender(){ if(kbEl) kbEl.style.backgroundPosition = (-kbCol*54)+'px '+(-kbRow*54)+'px'; }
  function kbGlance(row,h){ if(!kbEl) return; if(kbReturnT) clearTimeout(kbReturnT); kbRow=row; kbRender(); kbReturnT=setTimeout(function(){ kbRow=4; kbRender(); kbReturnT=null; }, h||300); }

  // ---- rendering ----
  function slotEl(){ var d=document.createElement('div'); d.className='slot'; return d; }
  var SUIT_ROW = {'♥':0,'♦':1,'♠':2,'♣':3};
  function cardEl(card, faceDown){
    var d = document.createElement('div');
    d.className = 'card';
    var col, row;
    if(faceDown){ col=0; row=4; }
    else { col = RANKS.indexOf(card.r); row = SUIT_ROW[card.s]; }
    d.style.backgroundPosition = (-(col*86))+'px '+(-(row*118))+'px';
    return d;
  }
  function renderHands(){
    var dr = document.getElementById('bjDealerRow');
    var pr = document.getElementById('bjPlayerRow');
    dr.innerHTML=''; pr.innerHTML='';
    for(var i=0;i<dealer.length;i++){
      dr.appendChild(cardEl(dealer[i], (holeHidden && i===1)));
    }
    for(var k=0;k<player.length;k++){
      pr.appendChild(cardEl(player[k], false));
    }
    if(dealer.length===0){ dr.appendChild(slotEl()); dr.appendChild(slotEl()); }
    if(player.length===0){ pr.appendChild(slotEl()); pr.appendChild(slotEl()); }
    // values
    var pv = document.getElementById('bjPlayerVal');
    var dv = document.getElementById('bjDealerVal');
    if(player.length){ pv.style.visibility='visible'; var pe=evalHand(player); pv.textContent = (pe.soft?'':'')+pe.value + (isBlackjack(player)?' · BJ':(pe.soft?' (blanda)':'')); }
    else pv.style.visibility='hidden';
    if(dealer.length){
      dv.style.visibility='visible';
      if(holeHidden){ dv.textContent = evalHand([dealer[0]]).value + ' + ?'; }
      else { var de=evalHand(dealer); dv.textContent = de.value + (isBlackjack(dealer)?' · BJ':''); }
    } else dv.style.visibility='hidden';
    var _tot=player.length+dealer.length; if(kbEl && _tot>lastCards){ kbGlance(2+(_tot%2),300); } lastCards=_tot;
  }
  function fmt(n){ return '$'+n.toLocaleString('es-AR'); }
  function refreshMoney(){
    document.getElementById('bjBalAmt').textContent = fmt(balance);
    document.getElementById('bjBetAmt').textContent = fmt(bet);
    document.getElementById('bjBetAmt2').textContent = fmt(bet);
    bjSaveCredits();
  }
  function setMsg(t, cls){ var m=document.getElementById('bjMsg'); m.textContent=t; m.className='msg'+(cls?' '+cls:''); }

  function showPhase(p){
    phase=p;
    document.getElementById('bjBetPhase').classList.toggle('hidden', p!=='bet');
    document.getElementById('bjPlayPhase').classList.toggle('hidden', p!=='play');
    document.getElementById('bjResultPhase').classList.toggle('hidden', p!=='result');
    if(p==='play'){
      // double only allowed with exactly 2 cards and enough balance
      document.getElementById('bjDoubleBtn').disabled = !(player.length===2 && balance>=bet);
    }
    if(p==='bet'){
      document.getElementById('bjDealBtn').disabled = !(bet>0 && bet<=balance);
    }
  }

  // ---- betting ----
  function addChip(v){
    if(phase!=='bet') return;
    if(bet+v > balance){ bet = balance; } else { bet += v; }
    refreshMoney();
    document.getElementById('bjDealBtn').disabled = !(bet>0 && bet<=balance);
  }
  function clearBet(){ if(phase!=='bet') return; bet=0; refreshMoney(); document.getElementById('bjDealBtn').disabled=true; }

  // ---- game flow ----
  function deal(){
    if(!(bet>0 && bet<=balance)) return;
    balance -= bet;
    player=[]; dealer=[]; holeHidden=true;
    kbCol=(kbCol+1)%5; kbRender();
    refreshMoney();
    player.push(draw()); dealer.push(draw());
    player.push(draw()); dealer.push(draw());
    renderHands();

    var pBJ = isBlackjack(player), dBJ = isBlackjack(dealer);
    if(pBJ || dBJ){
      holeHidden=false; renderHands();
      if(pBJ && dBJ){ settle('push'); }
      else if(pBJ){ settle('blackjack'); }
      else { settle('lose', 'dealer_bj'); }
      return;
    }
    setMsg('Tu turno: ¿pedís o te plantás?');
    showPhase('play');
  }

  function hit(){
    if(phase!=='play') return;
    player.push(draw());
    renderHands();
    document.getElementById('bjDoubleBtn').disabled = true; // no double after hit
    var e = evalHand(player);
    if(e.value>21){ settle('lose','bust'); }
    else if(e.value===21){ stand(); }
    else { setMsg('¿Otra o te plantás?'); }
  }

  function doDouble(){
    if(phase!=='play' || player.length!==2 || balance<bet) return;
    balance -= bet; bet *= 2; refreshMoney();
    player.push(draw()); renderHands();
    var e = evalHand(player);
    if(e.value>21){ settle('lose','bust'); }
    else { dealerPlay(); }
  }

  function stand(){
    if(phase!=='play') return;
    dealerPlay();
  }

  function dealerPlay(){
    holeHidden=false; renderHands();
    // dealer draws to 17 (stands on all 17)
    function step(){
      var e = evalHand(dealer);
      if(e.value < 17){
        dealer.push(draw());
        renderHands();
        setTimeout(step, 550);
      } else {
        resolve();
      }
    }
    setMsg('JackBlack juega…');
    setTimeout(step, 500);
  }

  function resolve(){
    var pv = evalHand(player).value;
    var dv = evalHand(dealer).value;
    if(dv>21){ settle('win','dealer_bust'); }
    else if(pv>dv){ settle('win'); }
    else if(pv<dv){ settle('lose'); }
    else { settle('push'); }
  }

  function settle(outcome, reason){
    var payout=0, txt='', cls='';
    if(outcome==='blackjack'){ payout = bet + Math.round(bet*1.5); txt='¡BLACKJACK! 🎉  +'+fmt(Math.round(bet*1.5)); cls='bj'; }
    else if(outcome==='win'){ payout = bet*2; txt = (reason==='dealer_bust'?'JackBlack se pasó — ':'')+'¡GANASTE!  +'+fmt(bet); cls='win'; }
    else if(outcome==='push'){ payout = bet; txt='EMPATE — recuperás tu apuesta'; cls='push'; }
    else { payout = 0; txt = (reason==='bust'?'Te pasaste 💥':(reason==='dealer_bj'?'JackBlack tenía Blackjack':'Perdiste'))+'  -'+fmt(bet); cls='lose'; }
    balance += payout;
    refreshMoney();
    setMsg(txt, cls);
    // keep last bet for convenience; if broke, drop bet to 0
    if(bet>balance){ bet = balance; }
    showPhase('result');
    document.getElementById('bjResetBtn').parentElement.style.display = balance<=0 ? 'block' : 'block';
  }

  function nextHand(){
    // carry the same bet if affordable, else clamp
    if(bet>balance) bet = balance;
    player=[]; dealer=[]; holeHidden=true;
    renderHands();
    if(balance<=0){ bet=0; setMsg('Te quedaste sin fichas 😿  Reiniciá el saldo.'); }
    else { setMsg('Apuesta lista: '+fmt(bet)+'. Ajustá y repartí.'); }
    refreshMoney();
    showPhase('bet');
  }

  function resetBank(){ balance=1000; bet=0; player=[]; dealer=[]; renderHands(); refreshMoney(); setMsg('Saldo reiniciado. ¡A jugar!'); showPhase('bet'); }

  // ---- wire up ----
  var chips = document.querySelectorAll('.chip');
  for(var i=0;i<chips.length;i++){ chips[i].addEventListener('click', function(){ addChip(parseInt(this.getAttribute('data-v'),10)); }); }
  document.getElementById('bjClearBtn').addEventListener('click', clearBet);
  document.getElementById('bjDealBtn').addEventListener('click', deal);
  document.getElementById('bjHitBtn').addEventListener('click', hit);
  document.getElementById('bjStandBtn').addEventListener('click', stand);
  document.getElementById('bjDoubleBtn').addEventListener('click', doDouble);
  document.getElementById('bjAgainBtn').addEventListener('click', nextHand);

  kbEl=document.querySelector('.kb'); if(kbEl) kbRender();
  setInterval(function(){ if(!kbEl||kbReturnT) return; if(phase==='bet'||phase==='play'){ kbGlance(6,130); } }, 2800);
  buildShoe();
  refreshMoney();
  showPhase('bet');

  // ===== Puente billetera Casino + abrir/cerrar =====
  var bjActive = false;
  function bjLoadCredits(){ try{ if(window.__casino && typeof window.__casino.getCredits==='function'){ balance = window.__casino.getCredits(); } }catch(_e){} }
  var bjLastSaved = null;
  function bjSaveCredits(){ if(!bjActive) return; if(balance===bjLastSaved) return; bjLastSaved=balance; try{ if(window.__casino && typeof window.__casino.setCredits==='function'){ window.__casino.setCredits(balance); } }catch(_e){} }
  window.bjOpen = function(){ var el=document.getElementById('bjApp'); if(!el) return; bjLoadCredits(); bjActive=true; refreshMoney(); el.style.display='flex'; };
  window.bjClose = function(){ bjActive=false; var el=document.getElementById('bjApp'); if(el) el.style.display='none'; };

})();

