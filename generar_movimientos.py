"""
generar_movimientos.py
======================
Descarga los movimientos reales (aprendizaje por nivel, level-up) de TODOS los
Pokémon de data/pokemon_todos.json desde PokeAPI y genera:

- data/pokemon_moves.json
    {
      "moves": { "<move_name_en>": { "name_es": "...", "type": "Fuego", "category": "especial", "power": 40, "pp": 25 }, ... },
      "pokemon": { "<id>": [ { "level": 1, "move": "<move_name_en>" }, ... ], ... }
    }

REANUDABLE: si se interrumpe, al relanzarlo continúa (usa data/pokemon_moves.json como checkpoint).

Uso:
    python generar_movimientos.py
"""
import json
import os
import sys
import time
from concurrent.futures import ThreadPoolExecutor, as_completed

import requests

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
IN_JSON = os.path.join(BASE_DIR, "data", "pokemon_todos.json")
OUT_JSON = os.path.join(BASE_DIR, "data", "pokemon_moves.json")
CHECKPOINT_EVERY = 30

API = "https://pokeapi.co/api/v2"

TYPE_ES = {
    "normal": "Normal", "fire": "Fuego", "water": "Agua", "grass": "Planta",
    "electric": "Eléctrico", "ice": "Hielo", "fighting": "Lucha", "poison": "Veneno",
    "ground": "Tierra", "flying": "Volador", "psychic": "Psíquico", "bug": "Bicho",
    "rock": "Roca", "ghost": "Fantasma", "dragon": "Dragón", "dark": "Siniestro",
    "steel": "Acero", "fairy": "Hada",
}


def fetch_json(url, retries=4):
    for attempt in range(retries):
        try:
            resp = requests.get(url, timeout=20)
            if resp.status_code == 200:
                return resp.json()
        except requests.RequestException:
            pass
        time.sleep(0.3 * (attempt + 1))
    return {}


def spanish_move_name(move):
    for entry in move.get("names", []):
        if entry.get("language", {}).get("name") == "es":
            return entry["name"]
    return move.get("name", "")


def move_detail(move_url, move_db):
    """Devuelve y cachea el detalle (nombre ES, tipo, categoría, poder, PP) de un movimiento."""
    name_en = move_url.rstrip("/").split("/")[-1]
    if name_en in move_db:
        return name_en
    data = fetch_json(move_url)
    if not data:
        return name_en
    raw_type = (data.get("type") or {}).get("name", "normal")
    damage_class = (data.get("damage_class") or {}).get("name", "status")
    category = "especial" if damage_class == "special" else ("fisico" if damage_class == "physical" else "status")
    move_db[name_en] = {
        "name_es": spanish_move_name(data) or name_en,
        "type": TYPE_ES.get(raw_type, raw_type.capitalize()),
        "category": category,
        "power": data.get("power") or 0,
        "pp": data.get("pp") or 10,
    }
    return name_en


def process_one(entry_id):
    pokemon = fetch_json(f"{API}/pokemon/{entry_id}")
    if not pokemon:
        return entry_id, None

    learned = []
    for mv in pokemon.get("moves", []):
        for detail in mv.get("version_group_details", []):
            method = (detail.get("move_learn_method") or {}).get("name", "")
            if method != "level-up":
                continue
            learned.append({
                "level": detail.get("level_learned_at", 1),
                "move": mv["move"]["url"],
            })
            break

    # Ordenar por nivel de aprendizaje
    learned.sort(key=lambda x: (x["level"], x["move"]))
    return entry_id, learned


def save_checkpoint(moves_db, pokemon_map):
    tmp = OUT_JSON + ".tmp"
    payload = {"moves": moves_db, "pokemon": pokemon_map}
    with open(tmp, "w", encoding="utf-8") as fh:
        json.dump(payload, fh, ensure_ascii=False, indent=1)
    os.replace(tmp, OUT_JSON)


def load_existing():
    if os.path.exists(OUT_JSON):
        try:
            with open(OUT_JSON, "r", encoding="utf-8") as fh:
                data = json.load(fh)
            return data.get("moves", {}), data.get("pokemon", {})
        except Exception:
            pass
    return {}, {}


def main():
    if hasattr(sys.stdout, "reconfigure"):
        try:
            sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        except Exception:
            pass

    with open(IN_JSON, "r", encoding="utf-8") as fh:
        records = json.load(fh)

    all_ids = [r["id"] for r in records]
    print(f">>> {len(all_ids)} Pokémon en data/pokemon_todos.json")

    moves_db, pokemon_map = load_existing()
    done_ids = set(int(k) for k in pokemon_map.keys())
    pending = [pid for pid in all_ids if pid not in done_ids]
    print(f"    Movimientos cacheados: {len(moves_db)} | Pokémon con data: {len(done_ids)} | pendientes: {len(pending)}\n")

    if not pending:
        print(">>> Nada pendiente. ¡Todo completado!")
        return

    new_data = {}
    progress = 0
    with ThreadPoolExecutor(max_workers=16) as pool:
        futures = {pool.submit(process_one, pid): pid for pid in pending}
        for future in as_completed(futures):
            entry_id, learned = future.result()
            if learned is not None:
                new_data[entry_id] = learned
            progress += 1
            if progress % CHECKPOINT_EVERY == 0:
                merged = dict(pokemon_map)
                for k, v in new_data.items():
                    merged[str(k)] = v
                save_checkpoint(moves_db, merged)
                print(f"    {progress}/{len(pending)} procesados | {len(moves_db)} movimientos | checkpoint guardado")

    merged = dict(pokemon_map)
    for k, v in new_data.items():
        merged[str(k)] = v

    # Resolver movimientos: sólo guardar name_en en la lista final
    final_pokemon = {}
    for pid, learned in merged.items():
        final_pokemon[pid] = [
            {"level": item["level"], "move": move_detail(item["move"], moves_db)}
            for item in learned
        ]

    save_checkpoint(moves_db, final_pokemon)
    print(f"\n>>> COMPLETADO: {len(final_pokemon)} Pokémon con movimientos | {len(moves_db)} movimientos únicos en data/pokemon_moves.json")


if __name__ == "__main__":
    main()