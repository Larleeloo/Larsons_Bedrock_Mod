# Sounds: drop `.ogg` files here

Required files in this directory:
- `ambient.ogg` — passive idle sound (plays periodically)
- `hurt.ogg` — plays when the wraith takes damage
- `death.ogg` — plays when the wraith dies

These map to the IDs `mob.wraith.ambient` / `mob.wraith.hurt` / `mob.wraith.death`
defined in `resource_pack/sounds/sound_definitions.json`, which `sounds.json`
wires to the `lars:wraith` entity's `ambient` / `hurt` / `death` events.

Delete this placeholder once the three `.ogg` files are in place.
