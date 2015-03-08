/**
 * Сервис рабочей области редактора
 */
angular.module('editor').factory('WorkspaceService', function($http, config) {
    var service = {};

    /**
     * @type {Array}
     */
    service.canvases = [];

    /**
     * @returns {Array}
     */
    service.getFontSizes = function() {
        var sizes = [];
        var fontSize = config.font.size;

        for (var i = fontSize[0]; i <= fontSize[1]; i++) {
            sizes.push(i);
        }

        return sizes;
    };

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