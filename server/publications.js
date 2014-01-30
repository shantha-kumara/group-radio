Meteor.publish('songs', function(options) {
  return Songs.find({}, options);
});

Meteor.publish('singleSong', function(id) {
  return id && Songs.find(id);
});


Meteor.publish('comments', function(songId) {
  return Comments.find({songId: songId});
});

Meteor.publish('notifications', function() {
  return Notifications.find({userId: this.userId});
});