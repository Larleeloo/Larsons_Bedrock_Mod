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

// @minecraft/server 2.x removed runCommandAsync; runCommand is sync and
// returns a CommandResult. Both shapes are handled so the script keeps
// working if the runtime is 1.x or 2.x.
function placefeature(dim, feature, x, y, z) {
  const cmd = `placefeature ${feature} ${x} ${y} ${z}`;
  try {
    if (typeof dim.runCommand === "function") {
      const r = dim.runCommand(cmd);
      return !r || r.successCount !== 0;
    }
    if (typeof dim.runCommandAsync === "function") {
      dim.runCommandAsync(cmd).catch(() => {});
      return true;
    }
  } catch (_) {}
  return false;
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
  if (placefeature(block.dimension, feature, x, y, z)) return true;
  // Fall back to the plain style if the exotic style fails (terrain
  // blockage, unregistered feature, etc.). Block is already cleared so
  // the player still gets visible feedback.
  return placefeature(block.dimension, `lars:neon_tree_${color}`, x, y, z);
}

function isCreative(player) {
  try {
    const gm = player.getGameMode?.();
    if (gm === undefined) return false;
    return String(gm).toLowerCase().includes("creative");
  } catch (_) { return false; }
}

function consumeBoneMeal(player) {
  if (isCreative(player)) return;
  try {
    const inv = player.getComponent("minecraft:inventory");
    if (!inv || !inv.container) return;
    const slot = player.selectedSlotIndex ?? 0;
    const item = inv.container.getItem(slot);
    if (!item || item.typeId !== "minecraft:bone_meal") return;
    if (item.amount > 1) {
      item.amount -= 1;
      inv.container.setItem(slot, item);
    } else {
      inv.container.setItem(slot, undefined);
    }
  } catch (_) {}
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

try {
  system.afterEvents.scriptEventReceive.subscribe((event) => {
    try {
      const player = event.sourceEntity;
      if (!player) return;
      if (event.id === "lars:neon") {
        const neonDim = world.getDimension(NEON_DIM_ID);
        player.teleport(SPAWN, { dimension: neonDim });
      } else if (event.id === "lars:overworld") {
        const overworld = world.getDimension("minecraft:overworld");
        player.teleport(SPAWN, { dimension: overworld });
      }
    } catch (_) {}
  });
} catch (_) {}

// Bone-meal a neon sapling -> instantly grow one of the neon tree features.
// Subscriber is intentionally NOT async: some @minecraft/server builds do not
// accept promise-returning event handlers and throw on subscribe.
try {
  if (world.afterEvents && world.afterEvents.playerInteractWithBlock) {
    world.afterEvents.playerInteractWithBlock.subscribe((event) => {
      try {
        // Event fires repeatedly while right-mouse is held; only act on the
        // initial press. isFirstEvent may be undefined on older API revs, so
        // only filter when explicitly false.
        if (event.isFirstEvent === false) return;
        const { block, itemStack, player } = event;
        if (!itemStack || itemStack.typeId !== "minecraft:bone_meal") return;
        if (!block || !block.typeId.startsWith(SAPLING_PREFIX)) return;
        if (growSapling(block) && player) consumeBoneMeal(player);
      } catch (_) {}
    });
  }
} catch (_) {}

// Slow natural growth: every 20s, scan a small window around each player and
// give any neon sapling a small chance to mature. Keeps things cheap without
// requiring block-level random_ticking plumbing.
try {
  system.runInterval(() => {
    try {
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
    } catch (_) {}
  }, 400);
} catch (_) {}
