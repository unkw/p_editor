/**
 * Created by kemal on 03.03.15.
 *
 * Canvas class
 */
angular.module('editor').factory('Canvas', function($rootScope, $q, config) {

    var Canvas = function(options) {

        this.canvas = new fabric.Canvas(options.el, options.data);
        this.__initHist();

        return this;
    };

    /**
     * Add image
     * @param {string} url
     * @returns {*}
     */
    Canvas.prototype.addImage = function(url) {
        var deferred = $q.defer();
        var canvas = this.canvas;

        fabric.Image.fromURL(url, function (object) {
            object.set({
                top: 0,
                left: 0
            });

            this.__setImageScale(object);

            canvas.add(object.setCoords());
            deferred.resolve(object);
        }.bind(this));

        return deferred.promise;
    };

    /**
     * Add state to history
     * @param state
     */
    Canvas.prototype.addState = function(state) {
        var states = this.__states,
            stateLength = states.length;

        if (new Date().getTime() - (this.__lastHistoryStateTime || 0) < 200) {
            states.splice(stateLength - 1, 0, state);
        } else {
            if (stateLength !== this.__stateIndex) {
                states.length = this.__stateIndex;
            }

            if (stateLength === config.maxHistoryLength) {
                states.shift();
            }

            this.__stateIndex++;
            states.push(state);
        }

        this.__lastHistoryStateTime = new Date().getTime();
    };

    /**
     * Adding text
     * @param {string} text
     * @param {object} [options]
     * @returns {fabric.IText}
     */
    Canvas.prototype.addText = function(text, options) {
        this.__needSaveState = false;
        var object = new fabric.IText(text, angular.extend({
            fontFamily: 'Arial',
            fontSize: 40,
            lineHeight: 1.1,
            padding: 5,
            fill: config.font.defaultFillColor
        }, options));
        object.set(this.__getRandomPosition(object)).setCoords();
        this.canvas.add(object);
        this.__needSaveState = true;
        this.setSelected(object);
        this.__saveToHist();
        return object;
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

    Canvas.prototype.canUseUndo = function() {
        return this.__stateIndex > 1;
    };

    Canvas.prototype.canUseRedo = function() {
        return this.__states.length > this.__stateIndex;
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
     * Get selected objects as array
     * @returns {Array}
     */
    Canvas.prototype.getSelectedAsArray = function() {
        var active = this.canvas.getActiveObject() || this.canvas.getActiveGroup();
        return active ?
            active.type === 'group' ?
                active.getObjects() :
                [active] :
            [];
    };

    /**
     * Getting history state by state index
     * @param index number
     * @returns {*}
     */
    Canvas.prototype.getState = function(index) {
        var states = this.__states,
            newState = this.__stateIndex + index;

        if (states.length < newState || newState < 0) {
            return undefined;
        }

        this.__stateIndex = newState;

        return states[this.__stateIndex - 1];
    };

    /**
     * Get selected object or group
     * @param {string} [type]
     * @returns {*}
     */
    Canvas.prototype.hasSelected = function(type) {
        if (type) {
            return this.getSelectedAsArray().some(function(object) {
                return object.type === type;
            });
        } else {
            return this.canvas.getActiveObject() || this.canvas.getActiveGroup();
        }
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
     * Redo changes
     * @param changesCount
     */
    Canvas.prototype.redo = function(changesCount) {
        changesCount = changesCount || 1;
        this.__loadHist(this.getState(changesCount));
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
        var canvas = this.canvas,
            needTriggerEvent = false;

        this.getSelectedAsArray().forEach(function(object) {
            if (angular.isFunction(object['set' + $rootScope.Utils.capitalize(name)])) {
                object.set(name, value);
                needTriggerEvent = true;
            }
        });

        needTriggerEvent && canvas.trigger('object:modified');
        canvas.renderAll();
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

    /**
     * Undo changes
     * @param changesCount
     */
    Canvas.prototype.undo = function(changesCount) {
        changesCount = changesCount || -1;
        this.__loadHist(this.getState(changesCount));
    };

    /**
     * @private Initialize save state on canvas change
     */
    Canvas.prototype.__initHist = function() {
        var self = this;

        function saveState() {
            self.__saveToHist();
        }

        this.__states = []; // History state
        this.__stateIndex = 0; // Current state Index in history
        this.__needSaveState = true; // flag that allows save state

        saveState();
        this.canvas
            .on('text:changed', saveState)
            .on('object:modified', saveState)
            .on('object:added', saveState)
            .on('object:removed', saveState)
            .on('path:created', saveState);
    };

    /**
     * @param {object} o
     * @returns {{top: number, left: number}}
     * @private
     */
    Canvas.prototype.__getRandomPosition = function(o) {
        var indent = 15;
        return {
            top: _.random(indent, this.canvas.getHeight() - o.getHeight() - indent),
            left: _.random(indent, this.canvas.getWidth() - o.getWidth() - indent)
        };
    };

    /**
     * @private Load current state from JSON object
     * @param {JSON} state
     * @private
     */
    Canvas.prototype.__loadHist = function(state) {
        if (!state) {
            return;
        }

        var canvas = this.canvas;
        this.__needSaveState = false;
        canvas.clear();
        canvas.loadFromJSON(state, function() {
            // After new canvas from JSON, fabric doesn't save
            // active objects. That's why we add them manually
            var activeObjects = canvas._objects.filter(function(obj) {
                return obj.active;
            });

            if (activeObjects.length > 0) {
                if (activeObjects.length === 1) {
                    canvas.setActiveObject(activeObjects[0]);
                } else {
                    canvas.setActiveGroup(new fabric.Group(activeObjects));
                }
            }

            canvas.renderAll();
            this.__needSaveState = true;
        }.bind(this));
    };

    /**
     * @private Preserves the history of changes to the Editor
     * @private
     */
    Canvas.prototype.__saveToHist = function() {
        if (this.__needSaveState) {
            this.addState(this.canvas.toJSON(['active']));
        }
    };

    /**
     * @private
     */
    Canvas.prototype.__setImageScale = function(o) {
        var maxW = this.canvas.getWidth() / 2;
        var maxH = this.canvas.getHeight();

        if (o.getWidth() > maxW) {
            o.scaleToWidth(maxW);
        }

        if (o.getHeight() > maxH) {
            o.scaleToHeight(maxH);
        }
    };

    return Canvas;
});