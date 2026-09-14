import asyncio, json, websockets
async def test():
    base = 'ws://127.0.0.1:8000'
    try:
        async with websockets.connect(base + '/ws/lobby?trainer_id=observer&trainer_name=Observer', extra_headers={"Origin": "null"}) as ws:
            snap = json.loads(await asyncio.wait_for(ws.recv(), timeout=3))
            print('PLAYERS ONLINE (Origin: null):')
            for p in snap.get('players', []):
                print(f"- {p['name']} ({p['id']})")
    except Exception as e:
        print("Error Origin null:", e)
        
    try:
        async with websockets.connect(base + '/ws/lobby?trainer_id=observer&trainer_name=Observer', extra_headers={"Origin": "http://127.0.0.1:5500"}) as ws:
            snap = json.loads(await asyncio.wait_for(ws.recv(), timeout=3))
            print('PLAYERS ONLINE (Origin: http://127.0.0.1:5500):')
            for p in snap.get('players', []):
                print(f"- {p['name']} ({p['id']})")
    except Exception as e:
        print("Error Origin 5500:", e)

asyncio.run(test())
