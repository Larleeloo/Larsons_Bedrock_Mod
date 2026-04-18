# Larson's Bedrock Mod

A Minecraft Bedrock Edition add-on that introduces **22 custom, fully-textured glowing blocks** — Larson's Glow Block plus 21 "neon" variants of oak leaves, log, and planks in seven colors (red, green, blue, yellow, magenta, cyan, gray).

Built following the official Microsoft / Mojang creator documentation and sample packs:

- [Introduction to Resource Packs](https://learn.microsoft.com/en-us/minecraft/creator/documents/resourcepack?view=minecraft-bedrock-stable)
- [resource_pack_sample](https://github.com/microsoft/minecraft-samples/tree/main/resource_pack_sample)
- [behavior_pack_sample](https://github.com/microsoft/minecraft-samples/tree/main/behavior_pack_sample)
- [minecraft-samples](https://github.com/microsoft/minecraft-samples/tree/main)

## Contents

```
Larsons_Bedrock_Mod/
├── behavior_pack/
│   ├── manifest.json
│   ├── pack_icon.png
│   └── blocks/
│       ├── glow_block.json
│       ├── neon_oak_leaves_{red,green,blue,yellow,magenta,cyan,gray}.json
│       ├── neon_oak_log_{…}.json
│       └── neon_oak_planks_{…}.json
└── resource_pack/
    ├── manifest.json
    ├── pack_icon.png
    ├── blocks.json
    ├── textures/
    │   ├── terrain_texture.json
    │   └── blocks/
    │       ├── lars_glow_block.png
    │       ├── neon_oak_leaves_{red,green,blue,yellow,magenta,cyan,gray}.png  ← add your PNGs here
    │       ├── neon_oak_log_{…}.png
    │       └── neon_oak_planks_{…}.png
    └── texts/
        ├── languages.json
        └── en_US.lang
```

## Blocks

All 22 blocks emit full light (level 15) and have `face_dimming: false` so every face shows at full brightness.

| Identifier | Display name | Category | Render | Mining time |
| --- | --- | --- | --- | --- |
| `lars:glow_block` | Larson's Glow Block | Construction | opaque | 1.5 s |
| `lars:neon_oak_leaves_<color>` | Neon Oak Leaves (Color) | Nature | alpha_test | 0.2 s |
| `lars:neon_oak_log_<color>` | Neon Oak Log (Color) | Nature | opaque | 2.0 s |
| `lars:neon_oak_planks_<color>` | Neon Oak Planks (Color) | Construction | opaque | 2.0 s |
| `lars:stone_rune` | Stone Rune | Construction | opaque | 50 s (obsidian-tough) |
| `lars:cracked_stone_rune` | Cracked Stone Rune | Construction | opaque | 40 s |
| `lars:dark_stone_rune` | Dark Stone Rune | Construction | opaque | 50 s (obsidian-tough) |
| `lars:runic_stone_bricks` | Runic Stone Bricks | Construction | opaque | 50 s (obsidian-tough) |

Where `<color>` ∈ `{red, green, blue, yellow, magenta, cyan, gray}`. The four
rune blocks inherit obsidian-class mining/explosion resistance (the cracked
variant is slightly softer).

**Flammability** (matching vanilla oak values): leaves `catch 30 / destroy 60`, logs `catch 5 / destroy 5`, planks `catch 5 / destroy 20`.

**Directional log placement:** logs use the `minecraft:placement_position` trait with permutations that rotate the block based on the clicked face — place on a side for horizontal orientation, on top/bottom for vertical.

## Where to put your PNG textures

Drop each 16×16 PNG into `resource_pack/textures/blocks/` using these **exact filenames**:

**Leaves (7) + Planks (7) + Log sides (7) + Log tops (7) = 28 PNGs total**

```
neon_oak_leaves_red.png        neon_oak_log_red.png        neon_oak_log_red_top.png        neon_oak_planks_red.png
neon_oak_leaves_green.png      neon_oak_log_green.png      neon_oak_log_green_top.png      neon_oak_planks_green.png
neon_oak_leaves_blue.png       neon_oak_log_blue.png       neon_oak_log_blue_top.png       neon_oak_planks_blue.png
neon_oak_leaves_yellow.png     neon_oak_log_yellow.png     neon_oak_log_yellow_top.png     neon_oak_planks_yellow.png
neon_oak_leaves_magenta.png    neon_oak_log_magenta.png    neon_oak_log_magenta_top.png    neon_oak_planks_magenta.png
neon_oak_leaves_cyan.png       neon_oak_log_cyan.png       neon_oak_log_cyan_top.png       neon_oak_planks_cyan.png
neon_oak_leaves_gray.png       neon_oak_log_gray.png       neon_oak_log_gray_top.png       neon_oak_planks_gray.png
```

All filenames are lowercase. Log blocks use `_top` for the end-grain on the top and bottom faces; the four side faces use the base `neon_oak_log_<color>.png`.

## Unique UUIDs

All four UUIDs are newly generated for this add-on:

- Behavior Pack header: `64f33380-afbf-425b-ba04-0271539fb1ed`
- Behavior Pack module: `11e7b9be-09de-4317-93c3-d9511af171da`
- Resource Pack header: `e586356a-4918-485c-97a5-b2797b216ecb`
- Resource Pack module: `49b02d97-c865-407e-ad97-c3cdb48dbb3e`

The packs are cross-dependencies of each other via the `dependencies` array so Minecraft applies them together.

## Installation

1. Copy `behavior_pack/` and `resource_pack/` into (standalone launcher Bedrock):
   ```
   %appdata%\Minecraft Bedrock\…\com.mojang\behavior_packs\Larsons_Glow_Block_BP_v1_0_5\
   %appdata%\Minecraft Bedrock\…\com.mojang\resource_packs\Larsons_Glow_Block_RP_v1_0_5\
   ```
   (Use `development_behavior_packs` / `development_resource_packs` on UWP Store builds.)
2. Launch Minecraft Bedrock, create a Creative world, activate both packs.
3. In Creative, search **"Neon Oak"** or **"Glow"** to find the blocks under Nature / Construction.

Alternatively, zip the two pack folders together (both at the archive root, no wrapper folder), rename to `.mcaddon`, and double-click.

## Jigsaw Dungeon (`lars:test_dungeon`)

A basic jigsaw structure that spawns in overworld biomes. Built following the
official [jigsaw sample](https://github.com/microsoft/minecraft-samples/tree/main/jigsaws).

### Files

```
behavior_pack/
├── structures/
│   └── runic_tunnels/
│       ├── runic_tunnel_short_basic.mcstructure
│       ├── runic_tunnel_med_basic.mcstructure
│       ├── runic_tunnel_long_basic.mcstructure
│       ├── runic_4tunnel_short_basic.mcstructure
│       ├── runic_ttunnel_short_basic.mcstructure
│       ├── runic_stair_short_basic.mcstructure
│       └── runic_stair_med_basic.mcstructure
└── worldgen/
    ├── structures/
    │   └── test_dungeon.json             ← minecraft:jigsaw
    ├── structure_sets/
    │   └── test_dungeon.json             ← minecraft:structure_set (placement)
    └── template_pools/
        └── runic_tunnels.json            ← lars:runic_tunnels pool, all 7 tunnel variants
```

### Expected structure format

- All 7 connector structures sit in the `lars:runic_tunnels` pool with the
  weights defined in `template_pools/runic_tunnels.json` (short tunnels are
  most common, long/branch/stairs progressively rarer).
- Every jigsaw in every piece uses name `walkside`, target `walkside`, and
  target pool `lars:runic_tunnels` — so any end can connect to any other end.

### Placement

- **Biome filter:** only biomes tagged `lars_dungeon_zone`.
- **Y range:** 10 – 55 (absolute), uniform. With `heightmap_projection: none`
  the chosen Y is kept as-is, so the dungeon stays underground (below y=62).
- **Terrain adaptation:** `bury` — surrounding terrain fills around the
  structure so you don't get floating stone walls in open air.
- **Step:** `underground_structures`.
- **Spacing / separation:** 40 / 12 chunks (random spread grid).
- **Max depth:** 10 — the BFS chain can grow up to 10 hops from the root.

### Rare gate biome (`lars:dungeon_zone`)

Defined in `behavior_pack/biomes/dungeon_zone.json`. Replaces 4% of plains /
forest / taiga / savanna chunks (`amount: 0.04`, `noise_frequency_scale: 80`),
and carries the `lars_dungeon_zone` tag that the jigsaw filter looks for.

Tuning knobs:

- Rarer dungeons → lower `amount` (e.g. `0.02`) or raise structure `spacing`.
- Bigger patches → raise `noise_frequency_scale`.
- Different hosts → edit `replacements[0].targets`.

## Wraith Mob (`lars:wraith`)

A custom hostile mob that spawns in the `lars:dungeon_zone` biome and inside
the runic tunnel dungeons. Follows the entity structure from the
[add_entity_robot](https://github.com/microsoft/minecraft-samples/tree/main/add_entity_robot)
and [shapeshifter](https://github.com/microsoft/minecraft-samples/tree/main/shapeshifter)
samples.

### Stats

| Stat | Value |
| --- | --- |
| Health | 40 HP |
| Movement speed | 0.23 (same as zombie) |
| Attack damage | 10 |
| Target | Players (35 block detection) |
| Drops | 1–3 gold ingots |
| Type families | `wraith`, `monster`, `undead`, `mob` |

### Files

```
behavior_pack/
├── entities/wraith.json                 ← AI, HP, attack, movement
├── spawn_rules/wraith.json              ← dungeon_zone + underground
└── loot_tables/entities/wraith.json     ← 1-3 gold ingots
resource_pack/
├── entity/wraith.entity.json            ← client wiring
├── render_controllers/wraith.render_controllers.json
├── animation_controllers/wraith.animation_controllers.json
├── sounds.json                          ← ambient/hurt/death events
├── sounds/sound_definitions.json        ← sound ID → ogg path
├── sounds/wraith/{ambient,hurt,death}.ogg   ← ADD
├── models/entity/wraith.geo.json        ← ADD (BlockBench export)
├── animations/wraith.animation.json     ← ADD (BlockBench export)
├── textures/entity/wraith/wraith.png    ← ADD
├── textures/item_texture.json           ← shortname `spawn_egg_wraith`
└── textures/items/wraith_spawn_egg.png  ← ADD (custom spawn egg)
```

### Spawning

Two OR'd spawn conditions:

1. **Surface signpost** — `spawns_on_surface` in biomes tagged
   `lars_dungeon_zone`, brightness 0–14 (anything except direct
   daylight), weight 100, surface density 4, herd 1–2. Wraiths
   roaming in the open are the visible cue that you're standing on
   a rare dungeon_zone biome.
2. **Dungeon interior** — `spawns_underground` on top of any runic
   block (`lars:runic_stone_bricks`, `lars:stone_rune`,
   `lars:dark_stone_rune`, `lars:cracked_stone_rune`), brightness
   0–7, weight 120, underground density 6, herd 1–3. The block
   filter bypasses the biome check so wraiths spawn inside the
   runic tunnels regardless of whether that voxel still falls in
   the dungeon_zone biome bounds.

Population control: `monster` (shares the vanilla monster cap).

### Animation controller

`controller.animation.wraith.general` plays `idle` in its `default` state and
transitions to `attacking` (idle + attack blended) whenever `query.attack_time`
is non-zero — i.e. during the `minecraft:behavior.melee_attack` cooldown. The
idle animation must be set to `loop` in BlockBench; the attack animation
should be a single-shot (not looping).

### Required BlockBench output

See the placeholder README files dropped in each asset directory. In short:

1. **Geometry** — `File → Export → Bedrock Geometry` → save as
   `resource_pack/models/entity/wraith.geo.json`. Identifier must be
   `geometry.wraith`.
2. **Animations** — `Animate → File → Export Animations` → save as
   `resource_pack/animations/wraith.animation.json`. Animation IDs must be
   `animation.wraith.idle` (looping) and `animation.wraith.attack`
   (one-shot).
3. **Texture** — `resource_pack/textures/entity/wraith/wraith.png`.

### Required audio

Three `.ogg` files in `resource_pack/sounds/wraith/`:
`ambient.ogg`, `hurt.ogg`, `death.ogg`. They're wired to the entity's
built-in `ambient` / `hurt` / `death` sound events via `sounds.json` and
resolved to file paths by `sounds/sound_definitions.json`.

## Engine / Format Versions

- Pack manifest `format_version`: `2`
- Pack version: `1.0.5`
- Minimum engine version: `1.21.0` (Minecraft Bedrock 1.21+ / v26.13 launcher build)
- Block `format_version`: `1.21.40`
- `blocks.json` version: `[1, 1, 0]`
