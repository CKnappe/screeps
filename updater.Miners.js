var updaterHarvesters = require( 'updater.Harvesters' );

module.exports = {
    tick: function(room) {
        var minerOverflow = 0;
        
        room.memory.UsedSources = [];
        var miners = _.filter( Game.creeps, (creep) => creep.memory.role == 'miner' && creep.room == room )
        for( minerIndex in miners ) {
            var miner = miners[minerIndex];
            if( !miner.memory.SourceID )  {
                if( room.memory.FreeSources &&
                    room.memory.FreeSources.length > 0 ) {
                    var sourceID = room.memory.FreeSources.pop();
                    miner.memory.SourceID = sourceID;
                    console.log( "Assigned Miner " + miner.id + " to Source " + sourceID );
                } else {
                    console.log( "Free Miner: " + miner.id );
                    minerOverflow++;
                }
            } else if( room.memory.UsedSources.indexOf( miner.memory.SourceID ) < 0 ) {
                room.memory.UsedSources.push( miner.memory.SourceID );
            }
        }
        updaterHarvesters.registerMinerOverflow( minerOverflow );
    }
};