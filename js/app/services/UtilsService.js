/**
 * Global helper functions
 */
angular.module('editor').factory('Utils', function() {

    var utils = {};

    utils.updateScope = function($scope) {
        if (!$scope.$$phase) $scope.$apply();
    };

    return utils;
});