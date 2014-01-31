Songs.find().observe({
	changed: function(){
		var songs = Songs.find({}, {sort: {votes: -1}});
		//var song;
		
		var s = songs.fetch();
		var final = "";
		for (var i=0; i<s.length; i++) {
			//console.log( s[i].fileName );
			file = "/confluence/songs/"+s[i].fileName;
			console.log( file );
			final = final + file + "\n";
		}
		fs = Npm.require('fs');
		var playList = "/home/cinergix/playlist.txt";
		//fs.unlinkSync(playList);			
		fd = fs.openSync(playList,'w');
		fs.writeSync(fd,final);
		/*
		while ( songs.hasNext() ) {
		    song = songs.next();
		    console.log( song.fileName );
		}
		*/
	},
	
	added: function(){
		var songs = Songs.find({}, {sort: {votes: -1}});
		//var song;
		
		var s = songs.fetch();
		var final = "";
		for (var i=0; i<s.length; i++) {
			//console.log( s[i].fileName );
			file = "/confluence/songs/"+s[i].fileName;
			console.log( file );
			final = final + file + "\n";
		}
		fs = Npm.require('fs');
		var playList = "/home/cinergix/playlist.txt";
		//fs.unlinkSync(playList);			
		fd = fs.openSync(playList,'w');
		fs.writeSync(fd,final);
		/*
		while ( songs.hasNext() ) {
		    song = songs.next();
		    console.log( song.fileName );
		}
		*/
	}
});
