/**
 * Created by kemal 17.02.2015
 */

function EditorCtrl($scope, WorkspaceService) {
    $scope.activeCanvasIndex = 0;
    $scope.canvases = WorkspaceService.canvases;

    /**
     * Add text
     * @param {string} text
     */
    $scope.addText = function(text) {
        var canvas = getActiveCanvas();
        var textObject = WorkspaceService.addText(canvas, text, {
            fontSize: 30,
            lineHeight: 1.1,
            padding: 5
        });

        WorkspaceService.setSelected(canvas, textObject);
    };

    /**
     * Discard selected object or group
     */
    $scope.discardSelected = function() {
        WorkspaceService.discardSelected(getActiveCanvas());
    };

    /**
     * Remove selected object or group
     */
    $scope.removeSelected = function() {
        WorkspaceService.removeSelected(getActiveCanvas());
        $scope.$apply();
    };

    /**
     * Returns an active canvas instance
     * @returns {fabric.Canvas}
     */
    function getActiveCanvas() {
        return $scope.canvases[$scope.activeCanvasIndex].canvas;
    }
}

EditorCtrl.resolve = {
    loadCanvases: function(WorkspaceService) {
        return WorkspaceService.loadCanvases();
    }
};

/**
 * Main an application module
 */
angular.module('editor', ['ngRoute', 'ui.bootstrap'])

    .config(function($locationProvider, $routeProvider) {
        $locationProvider.html5Mode(true);

        $routeProvider

            .when('/', {
                templateUrl: 'views/editor.html',
                controller: 'EditorCtrl',
                controllerAs: 'editor',
                resolve: EditorCtrl.resolve
            })

            .otherwise({redirectTo: '/'});
    })

    .run(function($rootScope, Utils) {
        $rootScope.Utils = Utils;
    })

    .controller('EditorCtrl', EditorCtrl)

;