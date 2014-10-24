define(['underscore'], function (_) {
	/*
	* Define an interface and return it.
	*/

	contract = {
		create: create,
	};

	function create(story_map) {
		var registry = {
			'END': end
		}

		_.each(story_map, register);

		function run() {
			enter(_.first(story_map));
		}

		// When the user does an action, 
		// e.g. OK, or Cancel, they enter a new
		// game state
		function enter(place) {
			if ( ! place) return end();

			// A string instead of an object
			// denotes a registered function
			// i.e. the name of a place
			// see register()
			if (typeof place == 'string') {
				registry[place](place);
				return;
			}

			// Otherwise, we're good to go to send a 
			// dialog to the user
			dialog(place.text, doorTo(place.OK), doorTo(place.CANCEL));
		}

		function doorTo(place) {
			return function () {
				enter(place);
			}
		}

		function end() { /* noop */ };

		function dialog(text, okCallback, cancelCallback) {
			var method = confirm,
				prefix = '-~- -~- -~- -~- -~- -~- -~- -~- -~-\n\n\n\n\n\n',
				suffix = '\n\n\n\n\n\n-~- -~- -~- -~- -~- -~- -~- -~- -~-',
				message = prefix + text + suffix;

			if ( ! cancelCallback) {
				// There's no cancel, so we
				// can use an alert instead of confirm
				alert(message);
				okCallback();
				return;
			}

			if (confirm(message)) {
				okCallback();
				return;
			}
			
			cancelCallback();
		}

		// Recursively register all states with names
		function register(place) {
			if ( ! place) return;

			if (place.NAME) {
				registry[place.NAME] = doorTo(place);
			}

			register(place.OK);
			register(place.CANCEL);
		}

		return {
			run: run,
			registry: registry
		}
	}

	return contract;
});