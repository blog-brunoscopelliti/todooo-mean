'use strict';

window.app.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {

	// $httpProvider.defaults.headers.common["Access-Control-Allow-Origin"] = "true";

	$routeProvider.when('/todooo', {
		templateUrl: 'templates/main.html', 
		controller: 'todoooController',
		resolve: {
			entries: ['noteService', function(_note) {
				return _note.getNotes();
			}]
		}
	});

	$routeProvider.when('/404', {
		templateUrl: 'templates/404.html', 
		controller: '404Controller'
	});	

	$routeProvider.otherwise({ redirectTo: '/404' });

}]);


// window.app.run(['$rootScope', '$http', function($root, $http) {}]);