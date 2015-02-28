/**
 * Global helper functions
 */
angular.module('editor').factory('Utils', function() {

    var utils = {};

    /**
     * Correctly update the scope
     * @param {object} $scope
     */
    utils.updateScope = function($scope) {
        if (!$scope.$$phase) $scope.$apply();
    };

    return utils;
});