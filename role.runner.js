var action = require('action');
var actionStore = require('action.store');
var actionCollect = require('action.collect');
var actionRetrieve = require('action.retrieve');

var roleRunner = {
    /** @param {Creep} creep **/
    run: function(creep) {
        if( !creep.memory.status ||
            creep.memory.status == action.status.IDLE ) {
            if( creep.carry.energy == 0 ) {
                if( !actionCollect.start( creep ) ) {
                    actionRetrieve.start( creep, true );
                }
            } else {
                actionStore.start( creep );
            }
        }
        if( creep.memory.status == action.status.COLLECT ) {
            actionCollect.run( creep );
        }
        if( creep.memory.status == action.status.RETRIEVE ) {
            actionRetrieve.run( creep );
        }
        if( creep.memory.status == action.status.STORE ) {
            actionStore.run( creep );
        }
    }
};

module.exports = roleRunner;