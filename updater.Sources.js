module.exports = {
    tick: function(room) {
        room.memory.FreeSources = [];
        var sources = room.find( FIND_SOURCES );
        for( sourceIndex in sources ) {
            var source = sources[sourceIndex];
            if( room.memory.UsedSources ) {
                if( room.memory.UsedSources.indexOf( source.id ) < 0 ) {
                    room.memory.FreeSources.push( source.id );
                }
            }
        }
    }
};