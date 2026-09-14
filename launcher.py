"""
launcher.py
===========
Punto de entrada unificado para compilar y ejecutar el juego Monster-Tamer / Pokémon
como un ejecutable .exe en Windows.

Funciones principales:
1. Detecta automáticamente si se ejecuta desde el código fuente o como binario .exe empaquetado.
2. Encuentra un puerto TCP local disponible (por defecto 8000).
3. Abre automáticamente el navegador en la interfaz del juego (pokedex.html / admin.html).
4. Ejecuta el servidor FastAPI en local con soporte completo para la API, bestiario, mapas y combates.
"""

import os
import socket
import sys
import threading
import time
import webbrowser

# Configurar salida UTF-8 segura para la consola de Windows
if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

import uvicorn
from monster_engine.server import app, BASE_DIR


def find_free_port(start_port: int = 8000) -> int:
    """Busca el primer puerto libre disponible a partir de start_port."""
    port = start_port
    while port < 65535:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            if s.connect_ex(("127.0.0.1", port)) != 0:
                return port
            port += 1
    return 8000


def open_game_in_browser(url: str, delay: float = 1.2):
    """Abre el navegador web predeterminado del sistema tras el arranque del servidor."""
    time.sleep(delay)
    print(f"\n>>> Abriendo el juego en el navegador: {url} ...")
    try:
        webbrowser.open(url)
    except Exception as e:
        print(f"Nota: No se pudo abrir el navegador automáticamente ({e}). Accede manualmente a {url}")


def main():
    # Detectar si estamos en Render (producción) o en local
    is_render = os.environ.get("RENDER") is not None
    port = int(os.environ.get("PORT", 8000))
    host = "0.0.0.0" if is_render else "127.0.0.1"

    if is_render:
        game_url = f"http://127.0.0.1:{port}/admin.html"
    else:
        # En local, buscar puerto libre
        port = find_free_port(8000)
        game_url = f"http://127.0.0.1:{port}/admin.html"

    print("=" * 70)
    print("   MONSTER-TAMER & POKEDEX ADVENTURE - EJECUTABLE UNIFICADO")
    print("=" * 70)
    print(f" * Directorio Base de Recursos : {BASE_DIR}")
    print(f" * Servidor Backend Activo     : http://{host}:{port}")
    print(f" * Interfaz Web Principal      : {game_url}")
    print(f" * Documentación API Swagger   : http://{host}:{port}/docs")
    print(f" * Modo                       : {'Render (Producción)' if is_render else 'Local'}")
    print("=" * 70)
    print(" Presiona CTRL + C en esta ventana para cerrar el juego y el servidor.")
    print("=" * 70)

    # Solo abrir navegador en local, no en Render
    if not is_render:
        browser_thread = threading.Thread(target=open_game_in_browser, args=(game_url,), daemon=True)
        browser_thread.start()

    # Iniciar servidor Uvicorn
    uvicorn.run(app, host=host, port=port, log_level="warning")


if __name__ == "__main__":
    main()
