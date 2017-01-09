module.exports = {
    spawn: function() {
        var name = Game.spawns['Spawn1'].createCreep([WORK, CARRY, CARRY, MOVE, MOVE], undefined, {role: 'harvester' } );
        if( name != -6 &&
            name != -4) {
            console.log( "Spawning Harvester: " + name )
        }
    }
};