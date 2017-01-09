/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('action.repair');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    run: function(creep) {
        var targets = creep.room.find(FIND_STRUCTURES);
        var maxHealth = 10000;
        var repairTo = 100000;
        if(targets.length) {
            while( true ) {
                for( targetIndex in targets ) {
                    var target = targets[targetIndex];
                    var isContainer = target.structureType == STRUCTURE_CONTAINER;
                    if( target.hits < target.hitsMax &&
                        (target.hits < maxHealth ||
                        isContainer ) ) {
                        if(creep.repair(target) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target);
                        }
                        return true;
                    }
                }
                if( maxHealth >= repairTo ) {
                    return false;
                }
                maxHealth += 10000
            }
        }
        return false;
    }
};