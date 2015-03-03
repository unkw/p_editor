/**
 * Сервис рабочей области редактора
 */
angular.module('editor').factory('WorkspaceService', function($http) {
    var service = {};

    /**
     * @type {Array}
     */
    service.canvases = [];

    /**
     * Loads data of canvas
     * @returns {$q.defer}
     */
    service.loadCanvases = function() {
        return $http.get('server/canvases.json')
            .success(function(response) {
                service.canvases = response.result;
            });
    };

    return service;
});