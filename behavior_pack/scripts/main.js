import { system, world } from "@minecraft/server";

const NEON_DIM_ID = "lars:neon_dimension";
const SPAWN = { x: 0, y: 65, z: 0 };

const SAPLING_PREFIX = "lars:neon_oak_sapling_";
const COLORS = ["red", "green", "blue", "yellow", "magenta", "cyan", "gray"];

// Weighted pool of tree styles a sapling can grow into, so a single red
// sapling can produce any of the neon-red tree varieties.
const TREE_STYLES = [
  { id: "",        weight: 4 },
  { id: "tall_",   weight: 2 },
  { id: "bush_",   weight: 2 },
  { id: "fancy_",  weight: 2 },
  { id: "pine_",   weight: 1 },
  { id: "spruce_", weight: 1 },
  { id: "acacia_", weight: 1 },
  { id: "cherry_", weight: 1 },
  { id: "roofed_", weight: 1 },
  { id: "giant_",  weight: 1 }
];
const TREE_WEIGHT_TOTAL = TREE_STYLES.reduce((a, s) => a + s.weight, 0);

function pickTreeStyle() {
  let roll = Math.random() * TREE_WEIGHT_TOTAL;
  for (const style of TREE_STYLES) {
    roll -= style.weight;
    if (roll <= 0) return style.id;
  }
  return "";
}

function growSapling(block) {
  if (!block || !block.typeId.startsWith(SAPLING_PREFIX)) return false;
  const color = block.typeId.slice(SAPLING_PREFIX.length);
  if (!COLORS.includes(color)) return false;
  const style = pickTreeStyle();
  const feature = `lars:neon_tree_${style}${color}`;
  const { x, y, z } = block.location;
  // Clear sapling first so placefeature has air to build through.
  try { block.setType("minecraft:air"); } catch (_) {}
  try {
    block.dimension.runCommand(`placefeature ${feature} ${x} ${y} ${z}`);
  } catch (e) {
    // Fall back to the plain style if the exotic style fails for any reason
    // (e.g. terrain blockage). The block is already cleared so the player
    // still gets visible feedback.
    try {
      block.dimension.runCommand(`placefeature lars:neon_tree_${color} ${x} ${y} ${z}`);
    } catch (_) {}
  }
  return true;
}

// Guard the startup event: on older runtimes system.beforeEvents or .startup
// can be undefined, and the custom dimension is optional for tree growth.
try {
  if (system.beforeEvents && system.beforeEvents.startup) {
    system.beforeEvents.startup.subscribe((event) => {
      try {
        event.dimensionRegistry.registerCustomDimension(NEON_DIM_ID);
      } catch (_) {}
    });
  }
} catch (_) {}

system.afterEvents.scriptEventReceive.subscribe((event) => {
  const player = event.sourceEntity;
  if (!player) return;

  if (event.id === "lars:neon") {
    const neonDim = world.getDimension(NEON_DIM_ID);
    player.teleport(SPAWN, { dimension: neonDim });
  } else if (event.id === "lars:overworld") {
    const overworld = world.getDimension("minecraft:overworld");
    player.teleport(SPAWN, { dimension: overworld });
  }
});

// Bone-meal a neon sapling -> instantly grow one of the neon tree features.
world.afterEvents.playerInteractWithBlock.subscribe((event) => {
  const { block, itemStack } = event;
  if (!itemStack || itemStack.typeId !== "minecraft:bone_meal") return;
  if (!block || !block.typeId.startsWith(SAPLING_PREFIX)) return;
  growSapling(block);
});

// Slow natural growth: every 20s, scan a small window around each player and
// give any neon sapling a small chance to mature. Keeps things cheap without
// requiring block-level random_ticking plumbing.
system.runInterval(() => {
  for (const player of world.getAllPlayers()) {
    const dim = player.dimension;
    const px = Math.floor(player.location.x);
    const py = Math.floor(player.location.y);
    const pz = Math.floor(player.location.z);
    for (let attempt = 0; attempt < 6; attempt++) {
      const dx = Math.floor(Math.random() * 33) - 16;
      const dy = Math.floor(Math.random() * 11) - 5;
      const dz = Math.floor(Math.random() * 33) - 16;
      let block;
      try {
        block = dim.getBlock({ x: px + dx, y: py + dy, z: pz + dz });
      } catch (_) { continue; }
      if (!block) continue;
      if (!block.typeId.startsWith(SAPLING_PREFIX)) continue;
      // ~1 in 8 chance per tick-scan per eligible sapling.
      if (Math.random() < 0.125) growSapling(block);
    }
  }
}, 400);
