Taaspace.Element = (function () {
  //
  // Abstract prototype for all objects floating in the space.
  // 
  // Usage
  //   MyElemType.prototype = Taaspace.Element.create()
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
    
    // Location of left top corner in space
    this._x = 0;
    this._y = 0;
    
    // Width in space
    this._w = 0;
    this._h = 0;
    
    // Pivot point
    this._px = 0;
    this._py = 0;
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
    return this._w;
  };
  
  Elem.prototype.height = function () {
    // Height of the element in space
    // 
    // Priority
    //   high
    return this._h;
  };
  
  Elem.prototype.center = function () {
    // Center point of the element in space
    // 
    // Priority
    //   high
    throw 'Not implemented';
  };
  
  Elem.prototype.box = function () {
    // Bounding box of the element in the space.
    // 
    // Return
    //   {x0, y0, x1, y1}
    // 
    // Priority
    //   medium
    return {
      x0: this._x,
      y0: this._y,
      x1: this._x + this._w,
      y1: this._y + this._h
    };
  };
  
  Elem.prototype.isInside = function (rect) {
    // Return
    //   true
    //     if obj inside given rectangle
    //   false
    //     otherwise
    // 
    // Priority
    //   low
    throw 'Not implemented';
  };
  
  Elem.prototype.isOutside = function (rect) {
    // Return
    //   true
    //     if obj outside given rectangle
    //   false
    //     otherwise
    // 
    // Priority
    //   low
    throw 'Not implemented';
  };
  
  
  
  // Mutators
  
  Elem.prototype.pivot = function (xy) {
    // Set or get the pivot point.
    // The point to moveTo, scale and rotate around.
    // Does not move the element in relation to the space pivot.
    // 
    // Parameter
    //   xy
    //     Place for new pivot in relation to the current pivot in space units.
    // 
    // Priority
    //   medium
    throw 'Not implemented';
  };
  
  Elem.prototype.size = function (width, height) {
    
    // Parameter
    //   width
    //     in space
    //   height
    //     in space
    //  OR
    //   wh
    //     {width: <width_in_space>, height: <height_in_space>}
    //  OR
    //   <nothing>
    //     Returns the current {width, height} of the element
    // 
    // Return
    //   {width, height} if no parameters
    //  OR
    //   this for chaining
    if (typeof width === 'object') {
      height = width.height;
      width = width.width;
    } else if (typeof width === 'undefined') {
      return {
        width: this._w,
        height: this._h
      };
    }
    
    this._w = width;
    this._h = height;
    
    this._space._scaleDomElement(this);
    
    return this;
  };
  
  Elem.prototype.scale = function (multiplier, options) {
    // Resize the element so that pivot does not move.
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
    // Rotate the element around its pivot.
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
  
  Elem.prototype.moveTo = function (x, y, options) {
    // Move the element so that the pivot of the element
    // will be at x y in space.
    // 
    // Parameter
    //   x, y
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
  
  Elem.prototype.moveBy = function (dx, dy, options) {
    // Move the element by distance specified in space coordinates.
    // 
    // Parameter
    //   dx, dy
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
    
    if (typeof dx === 'object') {
      if (typeof dy === 'object') {
        options = dy;
      }
      dy = dx.y;
      dx = dx.x;
    }
    
    this._x += dx;
    this._y += dy;
    
    this._space._moveDomElement(this, options);
    
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
    throw 'Not implemented';
  };
  
  Elem.prototype.rotatable = function (onoff, options) {
    // Make element rotatable by pinch gesture
    // 
    // Priority
    //   low
    throw 'Not implemented';
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
    throw 'Not implemented';
  };
  
  Elem.prototype.remove = function () {
    // Remove the element from space.
    //
    // Priority
    //   high
    throw 'Not implemented';
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
      this._space._listenDomElements(this, type, callback);
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
    throw 'Not implemented';
  };
  
  
  
  // Somewhat abstract pseudo-private mutators
  
  Elem.prototype._domAppend = function () {
    throw 'Abstract function. Must be implemented by the instance.';
  };
  
  Elem.prototype._domMove = function (domElem, fromSpace, options) {
    // Move the element on screen.
    // 
    // Can be reimplemented in the child prototype.
    // 
    // Element knows its position in space and uses viewports fromSpace
    // function to find out position on screen.
    
    var xy = fromSpace(this._x, this._y);
    
    domElem.css({
      left: xy.x + 'em',
      top: xy.y + 'em'
    });
  };
  
  Elem.prototype._domScale = function (domElem, fromSpace, scale, options) {
    // Can be overridden in the child prototype.
    
    var nw = fromSpace(this._x, this._y);
    var se = fromSpace(this._x + this._w, this._y + this._h);
    
    domElem.css({
      left: nw.x + 'em',
      top: nw.y + 'em',
      width: (se.x - nw.x) + 'em',
      height: (se.y - nw.y) + 'em'
    });
  };
  
  Elem.prototype._domRotate = function () {
    throw 'Abstract function. Must be implemented by the instance.';
  };
  
  Elem.prototype._domRemove = function (domElem, options) {
    // Remove the DOMElement from DOM
    // 
    // Can be overridden in the child prototype.
    // 
    // Parameter
    //   options
    //     ease?
    //     duration?
    //     delay?
    domElem.remove();
  };
  
  Elem.prototype._domListen = function (domElem, eventType, callback) {
    if (eventType === 'mousewheel') {
      domElem.mousewheel(function(event, delta, deltaX, deltaY) {
          callback(delta);
      });
    } else {
      // Attach a function to a Hammer event on the element.
      Hammer(domElem[0]).on(eventType, callback);
    }
  };
  
  
  
  ///////////////
  return exports;
}());
