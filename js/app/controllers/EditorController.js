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
     * Get the value of the selected object property
     * @param name
     * @returns {*}
     */
    $scope.getProp = function(name) {
        return WorkspaceService.getProp(getActiveCanvas(), name);
    };

    /**
     * @param {string} [type]
     */
    $scope.getSelected = function(type) {
        return WorkspaceService.getSelected(getActiveCanvas(), type);
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