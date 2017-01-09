/**
 * Updates the remote rooms to enable the proper handling of their resources
 **/
module.exports = {
    run: function(room) {
      var counter = 1;
      while( true ) {
        var remoteName = "remote." + room.name + "." + counter;
        var remoteFlag = Game.flags[remoteName];
        if( remoteFlag ) {
          console.log(JSON.stringify( remoteFlag ));
        } else {
          break;
        }
        counter++;
      }
    }
};
