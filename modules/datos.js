(function () {
  'use strict';

  async function load(urls) {
    const entries = await Promise.all(Object.entries(urls).map(async ([key, url]) => [key, await fetch(url).then(response => {
      if (!response.ok) throw new Error(`No se pudo cargar ${url}`);
      return response.json();
    })]));
    return Object.fromEntries(entries);
  }

  window.GameData = { load };
}());
