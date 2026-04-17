import { system, world } from "@minecraft/server";

const NEON_DIM_ID = "lars:neon_dimension";
const SPAWN = { x: 0, y: 65, z: 0 };

system.beforeEvents.startup.subscribe((event) => {
  event.dimensionRegistry.registerCustomDimension(NEON_DIM_ID);
});

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
