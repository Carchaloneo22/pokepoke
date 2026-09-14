(function () {
  'use strict';

  const DEFAULT_ENCOUNTER_CHANCE = 0.12;

  function shouldEncounter(chance) {
    const value = Number.isFinite(chance) ? chance : DEFAULT_ENCOUNTER_CHANCE;
    return Math.random() < Math.max(0, Math.min(1, value));
  }

  function weightedPick(entries) {
    const total = entries.reduce((sum, entry) => sum + Math.max(0, entry.peso || 0), 0);
    let roll = Math.random() * total;
    return entries.find(entry => (roll -= Math.max(0, entry.peso || 0)) <= 0) || entries[entries.length - 1];
  }

  function createController(options) {
    const config = { width: 12, height: 8, encounterChance: DEFAULT_ENCOUNTER_CHANCE, ...(options || {}) };
    let position = { x: 1, y: 5 };
    return {
      getPosition: () => ({ ...position }),
      move(dx, dy) {
        position.x = Math.max(0, Math.min(config.width - 1, position.x + dx));
        position.y = Math.max(0, Math.min(config.height - 1, position.y + dy));
        return { position: { ...position }, encounter: shouldEncounter(config.encounterChance) };
      },
      pickEncounter(table) { return weightedPick(table || []); }
    };
  }

  window.GameMap = { DEFAULT_ENCOUNTER_CHANCE, shouldEncounter, weightedPick, createController };
}());
