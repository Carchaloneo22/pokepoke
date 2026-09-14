"""
monster_engine.models
=====================
Modelos Pydantic y estructuras de dominio completas:
- Criaturas: Stats base, BST, EVs (<=510), Tipos, Formas Especiales (Mutación X/Y, Alfa/Mega).
- Mapa Exhaustivo de Hoenn/Emerald:
  * 16 Asentamientos y Ciudades.
  * 34 Rutas Terrestres y Marítimas (101 a 134).
  * 22 Mazmorras, Cuevas, Instalaciones y Puntos de Interés.
  * Requisitos de Medallas (Stone a Rain) y Navegación (Surf, Waterfall, Dive, Rock Smash, Flash).
  * Checklist de completitud Emerald: Objetos ocultos, entrenadores vencidos y especies registradas.
- Jugador y Perfil: Configuración, Sprites locales y Progresión.
- WebSocket Multiplayer Lobby: Estados de presencia, broadcast y desafíos PvP.
- Combate: Movimientos físicos/especiales, STAB, turnos y resultados.
"""

from enum import Enum
from typing import Any, Dict, List, Optional
from pydantic import BaseModel, Field, computed_field, field_validator, model_validator


# ============================================================================
# 1. ELEMENTOS Y TIPOS
# ============================================================================

class ElementalType(str, Enum):
    NORMAL = "NORMAL"
    FUEGO = "FUEGO"
    AGUA = "AGUA"
    PLANTA = "PLANTA"
    ELECTRICO = "ELECTRICO"
    HIELO = "HIELO"
    LUCHA = "LUCHA"
    VENENO = "VENENO"
    TIERRA = "TIERRA"
    VOLADOR = "VOLADOR"
    PSIQUICO = "PSIQUICO"
    BICHO = "BICHO"
    ROCA = "ROCA"
    FANTASMA = "FANTASMA"
    DRAGON = "DRAGON"
    SINIESTRO = "SINIESTRO"
    ACERO = "ACERO"
    HADA = "HADA"


class MutationForm(str, Enum):
    BASE = "BASE"
    MUTACION_X = "MUTACION_X"  # Variante física alterada
    MUTACION_Y = "MUTACION_Y"  # Variante especial/defensiva alterada
    ALFA_MEGA = "ALFA_MEGA"    # Forma Alfa / Evolución máxima


# ============================================================================
# 2. ESTADÍSTICAS Y CRIATURAS
# ============================================================================

class StatBlock(BaseModel):
    hp: int = Field(..., ge=1, le=255)
    attack: int = Field(..., ge=1, le=255)
    defense: int = Field(..., ge=1, le=255)
    sp_attack: int = Field(..., ge=1, le=255)
    sp_defense: int = Field(..., ge=1, le=255)
    speed: int = Field(..., ge=1, le=255)

    @computed_field
    @property
    def bst(self) -> int:
        return self.hp + self.attack + self.defense + self.sp_attack + self.sp_defense + self.speed


class EffortValues(BaseModel):
    hp: int = Field(0, ge=0, le=252)
    attack: int = Field(0, ge=0, le=252)
    defense: int = Field(0, ge=0, le=252)
    sp_attack: int = Field(0, ge=0, le=252)
    sp_defense: int = Field(0, ge=0, le=252)
    speed: int = Field(0, ge=0, le=252)

    @model_validator(mode="after")
    def validate_ev_total(self) -> "EffortValues":
        total = self.hp + self.attack + self.defense + self.sp_attack + self.sp_defense + self.speed
        if total > 510:
            raise ValueError(f"La suma total de EVs ({total}) infringe el límite de 510 puntos.")
        return self


class SpriteSet(BaseModel):
    front: str
    back: str
    icon: str
    shiny_front: Optional[str] = None


class MoveCategory(str, Enum):
    PHYSICAL = "PHYSICAL"
    SPECIAL = "SPECIAL"
    STATUS = "STATUS"


class Move(BaseModel):
    id: str
    name: str
    elemental_type: ElementalType
    category: MoveCategory
    power: int = Field(0, ge=0, le=250)
    accuracy: int = Field(100, ge=1, le=100)
    max_pp: int = Field(..., ge=1, le=40)
    current_pp: int = Field(..., ge=0, le=40)
    priority: int = 0


class Creature(BaseModel):
    id: int = Field(..., ge=1)
    name: str = Field(..., min_length=2, max_length=30)
    region: str = "HOENN"
    generation: int = Field(3, ge=1, le=9)
    primary_type: ElementalType
    secondary_type: Optional[ElementalType] = None
    transformation: MutationForm = MutationForm.BASE
    base_stats: StatBlock
    evs: EffortValues = Field(default_factory=EffortValues)
    moves: List[Move] = Field(default_factory=list)
    sprites: SpriteSet
    current_hp: int = Field(..., ge=0)
    max_hp: int = Field(..., ge=1)
    level: int = Field(50, ge=1, le=100)
    exp: int = Field(0, ge=0)
    catch_rate: int = Field(255, ge=1, le=255)
    status: str = "NORMAL"
    version: int = 1

    @model_validator(mode="after")
    def init_exp(self) -> "Creature":
        if self.exp == 0 and self.level > 0:
            self.exp = self.level ** 3
        return self

    @computed_field
    @property
    def bst(self) -> int:
        return self.base_stats.bst

    @computed_field
    @property
    def actual_attack(self) -> int:
        import math
        return math.floor((2 * self.base_stats.attack + (self.evs.attack // 4)) * self.level / 100) + 5

    @computed_field
    @property
    def actual_defense(self) -> int:
        import math
        return math.floor((2 * self.base_stats.defense + (self.evs.defense // 4)) * self.level / 100) + 5

    @computed_field
    @property
    def actual_sp_attack(self) -> int:
        import math
        return math.floor((2 * self.base_stats.sp_attack + (self.evs.sp_attack // 4)) * self.level / 100) + 5

    @computed_field
    @property
    def actual_sp_defense(self) -> int:
        import math
        return math.floor((2 * self.base_stats.sp_defense + (self.evs.sp_defense // 4)) * self.level / 100) + 5

    @computed_field
    @property
    def actual_speed(self) -> int:
        import math
        return math.floor((2 * self.base_stats.speed + (self.evs.speed // 4)) * self.level / 100) + 5

    def update_max_hp(self):
        import math
        self.max_hp = math.floor((2 * self.base_stats.hp + (self.evs.hp // 4)) * self.level / 100) + self.level + 10

    def gain_exp(self, amount: int) -> List[str]:
        logs = []
        if self.level >= 100:
            return logs
            
        self.exp += amount
        logs.append(f"{self.name} ganó {amount} puntos de EXP.")
        
        while self.level < 100 and self.exp >= (self.level + 1) ** 3:
            old_max_hp = self.max_hp
            self.level += 1
            self.update_max_hp()
            self.current_hp += (self.max_hp - old_max_hp)
            logs.append(f"¡{self.name} subió al nivel {self.level}!")
            
        return logs

    @field_validator("secondary_type")
    @classmethod
    def validate_types_different(cls, v, info):
        if v and "primary_type" in info.data and v == info.data["primary_type"]:
            raise ValueError("El tipo secundario no puede coincidir con el tipo primario.")
        return v


# ============================================================================
# 3. MAPA EXHAUSTIVO DE HOENN / ESMERALDA (EMERALD COMPLETION)
# ============================================================================

class ZoneCategory(str, Enum):
    TOWN = "TOWN"
    ROUTE = "ROUTE"
    CAVE_DUNGEON = "CAVE_DUNGEON"
    WATER_ROUTE = "WATER_ROUTE"
    SPECIAL_FACILITY = "SPECIAL_FACILITY"


class GymBadge(str, Enum):
    STONE = "MEDALLA_PIEDRA"       # Rustboro (Roxanne)
    KNUCKLE = "MEDALLA_PUÑO"       # Dewford (Brawly)
    DYNAMO = "MEDALLA_DINAMO"      # Mauville (Wattson)
    HEAT = "MEDALLA_CALOR"         # Lavaridge (Flannery)
    BALANCE = "MEDALLA_EQUILIBRIO" # Petalburg (Norman)
    FEATHER = "MEDALLA_PLUMA"      # Fortree (Winona)
    MIND = "MEDALLA_MENTE"         # Mossdeep (Tate & Liza)
    RAIN = "MEDALLA_LLUVIA"        # Sootopolis (Juan)


class NavigationHM(str, Enum):
    FOOT = "A_PIE"
    CUT = "CORTE"              # MO 01 (Medalla Piedra)
    FLY = "VUELO"              # MO 02 (Medalla Pluma)
    SURF = "SURF"              # MO 03 (Medalla Equilibrio)
    STRENGTH = "FUERZA"        # MO 04 (Medalla Calor)
    FLASH = "DESTELLO"          # MO 05 (Medalla Puño)
    ROCK_SMASH = "GOLPE_ROCA"  # MO 06 (Medalla Dinamo)
    WATERFALL = "CASCADA"      # MO 07 (Medalla Lluvia)
    DIVE = "BUCEO"             # MO 08 (Medalla Mente)


class NPCSpriteSet(BaseModel):
    overworld: str
    portrait: str


class NPCTrainer(BaseModel):
    id: str
    name: str
    title: str = "Entrenador"
    dialogue_intro: str
    dialogue_defeat: str
    sprites: NPCSpriteSet
    team: List[Creature] = Field(default_factory=list)
    defeated: bool = False


class WildEncounter(BaseModel):
    creature_id: int
    name: str
    min_level: int = 2
    max_level: int = 5
    encounter_rate: int = 100
    terrain_type: str = "TALL_GRASS"


class HiddenItem(BaseModel):
    id: str
    name: str
    collected: bool = False


class CompletionChecklist(BaseModel):
    total_hidden_items: int = 0
    collected_hidden_items: int = 0
    total_trainers: int = 0
    defeated_trainers: int = 0
    total_wild_species: int = 0
    registered_wild_species: int = 0

    @computed_field
    @property
    def completion_percentage(self) -> float:
        total = self.total_hidden_items + self.total_trainers + self.total_wild_species
        if total == 0:
            return 100.0
        done = self.collected_hidden_items + self.defeated_trainers + self.registered_wild_species
        return round((done / total) * 100.0, 1)


class ZoneArea(BaseModel):
    id: str
    name: str
    region: str = "HOENN"
    category: ZoneCategory
    required_badge: Optional[GymBadge] = None
    required_hm: Optional[NavigationHM] = NavigationHM.FOOT
    wild_encounters: List[WildEncounter] = Field(default_factory=list)
    trainers: List[NPCTrainer] = Field(default_factory=list)
    hidden_items: List[HiddenItem] = Field(default_factory=list)
    visited: bool = False

    def calculate_completion(self, registered_dex_ids: List[int]) -> CompletionChecklist:
        collected_items = sum(1 for item in self.hidden_items if item.collected)
        defeated_trainers = sum(1 for t in self.trainers if t.defeated)
        wild_ids = {w.creature_id for w in self.wild_encounters}
        registered_wild = len(wild_ids.intersection(set(registered_dex_ids)))

        return CompletionChecklist(
            total_hidden_items=len(self.hidden_items),
            collected_hidden_items=collected_items,
            total_trainers=len(self.trainers),
            defeated_trainers=defeated_trainers,
            total_wild_species=len(wild_ids),
            registered_wild_species=registered_wild
        )


# ============================================================================
# 4. JUGADOR, LOBBY Y MULTIJUGADOR WEBSOCKET
# ============================================================================

class PlayerInventory(BaseModel):
    coins: int = 3000
    items: Dict[str, int] = Field(default_factory=dict)

class PlayerSettings(BaseModel):
    text_speed: str = "FAST"  # SLOW, NORMAL, FAST
    sound_fx: bool = True
    battle_animations: bool = True


class PlayerProfile(BaseModel):
    name: str = "Brendan"
    sprite: str = "/assets/sprites/characters/player.png"
    current_zone: str = "littleroot_town"
    badges: List[GymBadge] = Field(default_factory=list)
    hms: List[NavigationHM] = Field(default_factory=lambda: [NavigationHM.FOOT])
    team: List[Creature] = Field(default_factory=list)
    registered_dex: List[int] = Field(default_factory=list)
    defeated_npcs: List[str] = Field(default_factory=list)
    inventory: PlayerInventory = Field(default_factory=PlayerInventory)
    settings: PlayerSettings = Field(default_factory=PlayerSettings)


class NewPlayerRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=30)
    starter_id: int = Field(..., ge=1, le=3)
    sprite: str = "/assets/sprites/characters/player.png"
    text_speed: str = "FAST"


class NewPlayerResponse(BaseModel):
    token: str
    player: PlayerProfile
    location: str

class StoreBuyRequest(BaseModel):
    item_name: str
    quantity: int = Field(1, ge=1)
    price: int = Field(..., ge=0)


class LobbyTrainerState(str, Enum):
    EXPLORING = "Explorando"
    SEATED = "Sentado"
    TRADING = "Intercambiando"
    LOOKING_FOR_DUEL = "Buscando Duelo"
    IN_BATTLE = "En Batalla"


class LobbyPlayer(BaseModel):
    id: str
    name: str
    current_zone: str = "grand_hotel_lobby"
    state: LobbyTrainerState = LobbyTrainerState.EXPLORING
    badge_count: int = 0
    x: int = 240
    y: int = 240
    dir: str = "down"
    map_id: str = "grand_hotel_lobby"
    avatar_style: str = "brendan"
    seat_id: Optional[str] = None
    chat_bubble: Optional[str] = None
    chat_bubble_until: float = 0.0


class ChatScope(str, Enum):
    GLOBAL = "GLOBAL"
    ROOM = "ROOM"
    PROXIMITY = "PROXIMITY"
    WHISPER = "WHISPER"


class ChatMessage(BaseModel):
    id: str
    sender_id: str
    sender_name: str
    text: str
    scope: ChatScope = ChatScope.ROOM
    target_id: Optional[str] = None
    map_id: Optional[str] = None
    x: Optional[int] = None
    y: Optional[int] = None
    timestamp: float = 0.0


class TradeOffer(BaseModel):
    pokemon_index: Optional[int] = None
    pokemon_summary: Optional[Dict[str, Any]] = None
    items: Dict[str, int] = Field(default_factory=dict)
    is_locked: bool = False
    is_confirmed: bool = False


class TradeSession(BaseModel):
    trade_id: str
    trainer_a_id: str
    trainer_a_name: str
    trainer_b_id: str
    trainer_b_name: str
    offer_a: TradeOffer = Field(default_factory=TradeOffer)
    offer_b: TradeOffer = Field(default_factory=TradeOffer)
    status: str = "NEGOTIATING"  # NEGOTIATING, LOCKED, COMPLETED, CANCELLED


class UserRegisterRequest(BaseModel):
    username: str = Field(..., min_length=3, max_length=20)
    password: str = Field(..., min_length=4, max_length=50)
    email: Optional[str] = None
    starter_id: int = 2
    avatar_style: str = "brendan"


class UserLoginRequest(BaseModel):
    username: str
    password: str


class UserSessionResponse(BaseModel):
    token: str
    username: str
    player: PlayerProfile


class DuelChallenge(BaseModel):
    challenge_id: str
    from_trainer_id: str
    from_trainer_name: str
    to_trainer_id: str
    status: str = "PENDING"  # PENDING, ACCEPTED, DECLINED


# ============================================================================
# 5. COMBATE DETERMINISTA
# ============================================================================

class BattleTurnAction(str, Enum):
    ATTACK = "ATTACK"
    SWITCH = "SWITCH"
    TRANSFORM = "TRANSFORM"
    FLEE = "FLEE"
    CATCH = "CATCH"


class BattleTurnRequest(BaseModel):
    battle_id: str
    turn_number: int = Field(..., ge=1)
    action: BattleTurnAction
    move_id: Optional[str] = None
    is_npc: bool = False


class NPCBattleRequest(BaseModel):
    zone_id: str
    npc_id: str
    transformation: Optional[MutationForm] = None


class BattleTurnResult(BaseModel):
    battle_id: str
    turn_number: int
    action_taken: str
    damage_dealt: int
    is_critical: bool
    type_multiplier: float
    effectiveness_banner: str
    player_hp: int
    player_max_hp: int
    opponent_hp: int
    opponent_max_hp: int
    combat_log: List[str]
    battle_status: str  # ONGOING, PLAYER_WON, OPPONENT_WON, ESCAPED
