/**
 * modules/unity_bridge.js — Puente de Batalla Unity WebGL ↔ JavaScript
 * Maneja:
 * - Detección y carga de instancia Unity WebGL si existe build en unity_build/
 * - Orquestación de ciclo de vida de combate (Pausa Overworld -> Batalla -> Resultados -> Reanudar)
 * - Comunicación bidireccional mediante SendMessage y jslib
 * - Fallback automático y transparente al sistema de combate GBA HTML5/Canvas
 */
"use strict";

(function (window) {
  class UnityBattleBridge {
    constructor() {
      this.unityInstance = null;
      this.isLoaded = false;
      this.isLoading = false;
      this.currentBattle = null;
      this.onBattleComplete = null;
      this.unityContainer = null;
      this.initGlobalHandlers();
    }

    initGlobalHandlers() {
      // Handlers accesibles para scripts C# vía jslib
      window.onUnityTurnSelected = (action) => {
        this.handleTurnAction(action);
      };

      window.onUnityBattleFinished = (result) => {
        this.finishBattle(result);
      };
    }

    async initUnityInstance(containerId = 'unityContainer', buildPath = 'unity_build') {
      this.unityContainer = document.getElementById(containerId);
      if (!this.unityContainer) return false;

      // Si no existe el cargador oficial de Unity WebGL en la página, mantener modo fallback
      if (typeof window.createUnityInstance !== 'function') {
        console.info('UnityBattleBridge: createUnityInstance no encontrado. Modo Fallback HTML5 activo.');
        return false;
      }

      const canvas = this.unityContainer.querySelector('canvas') || document.createElement('canvas');
      canvas.id = 'unity-canvas';
      if (!canvas.parentElement) this.unityContainer.appendChild(canvas);

      try {
        this.isLoading = true;
        this.unityInstance = await window.createUnityInstance(canvas, {
          dataUrl: `${buildPath}/Build.data`,
          frameworkUrl: `${buildPath}/Build.framework.js`,
          codeUrl: `${buildPath}/Build.wasm`,
          streamingAssetsUrl: "StreamingAssets",
          companyName: "PokePoke",
          productName: "HoennBattle",
          productVersion: "1.0",
        });
        this.isLoaded = true;
        this.isLoading = false;
        console.log('UnityBattleBridge: Instancia de Unity WebGL cargada exitosamente.');
        return true;
      } catch (err) {
        console.warn('UnityBattleBridge: No se pudo instanciar Unity WebGL, activando fallback HTML5:', err);
        this.isLoaded = false;
        this.isLoading = false;
        return false;
      }
    }

    startBattle(battleConfig, onComplete) {
      this.currentBattle = battleConfig;
      this.onBattleComplete = onComplete;

      const payload = {
        player: {
          name: battleConfig.player.name,
          level: battleConfig.player.level || 5,
          hp: battleConfig.player.currentHp || battleConfig.player.hp,
          maxHp: battleConfig.player.hp,
          sprite: battleConfig.player.image,
          type: battleConfig.player.type,
          moves: battleConfig.moves || []
        },
        opponent: {
          name: battleConfig.opponent.name,
          level: battleConfig.opponent.level || 5,
          hp: battleConfig.opponent.hp,
          maxHp: battleConfig.opponent.maxHp || battleConfig.opponent.hp,
          sprite: battleConfig.opponent.image,
          type: battleConfig.opponent.type,
          isWild: !!battleConfig.opponent.isWild
        }
      };

      if (this.isLoaded && this.unityInstance && this.unityContainer) {
        // Modo Unity WebGL
        this.unityContainer.style.display = 'block';
        this.unityInstance.SendMessage('BattleManager', 'StartBattle', JSON.stringify(payload));
      } else {
        // Fallback a combate HTML5 / Canvas en admin.js
        console.log('UnityBattleBridge: Ejecutando combate en motor HTML5/Canvas integrado.');
        if (window.App && typeof window.App.startIntegratedBattle === 'function') {
          window.App.startIntegratedBattle(battleConfig, onComplete);
        }
      }
    }

    async handleTurnAction(action) {
      // Procesar turno con GameClient (FastAPI autoritativo o cálculo determinista local)
      if (window.GameClient) {
        const turnResult = await window.GameClient.executeBattleTurn({
          player: this.currentBattle.player,
          opponent: this.currentBattle.opponent,
          move: action.move,
          isPlayerTurn: true
        });

        if (this.isLoaded && this.unityInstance) {
          this.unityInstance.SendMessage('BattleManager', 'ResolveTurn', JSON.stringify(turnResult));
        }
      }
    }

    finishBattle(result) {
      if (this.unityContainer) {
        this.unityContainer.style.display = 'none';
      }
      if (this.onBattleComplete) {
        this.onBattleComplete(result);
      }
      this.currentBattle = null;
      this.onBattleComplete = null;
    }
  }

  window.UnityBridge = new UnityBattleBridge();
})(window);
