/**
 * Created by kemal on 03.03.15.
 *
 * Canvas class
 */
angular.module('editor').factory('Canvas', function() {

    var Canvas = function(options) {
        this.canvas = new fabric.Canvas(options.el, options.data);
        return this;
    };

    /**
     * Adding text
     * @param {string} text
     * @param {object} options
     * @returns {fabric.IText}
     */
    Canvas.prototype.addText = function(text, options) {
        var textObject = new fabric.IText(text, options);
        this.canvas.add(textObject).centerObject(textObject);
        return textObject.setCoords();
    };

    /**
     * Bring to front the selected object
     */
    Canvas.prototype.bringToFront = function() {
        var object = this.canvas.getActiveObject();
        if (object) {
            this.canvas.bringToFront(object);
        }
    };

    /**
     * Discard the active object or group
     */
    Canvas.prototype.discardSelected = function() {
        this.canvas.deactivateAll().renderAll();
    };

    /**
     * @returns {fabric.Canvas}
     */
    Canvas.prototype.getCanvas = function() {
        return this.canvas;
    };

    /**
     * Get the value of property
     * @param {string} name
     * @returns {Array}
     */
    Canvas.prototype.getProp = function(name) {
        return this.getSelectedAsArray().reduce(function(propValues, object) {
            propValues.push(object.get(name));
            return propValues;
        }, []);
    };

    /**
     * Get selected object or group
     * @returns {*}
     */
    Canvas.prototype.getSelected = function() {
        return this.canvas.getActiveObject() || this.canvas.getActiveGroup();
    };

    /**
     * Get selected objects as array
     * @returns {Array}
     */
    Canvas.prototype.getSelectedAsArray = function() {
        var active = this.getSelected();
        return active ? active.type === 'group' ? active.getObjects() : [active] : [];
    };

    Canvas.prototype.isSelected = function(object) {
        var selected = this.canvas.getActiveObject();
        return selected ? angular.equals(selected, object) : false;
    };

    /**
     * Check exist value of property for the objects
     * @param {string} name
     * @param {*} value
     * @returns {boolean}
     */
    Canvas.prototype.isProp = function(name, value) {
        var propValues = this.getProp.apply(this, arguments);
        return propValues.length !== 0 && propValues.every(function(propValue) {
            return propValue === value;
        });
    };

    /**
     * Remove object
     * @param {object} object
     */
    Canvas.prototype.removeObject = function(object) {
        this.canvas.discardActiveGroup().remove(object).renderAll();
    };

    /**
     * Remove the active object or group
     */
    Canvas.prototype.removeSelected = function() {
        var selected = this.getSelectedAsArray();
        if (selected.length) {
            selected.forEach(function(object) {
                this.canvas.remove(object);
            }, this);
            this.canvas.discardActiveGroup().renderAll();
        }
    };

    /**
     * Send to back the selected object
     */
    Canvas.prototype.sendToBack = function() {
        var object = this.canvas.getActiveObject();
        if (object) {
            this.canvas.sendToBack(object);
        }
    };

    /**
     * Set property of canvas objects
     * @param {string} name
     * @param {*} value
     */
    Canvas.prototype.setProp = function(name, value) {
        this.getSelectedAsArray().forEach(function(object) {
            object.set(name, value);
        });
        this.canvas.renderAll();
    };

    /**
     * Set active object
     * @param {object} selected
     */
    Canvas.prototype.setSelected = function(selected) {
        this.canvas.discardActiveGroup().setActiveObject(selected);
    };

    /**
     * Toggle the property of objects
     * @param {string} name
     * @param {*} value
     */
    Canvas.prototype.toggleProp = function(name, value) {
        this.setProp(name, this.isProp.apply(this, arguments) ? '' : value);
    };

    return Canvas;
});