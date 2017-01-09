var spawnerBase = require( "spawner.Base" );

module.exports = {
    spawn: function( room ) {
        var builderLoadout = spawnerBase.balanceLoadout( [], { WORK: 1, MOVE: 1, CARRY:1 }, room.energyCapacityAvailable );
        var name = Game.spawns['Spawn1'].createCreep( builderLoadout, undefined, {role: 'builder' } );
        if( name != -6 &&
            name != -4) {
            console.log( "Spawning Builder: " + name )
        }
    }
};