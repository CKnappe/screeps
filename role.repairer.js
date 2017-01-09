var actionRetrieve = require('action.retrieve');
var actionReload = require('action.reload');
var actionRepair = require('action.repair');
var roleUpgrader = require('role.upgrader');

module.exports = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
            creep.say('retrieving');
        }
        if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
            creep.memory.repairing = true;
            creep.say('repairing');
        }

        if(creep.memory.repairing) {
            if( !actionReload.run( creep ) ) {
                if( !actionRepair.run(creep) ) {
                    roleUpgrader.run(creep)
                }
            }
        }
        else {
            actionRetrieve.run( creep );
        }
    }
};