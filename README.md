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

## Neon Wood Crafting Recipes (`behavior_pack/recipes/`)

Every color of neon oak now behaves like regular oak at the crafting table —
logs convert to planks, planks become sticks, and the usual wooden tool / chest
/ crafting-table recipes all accept neon planks. One recipe per color × nine
item outputs = **63 shaped recipes**, following the
[Mojang vanilla recipe format](https://github.com/Mojang/bedrock-samples/tree/main/behavior_pack/recipes)
(`format_version 1.20.10`, tagged `crafting_table`).

| Recipe | Pattern | Inputs (per color) | Result |
| --- | --- | --- | --- |
| `lars:neon_oak_planks_<color>` | `#` | 1 × `lars:neon_oak_log_<color>` | 4 × `lars:neon_oak_planks_<color>` |
| `lars:neon_stick_<color>` | `A` / `A` | 2 × neon planks | 4 × `stick` |
| `lars:neon_crafting_table_<color>` | `AA` / `AA` | 4 × neon planks | 1 × `crafting_table` |
| `lars:neon_chest_<color>` | `AAA` / `A A` / `AAA` | 8 × neon planks | 1 × `chest` |
| `lars:neon_wooden_pickaxe_<color>` | `XXX` / ` # ` / ` # ` | 3 planks + 2 sticks | 1 × `wooden_pickaxe` |
| `lars:neon_wooden_axe_<color>` | `XX` / `X#` / ` #` | 3 planks + 2 sticks | 1 × `wooden_axe` |
| `lars:neon_wooden_shovel_<color>` | `X` / `#` / `#` | 1 plank + 2 sticks | 1 × `wooden_shovel` |
| `lars:neon_wooden_sword_<color>` | `X` / `X` / `#` | 2 planks + 1 stick | 1 × `wooden_sword` |
| `lars:neon_wooden_hoe_<color>` | `XX` / ` #` / ` #` | 2 planks + 2 sticks | 1 × `wooden_hoe` |

Because sticks craft 1-for-1 from planks (no tag merging), the stick recipe
carries `"priority": 1` — vanilla oak/birch/etc. recipes still win when a
player has real planks in their inventory. The planks recipe uses
`"group": "planks"` so all neon plank recipes share the recipe-book category.

## Neon Tree Varieties

In addition to the 7 original trees (one per color), three new shapes are
defined per color for a total of **28 tree features** plus **35 feature
rules**:

| Feature family | Identifier pattern | Trunk height | Canopy offset | Spawn zone | Rate |
| --- | --- | --- | --- | --- | --- |
| Normal | `lars:neon_tree_<color>` | 4 – 7 | −3 to 0 | `lars_neon` biomes | 1 iter, 1/4 chance (existing rule) |
| Dense | `lars:neon_tree_<color>` (reused) | same | same | `lars_neon_dense` biomes | 2 iter, 1/2 chance |
| **Tall** *(new)* | `lars:neon_tree_tall_<color>` | 8 – 12 | −2 to 0 | `lars_neon_dense` | 1 iter, 1/4 chance |
| **Giant** *(new)* | `lars:neon_tree_giant_<color>` | 13 – 18 | −4 to 0 | `lars_neon` (any) | 1 iter, 1/32 chance (rare) |
| **Bush** *(new)* | `lars:neon_tree_bush_<color>` | 2 – 3 | −1 to +1 | `lars_neon` (any) | 2 iter, 1/3 chance (common) |

Every variant grows on vanilla soils (`dirt`, `grass_block`, `podzol`,
`mycelium`, `moss_block`, `snow`, `snow_layer`) and emits the same neon colour
it's built from because it's made of the existing glowing log and leaf blocks.

Feature JSON lives in `behavior_pack/features/`, placement rules in
`behavior_pack/feature_rules/`. Both follow the
[tree_feature reference](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/featuresreference/examples/featuretypes/minecrafttreefeature)
and use `format_version 1.21.110`.

## Neon Saplings (`lars:neon_oak_sapling_<color>`)

Seven color-matched saplings — red, green, blue, yellow, magenta, cyan, gray —
close the wood-cycle loop.

| Property | Value |
| --- | --- |
| Identifier | `lars:neon_oak_sapling_<color>` |
| Category | Nature |
| Render | `alpha_test` (cross geometry `geometry.lars.sapling`) |
| Collision | none |
| Placement filter | dirt / grass / podzol / mycelium / moss / farmland (top face only) |
| Light emission | 9 (all neon blocks glow, saplings are dimmer than logs/leaves) |
| Mining time | instant |

**Drops:** mining a matching `lars:neon_oak_leaves_<color>` has a ~5% chance
to drop the same-color sapling and a ~2% chance to drop 1–2 sticks, wired
through `behavior_pack/loot_tables/blocks/neon_oak_leaves_<color>.json`.

**Growth:** the sapling grows into a neon tree through two paths:

1. **Bone meal** — using bone meal on the sapling immediately picks a style
   from the weighted pool below and places the matching feature.
2. **Natural** — `behavior_pack/scripts/main.js` runs a 20-second
   (`runInterval(…, 400)`) scan around each player, rolling a small chance
   for any nearby sapling to mature. No per-block random-ticking required.

The script-side style pool (see `TREE_STYLES` in `scripts/main.js`):

| Style | Weight | Shape |
| --- | --- | --- |
| `neon_tree_<color>` | 4 | Normal oak |
| `neon_tree_tall_<color>` | 2 | Birch-tall |
| `neon_tree_bush_<color>` | 2 | Short bush |
| `neon_tree_fancy_<color>` | 2 | Bushy branches (fancy trunk + canopy) |
| `neon_tree_pine_<color>` | 1 | Tall pine cone |
| `neon_tree_spruce_<color>` | 1 | Layered spruce |
| `neon_tree_acacia_<color>` | 1 | Savanna umbrella |
| `neon_tree_cherry_<color>` | 1 | Cherry-style wide crown |
| `neon_tree_roofed_<color>` | 1 | Dark-oak-style flat roof |
| `neon_tree_giant_<color>` | 1 | Massive trunk (13–18) |

If the chosen feature fails to place (terrain blockage, submerged, etc.) the
script falls back to the plain `neon_tree_<color>` so the player still sees a
tree appear.

## Furnace Smelting (Neon Logs → Charcoal) + Fuel

7 furnace recipes, one per color, in `behavior_pack/recipes/neon_smelt_log_<color>.json`.
Each accepts `lars:neon_oak_log_<color>` as input and outputs vanilla
`charcoal` — valid at `furnace`, `smoker`, and `blast_furnace` stations. This
lets the glowing logs feed the normal coal economy.

**Fuel.** Every neon wood block carries a `minecraft:fuel` component so the
blocks themselves also burn in furnaces just like vanilla wood:

> **Furnace fuel on neon wood is not currently wired up.** `minecraft:fuel` is
> an **item** component in Bedrock. Putting it on a custom block rejects the
> whole block JSON (v1.0.21 / v1.0.22). Declaring a parallel data-driven
> item at the block's identifier (v1.0.23) does not merge with the
> auto-generated block-item — it shadows it and strips the icon, display
> name, and block-placement behaviour. v1.0.24 reverts both and leaves
> charcoal-smelting as the furnace integration for neon logs.

## Extra Tree Canopy / Trunk Styles

Following the
[`minecraft:tree_feature` reference](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/featuresreference/examples/featuretypes/minecrafttreefeature),
every canopy and trunk family documented there now has a neon variant per
color. Each row produces one feature JSON per color (7 features, 7 feature
rules) in `behavior_pack/features/` and `behavior_pack/feature_rules/`:

| Identifier family | Trunk type | Canopy type | Size / shape | Spawn biome | Rate |
| --- | --- | --- | --- | --- | --- |
| `lars:neon_tree_fancy_<color>` | `fancy_trunk` (width 1) | `fancy_canopy` (r=4, h=4) + branch canopies | Bushy oak with branches | `lars_neon` | 1/6 |
| `lars:neon_tree_pine_<color>` | `trunk` (8–13) | `pine_canopy` (r=3) | Tall conical pine | `lars_neon_dense` | 1/5 |
| `lars:neon_tree_spruce_<color>` | `trunk` (7–10) | `spruce_canopy` (r=3, layered) | Layered spruce | `lars_neon_dense` | 1/5 |
| `lars:neon_tree_mega_<color>` | `mega_trunk` (2×2, ~12–20) | `mega_canopy` (r=5) | 2-wide trunk, huge crown | `lars_neon` | 1/48 |
| `lars:neon_tree_mega_pine_<color>` | `mega_trunk` (2×2, ~14–22) | `mega_pine_canopy` (r=4) | 2-wide mega pine | `lars_neon_dense` | 1/64 |
| `lars:neon_tree_acacia_<color>` | `acacia_trunk` + diagonal lean | `acacia_canopy` (size 3) | Savanna umbrella shape | `lars_neon` | 1/6 |
| `lars:neon_tree_cherry_<color>` | `cherry_trunk` w/ multi-branch weights | `cherry_canopy` | Cherry wide crown | `lars_neon` | 1/10 |
| `lars:neon_tree_roofed_<color>` | `trunk` (6–8) | `roofed_canopy` (inner 2 / outer 3) | Dark-oak flat roof | `lars_neon_dense` | 1/5 |
| `lars:neon_tree_mangrove_<color>` | `mangrove_trunk` + branch mangrove canopies | `mangrove_canopy` (leaf_placement_attempts 60) | Mangrove with aerial foliage | `lars_neon` | 1/16 |

Combined with the existing **normal / tall / giant / bush** variants and the
original dense rule, the biome tags now cover **13 distinct tree shapes per
color = 91 tree feature files** and **98 feature rules**.

## Scripting API

`behavior_pack/scripts/main.js` now registers as a `script` module in the
behavior pack manifest (depends on `@minecraft/server` 1.14.0). It handles:

- Custom `lars:neon_dimension` registration (pre-existing).
- Script events `lars:neon` / `lars:overworld` for the teleport shortcuts.
- `world.afterEvents.playerInteractWithBlock` — bone meal → sapling growth.
- `system.runInterval(…, 400)` — occasional natural sapling growth near
  players.

## Engine / Format Versions

- Pack manifest `format_version`: `2`
- Pack version: `1.0.24`
- Minimum engine version: `1.21.120` (Minecraft Bedrock v26.x launcher builds)
- Block `format_version`: `1.21.100`
- Recipe `format_version`: `1.20.10`
- Feature / feature_rule `format_version`: `1.21.110`
- Script API: `@minecraft/server` `1.14.0`

## v1.0.24 — Inventory + Tree Schema Fixes

- **Inventory fixed.** Deleted the entire `behavior_pack/items/` directory
  added in v1.0.23. Those files didn't merge with the block's auto-generated
  item; they shadowed it, producing `Missing icon for data-driven item
  'lars:neon_oak_sapling_<color>'` spam and leaving every neon block's
  inventory stack with no icon, no display name, and no placement behaviour.
  Without the override, the engine auto-generates the block-items (with
  textures and names) again. Fuel on neon wood is intentionally not
  attempted any more — see the note in the Furnace section above.
- **Tree schemas fixed.** The fancy / mangrove / acacia / cherry feature
  JSONs were using subfields (`branches.branch_canopy`,
  `branches.branch_length`, `branches.branch_position`,
  `trunk_height.intervals`, `trunk_height.min_height_for_canopy`,
  `acacia_trunk.branches.branch_position` with `range_min: 0`, and
  `mangrove_canopy.canopy_decoration.decoration_blocks_sequence` entries
  in array-of-array form) that the `minecraft:tree_feature` schema
  rejects, so none of those 28 features were registering ("No definition
  found for feature ..."). Rewrote each of them with a simple
  `trunk` + basic `canopy` shape (tuned per style) so they actually
  load; the identifiers are unchanged so `scripts/main.js` and the
  feature_rules still hit them.

## v1.0.23 — Fuel As An Item Override

Per the Microsoft Learn reference, `minecraft:fuel` is an **item** component,
not a block component. Adding it inside a block's `components` block (as
v1.0.21 and v1.0.22 did, at `format_version` 1.21.100 and 1.21.120
respectively) causes the whole block to fail to register, which cascades into
the "Item missing or invalid" recipe errors, "Unknown block during Deferred
BlockDescriptor resolution" errors, and `blocks.json` registry warnings for
every neon wood block.

Fix:

- Remove `minecraft:fuel` from all 28 neon wood block JSONs and restore
  them to `format_version: 1.21.100`.
- Add 28 files in `behavior_pack/items/` (one per log / planks / leaves /
  sapling × 7 colors). Each item definition uses the same identifier as the
  corresponding block and carries only `"minecraft:fuel": { "duration": N }`
  (15 s for logs/planks, 5 s for leaves/saplings), which the engine merges
  onto the block's auto-generated item form.

Blocks register again, all crafting recipes resolve, and the inventory
item for every neon wood block now burns in a furnace.

## v1.0.21 — Fixes and Fuel

- **Tree feature schemas fixed.** The `pine_canopy`, `spruce_canopy`,
  `mega_canopy`, `mega_pine_canopy`, and `roofed_canopy` families don't accept
  `canopy_offset` (it's only valid on the basic `canopy` type). Removed it from
  all 35 affected feature JSONs so those canopy styles actually register at
  world load — previously every pine/spruce/mega/roofed tree silently fell
  through to the plain neon_tree_<color> shape.
- `roofed_canopy.canopy_height` bumped from `2` → `3` (schema minimum).
- `mega_trunk.trunk_decoration` dropped to avoid the required
  `decoration_chance` child (which was missing in v1.0.20).
- **Startup guard.** `system.beforeEvents.startup` doesn't exist on older
  engine builds; the script now feature-checks before subscribing so sapling
  growth no longer crashes on engines that promoted past 1.14.0.
- **Fuel.** Added `minecraft:fuel` to all 28 neon wood blocks (logs/planks =
  15 s, leaves/saplings = 5 s) so neon wood burns in furnaces in addition to
  smelting into charcoal.
- `blocks.json` version: `[1, 1, 0]`
