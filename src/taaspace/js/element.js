'use strict';

Taaspace.Element = (function () {
  //
  // Abstract prototype for all objects floating in the space.
  // 
  // Methods
  //   create(space, string, options)
  //
  // Animation options
  //   ease (optional, default none)
  //     "in", "out", "in-out", "snap", "none"
  //   duration (optional, default 0)
  //       e.g. "2s"
  //   delay (optional, default 0)
  //       e.g. "2s"
  //
  // Priority
  //   high
  // 
  var exports = {};
  /////////////////
  
  
  
  // Constructor
  
  var Elem = function () {
    this._space = null;
    this._el = null;
    this._x = null;
    this._y = null;
    this._z = null;
  };
  
  exports.create = function () {
      return new Elem();
  };
  
  
  
  // Accessors
  
  Elem.prototype.width = function () {
    // Width of the element in space
    // 
    // Priority
    //   high
  };
  
  Elem.prototype.height = function () {
    // Height of the element in space
    // 
    // Priority
    //   high
    
  };
  
  Elem.prototype.center = function () {
    // Center point of the element in space
    // 
    // Priority
    //   high
  };
  
  Elem.prototype.northwest = function () {
    // Top left corner
    // 
    // Priority
    //   medium
  };
  
  Elem.prototype.northeast = function () {
    // Top right corner
    // 
    // Priority
    //   medium
  };
  
  Elem.prototype.southwest = function () {
    // Bottom left corner
    // 
    // Priority
    //   medium
  };
  
  Elem.prototype.southeast = function () {
    // Bottom right corner
    // 
    // Priority
    //   medium
  };
  
  Elem.prototype.rect = function () {
    // Rectangle of element in space
    // 
    // Return
    //   {x0, y0, x1, y1}
    // 
    // Priority
    //   low
  };
  
  Elem.prototype.inside = function (rect) {
    // Return
    //   true
    //     if obj inside given rectangle
    //   false
    //     otherwise
    // 
    // Priority
    //   low
  };
  
  Elem.prototype.outside = function (rect) {
    // Return
    //   true
    //     if obj outside given rectangle
    //   false
    //     otherwise
    // 
    // Priority
    //   low
  };
  
  
  
  // Mutators
  
  Elem.prototype.origo = function (xyz) {
    // Move the fixed point, the pivot point.
    // The point to moveTo and rotate around.
    // Does not move the element in relation to the space origo.
    // 
    // Parameter
    //   xyz
    //     Place for new origo in relation to the current origo in space units.
    // 
    // Priority
    //   medium
    return {};
  };
  
  Elem.prototype.scale = function (multiplier, options) {
    // Resize the element so that origo does not move.
    // 
    // Parameter
    //   multiplier
    //     Scaling factor. 2 doubles, 0.5 halves.
    //   options
    //     See Animation Options
    // 
    // Return
    //   this
    //     for chaining
    // 
    // Priority
    //   medium
  };
  
  Elem.prototype.rotate = function (angle, options) {
    // Rotate the element around its origo.
    // 
    // Parameter
    //   angle
    //     Degrees e.g. 30, -120.2
    //   options
    //     See Animation Options
    // 
    // Return
    //   this
    //     for chaining
    // 
    // Priority
    //   low
  };
  
  Elem.prototype.moveTo = function (x, y, z, options) {
    // Move the element so that the origo of the element
    // will be at x y z in space.
    // 
    // Parameter
    //   x, y, z
    //     New place in space
    //   options (optional)
    //     See Animation Options
    // 
    // Return
    //   this
    //     for chaining
    // 
    // Priority
    //   medium
  };
  
  Elem.prototype.moveBy = function (dx, dy, dz, options) {
    // Move the element by distance specified in space coordinates.
    // 
    // Parameter
    //   dx, dy, dz
    //     Distance in space
    //   options (optional)
    //     See Animation Options
    // 
    // Return
    //   this
    //     for chaining
    // 
    // Priority
    //   medium
    this.x += dx;
    this.y += dy;
    this.z += dz;
    
    this.space._elementMoved(this, options);
    
    return this;
  };
  
  Elem.prototype.scalable = function (onoff, options) {
    // Make element scalable by pinch gesture.
    // 
    // Parameter
    //   onoff (optional, default true)
    //   options (optional)
    //     Scaling limits
    // 
    // Return
    //   this
    //     for chaining
    // 
    // Priority
    //   low
    return this;
  };
  
  Elem.prototype.rotatable = function (onoff, options) {
    // Priority
    //   low
  };
  
  Elem.prototype.draggable = function (onoff, options) {
    // Make element movable by dragging with pointer or finger.
    // 
    // Parameter
    //   onoff (optional, default true)
    //   options (optional)
    //     Scaling limits
    // 
    // Return
    //   this
    //     for chaining
    // 
    // Priority
    //   low
    return this;
  };
  
  Elem.prototype.remove = function () {
    // Remove the element from space.
    //
    // Priority
    //   high
  };
  
  
  
  // Events
  
  Elem.prototype.on = function (type, viewport, callback) {
    // Attach an event to the element
    // 
    // Priority
    //   high
    
    // Shortcut syntax: on('tap', function () { ... });
    // Attach to all viewports.
    if (typeof callback === 'undefined' && typeof viewport === 'function') {
      callback = viewport;
      this.space._listenDomElements(this, type, callback);
      return;
    } // else
    
    // Attach only to one viewport.
    viewport._listenDomElement(this, type, callback);
  };
  
  Elem.prototype.off = function () {
    // Detach an event from the element
    // 
    // Priority
    //   medium
  };
  
  
  
  // Abstract Pseudo-private mutators
  
  Elem.prototype._domAppend = function () {
    throw "Abstract function. Must be implemented by the instance.";
  };
  
  Elem.prototype._domMove = function () {
    throw "Abstract function. Must be implemented by the instance.";
  };
  
  Elem.prototype._domScale = function () {
    throw "Abstract function. Must be implemented by the instance.";
  };
  
  Elem.prototype._domRotate = function () {
    throw "Abstract function. Must be implemented by the instance.";
  };
  
  Elem.prototype._domRemove = function () {
    throw "Abstract function. Must be implemented by the instance.";
  };
  
  Elem.prototype._domListen = function () {
    throw "Abstract function. Must be implemented by the instance.";
  };
  
  
  
  ///////////////
  return exports;
}());
