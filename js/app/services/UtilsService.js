/**
 * Global helper functions
 */
angular.module('editor').factory('Utils', function() {

    var utils = {};

    /**
     * Generate a random color
     * @returns {string}
     */
    utils.strRandomColor = function() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    /**
     * Correctly update the scope
     * @param {object} $scope
     */
    utils.updateScope = function($scope) {
        if (!$scope.$$phase) $scope.$apply();
    };

    return utils;
});