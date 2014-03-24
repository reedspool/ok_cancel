require.config({
	paths: {
		game: './game'
	},
    shim: {
	}
});

require([ 'game' ], function (game) {
	log = function (m) { console.log(m) };

	game.run({
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
						cancel: {
							text: 'You run for your life'
						}
					}
				}
			}
		}
	});
});
