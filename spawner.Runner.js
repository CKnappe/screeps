var spawnerBase = require( "spawner.Base" );

module.exports = {
    spawn: function( room ) {
        var runnerLoadout = spawnerBase.balanceLoadout( [MOVE], { MOVE: 1, CARRY:1 }, room.energyCapacityAvailable );
        var name = Game.spawns['Spawn1'].createCreep( runnerLoadout, undefined, {role: 'runner' } );
        if( name != -6 &&
            name != -4) {
            console.log( "Spawning Runner: " + name )
        }
    }
};