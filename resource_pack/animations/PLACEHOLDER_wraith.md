# BlockBench export: drop `wraith.animation.json` here

From BlockBench's Animate panel:
1. File → Export Animations (*.animation.json)
2. Save as: `wraith.animation.json` in this directory

Required animation identifiers (case-sensitive, must match `wraith.entity.json`):
- `animation.wraith.idle` — looping, plays while moving and standing still
- `animation.wraith.attack` — one-shot, triggered by the animation controller when `query.attack_time > 0.0`

In BlockBench, set the **idle** animation's loop mode to `loop` and leave **attack** as `once`.

Delete this placeholder once the animation file is in place.
