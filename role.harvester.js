var action = require('action');
var actionStore = require('action.store');
var actionMine = require('action.mine');
var actionCollect = require('action.collect');

var roleHarvester = {
    /** @param {Creep} creep **/
    run: function(creep) {
        if( !creep.memory.status ||
            creep.memory.status == action.status.IDLE ) {
            if( creep.carry.energy < creep.carryCapacity ) {
                if( !actionCollect.start( creep ) ) {
                    actionMine.start( creep );
                }
            } else {
                actionStore.start( creep );
            }
        }
        if(creep.memory.status == action.status.MINE) {
            actionMine.run( creep );
        } else if(creep.memory.status == action.status.STORE) {
            actionStore.run( creep );
        } else if(creep.memory.status == action.status.COLLECT ) {
            actionCollect.run( creep );
        }
    }
};

module.exports = roleHarvester;