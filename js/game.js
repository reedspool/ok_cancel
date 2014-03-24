define([], function () {
	/*
	* Define an interface and return it.
	*/ 
	var contract = {
		run: run
	};

	return contract;

	function run(gameMap) {
		enterState(gameMap);
	}

	// When the user does an action, 
	// e.g. OK, or Cancel, they enter a new
	// game state
	function enterState(state) {
		if ( ! state) {
			return alert('Buh bye now!');
		}

		var text = state.text;
		var okState = state.ok;
		var cancelState = state.cancel;

		confirm(text) ? 
			enterState(okState) :
			enterState(cancelState) ;
	}
})