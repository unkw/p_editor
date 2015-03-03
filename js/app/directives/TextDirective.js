/**
 * Created by kemal on 02.03.15.
 */

angular.module('editor').directive('bindProp', function() {
    return {
        restrict: 'A',
        scope: true,

        link: function ($scope, element, attrs) {
            var name = attrs.bindProp;
            var value = attrs.value;

            element.on('click', function() {
                if (attrs.bindType !== 'radio' || !$scope.isProp(name, value)) {
                    $scope.toggleProp(name, value);
                }
            });

            $scope.$watch(function() {
                return $scope.isProp(name, value);
            }, function(val) {
                element.toggleClass('active', val);
            });
        }
    };
});

angular.module('editor').directive('bindValueTo', function() {
    return {
        restrict: 'A',

        link: function ($scope, element, attrs) {
            element.on('change keyup paste select', function() {
                $scope.setProp(attrs.bindValueTo, this.value);
            });
            //
            //$scope.$watch(function() {
            //    return $scope.getProp(attrs.bindValueTo);
            //}, function (newValue) {
            //    element.val(newValue);
            //});
        }
    };
});

angular.module('editor').directive('focusModel', function($timeout) {
    return {
        restrict: 'A',

        link: function ($scope, element, attrs) {
            $scope.$watch(attrs.focusModel, function(value) {
                if (value) {
                    $timeout(function() {
                        $scope.Utils.moveCaretToEnd(element[0]);
                    });
                }
            });
        }
    };
});