// check that the userId specified owns the documents
ownsSong = function(userId, song) {
  return song && song.userId === userId;
}

/* Song owner and the admin user can delete the song */
hasDeletePermission = function(userId, song) {
  return song && song.userId === userId;
}
