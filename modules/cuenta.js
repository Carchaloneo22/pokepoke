(function () {
  'use strict';

  function normalize(value) {
    return String(value || '').trim().toLowerCase();
  }

  function accountId(email) {
    const input = normalize(email);
    let hash = 2166136261;
    for (let index = 0; index < input.length; index += 1) {
      hash ^= input.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return `cuenta_${(hash >>> 0).toString(16).padStart(8, '0')}`;
  }

  function validateName(name) {
    return /^[A-Za-z0-9 ]{2,18}$/.test(String(name || '').trim());
  }

  function createProfile(email, name, customization) {
    if (!validateName(name)) throw new Error('El nombre debe tener 2-18 caracteres alfanumericos.');
    return {
      accountId: accountId(email),
      email: normalize(email),
      name: String(name).trim(),
      customization: { design: 'viajera', skin: 'media', hair: 'castano', outfit: 'mostaza', ...(customization || {}) },
      team: [], inventory: { monedas: 0, ingredientes: [] }, medals: [], recipes: [], customersServed: 0
    };
  }

  window.GameAccount = { accountId, validateName, createProfile };
}());
