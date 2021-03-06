import * as Config from "../../config/config";

import * as harvester from "./roles/harvester";

import { log } from "../../components/support/log";

export let creeps: Creep[];
export let creepCount: number = 0;

export let harvesters: Creep[] = [];

// Initialization scripts for CreepManager module.
export function run(room: Room): void {
  _loadCreeps(room);
  _buildMissingCreeps(room);

  _.each(creeps, (creep: Creep) => {
    if (creep.memory.role === "harvester") {
      harvester.run(creep);
    }
  });
}

// Loads and counts all available creeps.
function _loadCreeps(room: Room) {
  creeps = room.find<Creep>(FIND_MY_CREEPS);
  creepCount = _.size(creeps);

  // Iterate through each creep and push them into the role array.
  harvesters = _.filter(creeps, (creep) => creep.memory.role === "harvester");

  if (Config.ENABLE_DEBUG_MODE) {
    log.info(creepCount + " creeps found in the playground.");
  }
}

// Creates a new creep if we still have enough space.
function _buildMissingCreeps(room: Room) {
  let bodyParts: string[];

  let spawns: Spawn[] = room.find<Spawn>(FIND_MY_SPAWNS, {
    filter: (spawn: Spawn) => {
      return spawn.spawning === null;
    },
  });

  if (Config.ENABLE_DEBUG_MODE) {
    if (spawns[0]) {
      log.info("Spawn: " + spawns[0].name);
    }
  }

  if (harvesters.length < 2) {
    if (harvesters.length < 1 || room.energyCapacityAvailable <= 800) {
      bodyParts = [WORK, WORK, CARRY, MOVE];
    } else if (room.energyCapacityAvailable > 800) {
      bodyParts = [WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE];
    }

    _.each(spawns, (spawn: Spawn) => {
      _spawnCreep(spawn, bodyParts, "harvester");
    });
  }
}

// Spawns a new creep
function _spawnCreep(spawn: Spawn, bodyParts: string[], role: string) {
  let uuid: number = Memory.uuid;
  let status: number | string = spawn.canCreateCreep(bodyParts, undefined);

  let properties: { [key: string]: any } = {
    role,
    room: spawn.room.name,
  };

  status = _.isString(status) ? OK : status;
  if (status === OK) {
    Memory.uuid = uuid + 1;
    let creepName: string = spawn.room.name + " - " + role + uuid;

    log.info("Started creating new creep: " + creepName);
    if (Config.ENABLE_DEBUG_MODE) {
      log.info("Body: " + bodyParts);
    }

    status = spawn.createCreep(bodyParts, creepName, properties);

    return _.isString(status) ? OK : status;
  } else {
    if (Config.ENABLE_DEBUG_MODE) {
      log.info("Failed creating new creep: " + status);
    }

    return status;
  }
}