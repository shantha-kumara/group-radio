/*
add an entry to playlist file to play as next song
*/
Meteor.methods({
	playnext: function() {
		var playList = "/home/cinergix/playlist.txt";
		fs = Npm.require('fs');
		fd = fs.openSync(playList,'W');
		fs.writeSync(fd,"test write");
	}
});
