/**
 * Global helper functions
 */
angular.module('editor').service('Utils', function() {
    /**
     * @param {string} string
     * @returns {string}
     */
    this.capitalize = function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    /**
     * Move caret position to end
     * @param {HTMLInputElement} el
     */
    this.moveCaretToEnd = function(el) {
        var elemValLength = el.value.length;
        el.setSelectionRange(elemValLength, elemValLength);
    };

    /**
     * Generate a random color
     * @returns {string}
     */
    this.randomColor = function() {
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
    this.updateScope = function($scope) {
        if (!$scope.$$phase) $scope.$apply();
    };
});