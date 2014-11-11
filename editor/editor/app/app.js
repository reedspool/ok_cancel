'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
  'ui.router',
  'myApp.version',
  'myApp.d3.directive',
  'myApp.gameService',
  "xeditable"
]);

myApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/home');

    $stateProvider
    	.state('home', {
    		url: '/home',
    		templateUrl: 'home-view/home.html'
    	})
    		.state('home.browse', {
    			url:'/browse/{placeId}',
    			views: {
    				'': {
    					templateUrl: 'browse-view/browse.html'
    				},
    				'list@home.browse': {
    					templateUrl: 'browse-view/list.html',
    					controller: 'placesController'
    				},
    				'stage@home.browse': {
    					templateUrl: 'browse-view/stage.html',
    					controller: 'placesController'
    				},
    				'viz@home.browse': {
    					templateUrl: 'browse-view/viz.html',
    					controller: 'placesController'
    				},
                    'json@home.browse': {
                        templateUrl: 'browse-view/json.html',
                        controller: 'placesController'
                    }
    			}
    		});
}]);

myApp.controller('placesController', 
	['$scope', '$stateParams', '$anchorScroll', 'game', '$state', '$urlRouter',
		function ($scope, $stateParams, $anchorScroll, game, $state, $urlRouter) {

    $scope.game = game.current();

    $scope.select = function (place) {
        $state.go('home.browse', {
            placeId: place.NAME
        })
    }

    $scope.updatePlace = function (place) { 
        game.update(place)
        $urlRouter.sync()
    }

	// $scope.staged is the place whose name was given
	$scope.staged = {
        place: game.getState($stateParams.placeId || 'BEGIN')
    } 
}])
