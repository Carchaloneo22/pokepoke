"""
monster_engine.database
=======================
Gestor de persistencia con soporte nativo para PostgreSQL (y fallback automático a SQLite).
Permite configurar DATABASE_URL (ej: postgresql://user:pass@localhost:5432/pokepoke).
"""

import hashlib
import json
import os
import secrets
import sqlite3
import time
from typing import Any, Dict, Optional, Tuple

DATABASE_URL = os.getenv("DATABASE_URL", "").strip()
DB_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data", "pokepoke.db")

IS_POSTGRES = False
pg_pool = None

if DATABASE_URL.startswith("postgres://") or DATABASE_URL.startswith("postgresql://"):
    try:
        import psycopg2
        from psycopg2.extras import RealDictCursor
        IS_POSTGRES = True
        print(f"[DATABASE] Configurado para PostgreSQL: {DATABASE_URL.split('@')[-1] if '@' in DATABASE_URL else 'remoto'}")
    except ImportError:
        print("[DATABASE] Advertencia: psycopg2 no disponible, usando SQLite como fallback.")
        IS_POSTGRES = False


def get_db_connection():
    global IS_POSTGRES
    if IS_POSTGRES:
        try:
            import psycopg2
            from psycopg2.extras import RealDictCursor
            conn = psycopg2.connect(DATABASE_URL, cursor_factory=RealDictCursor)
            conn.autocommit = False
            return conn
        except Exception as e:
            print(f"[DATABASE] Error al conectar a PostgreSQL ({e}), recurriendo a SQLite.")
            # Fallback temporal a SQLite
    
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    conn = sqlite3.connect(DB_PATH, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()

    is_pg = hasattr(conn, 'commit') and not isinstance(conn, sqlite3.Connection)

    if is_pg:
        # Esquema PostgreSQL
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            salt VARCHAR(64) NOT NULL,
            password_hash VARCHAR(128) NOT NULL,
            email VARCHAR(120),
            created_at DOUBLE PRECISION NOT NULL
        );
        """)
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS sessions (
            token VARCHAR(128) PRIMARY KEY,
            username VARCHAR(50) NOT NULL,
            created_at DOUBLE PRECISION NOT NULL,
            last_seen DOUBLE PRECISION NOT NULL
        );
        """)
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS player_profiles (
            username VARCHAR(50) PRIMARY KEY,
            trainer_name VARCHAR(50) NOT NULL,
            sprite VARCHAR(255) NOT NULL,
            current_zone VARCHAR(100) NOT NULL,
            badges_json TEXT NOT NULL,
            hms_json TEXT NOT NULL,
            team_json TEXT NOT NULL,
            registered_dex_json TEXT NOT NULL,
            inventory_json TEXT NOT NULL,
            settings_json TEXT NOT NULL,
            updated_at DOUBLE PRECISION NOT NULL
        );
        """)
    else:
        # Esquema SQLite
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL COLLATE NOCASE,
            salt TEXT NOT NULL,
            password_hash TEXT NOT NULL,
            email TEXT,
            created_at REAL NOT NULL
        );
        """)
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS sessions (
            token TEXT PRIMARY KEY,
            username TEXT NOT NULL COLLATE NOCASE,
            created_at REAL NOT NULL,
            last_seen REAL NOT NULL
        );
        """)
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS player_profiles (
            username TEXT PRIMARY KEY COLLATE NOCASE,
            trainer_name TEXT NOT NULL,
            sprite TEXT NOT NULL,
            current_zone TEXT NOT NULL,
            badges_json TEXT NOT NULL,
            hms_json TEXT NOT NULL,
            team_json TEXT NOT NULL,
            registered_dex_json TEXT NOT NULL,
            inventory_json TEXT NOT NULL,
            settings_json TEXT NOT NULL,
            updated_at REAL NOT NULL
        );
        """)

    conn.commit()
    conn.close()


def hash_password(password: str, salt: Optional[str] = None) -> Tuple[str, str]:
    if not salt:
        salt = secrets.token_hex(16)
    hasher = hashlib.sha256()
    hasher.update((salt + password).encode("utf-8"))
    return hasher.hexdigest(), salt


def register_account(
    username: str,
    password: str,
    email: Optional[str] = None,
    starter_dict: Optional[Dict[str, Any]] = None,
    avatar_style: str = "brendan"
) -> Tuple[str, Dict[str, Any]]:
    clean_user = username.strip()
    pwd_hash, salt = hash_password(password)

    conn = get_db_connection()
    cursor = conn.cursor()
    is_pg = not isinstance(conn, sqlite3.Connection)
    placeholder = "%s" if is_pg else "?"

    cursor.execute(f"SELECT id FROM users WHERE LOWER(username) = LOWER({placeholder})", (clean_user,))
    if cursor.fetchone():
        conn.close()
        raise ValueError(f"El usuario '{clean_user}' ya existe.")

    now = time.time()
    cursor.execute(
        f"INSERT INTO users (username, salt, password_hash, email, created_at) VALUES ({placeholder}, {placeholder}, {placeholder}, {placeholder}, {placeholder})",
        (clean_user, salt, pwd_hash, email, now)
    )

    starter_list = [starter_dict] if starter_dict else []
    starter_id = starter_dict.get("id", 2) if starter_dict else 2

    initial_profile = {
        "name": clean_user,
        "sprite": f"/assets/sprites/{avatar_style}_spritesheet.png" if avatar_style else "/assets/sprites/brendan_spritesheet.png",
        "current_zone": "grand_hotel_lobby",
        "badges": [],
        "hms": ["A_PIE"],
        "team": starter_list,
        "registered_dex": [starter_id],
        "inventory": {
            "coins": 3000,
            "items": {
                "Poké Ball": 5,
                "Poción": 3,
                "Antídoto": 2
            }
        },
        "settings": {
            "text_speed": "FAST",
            "sound_fx": True,
            "battle_animations": True
        }
    }

    cursor.execute(f"""
    INSERT INTO player_profiles (
        username, trainer_name, sprite, current_zone,
        badges_json, hms_json, team_json, registered_dex_json,
        inventory_json, settings_json, updated_at
    ) VALUES ({placeholder}, {placeholder}, {placeholder}, {placeholder}, {placeholder}, {placeholder}, {placeholder}, {placeholder}, {placeholder}, {placeholder}, {placeholder})
    """, (
        clean_user,
        initial_profile["name"],
        initial_profile["sprite"],
        initial_profile["current_zone"],
        json.dumps(initial_profile["badges"]),
        json.dumps(initial_profile["hms"]),
        json.dumps(initial_profile["team"]),
        json.dumps(initial_profile["registered_dex"]),
        json.dumps(initial_profile["inventory"]),
        json.dumps(initial_profile["settings"]),
        now
    ))

    token = f"tok_{secrets.token_hex(20)}"
    cursor.execute(
        f"INSERT INTO sessions (token, username, created_at, last_seen) VALUES ({placeholder}, {placeholder}, {placeholder}, {placeholder})",
        (token, clean_user, now, now)
    )

    conn.commit()
    conn.close()

    return token, initial_profile


def authenticate_account(username: str, password: str) -> Optional[Tuple[str, Dict[str, Any]]]:
    clean_user = username.strip()
    conn = get_db_connection()
    cursor = conn.cursor()
    is_pg = not isinstance(conn, sqlite3.Connection)
    placeholder = "%s" if is_pg else "?"

    cursor.execute(f"SELECT salt, password_hash FROM users WHERE LOWER(username) = LOWER({placeholder})", (clean_user,))
    row = cursor.fetchone()
    if not row:
        conn.close()
        return None

    salt, expected_hash = row["salt"], row["password_hash"]
    computed_hash, _ = hash_password(password, salt)
    if computed_hash != expected_hash:
        conn.close()
        return None

    profile = get_profile_by_username(clean_user, conn)
    if not profile:
        conn.close()
        return None

    now = time.time()
    token = f"tok_{secrets.token_hex(20)}"
    cursor.execute(
        f"INSERT INTO sessions (token, username, created_at, last_seen) VALUES ({placeholder}, {placeholder}, {placeholder}, {placeholder})",
        (token, clean_user, now, now)
    )
    conn.commit()
    conn.close()

    return token, profile


def get_profile_by_username(username: str, conn: Optional[Any] = None) -> Optional[Dict[str, Any]]:
    should_close = False
    if conn is None:
        conn = get_db_connection()
        should_close = True

    cursor = conn.cursor()
    is_pg = not isinstance(conn, sqlite3.Connection)
    placeholder = "%s" if is_pg else "?"

    cursor.execute(f"SELECT * FROM player_profiles WHERE LOWER(username) = LOWER({placeholder})", (username.strip(),))
    row = cursor.fetchone()
    if should_close:
        conn.close()

    if not row:
        return None

    return {
        "name": row["trainer_name"],
        "sprite": row["sprite"],
        "current_zone": row["current_zone"],
        "badges": json.loads(row["badges_json"]) if isinstance(row["badges_json"], str) else row["badges_json"],
        "hms": json.loads(row["hms_json"]) if isinstance(row["hms_json"], str) else row["hms_json"],
        "team": json.loads(row["team_json"]) if isinstance(row["team_json"], str) else row["team_json"],
        "registered_dex": json.loads(row["registered_dex_json"]) if isinstance(row["registered_dex_json"], str) else row["registered_dex_json"],
        "inventory": json.loads(row["inventory_json"]) if isinstance(row["inventory_json"], str) else row["inventory_json"],
        "settings": json.loads(row["settings_json"]) if isinstance(row["settings_json"], str) else row["settings_json"]
    }


def save_player_state(username: str, profile: Dict[str, Any]) -> bool:
    conn = get_db_connection()
    cursor = conn.cursor()
    now = time.time()
    is_pg = not isinstance(conn, sqlite3.Connection)
    placeholder = "%s" if is_pg else "?"

    cursor.execute(f"""
    UPDATE player_profiles SET
        trainer_name = {placeholder},
        sprite = {placeholder},
        current_zone = {placeholder},
        badges_json = {placeholder},
        hms_json = {placeholder},
        team_json = {placeholder},
        registered_dex_json = {placeholder},
        inventory_json = {placeholder},
        settings_json = {placeholder},
        updated_at = {placeholder}
    WHERE LOWER(username) = LOWER({placeholder})
    """, (
        profile.get("name", username),
        profile.get("sprite", "/assets/sprites/characters/player.png"),
        profile.get("current_zone", "grand_hotel_lobby"),
        json.dumps(profile.get("badges", [])),
        json.dumps(profile.get("hms", ["A_PIE"])),
        json.dumps(profile.get("team", [])),
        json.dumps(profile.get("registered_dex", [])),
        json.dumps(profile.get("inventory", {})),
        json.dumps(profile.get("settings", {})),
        now,
        username.strip()
    ))
    affected = cursor.rowcount
    conn.commit()
    conn.close()
    return affected > 0


def verify_session_token(token: str) -> Optional[str]:
    if not token:
        return None
    conn = get_db_connection()
    cursor = conn.cursor()
    is_pg = not isinstance(conn, sqlite3.Connection)
    placeholder = "%s" if is_pg else "?"
    cursor.execute(f"SELECT username FROM sessions WHERE token = {placeholder}", (token.strip(),))
    row = cursor.fetchone()
    conn.close()
    return row["username"] if row else None


# Auto-inicializar tablas al importar
init_db()
