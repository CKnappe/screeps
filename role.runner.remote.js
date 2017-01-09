var action = require('action');
var actionStore = require('action.store');
var actionCollect = require('action.collect');
var actionGoToRoom = require('action.gotoroom');

var roleRunner = {
    /** @param {Creep} creep **/
    run: function(creep) {
        if( !creep.memory.status ||
            creep.memory.status == action.status.IDLE ) {
            if( creep.carry.energy == 0 ) {
                if( !actionGoToRoom.start( creep ) ) {
                    actionCollect.start( creep );
                }
            } else {
                actionStore.start( creep );
            }
        }
        if( creep.memory.status == action.status.COLLECT ) {
            actionCollect.run( creep );
        }
        if( creep.memory.status == action.status.GOTOROOM ) {
            actionGoToRoom.run( creep );
        }
        if( creep.memory.status == action.status.STORE ) {
            actionStore.run( creep );
        }
    }
};

module.exports = roleRunner;