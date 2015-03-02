/**
 * Сервис рабочей области редактора
 */
angular.module('editor').factory('WorkspaceService', function($http) {
    var service = {};

    /**
     * @type {Array}
     */
    service.canvases = [];

    /**
     * Adding text
     * @param {object} canvas
     * @param {string} text
     * @param {object} options
     * @returns {fabric.IText}
     */
    service.addText = function(canvas, text, options) {
        var textObject = new fabric.IText(text, options);
        canvas.add(textObject).centerObject(textObject);
        return textObject.setCoords();
    };

    /**
     * Discard the active object or group
     * @param {object} canvas
     */
    service.discardSelected = function(canvas) {
        canvas.deactivateAll().renderAll();
    };

    /**
     * Get the value of property
     * @param {object} canvas
     * @param {string} name
     * @returns {Array}
     */
    service.getProp = function(canvas, name) {
        return this.getSelectedAsArray(canvas).reduce(function(propValues, object) {
            propValues.push(object.get(name));
            return propValues;
        }, []);
    };

    /**
     * Get selected object or group
     * @param {object} canvas
     * @param {string} [type]
     * @returns {*}
     */
    service.getSelected = function(canvas, type) {
        return canvas.getActiveObject() || canvas.getActiveGroup();
    };

    /**
     * Get selected objects as array
     * @returns {Array}
     */
    service.getSelectedAsArray = function(canvas) {
        var active = this.getSelected(canvas);
        return active ? active.type === 'group' ? active.getObjects() : [active] : [];
    };

    /**
     * Check exist value of property for the objects
     * @param canvas
     * @param name
     * @param value
     * @returns {boolean}
     */
    service.isProp = function(canvas, name, value) {
        var propValues = this.getProp.apply(this, arguments);
        return propValues.length !== 0 && propValues.every(function(propValue) {
            return propValue === value;
        });
    };

    /**
     * Loads data of canvas
     * @returns {$q.defer}
     */
    service.loadCanvases = function() {
        return $http.get('server/canvases.json')
            .success(function(response) {
                service.canvases = response.result;
            });
    };

    /**
     * Remove object
     * @param {object} canvas
     * @param {object} object
     */
    service.removeObject = function(canvas, object) {
        canvas.discardActiveGroup();
        canvas.remove(object).renderAll();
    };

    /**
     * Remove the active object or group
     * @param {object} canvas
     */
    service.removeSelected = function(canvas) {
        var selected = this.getSelectedAsArray(canvas);
        if (selected.length) {
            selected.forEach(function(object) {
                canvas.remove(object);
            });
            canvas.discardActiveGroup().renderAll();
        }
    };

    /**
     * Set property of canvas objects
     * @param {object} canvas
     * @param {string} name
     * @param {*} value
     */
    service.setProp = function(canvas, name, value) {
        this.getSelectedAsArray(canvas).forEach(function(object) {
            object.set(name, value);
        });
        canvas.renderAll();
    };

    /**
     * Set active object
     * @param {fabric.Canvas} canvas
     * @param {object} selected
     */
    service.setSelected = function(canvas, selected) {
        canvas.discardActiveGroup();
        canvas.setActiveObject(selected);
    };

    /**
     * Toggle the property of objects
     * @param {object} canvas
     * @param {string} name
     * @param {*} value
     */
    service.toggleProp = function(canvas, name, value) {
        this.setProp(canvas, name, this.isProp.apply(this, arguments) ? '' : value);
    };

    return service;
});