Template.songSubmit.events({

  'submit form': function(e) {
    e.preventDefault();

    var song = {
      title: $(e.target).find('[name=title]').val(),
      artist: $(e.target).find('[name=artist]').val(),
      language: $(e.target).find('[name=language]').val(),
      year: $(e.target).find('[name=year]').val(),
      genre: $(e.target).find('[name=genre]').val(),
      description: $(e.target).find('[name=description]').val(),
      fileName: Session.get('fname')
    }

    Meteor.call('postSong', song, function(error, id) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
        
        if (error.error === 302)
          Router.go('songPage', {_id: error.details})
      } else {
        Router.go('songPage', {_id: id});
      }
    });
  },
  
  'change input': function(ev, tmpl) {  
	_.each(ev.srcElement.files, function(file) {
	if (file.type == 'audio/ogg'){
		var filename = CryptoJS.MD5(file.name).toString()+".ogg";
		Meteor.saveFile(file, filename);
		Session.set('fname', filename);
	} else {
		throwError("Invalid file format.");
	}
    });
  }

});
