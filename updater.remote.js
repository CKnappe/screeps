/**
 * Updates the remote rooms to enable the proper handling of their resources
 **/
module.exports = {
    run: function(room) {
      if( !room.memory.RegisteredRemoteFlags ) {
        room.memory.RegisteredRemoteFlags = {};
      }
      var counter = 1;
      while( true ) {
        var remoteName = "remote." + room.name + "." + counter;
        var remoteFlag = Game.flags[remoteName];
        if( remoteFlag ) {
          remoteFlagInfo = room.memory.RegisteredRemoteFlags[ remoteName ];
          if( !remoteFlagInfo ) {
            remoteFlagInfo = {};
          } else {
            console.log(JSON.stringify( remoteFlagInfo ));
          }
        } else {
          break;
        }
        counter++;
      }
    }
};
