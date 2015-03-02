/**
 * Created by kemal on 02.03.15.
 */

angular.module('editor').directive('toggleProp', function() {
    return {
        restrict: 'A',
        scope: true,

        link: function ($scope, element, attrs) {
            var name = attrs.toggleProp;
            var value = attrs.value;

            element.on('click', function() {
                console.log(attrs.toggleType);
                if (attrs.toggleType !== 'radio' || !$scope.isProp(name, value)) {
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