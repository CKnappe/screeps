spawnerHarvester = require( 'spawner.harvester' );
spawnerMiner = require( 'spawner.Miner' );
spawnerRunner = require( 'spawner.Runner' );
spawnerBuilder = require( 'spawner.Builder' );
spawnerRepairer = require( 'spawner.Repairer' );
spawnerUpgrader = require( 'spawner.Upgrader' );
var actionMine = require( 'action.mine' );

module.exports = {
    blockRetrieve: function(room) {
        room.memory.RetrieveBlocked = true;
    },
    unblockRetrieve: function(room) {
        room.memory.RetrieveBlocked = false;
    },
    decide: function(room) {
        var harvesters = _.filter( Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.room == room )
        var miners = _.filter( Game.creeps, (creep) => creep.memory.role == 'miner' && creep.room == room )
        var upgraders = _.filter( Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.room == room )
        var builders = _.filter( Game.creeps, (creep) => creep.memory.role == 'builder' && creep.room == room )
        var runners = _.filter( Game.creeps, (creep) => creep.memory.role == 'runner' && creep.room == room )
        var repairers = _.filter( Game.creeps, (creep) => creep.memory.role == 'repairer' && creep.room == room )
        var sources = actionMine.getAllSources( room );
        /**
         * First we begin with the minimum Energy Production
         **/
        this.blockRetrieve( room );
        // No miners or runner, so create simple harvesters first
        if( (miners.length + runners.length + harvesters.length) == 0 ) {
            // First create a harvester, so we can get enough energy for the rest
            room.memory.MaxOptional = 1;
            return spawnerHarvester.spawn( room );
        }
        // We either already have miners + runners > 0 or we have a harvester
        // First we build ourself our miners, making sure to keep the two numbers as close as possible
        if( miners.length < sources.length &&
            miners.length <= runners.length ) {
            room.memory.MaxOptional = 1;
            return spawnerMiner.spawn( room );
        }
        // Now we build aditional runners
        if( runners.length < sources.length ) {
            room.memory.MaxOptional = 1;
            return spawnerRunner.spawn( room );
        }
        this.unblockRetrieve( room );
        /**
         * Now we start with optional Stuff
         **/
        if( builders.length < room.memory.MaxOptional ) {
            return spawnerBuilder.spawn( room );
        }
        if( upgraders.length < room.memory.MaxOptional ) {
            return spawnerUpgrader.spawn( room );
        }
        if( repairers.length < room.memory.MaxOptional ) {
            return spawnerRepairer.spawn( room );
        }
        if( room.energyAvailable == room.energyCapacityAvailable ) {
            //room.memory.MaxOptional++;
            //console.log( "Increasing Maximum Optional Creeps to " + room.memory.MaxOptional)
        }
    },
    spawn: function(room) {
        var oldBlocked = room.memory.RetrieveBlocked;
        this.decide( room );
        if( oldBlocked != room.memory.RetrieveBlocked ) {
            if( room.memory.RetrieveBlocked ) {
                console.log( "Retrieve Blocked" );
            } else {
                console.log( "Retrieve Unblocked" );
            }
        }
    }
};