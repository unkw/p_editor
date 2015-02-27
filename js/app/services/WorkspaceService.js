/**
 * Сервис рабочей области редактора
 */
angular.module('editor').factory('WorkspaceService', function($http) {
    var service = {};

    service.canvases = [];

    service.addText = function(canvas, text, options) {
        var textObject = new fabric.IText(text, options);
        canvas.add(textObject).centerObject(textObject);
        textObject.setCoords();
        return textObject;
    };

    /**
     * Снять выделение объекта или группы
     */
    service.discardSelected = function(canvas) {
        canvas.deactivateAll().renderAll();
    };

    service.getProp = function(canvas, name) {
        var activeObject = canvas.getActiveObject();
        return activeObject ? activeObject.get(name) : null;
    };

    service.getSelected = function(canvas, type) {
        return canvas.getActiveObject() || canvas.getActiveGroup();
    };

    /**
     * Загрузка данных макетов
     * @returns {$q.defer}
     */
    service.loadCanvases = function() {
        return $http.get('server/canvases.json')
            .success(function(response) {
                service.canvases = response.result;
            });
    };

    /**
     * Удалить выделенный объект или группу
     */
    service.removeSelected = function(canvas) {
        var activeObject = canvas.getActiveObject();
        var activeGroup = canvas.getActiveGroup();

        if (activeObject) {
            canvas.remove(activeObject).renderAll();
        } else if (activeGroup) {
            activeGroup.forEachObject(function(o) {
                canvas.remove(o);
            });
            canvas.discardActiveGroup().renderAll();
        }
    };

    /**
     *
     * @param {object} canvas
     * @param {string} name
     * @param {*} value
     */
    service.setProp = function(canvas, name, value) {
        var object = canvas.getActiveObject();
        if (object) {
            object.set(name, value);
            canvas.renderAll();
        }
    };

    /**
     * @param {fabric.Canvas} canvas
     * @param {object} selected
     */
    service.setSelected = function(canvas, selected) {
        if (selected.type === 'group') {
            canvas.setActiveGroup(selected);
        } else {
            canvas.setActiveObject(selected);
        }
    };

    return service;
});