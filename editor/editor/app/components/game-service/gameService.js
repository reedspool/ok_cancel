var gameService = angular.module('myApp.gameService', [])

var GAME = {"places":[{"text":"Welcome to the little game!","NAME":"BEGIN","OK":"TWO"},{"text":"Get excited!","NAME":"TWO","OK":"THREE","CANCEL":"PLAY_AGAIN"},{"text":"You find yourself in a wood","NAME":"THREE","OK":"FOUR","CANCEL":"RUN"},{"text":"It is very dark...","NAME":"FOUR","OK":"FIVE","CANCEL":"RUN"},{"text":"There's a bear!!","NAME":"FIVE","OK":"SIX","CANCEL":"RUN"},{"text":"You reach for your gun...","NAME":"SIX","OK":"PLAY_AGAIN","CANCEL":"RUN"},{"text":"You RUN for your life!","NAME":"RUN","OK":"PLAY_AGAIN","CANCEL":"PLAY_AGAIN"},{"text":"Play again?","NAME":"PLAY_AGAIN","OK":"BEGIN","CANCEL":"END"}]}

gameService.factory('game', ['$window', function ($window) {

	var currentGame = {
		places: []
	}

	var registry = {
		'END': {
			NAME: 'END',
			text: 'The end.'
		}
	}

	var contract = {
		load: function (game) { 
			var story_map = game.places;

			story_map.forEach(contract.register);

			currentGame = game;
		},
		// Modifying the game
		setState: function (place) {
			if ( ! place ) contract.err('Expected place in place', place)
			registry[place.NAME] = place;
		},
		update: function (place) { 
			var original = contract.getState(place.NAME);

			if ( ! original ) contract.err('No game found', place)

			original.text = place.text;
			original.OK = place.OK;
			original.CANCEL = place.CANCEL;

			contract.setState(original);
		},
		err: function (msg, thing) { 
			throw new Error(msg + ' for ' + JSON.stringify(thing))
		},
		// End modifying the game
		current: function () {
			var places = [];
			for (var key in registry) {
				var place = registry[key];
				
				if (place.NAME) {
					places.push(place)
				}
			}

			currentGame.places = places;

			return {
				current: currentGame,
				json: angular.toJson(currentGame)
			}
		},
		getState: function (name) { 
			return registry[name];
		},
		register: function (place) {
			if ( ! place) return;

			contract.setState(place);
			contract.register(place.OK);
			contract.register(place.CANCEL);
		}
	}

	// TODO: This is not the right place for this,
	// How can I do this on app config?
	// Will need to move this when loading games from outside
	contract.load(GAME)

	return contract;
}])