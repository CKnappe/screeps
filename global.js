var spawner = require('spawner');
var updaterRemote = require('updater.remote');

module.exports = {
    Tick: function() {
        for( room in Game.rooms ) {
            this.TickRoom( Game.rooms[room] );
        }
    },
    TickRoom: function(room) {
      updaterRemote.run( room );
        spawner.spawn( room );
    }

};
