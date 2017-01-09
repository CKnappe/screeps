module.exports = {
    minerOverflow: 0,
    registerMinerOverflow: function( overflow ) {
        this.minerOverflow = overflow;
    },
    tick: function(room) {
        var harvesters = _.filter( Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.room == room )
        for( harvesterIndex in harvesters ) {
            var harvester = harvesters[harvesterIndex];
            if( !harvester.memory.SourceID )  {
                if( room.memory.FreeSources &&
                    room.memory.FreeSources.length > 0 ) {
                    var sourceID = room.memory.FreeSources.pop();
                    harvester.memory.SourceID = sourceID;
                    console.log( "Assigned Harvester " + harvester.id + " to Source " + sourceID );
                } else {
                    console.log( "Free Harvester: " + harvester.id );
                }
            } else if( room.memory.UsedSources.indexOf( harvester.memory.SourceID ) < 0 ) {
                if( this.minerOverflow > 0 ) {
                    this.minerOverflow--;
                } else {
                    room.memory.UsedSources.push( harvester.memory.SourceID );
                }
            } else {
                console.log( "Suiciding Harvester because it is no longer necessary" );
                harvester.suicide();
            }
            if( room.memory.UsedHarvesters ) {
                if( room.memory.UsedHarvesters.indexOf( harvester.id ) < 0 ) {
                    room.memory.FreeHarvesters.push( harvester.id );
                }
            }
        }
    }
};