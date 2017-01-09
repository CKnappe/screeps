var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRunner = require('role.runner');
var roleMiner = require('role.miner');
var roleRepairer = require('role.repairer');
var global = require('global');
var actionRepair = require('action.repair');


module.exports.loop = function () {
    Game.status = function() {
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            var output = name + ": " + creep.memory.role;
            if( creep.memory.pause ) {
                output += "[Paused]";
            }
            console.log( output );
        }
    }
    
    var tower = Game.getObjectById("586ff37b45f53c7b0a513f98");
    if(tower) {
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        } else {
            actionRepair.run(tower);
        }
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if( creep.memory.pause ) {
            if( !creep.memory.paused ) {
                creep.say("Pausing");
                creep.memory.paused = true;
            }
        } else {
            if( creep.memory.paused ) {
                creep.memory.paused = false;
            }
            if(creep.memory.role == 'harvester') {
                roleHarvester.run(creep);
            }
            if(creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
            }
            if(creep.memory.role == 'builder') {
                roleBuilder.run(creep);
            }
            if(creep.memory.role == 'runner') {
                roleRunner.run(creep);
            }
            if(creep.memory.role == 'runner.remote') {
                roleRunner.run(creep);
            }
            if(creep.memory.role == 'miner') {
                roleMiner.run(creep);
            }
            if(creep.memory.role == 'repairer') {
                roleRepairer.run(creep);
            }
        }
    }
    
    global.Tick();
}