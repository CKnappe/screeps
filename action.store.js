var action = require( 'action' );

function priority(type) {
    if( type == STRUCTURE_SPAWN ) {
        return 1;
    }else if( type == STRUCTURE_EXTENSION ) {
        return 2;
    }else if( type == STRUCTURE_STORAGE ) {
        return 3;
    }else if( type == STRUCTURE_CONTAINER ) {
        return 4;
    }
    console.log( "Unknown Type encountered: " + type );
    return type;
}

module.exports = {
    start: function(creep) {
        var source = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_EXTENSION ) && structure.energy < structure.energyCapacity;
                }
        });
        if( ! source ) {
            source = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_STORAGE ) && structure.energy < structure.energyCapacity;
                    }
            });
        }
        if( ! source ) {
            source = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER ) && structure.store[RESOURCE_ENERGY] < structure.storeCapacity;
                    }
            });
        }
        if( source ) {
            creep.memory.status = action.status.STORE;
            creep.memory.tmp = {};
            creep.memory.tmp.goal = source.id;
            return true;
        }
        return false;
    },
    run: function(creep) {
        var dropoff = Game.getObjectById( creep.memory.tmp.goal );
        if(creep.transfer(dropoff, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(dropoff);
        } else {
            creep.memory.status = action.status.IDLE;
        }
    }
};