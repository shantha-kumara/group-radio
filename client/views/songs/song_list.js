Template.songsList.helpers({
  songsWithRank: function() {
    this.songs.rewind();
    return this.songs.map(function(song, index, cursor) {
      song._rank = song.votes;
      return song;
    });
  },
  hasMoreSongs: function(){
    this.songs.rewind();
    return Router.current().limit() == this.songs.fetch().length;
  }
});
