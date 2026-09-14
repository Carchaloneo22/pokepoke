# -*- coding: utf-8 -*-
"""
emerald_world.py v4 — Correct least-squares placement of connected overworld.

Equations (var_B - var_A = constant):
  UP  (2): xB-xA=offset ; yB-yA=-hB
  DOWN(1): xB-xA=offset ; yB-yA=+hA
  LEFT(3): xB-xA=-wB   ; yB-yA=offset
  RIGHT(4):xB-xA=+wA   ; yB-yA=offset

Solve only the BFS-connected surface component from Littleroot (idx9).
Dive maps share coordinates with their host.
"""
import json, os
import numpy as np
from collections import deque

TOOLS = r"C:\Users\jdbpb\Downloads\pokepoke-main\pokepoke-main\tools"
RES = os.path.join(TOOLS, "emerald_resolved.json")
OUT = os.path.join(TOOLS, "emerald_world.json")


def main():
    with open(RES) as fp:
        data = json.load(fp)
    maps = {m["index"]: m for m in data["maps"]}

    # Build adjacency from connections (surface edges only, dirs 1-4)
    adj = {}
    for m in data["maps"]:
        ai = m["index"]
        for cn in m["connections"]:
            t = cn["targetIndex"]
            if t is None or cn["direction"] not in (1, 2, 3, 4):
                continue
            adj.setdefault(ai, []).append(cn)
            adj.setdefault(t, [])

    # BFS from Littleroot (9) to find connected component
    visited = set()
    q = deque([9])
    visited.add(9)
    while q:
        cur = q.popleft()
        for cn in adj.get(cur, []):
            t = cn["targetIndex"]
            if t is not None and t not in visited:
                visited.add(t)
                q.append(t)

    surface = sorted(visited)
    idx_map = {v: i for i, v in enumerate(surface)}
    n = len(surface)

    # Build X and Y systems:  row = [target_idx, source_idx, +1, -1], rhs = c
    def build_sys(coord):
        rows = []
        rhs = []
        for mi in surface:
            m = maps[mi]
            for cn in m.get("connections", []):
                ti = cn["targetIndex"]
                if ti is None or ti not in idx_map or cn["direction"] not in (1, 2, 3, 4):
                    continue
                d = cn["direction"]
                o = cn["offset"]
                wb = maps[ti]["width"]
                hb = maps[ti]["height"]
                wa = m["width"]
                ha = m["height"]
                if coord == "x":
                    if d in (1, 2):   c = o       # UP/DOWN: xB-xA = offset
                    elif d == 3:      c = -wb     # LEFT: xB-xA = -wB
                    elif d == 4:      c = +wa     # RIGHT: xB-xA = +wA
                else:
                    if d == 2:        c = -hb     # UP: yB-yA = -hB
                    elif d == 1:      c = +ha     # DOWN: yB-yA = +hA
                    elif d in (3, 4): c = o       # LEFT/RIGHT: yB-yA = offset
                rows.append((idx_map[ti], idx_map[mi]))  # (target, source)
                rhs.append(c)
        return rows, rhs

    def solve(rows, rhs, anchor_idx=9):
        nr = len(rows)
        A = np.zeros((nr + 1, n))
        b = np.zeros(nr + 1)
        for r, (ti, si) in enumerate(rows):
            A[r, ti] = 1.0
            A[r, si] = -1.0
            b[r] = rhs[r]
        A[nr, idx_map[anchor_idx]] = 1.0  # anchor to 0
        b[nr] = 0.0
        sol, *_ = np.linalg.lstsq(A, b, rcond=None)
        return {surface[i]: int(round(v)) for i, v in enumerate(sol)}

    rx, rhs_x = build_sys("x")
    ry, rhs_y = build_sys("y")
    xs = solve(rx, rhs_x)
    ys = solve(ry, rhs_y)

    # Dive hosts
    dive_hosts = {}
    for m in data["maps"]:
        for cn in m["connections"]:
            if cn["direction"] == 5 and cn["targetIndex"] is not None:
                dive_hosts[cn["targetIndex"]] = m["index"]

    # Verify seams
    seams = []
    for mi in surface:
        m = maps[mi]
        for cn in m.get("connections", []):
            ti = cn["targetIndex"]
            if ti is None or ti not in idx_map or cn["direction"] not in (1, 2, 3, 4):
                continue
            d = cn["direction"]
            o = cn["offset"]
            wb, hb = maps[ti]["width"], maps[ti]["height"]
            wa, ha = m["width"], m["height"]
            if d == 2:   ex, ey = xs[mi]+o, ys[mi]-hb
            elif d == 1: ex, ey = xs[mi]+o, ys[mi]+ha
            elif d == 3: ex, ey = xs[mi]-wb, ys[mi]+o
            elif d == 4: ex, ey = xs[mi]+wa, ys[mi]+o
            err = (xs[ti]-ex, ys[ti]-ey)
            if err[0] != 0 or err[1] != 0:
                seams.append((m["name"], maps[ti]["name"], d, o, err))

    n_under = len(dive_hosts)
    allx = [xs[i] for i in surface]
    ally = [ys[i] for i in surface]
    minx, maxx = min(allx), max(allx)
    miny, maxy = min(ally), max(ally)

    print("Surface: %d maps | Underwater: %d" % (n, n_under))
    print("Bbox: x[%d..%d] y[%d..%d] = %dx%d tiles = %dx%d px" %
          (minx, maxx, miny, maxy, maxx-minx+1, maxy-miny+1,
           (maxx-minx+1)*16, (maxy-miny+1)*16))
    print("Seams: %d / %d edges" % (len(seams), len(rx)))
    for s in seams[:30]:
        print("  %s -> %s dir%d off%d err=%s" % s)

    print("\n%-4s %-22s %7s %7s %5s %5s" % ("idx", "name", "x", "y", "w", "h"))
    for i in surface:
        m = maps[i]
        print("%-4d %-22s %7d %7d %5d %5d" % (i, m["name"], xs[i], ys[i], m["width"], m["height"]))

    out = {
        "anchor": {"index": 9, "name": "LittlerootTown"},
        "semantics": "UP: xB=xA+off,yB=yA-hB; DOWN: xB=xA+off,yB=yA+hA; LEFT: xB=xA-wB,yB=yA+off; RIGHT: xB=xA+wA,yB=yA+off",
        "maps": {}, "diveTargets": {},
        "summary": {"surface": n, "underwater": n_under,
                     "bbox": {"minX": int(minx), "maxX": int(maxx), "minY": int(miny), "maxY": int(maxy)},
                     "seams": len(seams)}
    }
    for i in surface:
        m = maps[i]
        out["maps"][str(i)] = {"name": m["name"], "x": xs[i], "y": ys[i],
                                "w": m["width"], "h": m["height"]}
    for u, s in dive_hosts.items():
        um = maps[u]
        out["diveTargets"][str(u)] = {"name": um["name"], "x": xs[s], "y": ys[s],
                                       "w": um["width"], "h": um["height"]}
    with open(OUT, "w") as fp:
        json.dump(out, fp, indent=1, ensure_ascii=False)
    print("\nSaved -> %s" % OUT)


if __name__ == "__main__":
    main()