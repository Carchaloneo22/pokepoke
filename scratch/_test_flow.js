// Harness de prueba de flujo (se inyecta al final del <body> de _admintest.html)
(function () {
  'use strict';

  var CAP = window.__captures = window.__captures || {};
  var qs = function (s) { return document.querySelector(s); };
  var qsa = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };
  var txt = function (el) { return el ? (el.textContent || '').trim() : ''; };

  function sleep(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  async function waitFor(fn, timeout, label) {
    var t0 = Date.now();
    while (!fn()) {
      if (Date.now() - t0 > timeout) { CAP.waited = CAP.waited || []; CAP.waited.push((label || '') + ':timeout'); return false; }
      await sleep(150);
    }
    return true;
  }

  async function main() {
    try {
      await waitFor(function () { return window.App && window.App.setBattleMenuState; }, 8000, 'app');
      await sleep(1500); // dejamos cargar moves DB

      // ==== EQUIPO 2+ : añadir Treecko para test representativo (POKEMON) ====
      var did = false;
      try { if (window.App.selectPokemonAsActive) { window.App.selectPokemonAsActive(252); did = true; } } catch (e) { CAP.errSelect = String(e); }
      await sleep(150);

      // ==== 1. COMBATE DE GIMNASIO (Slaking) → menús ====
      window.App.startInMapBattle('Slaking');
      await waitFor(function () { return qs('.em-battle-panel'); }, 8000, 'battle');
      await sleep(150);
      CAP.slakingSprite = (qs('.battle-box-opponent img') || {}).src || '';
      CAP.main = qsa('.em-main-btn').length;

      window.App.setBattleMenuState('FIGHT');
      await waitFor(function () { return qsa('.em-move-cell').length >= 4; }, 8000, 'fight');
      CAP.fight = qsa('.em-move-cell').length;
      CAP.moveNames = qsa('.em-move-name').map(txt).slice(0, 8);
      CAP.movePpBefore = qsa('.em-move-pp').map(txt).slice(0, 4);
      CAP.moveStatusBtn = qsa('.em-status-btn').length;

      window.App.setBattleMenuState('MOVESTATUS');
      await waitFor(function () { return qs('.em-move-status-list'); }, 8000, 'movestatus');
      CAP.movestatus = qsa('.em-move-status-row').length;
      CAP.movestatusDetail = qsa('.em-move-status-row').map(function (r) {
        return txt(r).replace(/\s+/g, ' ');
      });

      window.App.setBattleMenuState('BAG');
      await waitFor(function () { return qs('.em-bag-list'); }, 8000, 'bag');
      CAP.bag = qsa('.em-bag-item').length;
      CAP.bagItems = qsa('.em-bag-item').map(txt);

      window.App.setBattleMenuState('POKEMON');
      await waitFor(function () { return qs('.em-party-list'); }, 8000, 'party');
      CAP.party = qsa('.em-party-item').length;

      // ==== 2. ATACAR → contest1: daño, PP y log ====
      window.App.setBattleMenuState('FIGHT');
      await sleep(100);
      var hpOppBefore = txt(qs('.battle-box-opponent small'));
      window.App.executeBattleMove(0);
      await sleep(200);
      CAP.movePpAfter = qsa('.em-move-pp').map(txt).slice(0, 4);
      CAP.hpOppBefore = hpOppBefore;
      CAP.hpOppAfter = txt(qs('.battle-box-opponent small'));
      CAP.lastLog = txt(qs('.em-message-text')).replace(/\s+/g, ' ');

      // ==== 3. RUN ====
      window.App.setBattleMenuState('MAIN');
      await sleep(100);
      window.App.battleFlee();
      await sleep(150);
      CAP.fled = !qs('.em-battle-panel');

      // ==== 4. CAPTURA salvaje ====
      window.App.triggerWildEncounter();
      await waitFor(function () { return qs('.battle-box-opponent strong'); }, 8000, 'wild');
      CAP.wildOpp = txt(qs('.battle-box-opponent strong'));
      // debilitar un poco para subir la tasa
      window.App.setBattleMenuState('FIGHT');
      await sleep(80);
      window.App.executeBattleMove(0);
      await sleep(200);
      var balls0 = 0;
      window.App.setBattleMenuState('BAG');
      await sleep(80);
      var b0 = qsa('.em-bag-item');
      if (b0[0]) balls0 = parseInt(txt(b0[0]).match(/x(\d+)/)[1] || '0', 10);
      window.App.setBattleMenuState('MAIN');
      await sleep(80);
      window.App.battleThrowBall();
      await sleep(500);
      CAP.throwLog = txt(qs('.em-message-text')).replace(/\s+/g, ' ');
      CAP.balls0 = balls0;
      window.App.battleFlee();
      await sleep(150);

      // ==== 5. VICTORIA con bot del oponente débil (test de nivel/ganar) ====
      window.App.startIntegratedBattle({
        opponent: {
          name: 'Zubat', type: 'Veneno', dexId: 41, hp: 20, maxHp: 20,
          attack: 8, defense: 8, level: 3, isWild: true,
          image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/41.png'
        },
        player: { hp: 86, currentHp: 86 },
        opponentHp: 20
      });
      await waitFor(function () { return qs('.em-battle-panel'); }, 8000, 'weak');
      window.App.setBattleMenuState('FIGHT');
      await sleep(80);
      var won = false;
      for (var i = 0; i < 10 && qs('.em-battle-panel'); i++) {
        window.App.executeBattleMove(0);
        await sleep(500);
        if (/rival ha sido debilitado|victoria/i.test(txt(qs('.em-message-text')))) { won = true; break; }
      }
      CAP.won = won;
      CAP.winLog = txt(qs('.em-message-text')).replace(/\s+/g, ' ');
      window.App.battleFlee();
      await sleep(150);

      // ==== 6. CURA DEL EQUIPO (PP restaurados) ====
      window.App.healTeam();
      await sleep(200);
      CAP.healDialogText = txt(qs('.hoenn-dialog-box, .dialog-text')).replace(/\s+/g, ' ');

      // ==== Resultado ====
      CAP.errors = window.__errors.slice(0, 30);
      document.body.setAttribute('data-errors', CAP.errors.length === 0 ? 'NONE' : CAP.errors.join(' | '));
      document.body.setAttribute('data-capture', JSON.stringify(CAP));
    } catch (err) {
      CAP.fatal = String(err && err.stack || err);
      document.body.setAttribute('data-errors', (window.__errors || []).concat([CAP.fatal]).join(' | '));
      document.body.setAttribute('data-capture', JSON.stringify(CAP));
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', main);
  } else {
    main();
  }
})();