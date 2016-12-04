import * as Config from "./config/config";
import * as CreepManager from "./components/creeps/creepManager";

import { log } from "./components/support/log";

/* Any code written outside the `loop()` method is executed only when the  Screeps system reloads your script.
Use this bootstrap wisely. You can cache some of your stuff to save CPU.
You should extend prototypes before the game loop executes here. */
log.info('load');

// This is an example for using a config variable from `config.ts`.
if (Config.USE_PATHFINDER) {
  PathFinder.use(true);
}

export function loop() {
  // Check memory for null or out of bounds custom objects
  if (!Memory.uuid || Memory.uuid > 100)
    Memory.uuid = 0;

  // Clears any non-existing creep memory.
  for (let name in Memory.creeps) {
    if (!Game.creeps[name]) {
      log.info("Clearing non-existing creep memory:", name);
      delete Memory.creeps[name];
    }
  }

  // Run each room through the creepManager
  for (let i in Game.rooms)
    CreepManager.run(Game.rooms[i]);
}