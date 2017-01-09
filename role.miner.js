var action = require('action');
var actionMine = require('action.mine');

module.exports = {
    /** @param {Creep} creep **/
    run: function(creep) {
        if( !creep.memory.status ||
            creep.memory.status == action.status.IDLE ) {
            actionMine.start( creep );
        } else {
            actionMine.run( creep );
        }
    }
};