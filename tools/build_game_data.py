# -*- coding: utf-8 -*-
"""
Genera data/emerald_gba_maps.js con los mapas reales extraídos del ROM.
Emite dos constantes globales:
  window.EMERALD_GBA_MAPS   — 66 zonas reales (ciudades, rutas, cuevas, underwater, overworld)
  window.EMERALD_GBA_ROOMS  — habitaciones/interiores accesibles por warps desde las zonas
"""
import sys, os, re, json, io, base64, struct
from collections import deque

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
ROM_PATH = os.path.join(ROOT, "Pokemon - Edicion Esmeralda (Spain).gba")
WORLD_PATH = os.path.join(ROOT, "tools", "emerald_world.json")
RES_PATH = os.path.join(ROOT, "tools", "emerald_resolved.json")
OUT_JS = os.path.join(ROOT, "data", "emerald_gba_maps.js")

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import render_map as rm

EXCLUDE_SECS = {
    "MAPSEC_BATTLE_FRONTIER", "MAPSEC_BATTLE_P", "MAPSEC_BATTLE_TENT",
    "MAPSEC_BATTLE_D", "MAPSEC_BATTLE_F", "MAPSEC_BATTLE_PIKE",
    "MAPSEC_BATTLE_PYRAMID", "MAPSEC_BATTLE_TOWER", "MAPSEC_BATTLE_ARENA",
    "MAPSEC_BATTLE_DOME", "MAPSEC_BATTLE_FACTORY", "MAPSEC_BATTLE_HALL",
    "MAPSEC_BATTLE_PALACE", "MAPSEC_BATTLE_PIKE", "MAPSEC_BATTLE_PYRAMID",
    "MAPSEC_BATTLE_TENT",
    "MAPSEC_DYN",  # dynamic maps
    "MAPSEC_SECRET_BASE", "MAPSEC_INSIDE_OF_TRUCK",
}

DUNGEONS = {
    "petalburg_woods": 249, "rusturf_tunnel": 242, "granite_cave": 245,
    "meteor_falls": 238, "fiery_path": 252, "jagged_pass": 251,
    "mt_chimney": 231, "mt_pyre": 253, "new_mauville": 290,
    "safari_zone": 407, "shoal_cave": 284, "victory_road": 281,
    "abandoned_ship": 292, "aqua_hideout": 261, "magma_hideout": 324,
}


def slug(name):
    s = re.sub(r'([a-z0-9])([A-Z])', r'\1_\2', name)
    s = re.sub(r'([A-Z]+)([A-Z][a-z])', r'\1_\2', s)
    s = re.sub(r'([a-z])([0-9])', r'\1_\2', s)
    return s.lower()


def room_key(idx):
    return "room_%d" % idx


CACHE = {}
ROM = None


def get_extract(idx):
    if idx in CACHE:
        return CACHE[idx]
    try:
        data = rm.extract(ROM, idx, scale=16)
    except Exception as e:
        return None
    CACHE[idx] = data
    return data


def find_spawn(idx, grids_data):
    solid, water = grids_data["solid"], grids_data["water"]
    w, h = grids_data["width"], grids_data["height"]
    # try player object event
    try:
        hdr_file = rm.ram_to_file(rm.read_ptr(ROM, rm.GMAP_HEADERS_FILE + idx * 4))
        events_ptr = rm.read_ptr(ROM, hdr_file + 4)
        if rm.ram_to_file(events_ptr) and rm.ram_to_file(events_ptr) > 0:
            ef = rm.ram_to_file(events_ptr)
            nObj = ROM[ef]
            obj_ptr = rm.read_ptr(ROM, ef + 4)
            if nObj and rm.ram_to_file(obj_ptr):
                of = rm.ram_to_file(obj_ptr)
                for i in range(nObj):
                    base = of + i * 0x24
                    if base + 0x24 > len(ROM):
                        break
                    g = ROM[base + 1]
                    x = int(struct.unpack_from("<h", ROM, base + 4)[0])
                    y = int(struct.unpack_from("<h", ROM, base + 6)[0])
                    if g == 0xFF and 0 <= x < w and 0 <= y < h:
                        return (x * 16 + 8, y * 16 + 8)
    except Exception:
        pass
    # fallback: first walkable near center-ish
    cx, cy = w // 2, h // 2
    for r in range(0, max(w, h)):
        for dx in range(-r, r + 1):
            for dy in range(-r, r + 1):
                nx, ny = cx + dx, cy + dy
                i = ny * w + nx
                if 0 <= nx < w and 0 <= ny < h and not solid[i] and not water[i]:
                    return (nx * 16 + 8, ny * 16 + 8)
    return (8, 8)


def seam_exits(A_idx, A_global, B_idx, B_global, conn):
    dir = conn["direction"]  # 1 down,2 up,3 left,4 right
    o = int(conn["offset"])
    aw, ah = A_global["w"], A_global["h"]
    bw, bh = B_global["w"], B_global["h"]
    exits = []
    if dir == 2:  # UP
        left = max(0, o); right = min(aw - 1, o + bw - 1)
        if left <= right:
            mid = (left + right) // 2
            exits.append({
                "x": left * 16, "y": 0,
                "w": (right - left + 1) * 16, "h": 16,
                "targetMap": B_global["key"],
                "targetX": (mid - o) * 16,
                "targetY": (bh - 1) * 16,
                "label": B_global.get("name", B_global["key"]),
            })
    elif dir == 1:  # DOWN
        left = max(0, o); right = min(aw - 1, o + bw - 1)
        if left <= right:
            mid = (left + right) // 2
            exits.append({
                "x": left * 16, "y": (ah - 1) * 16,
                "w": (right - left + 1) * 16, "h": 16,
                "targetMap": B_global["key"],
                "targetX": (mid - o) * 16,
                "targetY": 0,
                "label": B_global.get("name", B_global["key"]),
            })
    elif dir == 3:  # LEFT
        top = max(0, o); bottom = min(ah - 1, o + bh - 1)
        if top <= bottom:
            mid = (top + bottom) // 2
            exits.append({
                "x": 0, "y": top * 16,
                "w": 16, "h": (bottom - top + 1) * 16,
                "targetMap": B_global["key"],
                "targetX": (bw - 1) * 16,
                "targetY": (mid - o) * 16,
                "label": B_global.get("name", B_global["key"]),
            })
    elif dir == 4:  # RIGHT
        top = max(0, o); bottom = min(ah - 1, o + bh - 1)
        if top <= bottom:
            mid = (top + bottom) // 2
            exits.append({
                "x": (aw - 1) * 16, "y": top * 16,
                "w": 16, "h": (bottom - top + 1) * 16,
                "targetMap": B_global["key"],
                "targetX": 0,
                "targetY": (mid - o) * 16,
                "label": B_global.get("name", B_global["key"]),
            })
    return exits


def warp_exit(src_idx, w):
    ti = w.get("targetIndex")
    if ti is None or ti < 0 or ti >= 520:
        return None
    if ti not in zone_map and room_key(ti) not in rooms_out:
        if is_excluded(ti):
            return None
    # arrival coords via warpId matching
    tw = find_arrival(ti, w.get("warpId"))
    tx = tw["x"] * 16 if tw else w["x"] * 16
    ty = tw["y"] * 16 if tw else w["y"] * 16
    target_key = zone_map.get(ti) or room_key(ti)
    return {
        "x": w["x"] * 16 + 4, "y": w["y"] * 16 + 4,
        "w": 8, "h": 8,
        "targetMap": target_key,
        "targetX": tx,
        "targetY": ty,
        "type": "door",
        "label": resolve_name(ti),
    }


def find_arrival(target_idx, warp_id):
    m = resolved.get(str(target_idx))
    if not m:
        return None
    for w2 in m.get("warps", []):
        if w2.get("warpId") == warp_id:
            return w2
    return None


def resolve_name(idx):
    m = resolved.get(str(idx))
    return m["name"] if m else str(idx)


def is_excluded(idx):
    m = resolved.get(str(idx))
    if not m:
        return True
    sec = m.get("sec_name") or ""
    if any(sec.startswith(p) for p in EXCLUDE_SECS):
        return True
    return False


def img_to_data_uri(img):
    buf = io.BytesIO()
    img.save(buf, "PNG", optimize=True)
    return "data:image/png;base64," + base64.b64encode(buf.getvalue()).decode()


def file_to_data_uri(path):
    with open(path, "rb") as f:
        return "data:image/png;base64," + base64.b64encode(f.read()).decode()


def build():
    global ROM, resolved, zone_map, rooms_out
    import struct  # local import for find_spawn

    ROM = open(ROM_PATH, "rb").read()
    world = json.load(open(WORLD_PATH))
    resolved_list = json.load(open(RES_PATH))
    resolved = {str(m["index"]): m for m in resolved_list["maps"]}

    # zone_map: rom index -> game key
    zone_map = {}
    # surface zones from world json
    for stridx, g in world["maps"].items():
        idx = int(stridx)
        zone_map[idx] = slug(g["name"])
    # dive targets -> underwater zones (canonical idx51 = 'underwater')
    for stridx, g in (world.get("diveTargets") or {}).items():
        if g.get("name", "").startswith("Underwater"):
            idx = int(stridx)
            zone_map[idx] = "underwater" if idx == 51 else "underwater_%d" % idx
    # add Sootopolis (7) as zone (not in world json, but valid)
    if "7" in resolved and 7 not in zone_map:
        zone_map[7] = slug(resolved["7"]["name"])
    # add dungeons
    for key, idx in DUNGEONS.items():
        if str(idx) in resolved:
            zone_map[idx] = key

    print("Zones:", len(zone_map), zone_map.values())

    zones_out = {}
    rooms_out = {}
    global_coord = {}  # idx -> global dict with x,y,w,h,key,name

    # build global_coord for surface + dive targets
    for stridx, g in world["maps"].items():
        idx = int(stridx)
        global_coord[idx] = {
            "x": g["x"], "y": g["y"], "w": g["w"], "h": g["h"],
            "key": zone_map.get(idx, room_key(idx)),
            "name": g["name"],
        }
    for stridx, g in (world.get("diveTargets") or {}).items():
        idx = int(stridx)
        global_coord[idx] = {
            "x": g["x"], "y": g["y"], "w": g["w"], "h": g["h"],
            "key": zone_map.get(idx, room_key(idx)),
            "name": g["name"],
        }

    # Generate zones
    for idx, key in zone_map.items():
        data = get_extract(idx)
        if not data:
            print(" SKIP zone idx=%d %s (extract failed)" % (idx, key))
            continue
        spawn = find_spawn(idx, data)
        exits = []
        # seams (connections) only if both endpoints have global coords
        m = resolved.get(str(idx))
        if m:
            for cn in m.get("connections", []):
                ti = cn.get("targetIndex")
                if ti is None:
                    continue
                if idx in global_coord and ti in global_coord:
                    exits.extend(seam_exits(idx, global_coord[idx], ti, global_coord[ti], cn))
                # else skip (no global math available for unplaced endpoints)
            # door warps
            for w in m.get("warps", []):
                ex = warp_exit(idx, w)
                if ex:
                    exits.append(ex)
        zones_out[key] = {
            "romIndex": idx,
            "name": resolve_name(idx),
            "width": data["width"] * 16,
            "height": data["height"] * 16,
            "image": img_to_data_uri(data["image"]),
            "collision": data["solid"],
            "water": data["water"],
            "grass": data["grass"],
            "spawn": {"x": spawn[0], "y": spawn[1]},
            "exits": exits,
        }
        print(" zone", key, "idx=%d" % idx, "size", data["width"], "x", data["height"],
              "exits", len(exits), "spawn", spawn)

    # Add overworld (atlas)
    atlas_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "out", "hoenn_world.png")
    if os.path.exists(atlas_path):
        zones_out["overworld"] = {
            "romIndex": -1,
            "width": 6400, "height": 3064,
            "image": file_to_data_uri(atlas_path),
            "spawn": {"x": 3200, "y": 1532},
            "exits": [],
        }
        print(" overworld zone added (atlas)")

    # Build rooms via BFS from all zone warps
    queue = deque()
    added_zones = set(zone_map.keys())
    # seed queue with warps from each zone (to discover rooms)
    for idx in zone_map:
        m = resolved.get(str(idx))
        if not m:
            continue
        for w in m.get("warps", []):
            ti = w.get("targetIndex")
            if ti is not None and ti not in added_zones and not is_excluded(ti) and 0 < ti < 520:
                if room_key(ti) not in rooms_out:
                    queue.append(ti)
    # Also include room indices from surface warps discovered
    while queue and len(rooms_out) < 250:
        ti = queue.popleft()
        if room_key(ti) in rooms_out or ti in added_zones:
            continue
        if is_excluded(ti) or ti < 0 or ti >= 520:
            continue
        # extract room
        data = get_extract(ti)
        if not data:
            continue
        spawn = find_spawn(ti, data)
        m = resolved.get(str(ti))
        exits = []
        if m:
            for w in m.get("warps", []):
                ex = warp_exit(ti, w)
                if ex:
                    exits.append(ex)
        name = (m.get("sec_name") or "Room").replace("MAPSEC_", "") if m else "Room"
        rooms_out[room_key(ti)] = {
            "romIndex": ti,
            "width": data["width"] * 16,
            "height": data["height"] * 16,
            "image": img_to_data_uri(data["image"]),
            "collision": data["solid"],
            "water": data["water"],
            "grass": data["grass"],
            "spawn": {"x": spawn[0], "y": spawn[1]},
            "exits": exits,
            "name": "%s #%d" % (name, ti),
        }
        print(" room", room_key(ti), "size", data["width"], "x", data["height"],
              "exits", len(exits))
        # enqueue this room's warps to discover deeper rooms
        if m:
            for w in m.get("warps", []):
                ti2 = w.get("targetIndex")
                if ti2 is not None and ti2 not in added_zones and room_key(ti2) not in rooms_out and not is_excluded(ti2):
                    queue.append(ti2)

    # Write JS
    # Remove exits whose target map never materialized
    known = set(zones_out) | set(rooms_out)
    for bucket in (zones_out, rooms_out):
        for v in bucket.values():
            v["exits"] = [e for e in v.get("exits", []) if e.get("targetMap") in known]
    with open(OUT_JS, "w", encoding="utf-8") as f:
        f.write("/* AUTO-GENERATED by tools/build_game_data.py — do not edit manually */\n")
        f.write("window.EMERALD_GBA_MAPS = ")
        json.dump(zones_out, f, indent=2, ensure_ascii=False)
        f.write(";\n\n")
        f.write("window.EMERALD_GBA_ROOMS = ")
        json.dump(rooms_out, f, indent=2, ensure_ascii=False)
        f.write(";\n")
    print("\nSaved", OUT_JS, "zones:", len(zones_out), "rooms:", len(rooms_out))
    print("Total size:", os.path.getsize(OUT_JS), "bytes")


if __name__ == "__main__":
    build()
