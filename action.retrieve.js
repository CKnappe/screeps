/*
 * Retrieves resources from resource piles
 */
 var action = require('action');

module.exports = {
    start: function(creep, override) {
        creep.memory.status = action.status.RETRIEVE;
        creep.memory.tmp = {};
        creep.memory.tmp.override = override;
        return true;
    },
    run: function(creep) {
        if( creep.memory.tmp ) {
            var overrideActive = creep.memory.tmp.override;
        }
        if( !creep.room.memory.RetrieveBlocked ||
            overrideActive ) {
            var sources = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    if( structure.structureType == STRUCTURE_CONTAINER ) {
                        return structure.store[RESOURCE_ENERGY] > 0;
                    }
                }
            });
            if( sources.length ) {
                if(creep.withdraw(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0]);
                } else {
                    creep.memory.status = action.status.IDLE;
                }
            }
        }
    }
};