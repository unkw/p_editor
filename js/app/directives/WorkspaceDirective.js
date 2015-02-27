/**
 * Рабочая область
 */
angular.module('editor').directive('workspace', function($rootScope) {

    return {
        restrict: 'A',
        link: function($scope, element, attrs) {
            $rootScope.workspaceWidth = element[0].offsetWidth;
            $rootScope.workspaceHeight = Math.round($rootScope.workspaceWidth / 1.74);
        }
    };

});

angular.module('editor').directive('canvasFabric', function(WorkspaceService) {

    return {
        scope: true,
        restrict: 'E',
        link: function($scope, element, attrs) {
            var index = parseInt(attrs.index, 10);
            var canvasEl = element.children('canvas').attr({
                width: $scope.workspaceWidth,
                height: $scope.workspaceHeight
            });
            element.append(canvasEl);

            var canvas = WorkspaceService.canvases[index];
            canvas.canvas = new fabric.Canvas(canvasEl[0], canvas.data)
                .on('text:changed', function() {
                    $scope.Utils.updateScope($scope);
                });

            $scope.$watch();
        }
    };

});

angular.module('editor').directive('bindValueTo', function() {
    return {
        restrict: 'A',

        link: function ($scope, element, attrs) {
            element.on('change keyup paste select', function() {
                $scope.setProp(attrs.bindValueTo, this.value);
                $scope.Utils.updateScope($scope);
            });

            $scope.$watch(function() {
                if ($scope.getSelected()) {
                    return $scope.getProp(attrs.bindValueTo);
                }
            }, function (newValue) {
                element.val(newValue);
            });
        }
    };
});