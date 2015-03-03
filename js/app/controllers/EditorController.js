/**
 * Created by kemal on 28.02.15
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
            padding: 5,
            fill: $scope.Utils.strRandomColor()
        });

        WorkspaceService.setSelected(canvas, textObject);
    };

    $scope.bringToFront = function() {
        WorkspaceService.bringToFront(getActiveCanvas());
    };

    /**
     * Discard selected object or group
     */
    $scope.discardSelected = function() {
        WorkspaceService.discardSelected(getActiveCanvas());
    };

    /**
     * @param {string} [type]
     */
    $scope.getSelected = function(type) {
        return WorkspaceService.getSelected(getActiveCanvas(), type);
    };

    /**
     * Check exist value of property for the objects
     * @param {string} name
     * @param {*} value
     * @returns {boolean}
     */
    $scope.isProp = function(name, value) {
        return WorkspaceService.isProp(getActiveCanvas(), name, value);
    };

    /**
     * Remove object
     * @param {object} object
     */
    $scope.removeObject = function(object) {
        WorkspaceService.removeObject(getActiveCanvas(), object);
    };

    /**
     * Remove selected object or group
     */
    $scope.removeSelected = function() {
        WorkspaceService.removeSelected(getActiveCanvas());
        $scope.Utils.updateScope($scope);
    };

    $scope.sendToBack = function() {
        WorkspaceService.sendToBack(getActiveCanvas());
    };

    /**
     * Set the passed object as an active
     * @param {object} object
     */
    $scope.setSelected = function(object) {
        WorkspaceService.setSelected(getActiveCanvas(), object);
    };

    /**
     * Set the value of the selected object property
     * @param {string} name
     * @param {*} value
     */
    $scope.setProp = function(name, value) {
        WorkspaceService.setProp(getActiveCanvas(), name, value);
        $scope.Utils.updateScope($scope);
    };

    /**
     * Toggle the property of objects
     * @param {string} name
     * @param {*} value
     */
    $scope.toggleProp = function(name, value) {
        WorkspaceService.toggleProp(getActiveCanvas(), name, value);
        $scope.Utils.updateScope($scope);
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

angular.module('editor').controller('EditorCtrl', EditorCtrl);
