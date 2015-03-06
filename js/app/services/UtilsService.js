/**
 * Global helper functions
 */
angular.module('editor').factory('Utils', function() {

    var utils = {};

    /**
     * @param {string} string
     * @returns {string}
     */
    utils.capitalize = function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    /**
     * Move caret position to end
     * @param {HTMLInputElement} el
     */
    utils.moveCaretToEnd = function(el) {
        el.setSelectionRange(el.value.length, el.value.length);
    };

    /**
     * Generate a random color
     * @returns {string}
     */
    utils.randomColor = function() {
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