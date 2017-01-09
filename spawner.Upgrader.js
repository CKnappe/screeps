var spawnerBase = require( "spawner.Base" );

module.exports = {
    spawn: function(room) {
        var upgraderLoadout = spawnerBase.balanceLoadout([], { WORK: 1, MOVE: 1, CARRY:1 }, room.energyCapacityAvailable );
        var name = Game.spawns['Spawn1'].createCreep(upgraderLoadout, undefined, {role: 'upgrader' } );
        if( name != -6 &&
            name != -4) {
            console.log( "Spawning Upgrader: " + name )
        }
    }
};