"""
run.py
======
Script autoejecutable principal para el ecosistema Monster-Tamer Hoenn/Esmeralda:
1. Inicia el servidor backend FastAPI (monster_engine.server:app) en un hilo daemon en segundo plano.
2. Espera a que el servidor esté activo y saludable en /api/system/health.
3. Ejecuta la sesión de prueba completa desde el cliente (monster_engine.client:run_full_emerald_simulation):
   - Menú de inicio retro pixel art / ASCII (3 opciones: Nueva Partida, Configuración, Salir).
   - Cinemática interactiva con el Profesor Abedul, registro de entrenador, sprite y criatura inicial.
   - Exploración de la totalidad de las 73 zonas de Hoenn según Emerald Completion.
   - Validación de bloqueos de ruta por medallas (Stone a Rain) y técnicas (Surf, Dive, Waterfall, etc.).
   - Consulta avanzada a la enciclopedia con variantes especiales (Mutación X/Y, Alfa/Mega).
   - Conexión al Lobby multijugador en tiempo real por WebSockets (/ws/lobby).
   - Combate determinista y verificación integral del Cheat Sheet de Códigos de Estado HTTP.
"""

import os
import sys
import threading
import time
import requests
import uvicorn

# Configurar encoding UTF-8 en consola de Windows
if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

# Asegurar que el directorio raíz esté en sys.path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from monster_engine.server import app
from monster_engine.client import run_full_emerald_simulation


def start_server_in_background(host: str = "127.0.0.1", port: int = 8000):
    config = uvicorn.Config(app=app, host=host, port=port, log_level="error")
    server = uvicorn.Server(config)
    thread = threading.Thread(target=server.run, daemon=True)
    thread.start()
    return server, thread


def wait_for_server(base_url: str = "http://127.0.0.1:8000", timeout: float = 10.0):
    start = time.time()
    while time.time() - start < timeout:
        try:
            resp = requests.get(f"{base_url}/api/system/health", timeout=1.0)
            if resp.status_code == 200:
                return True
        except Exception:
            pass
        time.sleep(0.2)
    return False


def main():
    host = "127.0.0.1"
    port = 8000
    base_url = f"http://{host}:{port}"

    print("=" * 78)
    print(">>> LEVANTANDO SERVIDOR FASTAPI MONSTER-TAMER (ESMERALDA)...")
    print(f">>> Endpoint API: {base_url}")
    print(f">>> WebSocket Lobby: ws://{host}:{port}/ws/lobby")
    print("=" * 78)

    # Iniciar servidor en segundo plano
    server, srv_thread = start_server_in_background(host=host, port=port)

    if not wait_for_server(base_url, timeout=8.0):
        print(f"[ERROR] El servidor no respondió en {base_url} tras 8 segundos.")
        sys.exit(1)

    print(f"[OK] Servidor activo y respondiendo en {base_url}/api/system/health.")

    # Ejecutar la simulación completa
    try:
        run_full_emerald_simulation(base_url=base_url)
    except Exception as e:
        print(f"[ERROR CRITICO EN SIMULACION]: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
    finally:
        print("[SISTEMA] Finalizando proceso de demostración.")


if __name__ == "__main__":
    main()
