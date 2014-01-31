Songs = new Meteor.Collection('songs');

Songs.allow({
  update: ownsSong,
  remove: hasDeletePermission
});

Songs.deny({
  update: function(userId, song, fieldNames) {
    /* may only edit the following field: */
    return (_.without(fieldNames, 'fileName').length > 0);
  }
});

Meteor.methods({
  postSong: function(songAttributes) {
    var user = Meteor.user(),
    postWithSameLink = Songs.findOne({title: songAttributes.title, artist: songAttributes.artist});
    
    /* ensure the user is logged in */
    if (!user)
      throw new Meteor.Error(401, "You need to login to post new song");
    
    /* ensure the post has a title */
    if (!songAttributes.title)
      throw new Meteor.Error(422, 'Please fill in the song title');
    
    /* ensure the post has a title */
    if (!songAttributes.artist)
      throw new Meteor.Error(422, 'Please fill in the song artist');
    
    /* ensure the post has a title */
    if (!songAttributes.language)
      throw new Meteor.Error(422, 'Please fill in the language of the song');
    
    /* ensure the post has a title */
    if (!songAttributes.year)
      throw new Meteor.Error(422, 'Please fill in the year of the song published');
    
    /* ensure the post has a title */
    if (!songAttributes.genre)
      throw new Meteor.Error(422, 'Please fill in genre of the song');
    
    /* ensure the post has a title */
    if (!songAttributes.description)
      throw new Meteor.Error(422, 'Please fill in the song description');
    
    /* check that there are no previous Songs with the same link */
    if (songAttributes.url && postWithSameLink) {
      throw new Meteor.Error(302, 
        'This song has already been posted', 
        postWithSameLink._id);
    }

    /* pick out the whitelisted keys */
    var song = _.extend(_.pick(songAttributes, 'artist', 'title', 'language', 'year', 'genre', 'description' ), {
      userId: user._id, 
      author: user.username, 
      submitted: new Date().getTime(),
      commentsCount: 0,
      upvoters: [], votes: 0
    });
    
    var songId = Songs.insert(song);
    
    return songId;
  },
  
  upvote: function(songId) {
    var user = Meteor.user();
    /* ensure the user is logged in */
    if (!user)
      throw new Meteor.Error(401, "You need to login to upvote");
    
    Songs.update({
      _id: songId, 
      upvoters: {$ne: user._id}
    }, {
      $addToSet: {upvoters: user._id},
      $inc: {votes: 1}
    });
  },
  
  downvote: function(songId) {
    var user = Meteor.user();
    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to upvote");
    
    Songs.update({
      _id: songId, 
      upvoters: user._id
    }, {
      $pull: {upvoters: user._id},
      $inc: {votes: -1}
    });
  }
});