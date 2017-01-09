/*
 * Collects resources currently laying on the ground
 */

var action = require( 'action' );

module.exports = {
    start: function(creep) {
        var droppedEnergy = creep.room.find(FIND_DROPPED_ENERGY, {
                filter: (resource) => {
                    return  resource.energy > 0;
                }
        }).sort( function( res1, res2 ) {
            return res1.energy < res2.energy;
        } );
        if( droppedEnergy.length ) {
            creep.memory.status = action.status.COLLECT;
            creep.memory.tmp = {};
            creep.memory.tmp.goal = droppedEnergy[0].id;
            return true;
        } else {
            return false;
        }
    },
    run: function(creep) {
        var res = Game.getObjectById( creep.memory.tmp.goal );
        if( !res ||
            creep.pickup(res) == OK ) {
            creep.memory.status = action.status.IDLE;
        } else {
            creep.moveTo( res );
        }
    }
};