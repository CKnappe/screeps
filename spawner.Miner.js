module.exports = {
    createMinerLoadout( room ) {
        var retval = [ MOVE ];
        var energyAvailable = room.energyCapacityAvailable - 50;
        for( i = 0; i < Math.floor(energyAvailable / 100); i++ ) {
            retval.push( WORK );
        }
        return retval;
    },
    spawn: function( room ) {
        var minerLoadout = this.createMinerLoadout( room );
        var name = Game.spawns['Spawn1'].createCreep( minerLoadout, undefined, {role: 'miner' } );
        if( name != -6 &&
            name != -4) {
            console.log( "Spawning Miner: " + name )
        }
    }
};