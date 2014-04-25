'use strict';

if (!window.services) {
	window.services = angular.module('todooo.services', []);
}

window.services.factory('noteService', ['$http', function($http) {

	var sdo = {

		getNotes: function() {
			var promise = $http.get('/note').success(function (data, status, headers, config) {
				data.forEach(function(el, j) {
					el.isChecked = el.isChecked == '1' ? true : false; 
				});
				return data;
			});
			return promise;
		},

		createNote: function(note) {
			var promise = $http.post('/note/new', note).success(function (data, status, headers, config) {
				return data;
			}).error(function(data, status, headers, config) {
				return status;
			});
			return promise;
		},

		updateNote: function(note) {
			var promise = $http.put('/note/update/'+note.id, {isChecked: note.isChecked}).success(function (data, status, headers, config) {
				return data;
			}).error(function(data, status, headers, config) {
				return status;
			});
			return promise;
		},

		deleteNote: function(note) {
			var promise = $http.delete('/note/delete/'+note.id).success(function (data, status, headers, config) {
				return data;
			}).error(function(data, status, headers, config) {
				return status;
			});
			return promise;
		}

	}

	return sdo;

}]);