Template.songSubmit.events({
  'submit form': function(e) {
    e.preventDefault();
    
    var song = {
      title: $(e.target).find('[name=title]').val(),
      artist: $(e.target).find('[name=artist]').val(),
      language: $(e.target).find('[name=language]').val(),
      year: $(e.target).find('[name=year]').val(),
      genre: $(e.target).find('[name=genre]').val(),
      description: $(e.target).find('[name=description]').val()
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
  }
});