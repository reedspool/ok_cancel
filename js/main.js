require.config({
	paths: {
		game: './game',
		theWoods: './theWoods'
	},
    shim: {
	    underscore: {
			exports: '_'
	    }
	}
});

require(['game','theWoods'], function (game, theWoods) {
	game.create(theWoods).run();

	function log(m) { console.log(m) };
});
