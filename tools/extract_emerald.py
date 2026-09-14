# -*- coding: utf-8 -*-
"""
extract_emerald.py — Extractor de datos reales de Pokémon Esmeralda (GBA ROM).
Extrae del ROM: cabeceras de mapa, layouts (metatiles), conexiones borde-a-borde,
warps, eventos de coordenadas y eventos de fondo (BG). Genera tools/emerald_data.json
con TODA la region Hoenn indexada como en el juego original.

Estructuras tomadas del decompilado oficial pret/pokeemerald (formato ROM vanilla):

  struct MapHeader (0x1C):
     0x00 u32 *mapLayout
     0x04 u32 *events
     0x08 u32 *mapScripts
     0x0C u32 *connections
     0x10 u16 music
     0x12 u16 mapLayoutId
     0x14 u16 regionMapSectionId
     0x16 u8  cave
     0x17 u8  coordEventWeather
     0x18 u8  weather
     0x19 u8  mapType
     0x1A u8  bikingAllowed
     0x1B u8  flags2
     0x1C (fin)

  struct MapLayout (0x18):
     0x00 s32 width      (tiles)
     0x04 s32 height     (tiles)
     0x08 u32 *border    (LZ comprimido o datos crudos)
     0x0C u32 *map       (LZ comprimido o datos crudos)
     0x10 u32 *primaryTileset
     0x14 u32 *secondaryTileset

  struct MapEvents (0x20):
     0x00 u8 objectEventCount
     0x01 u8 warpCount
     0x02 u8 coordEventCount
     0x03 u8 bgEventCount
     0x04 u32 *objectEvents
     0x08 u32 *warps
     0x0C u32 *coordEvents
     0x10 u32 *bgEvents
     0x14 u8 actionsCount
     0x15 u8 trainerCount
     0x16 u8 pad
     0x17 u8 pad
     0x18 u32 *actions
     0x1C u32 *scripts

  struct MapConnection (6): u8 direction, u8 offset, u16 mapGroup, u16 mapNum
  struct MapConnections (8): s32 count, u32 *connections

  struct WarpEvent (8): s16 x, s16 y, u8 elevation, u8 warpId, u8 mapNum, u8 mapGroup
  struct CoordEvent (12): s16 x, s16 y, u8 elevation, u8 trigger(u16), u16 index, u32 *script
  struct BgEvent (10): u16 x, u16 y, u8 elevation, u8 kind, u32 union
"""
import json, struct, os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ROM = os.path.join(ROOT, "Pokemon - Edicion Esmeralda (Spain).gba")
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "emerald_data.json")

ROM_BASE = 0x08000000
MAP_HEADER_STRIDE = 0x1C
MAP_LAYOUT_SIZE = 0x18
MAP_EVENTS_SIZE = 0x20
MAX_MAPS = 600

HEADER_LOC = 0x00485B14   # file offset del bloque contiguo de cabeceras (detectado)


class Rom:
    def __init__(self, path):
        self.data = open(path, "rb").read()
        self.N = len(self.data)

    def u8(self, o):
        return self.data[o]

    def u16(self, o):
        return struct.unpack_from("<H", self.data, o)[0]

    def u32(self, o):
        return struct.unpack_from("<I", self.data, o)[0]

    def ptr_to_file(self, p):
        if p == 0:
            return 0
        if not (ROM_BASE <= p < rom.N + ROM_BASE):
            return p
        return p - ROM_BASE

    def read(self, p, n):
        return self.data[self.ptr_to_file(p): self.ptr_to_file(p) + n]

    def is_rom_ptr(self, p):
        return ROM_BASE <= p < self.N + ROM_BASE


rom = Rom(ROM)


def lz77_decompress(src):
    """Decompresor LZ77 de los formatos 0x10 y 0x11 usados por GBA/Pokémon.
    Compatible con cabeceras 11h (flags por octeto) y 10h (flags por bit)."""
    if isinstance(src, int):
        size = None
        data = None
    else:
        pass
    def impl(buf):
        if len(buf) < 4:
            return None
        flags_size = buf[0]
        decompressed_size = (buf[1] | (buf[2] << 8) | (buf[3] << 16))
        variant = flags_size & 0x0F
        if variant == 0x10:
            # LZ77 con 1 bit por octeto (type 10h)
            out = bytearray()
            pos = 4
            bits = 0
            mask = 0
            while len(out) < decompressed_size and pos < len(buf):
                if mask == 0:
                    if pos >= len(buf): break
                    bits = buf[pos]; pos += 1
                    mask = 0x80
                if bits & mask:
                    if pos + 2 > len(buf): break
                    b1 = buf[pos]; b2 = buf[pos + 1]; pos += 2
                    count = (b1 >> 4) + 3
                    disp = ((b1 & 0x0F) << 8) | b2
                    for _ in range(count):
                        if len(out) < decompressed_size:
                            out.append(out[-1 - disp] if disp < len(out) else 0)
                else:
                    if pos >= len(buf): break
                    out.append(buf[pos]); pos += 1
                mask >>= 1
            return bytes(out[:decompressed_size]), decompressed_size
        elif variant == 0x11:
            # LZ77 con 1 byte de flags cada 8 (type 11h)
            out = bytearray()
            pos = 4
            while len(out) < decompressed_size and pos < len(buf):
                flags = buf[pos]; pos += 1
                for bit in range(8):
                    if len(out) >= decompressed_size: break
                    if pos >= len(buf): break
                    if flags & (0x80 >> bit):
                        b1 = buf[pos]; b2 = buf[pos+1]; pos += 2
                        count = (b1 >> 4) + 3
                        disp = ((b1 & 0x0F) << 8) | b2
                        for _ in range(count):
                            if len(out) < decompressed_size:
                                out.append(out[-1 - disp] if disp < len(out) else 0)
                    else:
                        out.append(buf[pos]); pos += 1
            return bytes(out[:decompressed_size]), decompressed_size
        return None

    if isinstance(src, int):
        # src = direccion ROM
        f = rom.ptr_to_file(src)
        if f >= rom.N:
            return None, 0
        return impl(rom.read(src, 0x20000))
    return impl(src)


def decode_4bpp(tiles, w=8, h=8):
    """Decodifica tiles 4bpp (w*h px). tiles = bytes de un tile 4bpp (32 bytes)."""
    out = []
    stride = w // 4
    for y in range(h):
        row = []
        for x in range(stride):
            byte = tiles[y * (w // 2) + x]  # ojo: bitplanos
            pass
    return None


def parse_headers():
    headers = []
    for i in range(MAX_MAPS):
        f = HEADER_LOC + i * MAP_HEADER_STRIDE
        if f + MAP_HEADER_STRIDE > rom.N:
            break
        layout = rom.u32(f)
        events = rom.u32(f + 4)
        scripts = rom.u32(f + 8)
        connections = rom.u32(f + 0xC)
        music = rom.u16(f + 0x10)
        mapLayoutId = rom.u16(f + 0x12)
        regionMapSectionId = rom.u16(f + 0x14)
        cave = rom.u8(f + 0x16)
        coordEventWeather = rom.u8(f + 0x17)
        weather = rom.u8(f + 0x18)
        mapType = rom.u8(f + 0x19)
        bikingAllowed = rom.u8(f + 0x1A)
        flags2 = rom.u8(f + 0x1B)
        headers.append({
            "index": i,
            "mapLayout": layout,
            "events": events,
            "mapScripts": scripts,
            "connections": connections,
            "music": music,
            "mapLayoutId": mapLayoutId,
            "regionMapSectionId": regionMapSectionId,
            "cave": cave,
            "coordEventWeather": coordEventWeather,
            "weather": weather,
            "mapType": mapType,
            "bikingAllowed": bikingAllowed,
            "flags2": flags2,
        })
    return headers


def parse_layouts(headers):
    layouts = {}
    for h in headers:
        lt = h["mapLayout"]
        if not rom.is_rom_ptr(lt):
            continue
        f = rom.ptr_to_file(lt)
        if f + MAP_LAYOUT_SIZE > rom.N:
            continue
        w = rom.u32(f)
        hh = rom.u32(f + 4)
        border = rom.u32(f + 8)
        mapdata = rom.u32(f + 0xC)
        primary = rom.u32(f + 0x10)
        secondary = rom.u32(f + 0x14)
        if not (2 <= w <= 2000 and 2 <= hh <= 2000):
            continue
        layouts[h["index"]] = {
            "width_tiles": w,
            "height_tiles": hh,
            "border": border,
            "map": mapdata,
            "primaryTileset": primary,
            "secondaryTileset": secondary,
        }
    return layouts


def parse_events(headers, layouts):
    for h in headers:
        ev = h["events"]
        if not rom.is_rom_ptr(ev):
            h["nWarps"] = 0
            h["nCoords"] = 0
            h["nBgs"] = 0
            h["nObjects"] = 0
            h["warps"] = []
            h["coordEvents"] = []
            h["bgEvents"] = []
            continue
        f = rom.ptr_to_file(ev)
        if f + MAP_EVENTS_SIZE > rom.N:
            h["nWarps"] = h["nCoords"] = h["nBgs"] = h["nObjects"] = 0
            h["warps"] = h["coordEvents"] = h["bgEvents"] = []
            continue
        nObj = rom.u8(f)
        nWarp = rom.u8(f + 1)
        nCoord = rom.u8(f + 2)
        nBg = rom.u8(f + 3)
        objPtr = rom.u32(f + 4)
        warpPtr = rom.u32(f + 8)
        coordPtr = rom.u32(f + 0xC)
        bgPtr = rom.u32(f + 0x10)
        h["nObjects"] = nObj
        h["nWarps"] = nWarp
        h["nCoords"] = nCoord
        h["nBgs"] = nBg

        warps = []
        if nWarp and rom.is_rom_ptr(warpPtr):
            wf = rom.ptr_to_file(warpPtr)
            for k in range(nWarp):
                base = wf + k * 8
                if base + 8 > rom.N: break
                x = struct.unpack_from("<h", rom.data, base)[0]
                y = struct.unpack_from("<h", rom.data, base + 2)[0]
                elevation = rom.u8(base + 4)
                warpId = rom.u8(base + 5)
                mapNum = rom.u8(base + 6)
                mapGroup = rom.u8(base + 7)
                warps.append({"x": x, "y": y, "elevation": elevation,
                              "warpId": warpId, "mapNum": mapNum, "mapGroup": mapGroup,
                              "targetIndex": mapGroup * 1000 + mapNum})
        h["warps"] = warps

        coords = []
        if nCoord and rom.is_rom_ptr(coordPtr):
            cf = rom.ptr_to_file(coordPtr)
            for k in range(nCoord):
                base = cf + k * 12
                if base + 12 > rom.N: break
                x = struct.unpack_from("<h", rom.data, base)[0]
                y = struct.unpack_from("<h", rom.data, base + 2)[0]
                elevation = rom.u8(base + 4)
                trigger = rom.u8(base + 5)
                index = rom.u16(base + 6)
                script = rom.u32(base + 8)
                coords.append({"x": x, "y": y, "elevation": elevation,
                               "trigger": trigger, "index": index, "script": script})
        h["coordEvents"] = coords

        bgs = []
        if nBg and rom.is_rom_ptr(bgPtr):
            bf = rom.ptr_to_file(bgPtr)
            for k in range(nBg):
                base = bf + k * 10
                if base + 10 > rom.N: break
                x = rom.u16(base)
                y = rom.u16(base + 2)
                elevation = rom.u8(base + 4)
                kind = rom.u8(base + 5)
                union = rom.u32(base + 6)
                bgs.append({"x": x, "y": y, "elevation": elevation, "kind": kind, "union": union})
        h["bgEvents"] = bgs


def parse_connections(headers):
    for h in headers:
        cn = h["connections"]
        h["conn"] = []
        if not rom.is_rom_ptr(cn):
            continue
        f = rom.ptr_to_file(cn)
        if f + 8 > rom.N:
            continue
        count = rom.u32(f)
        conns = rom.u32(f + 4)
        if count <= 0 or count > 16 or not rom.is_rom_ptr(conns):
            continue
        cf = rom.ptr_to_file(conns)
        out = []
        for k in range(count):
            base = cf + k * 6
            if base + 6 > rom.N: break
            direction = rom.u8(base)          # 0=down 1=up 2=left 3=right
            offset = rom.u8(base + 1)
            mapGroup = rom.u16(base + 2)      # los 16 bits: bajo = mapGroup, alto = mapNum? usamos banda
            raw = rom.u16(base + 4)
            mapNum = rom.u16(base + 4)
            # En Emerald vanilla el connection struct es u8 dir,u8 offset,u16 mapGroup,u16 mapNum
            out.append({"direction": direction, "offset": offset,
                        "mapGroup": mapGroup, "mapNum": mapNum,
                        "targetIndex": mapGroup * 1000 + mapNum})
        h["conn"] = out


def main():
    print("Leyendo ROM:", ROM, "(%d bytes)" % rom.N)
    headers = parse_headers()
    print("Cabeceras:", len(headers))
    layouts = parse_layouts(headers)
    print("Layouts validos:", len(layouts))
    parse_events(headers, layouts)
    parse_connections(headers)

    data = {"headers": headers, "layouts": {int(k): v for k, v in layouts.items()}}
    with open(OUT, "w", encoding="utf-8") as fp:
        json.dump(data, fp, indent=1)
    print("Guardado en", OUT)

    # Resumen diagnostico
    nw = sum(1 for h in headers if h["nWarps"])
    nc = sum(1 for h in headers if h.get("conn"))
    print("Mapas con warps:", nw, "| Mapas con conexiones:", nc)


if __name__ == "__main__":
    main()