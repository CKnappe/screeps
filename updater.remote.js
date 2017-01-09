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
          if( !room.memory.RegisteredRemoteFlags[ remoteName ] ) {
            room.memory.RegisteredRemoteFlags[ remoteName ] = {};
          }
          var remoteFlagInfo = room.memory.RegisteredRemoteFlags[ remoteName ];
          console.log(JSON.stringify( remoteFlagInfo ));
          remoteFlagInfo.test = true;
        } else {
          break;
        }
        counter++;
      }
    }
};
