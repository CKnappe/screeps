module.exports = {
    run: function(creep) {
        var sources = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_TOWER ) && structure.energy < structure.energyCapacity;
                }
        });
        if( sources.length ) {
            if(creep.transfer(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
            return true;
        } else {
            return false;
        }
    }
};