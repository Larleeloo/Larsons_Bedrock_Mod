# Larson's Bedrock Mod

A Minecraft Bedrock Edition add-on that introduces **Larson's Glow Block** — a custom, fully-textured block that emits maximum-level light.

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
│       └── glow_block.json
└── resource_pack/
    ├── manifest.json
    ├── pack_icon.png
    ├── blocks.json
    ├── textures/
    │   ├── terrain_texture.json
    │   └── blocks/
    │       └── lars_glow_block.png
    └── texts/
        ├── languages.json
        └── en_US.lang
```

## The Block

| Property | Value |
| --- | --- |
| Identifier | `lars:glow_block` |
| Display name | Larson's Glow Block |
| Light emission | 15 (max) |
| Light dampening | 0 |
| Creative category | Construction |
| Texture | Fully custom 16×16 PNG (`lars_glow_block.png`) |
| Mining time | 1.5 s |
| Explosion resistance | 3 |

The block uses the `minecraft:light_emission` component for glow, `minecraft:material_instances` to bind the custom texture with `face_dimming: false` so the block appears bright from every angle, and is registered in `blocks.json` / `terrain_texture.json` following the standard Bedrock texture pipeline.

## Unique UUIDs

All four UUIDs are newly generated for this add-on:

- Behavior Pack header: `64f33380-afbf-425b-ba04-0271539fb1ed`
- Behavior Pack module: `11e7b9be-09de-4317-93c3-d9511af171da`
- Resource Pack header: `e586356a-4918-485c-97a5-b2797b216ecb`
- Resource Pack module: `49b02d97-c865-407e-ad97-c3cdb48dbb3e`

The packs are cross-dependencies of each other via the `dependencies` array so Minecraft applies them together.

## Installation

1. Copy `behavior_pack/` into
   `%localappdata%\Packages\Microsoft.MinecraftUWP_8wekyb3d8bbwe\LocalState\games\com.mojang\development_behavior_packs\Larsons_Bedrock_Mod_BP\`
2. Copy `resource_pack/` into
   `...\development_resource_packs\Larsons_Bedrock_Mod_RP\`
3. Launch Minecraft Bedrock (1.21+), create/edit a world, and enable both packs.
4. In Creative, search for **Larson's Glow Block** under *Construction*.

Alternatively, zip each folder, rename the extensions to `.mcpack`, and open them with Minecraft to import.

## Engine / Format Versions

- Pack manifest `format_version`: `2`
- Minimum engine version: `1.21.0`
- Block `format_version`: `1.21.40`
- `blocks.json` version: `[1, 1, 0]`
