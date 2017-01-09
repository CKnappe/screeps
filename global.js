var spawner = require('spawner');

module.exports = {
    Tick: function() {
        for( room in Game.rooms ) {
            this.TickRoom( Game.rooms[room] );
        }
    },
    TickRoom: function(room) {
        spawner.spawn( room );
    }

};
