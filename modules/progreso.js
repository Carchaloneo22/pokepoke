(function () {
  'use strict';

  function createProgress(profile) {
    return {
      accountId: profile.accountId,
      character: profile,
      team: [],
      inventory: { monedas: 0, ingredientes: [] },
      medals: [], recipes: [], customersServed: 0
    };
  }

  function save(key, progress) { localStorage.setItem(`rpg_${key}`, JSON.stringify(progress)); }
  function load(key) { try { return JSON.parse(localStorage.getItem(`rpg_${key}`) || 'null'); } catch { return null; } }

  window.GameProgress = { createProgress, save, load };
}());
