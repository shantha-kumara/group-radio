Template.player.events({

	'click .player-controler':  function(e) {
		e.preventDefault();

		var img = $(e.target).find('.player-controler');

		if ( img ) {
			if ( img.sr && img.attr('src') == '../images/pause.png' ) {
				img.attr('src', '../images/play.png');
			} else {
				img.attr('src', '../images/pause.png');
			}
		}
	}
});