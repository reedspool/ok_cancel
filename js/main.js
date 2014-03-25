require.config({
	paths: {
		game: './game'
	},
    shim: {
	    underscore: {
			exports: '_'
	    }
	}
});

require([ 'game' ], function (game) {
	log = function (m) { console.log(m) };

	game.run({
		name: 'begin',
		text: 'Welcome to the little game!',
		ok: {
			text: 'Get excited!',
			ok: {
				text: 'You find yourself in a wood',
				ok: {
					text: 'It is very dark...',
					ok: {
						text: 'There\'s a bear!!',
						ok: {
							text: 'You reach for your gun...'
						},
						cancel: 'run'
					},
					cancel: 'run'
				}
			}
		},
		cancel: 'gameover'
	}, {
		name: 'run',
		text: 'You run for your life',
		ok: {
			text: 'Play again?',
			ok: 'begin',
			cancel: 'gameover'
		}
	}, {
		name: 'gameover',
		text: 'tootaloo!'
	}); 
});
