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
        var textObject = canvas.addText(text, {
            fontSize: 30,
            lineHeight: 1.1,
            padding: 5,
            fill: $scope.Utils.strRandomColor()
        });

        canvas.setSelected(textObject);
    };

    /**
     * Bring to front the selected object
     */
    $scope.bringToFront = function() {
        getActiveCanvas().bringToFront();
    };

    /**
     * Discard selected object or group
     */
    $scope.discardSelected = function() {
        getActiveCanvas().discardSelected();
    };

    /**
     * Get objects of canvas
     * @param {string} [type]
     */
    $scope.getObjects = function(type) {
        return getActiveCanvas().getCanvas().getObjects(type);
    };

    /**
     * Get selected object or group
     * @returns {*}
     */
    $scope.getSelected = function() {
        return getActiveCanvas().getSelected();
    };

    $scope.isSelected = function(object) {
        return getActiveCanvas().isSelected(object);
    };

    /**
     * Check exist value of property for the objects
     * @param {string} name
     * @param {*} value
     * @returns {boolean}
     */
    $scope.isProp = function(name, value) {
        return getActiveCanvas().isProp(name, value);
    };

    /**
     * Remove object
     * @param {object} object
     */
    $scope.removeObject = function(object) {
        getActiveCanvas().removeObject(object);
    };

    /**
     * Remove selected object or group
     */
    $scope.removeSelected = function() {
        getActiveCanvas().removeSelected();
        $scope.Utils.updateScope($scope);
    };

    /**
     * Send to back the selected object
     */
    $scope.sendToBack = function() {
        getActiveCanvas().sendToBack();
    };

    /**
     * Set the passed object as an active
     * @param {object} object
     */
    $scope.setSelected = function(object) {
        getActiveCanvas().setSelected(object);
    };

    /**
     * Set the value of the selected object property
     * @param {string} name
     * @param {*} value
     */
    $scope.setProp = function(name, value) {
        getActiveCanvas().setProp(name, value);
        $scope.Utils.updateScope($scope);
    };

    /**
     * Toggle the property of objects
     * @param {string} name
     * @param {*} value
     */
    $scope.toggleProp = function(name, value) {
        getActiveCanvas().toggleProp(name, value);
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
