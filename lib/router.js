Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() {
    return [Meteor.subscribe('notifications')]
  }
});

SongsListCongroller = RouteController.extend({
  template: 'songsList',
  increment: 5,
  limit: function() {
    return parseInt(this.params.songsLimit) || this.increment;
  },
  findOptions: function() {
    return {sort: this.sort, limit: this.limit()};
  },
  waitOn: function() {
    return Meteor.subscribe('songs', this.findOptions());
  },
  data: function() {
    return {
      songs: Songs.find({}, this.findOptions()),
      nextPath: this.nextPath()
    };
  }
});

NewSongsListController = SongsListCongroller.extend({
  sort: {submitted: -1, _id: -1},
  nextPath: function() {
    return Router.routes.newSongs.path({songsLimit: this.limit() + this.increment})
  }
});

BestSongsListCongroller = SongsListCongroller.extend({
  sort: {votes: -1, submitted: -1, _id: -1},
  nextPath: function() {
    return Router.routes.bestSongs.path({songsLimit: this.limit() + this.increment})
  }
});

Router.map(function() {
  this.route('home', {
    path: '/',
    controller: NewSongsListController
  });
  
  this.route('newSongs', {
    path: '/playing/:songsLimit?',
    controller: NewSongsListController
  });
  
  this.route('bestSongs', {
    path: '/best/:songsLimit?',
    controller: BestSongsListCongroller
  });
  
  this.route('songPage', {
    path: '/songs/:_id',
    waitOn: function() {
      return [
      Meteor.subscribe('singleSong', this.params._id),
      Meteor.subscribe('comments', this.params._id)
      ];
    },
    data: function() { return Songs.findOne(this.params._id); }
  });

  this.route('songEdit', {
    path: '/songs/:_id/edit',
    waitOn: function() {
      return Meteor.subscribe('singleSong', this.params._id);
    },
    data: function() { return Songs.findOne(this.params._id); }
  });
  
  this.route('songSubmit', {
    path: '/submit',
    disableProgress: true
  });
});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn())
      this.render(this.loadingTemplate);
    else
      this.render('accessDenied');
    
    this.stop();
  }
}

Router.before(requireLogin, {only: 'songSubmit'})
Router.before(function() { clearErrors() });
