/**
 * Mines a certain Source
 **/
 
 var action = require('action');

module.exports = {
    getAllSources: function( room ) {
        var sources = room.find( FIND_SOURCES );
        //sources.push( Game.flags["Outer Mining 1"] );
        //console.log( sources[2].color );
        //sources.push( Game.getObjectById("5836b7c78b8b9619519f0f5a") );
        return sources;
    },
    start: function(creep) {
        var room = creep.room;
        if( !room.memory.RegisteredSources ) {
            room.memory.RegisteredSources = {};
        }
        var registeredSources = room.memory.RegisteredSources;
        var sources = this.getAllSources( room );
        var result = undefined;
        for( var sourceIndex in sources ) {
            var source = sources[sourceIndex];
            var registeredMiner = registeredSources[source.id];
            var miner = Game.getObjectById( registeredMiner );
            var isFree = registeredMiner == undefined ||
                         miner == undefined;
            if( miner ) {
                if( !miner.memory ) {
                    var isInvalid = true;
                } else {
                    isFree = isFree ||
                             miner.memory.tmp.SourceID != source.id;
                }
            }
            var ownsAlready = registeredMiner == creep.id;
            
            if( isFree ||
                ownsAlready ||
                isInvalid ) {
                if( result ) {
                    registeredSources[source.id] = undefined;
                } else {
                    result = source.id;
                }
            }
        }
        if(result) {
            creep.memory.status = action.status.MINE;
            registeredSources[result] = creep.id;
            creep.memory.tmp = {};
            creep.memory.tmp.SourceID = result;
        } else {
            console.log( "Unable to find free Source" );
        }
    },
    run: function(creep) {
        var source = Game.getObjectById( creep.memory.tmp.SourceID );
        if( source ) {
            if(creep.harvest(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo( source );
            }
        } else {
            console.log("Harvester is Missing his source: " + creep.memory.tmp.SourceID );
            creep.memory.status = action.status.IDLE;
        }
    }
};