import struct
import sys
import os
from PIL import Image

ROM_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                        "..", "Pokemon - Edicion Esmeralda (Spain).gba")
OUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "out")

GMAP_HEADERS_FILE = 0x004893BC  # pointer table to MapHeader
NUM_HEADER_SLOTS = 520
MAPSEC_IDX = 9  # Littleroot Town (test map)

NUM_TILES_IN_PRIMARY = 512
NUM_TILES_TOTAL = 1024
NUM_METATILES_IN_PRIMARY = 512
NUM_METATILES_TOTAL = 1024
NUM_PALS_IN_PRIMARY = 6
NUM_PALS_TOTAL = 13
TILE_BYTES = 32  # 4bpp
METATILE_BYTES = 16  # 8 x u16 (bottom TL,TR,BL,BR / top TL,TR,BL,BR)
PALETTE_BYTES = 16 * 16 * 2  # 16 pals x 16 colours x u16


def lz77_decompress(buf, pos):
    b0 = buf[pos]
    ptype = b0 >> 4
    size = buf[pos + 1] | (buf[pos + 2] << 8) | (buf[pos + 3] << 16)
    pos += 4
    out = bytearray()

    if ptype in (1, 2):  # 0x10 bit-flags / 0x11 byte-flags
        if ptype == 1:
            bits = 0
            mask = 0
            while len(out) < size and pos < len(buf):
                if mask == 0:
                    bits = buf[pos]; pos += 1
                    mask = 0x80
                if bits & mask:
                    b1 = buf[pos]; b2 = buf[pos + 1]; pos += 2
                    count = (b1 >> 4) + 3
                    disp = ((b1 & 0x0F) << 8) | b2 + 1
                    for _ in range(count):
                        if len(out) >= size:
                            break
                        out.append(out[-disp] if disp <= len(out) else 0)
                else:
                    out.append(buf[pos]); pos += 1
                mask >>= 1
        else:
            while len(out) < size and pos < len(buf):
                flags = buf[pos]; pos += 1
                for bit in range(8):
                    if len(out) >= size:
                        break
                    if pos >= len(buf):
                        break
                    if flags & (0x80 >> bit):
                        b1 = buf[pos]; b2 = buf[pos + 1]; pos += 2
                        count = (b1 >> 4) + 3
                        disp = ((b1 & 0x0F) << 8) | b2 + 1
                        for _ in range(count):
                            if len(out) >= size:
                                break
                            out.append(out[-disp] if disp <= len(out) else 0)
                    else:
                        out.append(buf[pos]); pos += 1
    elif ptype == 3:  # RLE
        while len(out) < size and pos < len(buf):
            flag = buf[pos]; pos += 1
            if flag & 0x80:
                count = (flag & 0x7F) + 3
                val = buf[pos]; pos += 1
                out.extend([val] * min(count, size - len(out)))
            else:
                count = (flag & 0x7F) + 1
                for _ in range(count):
                    if len(out) >= size or pos >= len(buf):
                        break
                    out.append(buf[pos]); pos += 1
    else:
        raise ValueError("unsupported LZ77 type 0x%X" % ptype)

    if len(out) < size:
        raise ValueError("LZ77 underflow: expected %d got %d" % (size, len(out)))
    return bytes(out[:size])


def read_ptr(rom, file_off):
    return struct.unpack_from("<I", rom, file_off)[0]


def ram_to_file(addr):
    return addr - 0x08000000


def load_member(rom, ptr, expected=None, is_lz=False):
    """Read a member of a tileset. Compressed when a valid LZ77/RLE header is
    present; otherwise read raw bytes (RSE stores some arrays uncompressed)."""
    file_off = ram_to_file(ptr)
    if file_off < 0 or file_off >= len(rom):
        raise ValueError("bad ptr 0x%08X" % ptr)
    b0 = rom[file_off]
    if b0 >> 4 in (1, 2, 3):
        data = lz77_decompress(rom, file_off)
    elif is_lz:
        raise ValueError("expected compressed data at 0x%08X (b0=0x%02X)" % (ptr, b0))
    else:
        data = rom[file_off:]
    if expected is not None and len(data) < expected:
        raise ValueError("expected >= %d bytes, got %d for ptr 0x%08X" % (expected, len(data), ptr))
    if expected is not None:
        data = data[:expected]
    return data


def load_palettes(rom, ptr):
    if ptr == 0:
        return None
    raw = load_member(rom, ptr, PALETTE_BYTES)
    raw = raw[:PALETTE_BYTES] + b"\x00" * (PALETTE_BYTES - len(raw))
    return [raw[i * 32:(i + 1) * 32] for i in range(16)]


def tileset_raw(rom, tileset_addr, expected_tiles):
    ts = ram_to_file(tileset_addr)
    is_compressed = rom[ts]
    tiles_ptr = read_ptr(rom, ts + 0x04)
    palettes_ptr = read_ptr(rom, ts + 0x08)
    metatiles_ptr = read_ptr(rom, ts + 0x0C)
    attrs_ptr = read_ptr(rom, ts + 0x10)

    if is_compressed:
        tiles = load_member(rom, tiles_ptr, None, is_lz=True)
    else:
        tiles = rom[ram_to_file(tiles_ptr):][:expected_tiles or 0]
    if expected_tiles is not None and not is_compressed:
        pass  # ya recortado arriba
    tiles = bytes(tiles[:expected_tiles]) if expected_tiles else bytes(tiles)
    pals = load_palettes(rom, palettes_ptr)
    return {
        "tiles": tiles,
        "pals": pals,
        "meta_ptr": metatiles_ptr,
        "attrs_ptr": attrs_ptr,
        "is_compressed": is_compressed,
    }


# Behaviours de metatiles (include/constants/metatile_behaviors.h del decomp)
MB_TALL_GRASS = 0x02
MB_LONG_GRASS = 0x03
MB_LONG_GRASS_SOUTH_EDGE = 0x09
MB_MOUNTAIN_TOP = 0x0C
MB_MT_PYRE_HOLE = 0x0F
MB_WATER = {0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x17, 0x19, 0x1A, 0x6C}
MB_ASHGRASS = 0x24
MB_IMPASSABLE = set(range(0x30, 0x38))
MB_IMPASSABLE_SOUTH_AND_NORTH = 0xC0
MB_IMPASSABLE_WEST_AND_EAST = 0xC1
MB_CLOSED_SOOTOPOLIS_DOOR = 0x8B
MB_PETALBURG_GYM_DOOR = 0x8D
MB_BLOCK_DECORATION = 0xB3
MB_SECRET_BASE_IMPASSABLE = 0xB9
MB_SECRET_BASE_HOLE = 0xC2
MB_CRACKED_FLOOR_HOLE = 0x66
MB_CRACKED_FLOOR = 0xD2
MB_SKY_PILLAR_CLOSED_DOOR = 0xEA

BLOCK_BEHAVIORS = (MB_IMPASSABLE | {MB_IMPASSABLE_SOUTH_AND_NORTH,
                                    MB_IMPASSABLE_WEST_AND_EAST,
                                    MB_MT_PYRE_HOLE, MB_CRACKED_FLOOR_HOLE,
                                    MB_CRACKED_FLOOR, MB_CLOSED_SOOTOPOLIS_DOOR,
                                    MB_PETALBURG_GYM_DOOR, MB_BLOCK_DECORATION,
                                    MB_SECRET_BASE_IMPASSABLE,
                                    MB_SECRET_BASE_HOLE,
                                    MB_SKY_PILLAR_CLOSED_DOOR})
GRASS_BEHAVIORS = {MB_TALL_GRASS, MB_LONG_GRASS, MB_LONG_GRASS_SOUTH_EDGE, MB_ASHGRASS}


def load_metatile_data(rom, index):
    """Carga layout+tilesets y devuelve la métrica cruda (sin imagen)."""
    hdr_file = ram_to_file(read_ptr(rom, GMAP_HEADERS_FILE + index * 4))
    layout_ptr = read_ptr(rom, hdr_file)
    layout = ram_to_file(layout_ptr)

    width = struct.unpack_from("<i", rom, layout)[0]
    height = struct.unpack_from("<i", rom, layout + 4)[0]
    map_ptr = read_ptr(rom, layout + 0x0C)
    prim_ts_addr = read_ptr(rom, layout + 0x10)
    sec_ts_addr = read_ptr(rom, layout + 0x14)

    cells = list(struct.unpack_from("<%dH" % (width * height), rom, ram_to_file(map_ptr)))

    prim = tileset_raw(rom, prim_ts_addr, NUM_TILES_IN_PRIMARY * TILE_BYTES)
    sec = tileset_raw(rom, sec_ts_addr, None)
    prim_meta = load_member(rom, prim["meta_ptr"], NUM_METATILES_IN_PRIMARY * METATILE_BYTES)
    prim_attrs = list(struct.unpack_from("<%dH" % NUM_METATILES_IN_PRIMARY, rom, ram_to_file(prim["attrs_ptr"])))
    sec_count = (ram_to_file(sec["attrs_ptr"]) - ram_to_file(sec["meta_ptr"])) // METATILE_BYTES
    sec_count = min(max(sec_count, 0), NUM_METATILES_IN_PRIMARY)
    sec_meta = load_member(rom, sec["meta_ptr"], sec_count * METATILE_BYTES)
    sec_attrs = []
    if sec_count:
        sec_attrs = list(struct.unpack_from("<%dH" % sec_count, rom, ram_to_file(sec["attrs_ptr"])))
    sec_n = len(sec_meta) // METATILE_BYTES

    metas = [prim_meta[i * METATILE_BYTES:(i + 1) * METATILE_BYTES] for i in range(NUM_METATILES_IN_PRIMARY)]
    metas += [sec_meta[i * METATILE_BYTES:(i + 1) * METATILE_BYTES] for i in range(sec_n)]
    behavior = [attr & 0xFF for attr in prim_attrs] + [attr & 0xFF for attr in sec_attrs]

    return {
        "index": index,
        "width": width,
        "height": height,
        "cells": cells,
        "metas": metas,
        "behavior": behavior,
        "prim": prim,
        "sec": sec,
    }


def behavior_grids(data):
    """Grids row-major 0/1: solid, water, grass.

    solid usa los bits de colisión 10-11 del propio cell (igual que el
    mecanismo del GBA: MapGridIsImpassableAt => (cell & METATILE_COLLISION_MASK)).
    """
    w, h = data["width"], data["height"]
    cells, behavior = data["cells"], data["behavior"]
    solid = [1 if (cells[i] & 0x0C00) else 0 for i in range(w * h)]
    water = [0] * (w * h)
    grass = [0] * (w * h)
    for i, cell in enumerate(cells):
        mid = cell & 0x3FF
        if mid < len(behavior):
            be = behavior[mid]
        else:
            be = 0
        if be in MB_WATER:
            water[i] = 1
        if be in GRASS_BEHAVIORS:
            grass[i] = 1
    return solid, water, grass


def bgr555_to_rgb(u16):
    r = (u16 & 0x1F) << 3
    g = ((u16 >> 5) & 0x1F) << 3
    b = ((u16 >> 10) & 0x1F) << 3
    return (r | (r >> 5), g | (g >> 5), b | (b >> 5))


def pal_to_rgb24(pal_bytes):
    out = []
    for i in range(16):
        u16 = struct.unpack_from("<H", pal_bytes, i * 2)[0]
        out.append(bgr555_to_rgb(u16))
    return out


def decode_4bpp_tile(data, off):
    px = []
    for row in range(8):
        for col in range(8):
            bit = (row * 8 + col) * 4
            idx = (data[off + bit // 8] >> (bit % 8)) & 0x0F
            px.append(idx)
    return px


def _tile_image(all_tiles, tile_idx, pal_rgb, alpha0=False, cache=None, flip_h=False, flip_v=False):
    key = (tile_idx, pal_rgb, alpha0, flip_h, flip_v)
    if cache is not None and key in cache:
        return cache[key]
    src = decode_4bpp_tile(all_tiles, tile_idx * TILE_BYTES)
    p = Image.new("P", (8, 8))
    flat = []
    for rgb in pal_rgb:
        flat.extend(rgb)
    p.putpalette(flat + [0] * max(0, 256 * 3 - len(flat)))
    p.putdata(src)
    img = p.convert("RGB")
    if flip_h and flip_v:
        img = img.transpose(Image.Transpose.ROTATE_180)
    elif flip_h:
        img = img.transpose(Image.FLIP_LEFT_RIGHT)
    elif flip_v:
        img = img.transpose(Image.FLIP_TOP_BOTTOM)
    if alpha0:
        a = Image.new("L", (8, 8))
        a.putdata([0 if c == 0 else 255 for c in src])
        if flip_h and flip_v:
            a = a.transpose(Image.Transpose.ROTATE_180)
        elif flip_h:
            a = a.transpose(Image.FLIP_LEFT_RIGHT)
        elif flip_v:
            a = a.transpose(Image.FLIP_TOP_BOTTOM)
        img.putalpha(a)
    else:
        img = img.convert("RGB")
    if cache is not None:
        cache[key] = img
    return img


def paint_grid(rom, data, scale=16, verbose=False):
    """Pinta la imagen del mapa a `scale` px por tile (ensamblado por células)."""
    res = data["prim"]
    sec = data["sec"]
    width, height, cells, metas = data["width"], data["height"], data["cells"], data["metas"]

    all_tiles = res["tiles"] + sec["tiles"]
    n_tiles = len(all_tiles) // TILE_BYTES

    black = b"\x00\x00" * 16
    combined = res["pals"][:6] + sec["pals"][6:13] + [black, black, black]
    combo_rgb = [tuple(pal_to_rgb24(p)) for p in combined]

    if verbose:
        print("map idx=%d  %dx%d" % (data["index"], width, height))
        print("  primary tiles=%d pals=%d | secondary tiles=%d metatiles=%d"
              % (n_tiles // 1, len(res["pals"]),
                 len(sec["tiles"]) // TILE_BYTES,
                 len(metas) - NUM_METATILES_IN_PRIMARY))

    cache = {}
    canvas = Image.new("RGB", (width * 8, height * 8))
    for ty in range(height):
        for tx in range(width):
            cell = cells[ty * width + tx]
            mid = cell & 0x3FF
            if mid >= len(metas):
                continue
            meta = metas[mid]
            for k in range(4):
                entry = struct.unpack_from("<H", meta, k * 2)[0]
                tile_idx = entry & 0x3FF
                pal_idx = (entry >> 12) & 0x0F
                if tile_idx >= n_tiles or pal_idx >= len(combo_rgb):
                    continue
                img = _tile_image(all_tiles, tile_idx, combo_rgb[pal_idx], False, cache,
                                  flip_h=bool(entry & 0x0400), flip_v=bool(entry & 0x0800))
                canvas.paste(img, (tx * 8 + (k & 1) * 8, ty * 8 + ((k >> 1) & 1) * 8))
            for k in range(4):
                entry = struct.unpack_from("<H", meta, (4 + k) * 2)[0]
                tile_idx = entry & 0x3FF
                pal_idx = (entry >> 12) & 0x0F
                if tile_idx >= n_tiles or pal_idx >= len(combo_rgb):
                    continue
                img = _tile_image(all_tiles, tile_idx, combo_rgb[pal_idx], True, cache,
                                  flip_h=bool(entry & 0x0400), flip_v=bool(entry & 0x0800))
                canvas.paste(img, (tx * 8 + (k & 1) * 8, ty * 8 + ((k >> 1) & 1) * 8), img)

    if scale != 8:
        canvas = canvas.resize((width * scale, height * scale), Image.NEAREST)
    return canvas


def render_map(rom, index, with_flips=True, verbose=False):
    data = load_metatile_data(rom, index)
    if verbose:
        print("map idx=%d  %dx%d  tilesets 0x%08X 0x%08X"
              % (index, data["width"], data["height"],
                 read_ptr(rom, ram_to_file(read_ptr(rom, GMAP_HEADERS_FILE + index * 4)) + 0x10),
                 read_ptr(rom, ram_to_file(read_ptr(rom, GMAP_HEADERS_FILE + index * 4)) + 0x14)))
        print("  primary tiles=%d pals=%d | secondary tiles=%d metatiles=%d"
              % (len(data["prim"]["tiles"]) // TILE_BYTES, len(data["prim"]["pals"]),
                 len(data["sec"]["tiles"]) // TILE_BYTES,
                 len(data["metas"]) - NUM_METATILES_IN_PRIMARY))
        print("  unique metatiles used: %d" % len(set(c & 0x3FF for c in data["cells"])))
    return paint_grid(rom, data, scale=8)


def extract(rom, index, scale=16, verbose=False):
    """Datos completos para el juego: imagen 16px/tile + grids de colisión."""
    data = load_metatile_data(rom, index)
    img = paint_grid(rom, data, scale=scale, verbose=verbose)
    solid, water, grass = behavior_grids(data)
    return {
        "index": index,
        "width": data["width"],
        "height": data["height"],
        "image": img,
        "solid": solid,
        "water": water,
        "grass": grass,
        "metatile_ids": data["cells"],
    }


def rom_path():
    return ROM_PATH


def main():
    rom = open(ROM_PATH, "rb").read()
    os.makedirs(OUT_DIR, exist_ok=True)
    args = sys.argv[1:]
    if args and args[0] == "world":
        world = os.path.join(os.path.dirname(os.path.abspath(__file__)), "emerald_world.json")
        render_world(rom, world)
        return
    for idx in args or ["9"]:
        img = render_map(rom, int(idx))
        out = os.path.join(OUT_DIR, "map_%03d.png" % int(idx))
        img.save(out)
        print("saved", out)


def render_world(rom, world_path, out_name="hoenn_world"):
    import json
    data = json.load(open(world_path))
    maps = {int(k): v for k, v in data["maps"].items()}
    for k, v in (data.get("diveTargets") or {}).items():
        maps[int(k)] = v
    minx = min(float(m["x"]) for m in maps.values())
    miny = min(float(m["y"]) for m in maps.values())
    maxx = max(float(m["x"]) + m["w"] for m in maps.values())
    maxy = max(float(m["y"]) + m["h"] for m in maps.values())
    W = int(maxx - minx) * 8
    H = int(maxy - miny) * 8
    print("world canvas %dx%d  origin (%d,%d)" % (W, H, minx, miny))
    canvas = Image.new("RGB", (W, H), (0, 0, 0))
    ok = fail = 0
    for idx, m in sorted(maps.items()):
        try:
            img = render_map(rom, idx)
        except Exception as e:
            print("  FAIL idx=%d %s: %s" % (idx, m["name"], e))
            fail += 1
            continue
        x = int((m["x"] - minx) * 8)
        y = int((m["y"] - miny) * 8)
        canvas.paste(img, (x, y))
        ok += 1
        if ok % 10 == 0:
            print("  rendered %d maps..." % ok)
    out = os.path.join(OUT_DIR, out_name + ".png")
    canvas.save(out)
    print("saved %s (%d ok, %d fail)" % (out, ok, fail))


if __name__ == "__main__":
    main()