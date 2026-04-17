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

Where `<color>` ∈ `{red, green, blue, yellow, magenta, cyan, gray}`.

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
│   └── lars/
│       └── test_structure.mcstructure    ← drop your file here
└── worldgen/
    ├── structures/
    │   └── test_dungeon.json             ← minecraft:jigsaw
    ├── structure_sets/
    │   └── test_dungeon.json             ← minecraft:structure_set (placement)
    └── template_pools/
        └── test.json                     ← lars:test pool referencing the mcstructure
```

### Expected structure format

- Single structure `test_structure.mcstructure` with 6 jigsaw blocks.
- All jigsaws use pool `lars:test` (so pieces chain to copies of themselves).
- Side jigsaws named `walkside` (target `walkside`).
- Top jigsaw `walkup` → target `walkdown`.
- Bottom jigsaw `walkdown` → target `walkup`.

The jigsaw structure's `start_pool` is `lars:test` — the same pool the jigsaw
blocks point to — so the root piece and every expanded piece come from the
same pool. `max_depth: 7` caps how far the chain can extend.

### Placement

- **Biome filter:** any biome tagged `overworld`.
- **Spacing / separation:** 24 / 8 chunks (random spread grid).
- **Step:** `surface_structures`.
- **Start height:** 64 above the bottom of the world.

To make it rarer, increase `spacing` in `worldgen/structure_sets/test_dungeon.json`.
To restrict it to specific biomes, change the `biome_filters` tag (e.g.
`lars_neon` for the mod's neon biomes).

## Engine / Format Versions

- Pack manifest `format_version`: `2`
- Pack version: `1.0.5`
- Minimum engine version: `1.21.0` (Minecraft Bedrock 1.21+ / v26.13 launcher build)
- Block `format_version`: `1.20.60`
- `blocks.json` version: `[1, 1, 0]`
