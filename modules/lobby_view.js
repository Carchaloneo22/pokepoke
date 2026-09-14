/**
 * modules/lobby_view.js — Interfaz y Lógica de la Sala Unión MMO (Lobby 2D)
 * Maneja:
 * - Menú contextual de interacción con otros jugadores (Hablar, Duelo, Trade).
 * - Interfaz de Intercambio Dual-Lock (Pokémon con objetos equipados + Ítems + Monedas).
 * - Barra de Chat en tiempo real con burbujas de diálogo estilo Habbo.
 * - Panel de Máquinas Ocultas (MO 01 a MO 08) según la guía de Guías Nintendo.
 */
"use strict";

(function (global) {
  class LobbyManager {
    constructor() {
      this.currentTrade = null;
      this.selectedTradePokemonIndex = null;
      this.selectedTradeItems = {};
      this.activeTargetPlayer = null;
      this.chatHistory = [];
      this.initEventListeners();
    }

    initEventListeners() {
      if (!global.MultiplayerClient) return;

      // Evento de mensaje de chat recibido
      global.MultiplayerClient.on('onChatMessage', (msg) => {
        this.addChatMessage(msg);
      });

      // Evento de solicitud de intercambio recibida
      global.MultiplayerClient.on('onTradeInvite', (data) => {
        this.showTradeInviteModal(data);
      });

      // Evento de inicio de intercambio
      global.MultiplayerClient.on('onTradeStarted', (trade) => {
        this.currentTrade = trade;
        this.openTradeModal();
      });

      // Evento de sincronización de la oferta
      global.MultiplayerClient.on('onTradeSync', (trade) => {
        this.currentTrade = trade;
        this.updateTradeUI();
      });

      // Evento de intercambio completado
      global.MultiplayerClient.on('onTradeCompleted', (data) => {
        this.handleTradeCompleted(data);
      });

      // Evento de intercambio cancelado
      global.MultiplayerClient.on('onTradeCancelled', (data) => {
        this.closeTradeModal();
        alert(data.reason || 'El intercambio ha sido cancelado.');
      });

      // Los desafíos de duelo (Retar/Aceptar/Rechazar) los gestiona admin.js
      // vía el HUD de acciones rápidas para no duplicar el flujo con un confirm().
    }

    /* ============================================================
       CHAT Y BURBUJAS ESTILO HABBO
       ============================================================ */
    sendChatMessage(text, scope = 'ROOM') {
      if (!text || !text.trim()) return;
      const cleanText = text.trim();

      if (global.MultiplayerClient) {
        global.MultiplayerClient.sendChat(cleanText, scope, this.activeTargetPlayer?.id);
      }

      // Burbuja propia sobre el personaje local
      if (global.worldTileRenderer && typeof global.worldTileRenderer.setMyChatBubble === 'function') {
        global.worldTileRenderer.setMyChatBubble(cleanText);
      }

      this.addChatMessage({
        sender_name: (global.trainerState && global.trainerState.name) || 'Tú',
        text: cleanText,
        scope: scope,
        timestamp: Date.now() / 1000,
        isMe: true
      });
    }

    addChatMessage(msg) {
      this.chatHistory.push(msg);
      if (this.chatHistory.length > 80) this.chatHistory.shift();

      const chatLog = document.getElementById('lobbyChatLog');
      if (chatLog) {
        const item = document.createElement('div');
        item.className = 'chat-message-item' + (msg.isMe ? ' is-me' : '') + (msg.scope === 'WHISPER' ? ' is-whisper' : '');
        const timeStr = new Date((msg.timestamp || Date.now() / 1000) * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        item.innerHTML = `
          <span class="chat-time">[${timeStr}]</span>
          <strong class="chat-sender">${escapeHtml(msg.sender_name)}:</strong>
          <span class="chat-text">${escapeHtml(msg.text)}</span>
        `;
        chatLog.appendChild(item);
        chatLog.scrollTop = chatLog.scrollHeight;
      }
    }

    /* ============================================================
       MENÚ CONTEXTUAL DE JUGADOR (CLIC EN OTRO ENTRENADOR)
       ============================================================ */
    openPlayerContextMenu(player) {
      this.activeTargetPlayer = player;
      const modal = document.getElementById('playerContextModal');
      if (!modal) return;

      document.getElementById('contextPlayerName').textContent = player.name || 'Entrenador';
      document.getElementById('contextPlayerState').textContent = player.state || 'Explorando';
      document.getElementById('contextPlayerBadges').textContent = `${player.badge_count || 0} Medallas`;

      modal.style.display = 'flex';
    }

    closePlayerContextMenu() {
      const modal = document.getElementById('playerContextModal');
      if (modal) modal.style.display = 'none';
    }

    challengeSelectedPlayer() {
      if (!this.activeTargetPlayer) return;
      if (global.MultiplayerClient) {
        global.MultiplayerClient.sendChallenge(this.activeTargetPlayer.id);
        alert(`¡Desafío de combate enviado a ${this.activeTargetPlayer.name}! Esperando respuesta...`);
      }
      this.closePlayerContextMenu();
    }

    tradeWithSelectedPlayer() {
      if (!this.activeTargetPlayer) return;
      if (global.MultiplayerClient) {
        global.MultiplayerClient.sendTradeInvite(this.activeTargetPlayer.id);
        alert(`¡Solicitud de intercambio enviada a ${this.activeTargetPlayer.name}!`);
      }
      this.closePlayerContextMenu();
    }

    whisperToSelectedPlayer() {
      if (!this.activeTargetPlayer) return;
      const input = document.getElementById('lobbyChatInput');
      if (input) {
        input.value = `/w ${this.activeTargetPlayer.name} `;
        input.focus();
      }
      this.closePlayerContextMenu();
    }

    /* ============================================================
       SOLICITUDES ENTRANTES (DUELO & TRADE)
       ============================================================ */
    showTradeInviteModal(data) {
      if (confirm(`El entrenador "${data.from_name}" te ha invitado a un intercambio Pokémon. ¿Deseas aceptar?`)) {
        if (global.MultiplayerClient) {
          global.MultiplayerClient.respondTrade(data.trade_id, true);
        }
      } else {
        if (global.MultiplayerClient) {
          global.MultiplayerClient.respondTrade(data.trade_id, false);
        }
      }
    }

    /* ============================================================
       MODAL DE INTERCAMBIO SEGURO DUAL-LOCK
       ============================================================ */
    openTradeModal() {
      const modal = document.getElementById('tradeModalOverlay');
      if (!modal) return;
      this.selectedTradePokemonIndex = null;
      this.selectedTradeItems = {};
      modal.style.display = 'flex';
      this.renderTradeOfferSelectors();
      this.updateTradeUI();
    }

    closeTradeModal() {
      const modal = document.getElementById('tradeModalOverlay');
      if (modal) modal.style.display = 'none';
      if (this.currentTrade && global.MultiplayerClient) {
        global.MultiplayerClient.cancelTrade(this.currentTrade.trade_id);
      }
      this.currentTrade = null;
    }

    getAvailableTeam() {
      const team = [];
      if (global.trainerState?.starter) team.push(global.trainerState.starter);
      if (Array.isArray(global.trainerState?.collection)) {
        global.trainerState.collection.forEach(p => {
          if (p && !team.some(existing => existing.id === p.id && existing.name === p.name)) {
            team.push(p);
          }
        });
      }
      if (Array.isArray(global.trainerState?.team)) {
        global.trainerState.team.forEach(p => {
          if (p && !team.some(existing => existing.id === p.id && existing.name === p.name)) {
            team.push(p);
          }
        });
      }
      return team;
    }

    renderTradeOfferSelectors() {
      const teamContainer = document.getElementById('tradeMyTeamList');
      const itemsContainer = document.getElementById('tradeMyItemsList');
      if (!teamContainer || !itemsContainer) return;

      teamContainer.innerHTML = '';
      const team = this.getAvailableTeam();

      team.forEach((poke, idx) => {
        const div = document.createElement('div');
        div.className = 'trade-poke-card' + (this.selectedTradePokemonIndex === idx ? ' selected' : '');
        div.innerHTML = `
          <div class="poke-icon"><img src="${poke.image || poke.sprite || poke.frontSprite || 'assets/sprites/default_pokemon.png'}" width="36" height="36"></div>
          <div class="poke-info">
            <strong>${escapeHtml(poke.name || 'Pokémon')}</strong>
            <span>Nv. ${poke.level || 5}</span>
            <small class="held-item">🎒 ${poke.heldItem || 'Sin objeto'}</small>
          </div>
        `;
        div.onclick = () => {
          this.selectedTradePokemonIndex = idx;
          this.renderTradeOfferSelectors();
          this.sendCurrentOffer();
        };
        teamContainer.appendChild(div);
      });

      itemsContainer.innerHTML = '';
      const items = (global.trainerState && global.trainerState.inventory && global.trainerState.inventory.items) || {};
      Object.keys(items).forEach(itemName => {
        const count = items[itemName];
        if (count <= 0) return;
        const div = document.createElement('div');
        div.className = 'trade-item-pill' + (this.selectedTradeItems[itemName] ? ' active' : '');
        div.innerHTML = `<span>${escapeHtml(itemName)} (x${count})</span>`;
        div.onclick = () => {
          if (this.selectedTradeItems[itemName]) {
            delete this.selectedTradeItems[itemName];
          } else {
            this.selectedTradeItems[itemName] = 1;
          }
          this.renderTradeOfferSelectors();
          this.sendCurrentOffer();
        };
        itemsContainer.appendChild(div);
      });
    }

    sendCurrentOffer() {
      if (!this.currentTrade || !global.MultiplayerClient) return;
      const team = this.getAvailableTeam();
      const poke = this.selectedTradePokemonIndex != null ? team[this.selectedTradePokemonIndex] : null;

      global.MultiplayerClient.sendTradeOffer(
        this.currentTrade.trade_id,
        this.selectedTradePokemonIndex,
        poke ? {
          name: poke.name,
          level: poke.level || 5,
          hp: poke.hp || 20,
          heldItem: poke.heldItem || null,
          sprite: poke.image || poke.sprite || poke.frontSprite || null
        } : null,
        this.selectedTradeItems
      );
    }

    lockTrade() {
      if (!this.currentTrade || !global.MultiplayerClient) return;
      global.MultiplayerClient.lockTrade(this.currentTrade.trade_id);
    }

    confirmTrade() {
      if (!this.currentTrade || !global.MultiplayerClient) return;
      global.MultiplayerClient.confirmTrade(this.currentTrade.trade_id);
    }

    updateTradeUI() {
      if (!this.currentTrade) return;
      const myId = (global.trainerState && global.trainerState.name && global.trainerState.name.toLowerCase()) || 'yo';
      const isTrainerA = (myId === (this.currentTrade.trainer_a_id || '').toLowerCase() || myId === (this.currentTrade.trainer_a_name || '').toLowerCase());
      const myOffer = isTrainerA ? this.currentTrade.offer_a : this.currentTrade.offer_b;
      const theirOffer = isTrainerA ? this.currentTrade.offer_b : this.currentTrade.offer_a;
      const theirName = isTrainerA ? this.currentTrade.trainer_b_name : this.currentTrade.trainer_a_name;

      document.getElementById('tradePartnerName').textContent = theirName || 'Compañero';

      // Vista del compañero
      const theirView = document.getElementById('tradePartnerOfferDisplay');
      if (theirView) {
        if (theirOffer.pokemon_summary) {
          const p = theirOffer.pokemon_summary;
          theirView.innerHTML = `
            <div class="partner-poke-preview">
              <img src="${p.sprite || 'assets/sprites/default_pokemon.png'}" width="48" height="48">
              <div>
                <strong>${escapeHtml(p.name)} (Nv. ${p.level})</strong>
                <div>Objeto equipado: <em>${escapeHtml(p.heldItem || 'Ninguno')}</em></div>
              </div>
            </div>
          `;
        } else {
          theirView.innerHTML = `<div class="empty-offer-prompt">Esperando selección de Pokémon...</div>`;
        }

        // Ítems ofrecidos por el compañero
        const partnerItemsList = Object.keys(theirOffer.items || {});
        if (partnerItemsList.length > 0) {
          const itemsHtml = partnerItemsList.map(it => `<span class="partner-item-badge">🎒 ${escapeHtml(it)} x${theirOffer.items[it]}</span>`).join(' ');
          theirView.innerHTML += `<div class="partner-items-row"><strong>Objetos adicionales:</strong> ${itemsHtml}</div>`;
        }
      }

      // Estados de Bloqueo y Confirmación
      const lockBtn = document.getElementById('tradeLockBtn');
      const confirmBtn = document.getElementById('tradeConfirmBtn');
      const myLockStatus = document.getElementById('myLockStatus');
      const partnerLockStatus = document.getElementById('partnerLockStatus');

      if (myLockStatus) {
        myLockStatus.textContent = myOffer.is_locked ? '🔒 Oferta Bloqueada' : '🔓 Modificando Oferta';
        myLockStatus.className = 'lock-badge ' + (myOffer.is_locked ? 'locked' : 'unlocked');
      }

      if (partnerLockStatus) {
        partnerLockStatus.textContent = theirOffer.is_locked ? '🔒 Oferta Bloqueada' : '⏳ Eligiendo Oferta';
        partnerLockStatus.className = 'lock-badge ' + (theirOffer.is_locked ? 'locked' : 'unlocked');
      }

      if (lockBtn) {
        lockBtn.disabled = myOffer.is_locked;
        lockBtn.textContent = myOffer.is_locked ? 'Oferta Fijada' : 'Fijar y Bloquear Oferta';
      }

      if (confirmBtn) {
        // Solo habilitar confirmación si AMBOS fijaron la oferta
        const bothLocked = myOffer.is_locked && theirOffer.is_locked;
        confirmBtn.disabled = !bothLocked || myOffer.is_confirmed;
        confirmBtn.textContent = myOffer.is_confirmed ? '¡Confirmado! Esperando rival...' : 'Confirmar Intercambio Definitivo';
      }
    }

    handleTradeCompleted(data) {
      const modal = document.getElementById('tradeModalOverlay');
      if (modal) modal.style.display = 'none';

      // Reproducir animación GBA Cable Link
      alert('🎉 ¡INTERCAMBIO COMPLETADO CON ÉXITO! Tus Pokémon y objetos se han actualizado en el servidor.');
      this.currentTrade = null;

      // Recargar perfil del servidor
      if (global.GameClient && typeof global.GameClient.getPlayerProfile === 'function') {
        global.GameClient.getPlayerProfile().then(profile => {
          if (profile && global.trainerState) {
            global.trainerState.team = profile.team;
            global.trainerState.inventory = profile.inventory;
          }
        });
      }
    }

    /* ============================================================
       PANEL DE MÁQUINAS OCULTAS (MO 01 A MO 08 - GUÍAS NINTENDO)
       ============================================================ */
    openHMMenu() {
      const modal = document.getElementById('hmModalOverlay');
      const container = document.getElementById('hmCardsContainer');
      if (!modal || !container) return;

      const HM_LIST = [
        {
          key: 'CORTE',
          code: 'MO 01',
          name: 'Corte',
          type: 'Normal',
          badge: 'Medalla Piedra',
          leader: 'Petra (Ciudad Férrica)',
          desc: 'Permite talar pequeños arbustos espinosos y árboles finos que bloquean accesos.',
          icon: 'fa-tree'
        },
        {
          key: 'VUELO',
          code: 'MO 02',
          name: 'Vuelo',
          type: 'Volador',
          badge: 'Medalla Pluma',
          leader: 'Alana (Ciudad Arborada)',
          desc: 'Permite viajar volando al instante a cualquier ciudad o pueblo de Hoenn ya visitado.',
          icon: 'fa-feather-alt'
        },
        {
          key: 'SURF',
          code: 'MO 03',
          name: 'Surf',
          type: 'Agua',
          badge: 'Medalla Equilibrio',
          leader: 'Norman (Ciudad Petalia)',
          desc: 'Permite navegar sobre el mar, lagos y cursos fluviales de la región.',
          icon: 'fa-water'
        },
        {
          key: 'FUERZA',
          code: 'MO 04',
          name: 'Fuerza',
          type: 'Normal',
          badge: 'Medalla Calor',
          leader: 'Candela (Pueblo Lavacalda)',
          desc: 'Permite desplazar pesadas rocas y piedras redondas para desbloquear caminos.',
          icon: 'fa-hand-rock'
        },
        {
          key: 'DESTELLO',
          code: 'MO 05',
          name: 'Destello',
          type: 'Normal',
          badge: 'Medalla Puño',
          leader: 'Marcial (Pueblo Azuliza)',
          desc: 'Ilumina cuevas sumidas en penumbra como la Cueva Granito para ver con claridad.',
          icon: 'fa-sun'
        },
        {
          key: 'GOLPE_ROCA',
          code: 'MO 06',
          name: 'Golpe Roca',
          type: 'Lucha',
          badge: 'Medalla Dinamo',
          leader: 'Erico (Ciudad Malvalona)',
          desc: 'Destruye rocas agrietadas que obstruyen atajos y pasos montañosos.',
          icon: 'fa-hammer'
        },
        {
          key: 'CASCADA',
          code: 'MO 07',
          name: 'Cascada',
          type: 'Agua',
          badge: 'Medalla Lluvia',
          leader: 'Plubio / Juan (Arrecípolis)',
          desc: 'Permite remontar grandes saltos de agua y cascadas verticales hacia arriba.',
          icon: 'fa-water'
        },
        {
          key: 'BUCEO',
          code: 'MO 08',
          name: 'Buceo',
          type: 'Agua',
          badge: 'Medalla Mente',
          leader: 'Vito y Leti (Ciudad Algaria)',
          desc: 'Permite sumergirse en fosas marinas hondas para explorar el lecho submarino.',
          icon: 'fa-life-ring'
        }
      ];

      const playerBadges = (global.trainerState && (global.trainerState.medals || global.trainerState.badges)) || [];

      container.innerHTML = HM_LIST.map(hm => {
        const hasBadge = playerBadges.some(b => typeof b === 'string' && b.toLowerCase().includes(hm.badge.toLowerCase().replace('medalla ', ''))) 
          || playerBadges.includes(hm.badge)
          || (playerBadges.length >= 8);

        return `
          <div class="hm-card ${hasBadge ? 'badge-unlocked' : 'badge-locked'}">
            <div class="hm-card-header">
              <div class="hm-badge-code">
                <i class="fas ${hm.icon}"></i> <strong>${hm.code}: ${hm.name}</strong>
              </div>
              <span class="hm-req-badge ${hasBadge ? 'unlocked' : 'locked'}">
                <i class="fas ${hasBadge ? 'fa-check-circle' : 'fa-lock'}"></i> ${hm.badge}
              </span>
            </div>
            <div class="hm-leader-info">Líder requerido: <em>${hm.leader}</em></div>
            <p class="hm-desc">${hm.desc}</p>
            <div class="hm-card-actions">
              <button class="btn btn-sm ${hasBadge ? 'btn-primary' : 'btn-outline'}" 
                      onclick="LobbyManager.executeHM('${hm.key}')" 
                      ${hasBadge ? '' : 'disabled'}>
                <i class="fas fa-magic"></i> ${hasBadge ? 'Usar en este Entorno' : 'Bloqueado (Requiere Medalla)'}
              </button>
            </div>
          </div>
        `;
      }).join('');

      modal.style.display = 'flex';
    }

    /* ============================================================
       INTERACCIÓN DE ASIENTO (HABBO STYLE)
       ============================================================ */
    sitDown(seat) {
      if (!global.worldTileRenderer) return;
      const renderer = global.worldTileRenderer;
      const isCurrentlySeated = renderer.isSeated;

      if (isCurrentlySeated) {
        // Levantarse
        renderer.isSeated = false;
        renderer.seatedId = null;
        if (global.MultiplayerClient) {
          global.MultiplayerClient.interactSeat(null, false);
        }
      } else {
        // Sentarse
        const seatId = seat ? seat.id : 'sofa_lobby_default';
        renderer.isSeated = true;
        renderer.seatedId = seatId;
        if (seat) {
          renderer.player.x = seat.x;
          renderer.player.y = seat.y;
          renderer.player.dir = seat.dir || 'down';
        }
        if (global.MultiplayerClient) {
          global.MultiplayerClient.interactSeat(seatId, true);
        }
      }
    }

    async executeHM(hmKey) {
      if (!global.GameClient) return;
      try {
        const res = await global.GameClient.useHM(hmKey);
        alert(`✨ ${res.message}`);

        // Efectos inmediatos en el motor de mapa
        if (hmKey === 'DESTELLO' && global.worldTileRenderer) {
          global.worldTileRenderer.flashActive = true;
        } else if (hmKey === 'VUELO' && global.App && typeof global.App.openFlightMap === 'function') {
          global.App.openFlightMap();
        }
      } catch (err) {
        alert(`❌ No se pudo usar la MO: ${err.message}`);
      }
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  global.LobbyManager = new LobbyManager();
})(typeof window !== 'undefined' ? window : this);
