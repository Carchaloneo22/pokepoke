# 🎮 PokéTrainer / PokePoke RPG (Hoenn Emerald Edition)

Un RPG de Pokémon en HTML5 / Canvas / JavaScript con backend en Python (FastAPI / Uvicorn), mapa completo de Hoenn (Pokémon Esmeralda), Pokédex interactiva con más de 400 sprites animados, sistema de combate por turnos y compilador a ejecutable `.exe` para Windows.

---

## 🌟 Características Principales

- **🗺️ Mapa Completo de Hoenn (Pokémon Esmeralda)**:
  - 67 ubicaciones detalladas (16 pueblos/ciudades, rutas 101 a 134, mazmorras y cuevas tanto de Overworld como Underwater).
  - Renderizado de tiles de alta resolución en HTML5 Canvas con soporte para arrastre y zoom suave.
  - Enfoque continuo y seguimiento suave de cámara sobre el personaje (Brendan / Bruno).
  - **Zoom dinámico**: Acercamiento automático estilo GBA al caminar.
  - **HUD Auténtico de Pokémon Esmeralda**: Banner de localización animado, PokéNav con radar/coordenadas y barra de controles GBA.
  - **Recolección de Objetos**: 94 sprites de items auténticos distribuidos en el mapa, con recompensa de +50 monedas y registro en inventario.

- **⚔️ Sistema de Combates por Turnos**:
  - Batallas Pokémon completas con cálculo de efectividad de tipos, estadísticas, barras de vida animadas y captura.
  - Generación de encuentros según la zona y ruta actual.

- **📖 Pokédex Dinámica**:
  - Base de datos con más de 400 Pokémon, animaciones y tipos.

- **⚙️ Backend y Empaquetado**:
  - Servidor ligero en Python (FastAPI / Uvicorn).
  - Lanzador unificado (`launcher.py`) con detección automática de puertos y apertura en navegador.
  - Script para compilar a ejecutable independiente (`Compilar_EXE.bat` con PyInstaller).

---

## 🕹️ Controles del Juego

| Tecla / Acción | Función |
| :--- | :--- |
| **`W, A, S, D`** o **`Flechas`** | Mover al personaje por el mapa (aplica zoom dinámico y centra cámara) |
| **`Shift` (mantener)** | Activar **Zapatillas de Correr** (doble velocidad de desplazamiento) |
| **Click y arrastre del ratón** | Explorar el mapa libremente (desactiva el anclaje de cámara) |
| **Rueda del ratón** | Zoom in / Zoom out manual |
| **Botón "Centrar" (PokéNav)** | Re-centrar la cámara y re-bloquear el enfoque en el personaje |

---

## 🚀 Cómo Ejecutar el Proyecto

### Requisitos Previos
- **Python 3.10+** instalado en el sistema.
- Dependencias de Python:
  ```bash
  pip install fastapi uvicorn
  ```
  *(Opcional para compilar a .exe: `pip install pyinstaller`)*

### Inicio Rápido
1. Ejecuta el lanzador unificado:
   ```bash
   python launcher.py
   ```
2. El lanzador iniciará el servidor backend y abrirá automáticamente en tu navegador la interfaz:
   ```
   http://127.0.0.1:8000/admin.html
   ```
3. En el menú lateral, selecciona **"🗺️ Mapa Completo"** para disfrutar de Hoenn y todas sus funciones.

---

## 📦 Compilación a `.exe` (Windows)

Para generar un ejecutable `.exe` portable sin necesidad de que otros usuarios tengan Python instalado:
1. Haz doble clic en `Compilar_EXE.bat`.
2. El instalador compilará todo el motor y los recursos usando PyInstaller.
3. El archivo `JuegoPokemon.exe` se generará automáticamente en la raíz del proyecto.

---

## 📂 Estructura del Repositorio

```text
├── assets/             # Sprites de personajes, tilesets e imágenes
├── data/               # hoenn_maps.js y bases de datos del juego
├── item_sprites/       # Sprites individuales de items (94 objetos de Hoenn)
├── map_tiles/          # Tiles del mapa de Hoenn (Overworld y Underwater)
├── marker_icons/       # Iconos de marcadores (entradas, entrenadores, items)
├── modules/            # Motores de renderizado (tilemap_renderer.js, etc.)
├── monster_engine/     # Servidor backend en FastAPI, lógica de simulación y API
├── admin.html          # Interfaz principal del juego y mapa
├── admin.js            # Controlador de la aplicación web y HUD
├── admin.css           # Estilos de la interfaz
├── launcher.py         # Punto de entrada unificado y auto-apertura de navegador
├── Compilar_EXE.bat    # Script de compilación a binario Windows .exe
└── README.md           # Documentación del proyecto
```

---

## 📝 Licencia
Este proyecto fue creado con fines educativos y de entretenimiento. Pokémon y sus activos visuales son marcas registradas de Nintendo, Game Freak y Creatures Inc.
