var action = require('action');
var actionMine = require('action.mine');
var actionGoToRoom = require('action.gotoroom');

module.exports = {
    /** @param {Creep} creep **/
    run: function(creep) {
        if( !creep.memory.status ||
            creep.memory.status == action.status.IDLE ) {
            if( !actionGoToRoom.start( creep ) ) {
                actionMine.start( creep );
            }
        }
        if( creep.memory.status == action.status.MINE ) {
            actionMine.run( creep );
        }
        if( creep.memory.status == action.status.GOTOROOM ) {
            actionGoToRoom.run( creep );
        }
    }
};