"""
generar_pokedex_completa.py
============================
Descarga TODOS los Pokémon (Gen 1-9) desde PokeAPI y genera:
- data/pokemon_todos.json   → Base de datos completa (id, nombre ES, tipos, 6 stats, catch_rate, generación)
- assets/pokedex/*.png      → Sprites frontales (formato oficial)
- assets/pokedex/back/*.png → Sprites traseros
- assets/pokedex/shiny/*.png→ Sprites variocolor

REANUDABLE: si se interrumpe, al relanzarlo continúa donde quedó (usa data/pokemon_todos.json
como checkpoint y no re-descarga sprites existentes).

Uso:
    python generar_pokedex_completa.py
"""
import json
import os
import sys
import time
from concurrent.futures import ThreadPoolExecutor, as_completed

import requests

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
OUT_JSON = os.path.join(BASE_DIR, "data", "pokemon_todos.json")
SPRITE_DIR = os.path.join(BASE_DIR, "assets", "pokedex")
CHECKPOINT_EVERY = 30

API = "https://pokeapi.co/api/v2"

TYPE_ES = {
    "normal": "Normal", "fire": "Fuego", "water": "Agua", "grass": "Planta",
    "electric": "Eléctrico", "ice": "Hielo", "fighting": "Lucha", "poison": "Veneno",
    "ground": "Tierra", "flying": "Volador", "psychic": "Psíquico", "bug": "Bicho",
    "rock": "Roca", "ghost": "Fantasma", "dragon": "Dragón", "dark": "Siniestro",
    "steel": "Acero", "fairy": "Hada",
}

GEN_MAP = {
    "i": 1, "ii": 2, "iii": 3, "iv": 4, "v": 5, "vi": 6, "vii": 7, "viii": 8, "ix": 9,
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


def spanish_name(species):
    for entry in species.get("names", []):
        if entry.get("language", {}).get("name") == "es":
            return entry["name"]
    return species.get("name", "")


def download_sprite(url, dest):
    if url and os.path.exists(dest) and os.path.getsize(dest) > 0:
        return True
    if not url:
        return False
    for attempt in range(3):
        try:
            resp = requests.get(url, timeout=20)
            if resp.status_code == 200:
                os.makedirs(os.path.dirname(dest), exist_ok=True)
                with open(dest, "wb") as fh:
                    fh.write(resp.content)
                return True
        except requests.RequestException:
            pass
        time.sleep(0.2 * (attempt + 1))
    return False


def process_one(entry_id):
    pokemon = fetch_json(f"{API}/pokemon/{entry_id}")
    if not pokemon:
        return None

    species = fetch_json(pokemon["species"]["url"])

    raw_gen = species.get("generation", {}).get("name", "generation-i")
    generation = GEN_MAP.get(raw_gen.replace("generation-", "").lower(), 1)

    stats = {s["stat"]["name"]: s["base_stat"] for s in pokemon.get("stats", [])}
    types = [TYPE_ES.get(t["type"]["name"], t["type"]["name"].capitalize())
             for t in pokemon.get("types", [])]

    sprite = pokemon.get("sprites", {}) or {}
    front = sprite.get("front_default") or ""
    back = sprite.get("back_default") or ""
    shiny = sprite.get("front_shiny") or ""

    front_path = f"assets/pokedex/{entry_id}.png"
    back_path = f"assets/pokedex/back/{entry_id}.png"
    shiny_path = f"assets/pokedex/shiny/{entry_id}.png"

    download_sprite(front, os.path.join(BASE_DIR, front_path))
    download_sprite(back, os.path.join(BASE_DIR, back_path))
    download_sprite(shiny, os.path.join(BASE_DIR, shiny_path))

    return {
        "id": entry_id,
        "name": pokemon["name"],
        "name_es": spanish_name(species) or pokemon["name"],
        "generation": generation,
        "types": types,
        "hp": stats.get("hp", 50),
        "attack": stats.get("attack", 50),
        "defense": stats.get("defense", 50),
        "sp_attack": stats.get("special-attack", 50),
        "sp_defense": stats.get("special-defense", 50),
        "speed": stats.get("speed", 50),
        "catch_rate": species.get("capture_rate", 45),
        "sprite_front": front_path,
        "sprite_back": back_path,
        "sprite_shiny": shiny_path,
    }


def save_checkpoint(records):
    tmp = OUT_JSON + ".tmp"
    with open(tmp, "w", encoding="utf-8") as fh:
        json.dump(records, fh, ensure_ascii=False, indent=1)
    os.replace(tmp, OUT_JSON)


def load_existing():
    if os.path.exists(OUT_JSON):
        try:
            with open(OUT_JSON, "r", encoding="utf-8") as fh:
                return json.load(fh)
        except Exception:
            pass
    return []


def get_species_list():
    data = fetch_json(f"{API}/pokemon?limit=100000")
    ids = []
    for item in data.get("results", []):
        try:
            ids.append(int(item["url"].rstrip("/").split("/")[-1]))
        except (ValueError, KeyError):
            continue
    return ids


def main():
    if hasattr(sys.stdout, "reconfigure"):
        try:
            sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        except Exception:
            pass

    print(">>> Obteniendo listado de especies desde PokeAPI...")
    all_ids = get_species_list()
    print(f"    {len(all_ids)} especies/formas detectadas.")

    records = load_existing()
    done_ids = {r["id"] for r in records}
    pending = [i for i in all_ids if i not in done_ids]
    print(f"    Checkpoint actual: {len(records)} registros | pendientes: {len(pending)}\n")

    if not pending:
        print(">>> Nada pendiente. ¡Todo completado!")
        return

    new_records = []
    progress = 0
    with ThreadPoolExecutor(max_workers=16) as pool:
        futures = {pool.submit(process_one, pid): pid for pid in pending}
        for future in as_completed(futures):
            result = future.result()
            if result:
                new_records.append(result)
            progress += 1
            if progress % CHECKPOINT_EVERY == 0:
                merged = {r["id"]: r for r in records + new_records}
                save_checkpoint([merged[k] for k in sorted(merged)])
                print(f"    {progress}/{len(pending)} procesados | guardado checkpoint ({len(merged)} registros)")

    merged = {r["id"]: r for r in records + new_records}
    final_list = [merged[k] for k in sorted(merged)]
    save_checkpoint(final_list)

    by_gen = {}
    for p in final_list:
        by_gen[p["generation"]] = by_gen.get(p["generation"], 0) + 1

    print(f"\n>>> COMPLETADO: {len(final_list)} Pokémon en data/pokemon_todos.json")
    for g in sorted(by_gen):
        print(f"    Gen {g}: {by_gen[g]} Pokémon")


if __name__ == "__main__":
    main()