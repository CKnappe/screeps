var registerSources = require('register.Sources');
var updaterMiners = require('updater.Miners');
var updaterHarvesters = require('updater.Harvesters');
var updaterSources = require('updater.Sources');
var updaterRunners = require('updater.Runners');
var spawner = require('spawner');

module.exports = {
    Tick: function() {
        for( room in Game.rooms ) {
            this.TickRoom( Game.rooms[room] );
        }
    },
    TickRoom: function(room) {
        //updaterSources.tick( room );
        //updaterMiners.tick( room );
        //updaterHarvesters.tick( room );
        spawner.spawn( room );
    }

};