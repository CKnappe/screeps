module.exports = {
    createMinerLoadout( room ) {
        var retval = [ MOVE ];
        var energyAvailable = room.energyCapacityAvailable - 50;
        var numWorks = Math.floor(energyAvailable / 100);
        // 3000 Energy regenerate every 300 ticks, so optimum is 10 energy per
        // tick, 1 work = 2 energy/tick, so 5 at optimum. Taking 6 to be safe
        // leaving a buffer of 50 ticks for travel etc.
        if( numWorks > 6 ) {
          numWorks = 6;
        }
        for( i = 0; i < numWorks; i++ ) {
            retval.push( WORK );
        }
        energyAvailable -= numWorks * 100;
        var numMoves = Math.floor(energyAvailable / 50);
        // One per Work, but we added one in the beginning so 3 instead of 4
        if( numMoves > 5 ) {
          numMoves = 5;
        }
        for( i = 0; i < numMoves; i++ ) {
          retval.push( MOVE );
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
