define(['underscore'], function (_) {
	/*
	* Define an interface and return it.
	*/ 
	var contract = {
		run: run,
		registry: {}
	};

	return contract;

	function run(s,t,a,t,e) {
		var states = arguments;
		_.each(states, readInMap);

		enterState(states[0]);
	}

	// When the user does an action, 
	// e.g. OK, or Cancel, they enter a new
	// game state
	function enterState(state) {
		if ( ! state) {
			return alert('Buh bye now!');
		}

		if (typeof state == 'string') {
			// A string instead of  an object is
			// the name of a state that was captured during
			// "readIn"
			return enterState(contract.registry[state]);
		}

		// Otherwise, we're good to go to send a 
		// dialog to the user
		dialog(state, enterState);
	}

	function dialog(state, callback) {
		var method = confirm;

		if ( ! state.cancel) {
			// There's no cancel, so we
			// can use an alert instead of confirm
			method = trueAlert;
		}

		if (method(state.text)) {
			return callback(state.ok);
		}
		
		callback(state.cancel);
	}

	function trueAlert(msg) {
		alert(msg);
		return true;
	}

	// Read in the state map and store
	// important stuff
	function readInMap(gameMap) {
		if ( ! gameMap) {
			return gameMap;
		}

		if (gameMap.name) {
			contract.registry[gameMap.name] = gameMap;
		}

		readInMap(gameMap.ok);
		readInMap(gameMap.cancel);

		// for chaining
		return gameMap;
	}
})