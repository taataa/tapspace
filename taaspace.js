/*! taaspace - v0.0.1 - 2013-11-15
 * https://github.com/taataa/taaspace
 *
 * Copyright (c) 2013 Akseli Palen <akseli.palen@gmail.com>;
 * Licensed under the  license */

'use strict';

var Taaspace = (function () {
  //
  // Methods
  //   create(el)
  //     el
  //       DOM element or query string, e.g. '#space'. Defaults to body
  //
  var exports = {};
  /////////////////
  
  var Space = function (el) {
    if (typeof el === 'undefined') {
      el = document.body;
    } else if (typeof el === 'string') {
      el = document.querySelector(el);
    }
    
    // Elements, like Texts and Images in space
    this._elems = [];
    
    // Viewports to the space
    this._vps = [];
    
    // Deviation before _updatePositions
    this._dx = 0;
    this._dy = 0;
    
    // Make elements referencable by id to be stored in objects.
    // Makes implementing collections easy.
    this._elemIdCounter = 0;
    
    // Maps keyboard events to selected objects.
    this._keyboardManager = Taaspace.KeyboardManager.create();
  };
  
  
  
  // Mutators
  
  Space.prototype.origo = function (xy_or_viewport) {
    // Move the location of the space origo so that the relations between
    // the elements stay the same. Handy to avoid number overflow in big space.
    // If no parameters specified, return 0,0
    var xy = xy_or_viewport;
    
    if (typeof xy === 'undefined') {
      return {x:0, y:0};
    }
    
    if ('pivot' in xy && typeof xy.pivot === 'function') {
        xy = xy.pivot();
    }
    
    this._moveElemsBy(xy);
  };
  
  Space.prototype.remove = function (elem) {
    this._elems = _.reject(this._elems, function (i) { return elem === i; });
  };
  
  Space.prototype.createImage = function (src, options) {
    // Add an image to the space.
    
    var im = Taaspace.Image.create(this, src, options);
    
    im._id = String(this._elemIdCounter);
    this._elemIdCounter += 1;
    
    this._addElement(im);
    return im;
  };
  
  Space.prototype.createText = function (string, options) {
    // Add a block of text to the space.
    
    var t = Taaspace.Text.create(this, string, options);
    
    t._id = String(this._elemIdCounter);
    this._elemIdCounter += 1;
    
    this._addElement(t);
    return t;
  };
  
  Space.prototype.createCustom = function (el, options) {
    // Add custom element to the space.
    return {};
  };
  
  Space.prototype.createNetwork = function () {
    // Attach a network to be visualised. Define position of root.
    return {};
  };
  
  Space.prototype.createGroup = function () {
    // Create a group for space elements.
    return {};
  };
  
  Space.prototype.createViewport = function (container_el) {
    var vp = Taaspace.Viewport.create(this, container_el);
    this._addViewport(vp);
    return vp;
  };
  
  Space.prototype.select = function (elementOrViewport) {
    // Selected elements' keyboard event handler are enabled.
    this._keyboardManager.select(elementOrViewport);
  };
  
  Space.prototype.deselect = function (elementOrViewport) {
    // Deselected elements' keyboard event handlers will not fire.
    this._keyboardManager.deselect(elementOrViewport);
  };
  
  
  
  // Pseudo-private mutators
  
  Space.prototype._addElement = function (elem) {
    // New element into space.
    this._elems.push(elem);
    
    // Append element to all viewports
    _.each(this._vps, function (vp) {
      vp._createDomElement(elem);
    });
  };
  
  Space.prototype._addViewport = function (vp) {
    // New viewport to space.
    this._vps.push(vp);
    
    // Append all existing elements to the new viewport.
    _.each(this._elems, function (elem) {
      vp._createDomElement(elem);
    });
  };
  
  Space.prototype._moveDomElement = function (elem, options) {
    // Called from Element when element moves.
    _.each(this._vps, function (vp) {
      vp._moveDomElement(elem, options);
    });
  };
  
  Space.prototype._scaleDomElement = function (elem, options) {
    // Called from Element when element is scaled
    _.each(this._vps, function (vp) {
      vp._scaleDomElement(elem, options);
    });
  };
  
  Space.prototype._listenDomElements = function (elem, type, callback) {
    // Listen all the instances of element in the viewports.
    
    // Called from Element.on
    _.each(this._vps, function (vp) {
      vp._listenDomElement(elem, type, callback);
    });
  };
  
  Space.prototype._onKey = function (code, elementOrViewport, handler) {
    // Attach jwerty key combination to element or viewport
    this._keyboardManager.on(code, elementOrViewport, handler);
  };
  
  Space.prototype._offKey = function (code, elementOrViewport, handler) {
    this._keyboardManager.off(code, elementOrViewport, handler);
  };
  
  /* DEPRECATED ?
  Space.prototype._moveElemsBy = function (x, y) {
    // Move the coordinates of everything same amount.
    if (typeof x === 'object') {
      y = x.y;
      x = x.x;
    }
    _.each(this._elems, function (elem) {
      elem.moveBy(x, y);
    });
  };
  */
  
  
  
  // Constructor
  
  exports.create = function () {
      return new Space();
  };
  
  ///////////////
  return exports;
}());


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
    
    // Location of left top corner in space
    this._x = 0;
    this._y = 0;
    
    // Width in space
    this._w = 0;
    this._h = 0;
    
    // Origo i.e. pivot point
    this._ox = 0;
    this._oy = 0;
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
  
  Elem.prototype.origo = function (xy) {
    // Move the fixed point, the pivot point.
    // The point to moveTo and rotate around.
    // Does not move the element in relation to the space origo.
    // 
    // Parameter
    //   xy
    //     Place for new origo in relation to the current origo in space units.
    // 
    // Priority
    //   medium
    return {};
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
  
  Elem.prototype.moveTo = function (x, y, options) {
    // Move the element so that the origo of the element
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
  };
  
  
  
  // Somewhat abstract pseudo-private mutators
  
  Elem.prototype._domAppend = function () {
    throw "Abstract function. Must be implemented by the instance.";
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
      left: xy.x + 'px',
      top: xy.y + 'px'
    });
  };
  
  Elem.prototype._domScale = function (domElem, fromSpace, scale, options) {
    // Can be reimplemented in the child prototype.
    
    var nw = fromSpace(this._x, this._y);
    var se = fromSpace(this._x + this._w, this._y + this._h);
    
    domElem.css({
      left: nw.x + 'px',
      top: nw.y + 'px',
      width: (se.x - nw.x) + 'px',
      height: (se.y - nw.y) + 'px'
    });
  };
  
  Elem.prototype._domRotate = function () {
    throw "Abstract function. Must be implemented by the instance.";
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


'use strict';

Taaspace.Viewport = (function () {
  //
  // Viewport into the space.
  // 
  // Methods
  //   create(space, container, options)
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
  
  var View = function (space, container, options) {
    
    this._space = space;
    
    // Find type of container
    if (typeof container === 'string') {
      this._container = document.querySelector(container);
    } else {
      // Is jQuery element
      if (container.hasOwnProperty(0)) {
        this._container = container[0];
      } else {
        this._container = container;
      }
    }
    
    // The location of the left-top corner in space.
    this._x = 0;
    this._y = 0;
    
    // The location of viewport origo in space.
    this._ox = 0;
    this._oy = 0;
    
    // The unit scale. Answers to the question:
    // How many units there are on the viewport for one unit in space.
    this._scale = 1;
    
    // Initialize Hammer instance where handlers can be attached to.
    this._hammertime = Hammer(this._container);
    
    // Mapping from element ids to (elem, DOMElement) pairs.
    this._domMap = {};
    
    // Model for draggability. Defined in draggable().
    this._draggable = {};
    
    // Model for scalability. Defined in scalable().
    this._scalable = {};
    
    // fromSpace is commonly passed to functions in other modules, e.g.
    // to be used in dom operations.
    // Here we make a function that does not depend on the context and
    // therefore can easily be passed.
    var that = this;
    this._fromSpace = function () {
      return that.fromSpace.apply(that, arguments);
    };
    
  };
  
  
  // Accessors
  
  View.prototype.width = function () {
    // Width in space
    // 
    // Priority
    //   high
    var screenW = $(this._container).width();
    return this.toSpaceDistance(screenW);
  };
  
  View.prototype.height = function () {
    // Height in space
    // 
    // Priority
    //   high
    var screenH = $(this._container).height();
    return this.toSpaceDistance(screenH);
  };
  
  View.prototype.center = function () {
    // Center point in space
    // 
    // Priority
    //   high
    
    // Naive, does not count rotation
    return {
      x: this._x + this.width() / 2,
      y: this._y + this.height() / 2
    }
  };
  
  View.prototype.northwest = function () {
    // Top left corner
    // 
    // Priority
    //   medium
  };
  
  View.prototype.northeast = function () {
    // Top right corner
    // 
    // Priority
    //   medium
  };
  
  View.prototype.southwest = function () {
    // Bottom left corner
    // 
    // Priority
    //   medium
  };
  
  View.prototype.southeast = function () {
    // Bottom right corner
    // 
    // Priority
    //   medium
  };
  
  View.prototype.rect = function () {
    // Rectangle in space
    // 
    // Return
    //   {x0, y0, x1, y1}
    // 
    // Priority
    //   high
  };
  
  View.prototype.toSpace = function (x, y) {
    // Translate point on screen to point in space.
    // 
    // Return
    //   xy_in_space
    // 
    // Priority
    //   high
    
    // Normalize
    if (typeof x === 'object') {
      y = x.y;
      x = x.x;
    }
    
    return {
      x: this._x + (x / this._scale),
      y: this._y + (y / this._scale)
    };
  };
  
  View.prototype.fromSpace = function (x, y) {
    // Translate point in space to point on screen.
    // 
    // Usage
    //   fromSpace(12, -2.1) // {x: 200, y: 400}
    //   fromSpace({x: 12, y: -2.1}) // {x: 200, y: 400}
    // 
    // Return
    //   xy_on_screen
    // 
    // Priority
    //   high
    
    // Normalize
    if (typeof x === 'object') {
      y = x.y;
      x = x.x;
    }
    
    return {
      x: (x - this._x) * this._scale,
      y: (y - this._y) * this._scale
    };
  };
  
  View.prototype.toSpaceDistance = function (d) {
    // Translate distance on screen to distance in space.
    // 
    // Return
    //   distance_in_space
    // 
    // Priority
    //   high
    return d / this._scale; // dummy
  };
  
  View.prototype.fromSpaceDistance = function (d) {
    // Translate distance in space to distance on screen.
    // 
    // Usage
    //   fromSpaceDist(2.3) // 200
    // 
    // Return
    //   distance_on_screen
    // 
    // Priority
    //   high
    return d * this._scale; // dummy
  };
  
  
  
  // Mutators
  
  View.prototype.origo = function (x, y) {
    // Move the point to moveTo and rotate around.
    // Does not move the view in relation to the space origo.
    // 
    // Parameter
    //   xy (optional)
    //     Place for new origo in space units.
    // 
    // Return
    //   xy of the current origo, if no new origo specified.
    //   this, if new origo specified.
    // 
    // Priority
    //   medium
    if (typeof x === 'object') {
      y = x.y;
      x = x.x;
    } else {
      if (typeof x === 'undefined') {
        return {x: this._ox, y: this._oy};
      } // else
    }
    
    // Update the origo
    this._ox = x;
    this._oy = y;
    
    return this;
  };
  
  View.prototype.scale = function (multiplier, options) {
    // Multiply scale so that origo stays still.
    // 
    // Return
    //   this
    // 
    // Priority 
    //   high
    
    // Origo on screen before scaling
    var ob = this.fromSpace(this._ox, this._oy);
    
    // Scaling
    this._scale *= multiplier;
    
    // Origo on screen after scaling
    var oa = this.fromSpace(this._ox, this._oy);
    
    // Move space so that origo stays in the same space
    var dx = this.toSpaceDistance(oa.x - ob.x);
    var dy = this.toSpaceDistance(oa.y - ob.y);
    this.moveBy(dx, dy, {
      disableDomUpdate: true
    });
    
    this._scaleEachDomElement(options);
    
    return this;
  };
  
  View.prototype.rotate = function (angle, options) {
    // Rotate the viewport around its origo.
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
  
  View.prototype.moveTo = function (x, y, options) {
    // Priority
    //   high
  };
  
  View.prototype.moveBy = function (dx, dy, options) {
    // Move the viewport by ...
    // 
    // Parameter
    //   dx
    //   dy
    //   options (optional)
    //  OR
    //   dxdy
    //   options (optional)
    // 
    // Options
    //   disableDomUpdate
    //     Set true to skip updating the position of the DOM elements
    //     after the move.
    // 
    // Return
    //   this
    //     for chaining
    // 
    // Priority
    //   high
    
    if (typeof dx === 'object') {
      
      if (typeof dy === 'object') {
        options = dy;
      }
      
      dy = dx.y;
      dx = dx.x;
      
    }
    
    if (typeof options === 'undefined') {
      options = {};
    }
    
    this._x += dx;
    this._y += dy;
    
    this._ox += dx;
    this._oy += dy;
    
    if (!('disableDomUpdate' in options && options.disableDomUpdate === true)) {
      this._moveEachDomElement(options);
    }
    
    return this;
  };
  
  View.prototype.focusTo = function (taa, options) {
    // Priority
    //   medium
  };
  
  View.prototype.scalable = function (onoff, options) {
    // Make viewport scalable i.e. zoomable.
    // Enables mouse wheel and pinch zoom.
    // 
    // Parameter
    //   onoff (optional, default true)
    //     True to turn scalability on (default).
    //     False to turn scalability off.
    //   options (optional)
    //     Scaling limits.
    // 
    // Options
    //   disableKeys, not implemented yet
    //   invertKeys, not implemented yet
    // 
    // Return
    //   this
    //     for chaining
    // 
    // Priority
    //   high
    
    // Handle parameters
    if (typeof onoff === 'object') {
      options = onoff;
      onoff = true;
    } else if (typeof onoff !== 'boolean') { // e.g. undefined
      onoff = true;
    }
    if (typeof options !== 'object') {
      options = {};
    }
    
    var op = this._scalable;
    
    if (!op.hasOwnProperty('status')) {
      // Scalability not yet initialized
      
      var that = this;
      op.status = false;
      op.onmousewheel = function (event, delta, deltax, deltay) {
        
        // Origo to mouse position
        var spaceOrigo = that.toSpace(event.pageX, event.pageY);
        that.origo(spaceOrigo);
        
        if (delta > 0) {
          that.scale(1.25);
        } else {
          that.scale(1/1.25);
        }
      };
      op.onkeyplus = function () {
        that.origo(that.center()).scale(1.25);
      };
      op.onkeyminus = function () {
        that.origo(that.center()).scale(1/1.25);
      };
    }
    
    if (onoff === false) {
      // Turn scalablity off
      op.status = false;
      this.off('mousewheel', op.onmousewheel);
      this.off('key-plus', op.onkeyplus);
      this.off('key-subtract', op.onkeyminus);
      return this;
    } // else
    
    // Avoid doubles
    if (op.status === true) {
      return this;
    } // else
    
    // Turn draggability on
    op.status = true;
    this.on('mousewheel', op.onmousewheel);
    this.on('key-plus', op.onkeyplus);
    this.on('key-subtract', op.onkeyminus);
    return this;
  };
  
  View.prototype.rotatable = function (onoff, options) {
    // Priority
    //   low
    return this;
  };
  
  View.prototype.draggable = function (onoff, options) {
    // Make viewport draggable aka pannable aka translateable.
    // 
    // Parameter
    //   onoff (optional, default true)
    //     True to turn draggability on (default).
    //     False to turn draggability off.
    //   options (optional)
    //     Object, Panning limits in space coordinates.
    // 
    // Options
    //   disableKeys, not implemented yet
    //   invertKeys, not implemented yet
    //   
    // Return
    //   this
    //     for chaining
    // 
    // Priority
    //   high
    
    // Handle parameters
    if (typeof onoff === 'object') {
      options = onoff;
      onoff = true;
    } else if (typeof onoff !== 'boolean') { // e.g. undefined
      onoff = true;
    }
    if (typeof options !== 'object') {
      options = {};
    }
    
    if (!this._draggable.hasOwnProperty('status')) {
      // Draggability not yet initialized
      
      // Capture difference between events
      var prevdx = 0;
      var prevdy = 0;
      
      var that = this;
      this._draggable = {
        status: false,
        ondragstart: function () {
          // Reset difference
          prevdx = 0;
          prevdy = 0;
        },
        ondrag: function (ev) {
          ev.gesture.preventDefault();
          
          var dx = that.toSpaceDistance(ev.gesture.deltaX);
          var dy = that.toSpaceDistance(ev.gesture.deltaY);
          
          that.moveBy(prevdx - dx, prevdy - dy);
          prevdx = dx;
          prevdy = dy;
        },
        onkeyup: function () {
          that.moveBy(0,-50);
        },
        onkeydown: function () {
          that.moveBy(0,+50);
        },
        onkeyleft: function () {
          that.moveBy(-50,0);
        },
        onkeyright: function () {
          that.moveBy(+50,0);
        }
      };
    }
    
    if (onoff === false) {
      // Turn draggability off
      this._draggable.status = false;
      this.off('dragstart', this._draggable.ondragstart);
      this.off('drag', this._draggable.ondrag);
      this.off('key-up', this._draggable.onkeyup);
      this.off('key-down', this._draggable.onkeydown);
      this.off('key-left', this._draggable.onkeyleft);
      this.off('key-right', this._draggable.onkeyright);
      return this;
    } // else
    
    // Avoid doubles
    if (this._draggable.status === true) {
      return this;
    } // else
    
    // Turn draggability on
    this._draggable.status = true;
    this.on('dragstart', this._draggable.ondragstart);
    this.on('drag', this._draggable.ondrag);
    this.on('key-up', this._draggable.onkeyup);
    this.on('key-down', this._draggable.onkeydown);
    this.on('key-left', this._draggable.onkeyleft);
    this.on('key-right', this._draggable.onkeyright);
    return this;
  };
  
  View.prototype.hideElement = function (taa_element) {
    // Hide an element from the viewport
    // 
    // Priority
    //   low
  };
  
  View.prototype.showElement = function (taa_element) {
    // Show a hidden element.
    // 
    // Priority
    //   low
  };
  
  
  
  // Events
  
  View.prototype.on = function (eventType, handler) {
    // Attach an event to the viewport
    // 
    // Priority
    //   high
    if (eventType === 'mousewheel') {
      // Mousewheel event
      $(this._container).on('mousewheel', handler);
    } else if (eventType.indexOf('key-') === 0) {
      // Keyboard event
      var jwertyCode = eventType.substring(4);
      this._space._onKey(jwertyCode, this, handler);
    } else {
      // Mouse or touch event
      this._hammertime.on(eventType, handler);
    }
  };
  
  View.prototype.off = function (eventType, handler) {
    // Detach an event from the viewport
    // 
    // Priority
    //   medium
    if (eventType === 'mousewheel') {
      // Mousewheel event
      $(this._container).off('mousewheel', handler);
    } else if (eventType.indexOf('key-') === 0) {
      // Keyboard event
      var jwertyCode = eventType.substring(4);
      this._space._offKey(jwertyCode, this, handler);
    } else {
      // Mouse or touch event
      this._hammertime.off(eventType, handler);
    }
  };
  
  
  
  // Pseudo-private mutators
  
  View.prototype._getDomPair = function (id) {
    if (this._domMap.hasOwnProperty(id)) {
      return this._domMap[id];
    } else {
      throw {
        name: 'UnknownElementError',
        message: 'The element with _id ' + id + ' is not yet known'
      };
    }
  };
  
  View.prototype._eachDomPair = function (iterator) {
    for (var id in this._domMap) {
      if (this._domMap.hasOwnProperty(id)) {
        iterator(this._domMap[id]);
      }
    }
  };
  
  View.prototype._createDomElement = function (elem) {
    // Called in every viewport by Space when an element is added to space.
    
    // Limit access to viewport by handing only the stuff needed.
    var domElem = elem._domAppend(this._container, this._fromSpace);
    this._domMap[elem._id] = {
      elem: elem,
      dom: domElem
    };
  };
  
  View.prototype._moveDomElement = function (elem, options) {
    // Called from Space.
    
    var domElem = this._getDomPair(elem._id).dom;
    elem._domMove(domElem, this._fromSpace);
  };
  
  View.prototype._moveEachDomElement = function (options) {
    var fs = this._fromSpace;
    this._eachDomPair(function (pair) {
      pair.elem._domMove(pair.dom, fs);
    });
  };
  
  View.prototype._scaleDomElement = function (elem, options) {
    // Called from Space.
    
    var domElem = this._getDomPair(elem._id).dom;
    elem._domScale(domElem, this._fromSpace, this._scale);
  };
  
  View.prototype._scaleEachDomElement = function (options) {
    var fs = this._fromSpace;
    var sc = this._scale;
    this._eachDomPair(function (pair) {
      pair.elem._domScale(pair.dom, fs, sc);
    });
  };
  
  View.prototype._listenDomElement = function (elem, type, callback) {
    var domElem = this._getDomPair(elem._id).dom;
    elem._domListen(domElem, type, callback);
  };
  
  
  // Constructor
  
  exports.create = function (space, container, options) {
      return new View(space, container, options);
  };
  
  ///////////////
  return exports;
}());


'use strict';

Taaspace.Text = (function () {
  //
  // Methods
  //   create(space, string, options)
  //
  var exports = {};
  /////////////////
  
  
  
  // Constructor
  
  var Text = function (space, string, options) {
    this._space = space;
    this._string = string;
  };
  
  exports.create = function (space, string, options) {
      return new Text(space, string, options);
  };
  
  Text.prototype = Taaspace.Element.create();
  
  
  
  // Pseudo-private mutators
  
  Text.prototype._domAppend = function (container, fromSpace, options) {
    // Called by viewports.
    // Appends element into DOM.
    
    var domElem = $(document.createElement('div'));
    domElem.html(this._string);
    domElem.css({
      position: 'absolute'
    });
    
    $(container).append(domElem);
    
    // Init position
    this._domMove(domElem, fromSpace, options);
    
    return domElem;
  };
  
  
  Text.prototype._domScale = function (domElem, fromSpace, scale, options) {
    
    var nw = fromSpace(this._x, this._y);
    var se = fromSpace(this._x + this._w, this._y + this._h);
    
    domElem.css({
      'font-size': scale + 'em',
      left: nw.x + 'px',
      top: nw.y + 'px',
      width: (se.x - nw.x) + 'px',
      height: (se.y - nw.y) + 'px'
    });
  };
  
  
  ///////////////
  return exports;
}());


'use strict';

Taaspace.Image = (function () {
  //
  // An image element.
  //
  // Priority
  //   medium
  // 
  var exports = {};
  /////////////////
  
  
  
  // Constructor
  
  var Img = function (space, src, options) {
    this._space = space;
    this._src = src;
    
    this._w = 100;
    this._h = 100;
    
    if (typeof options === 'object') {
      if (options.hasOwnProperty('width')) {
        this._w = options.width;
      }
      
      if (options.hasOwnProperty('height')) {
        this._h = options.height;
      }
    }
  };
  
  exports.create = function (space, src, options) {
      return new Img(space, src, options);
  };
  
  Img.prototype = Taaspace.Element.create();
  
  
  
  // Pseudo-private mutators
  
  Img.prototype._domAppend = function (container, fromSpace, options) {
    // Called by viewports.
    // Appends element into DOM.
    
    var domElem = $(document.createElement('img'));
    domElem.attr('src', this._src);
    domElem.css({
      position: 'absolute',
      width: this._w + 'px',
      height: this._h + 'px'
    });
    
    $(container).append(domElem);
    
    // Init position
    this._domMove(domElem, fromSpace, options);
    
    return domElem;
  };
  
  
  
  ///////////////
  return exports;
}());


'use strict';

Taaspace.Group = (function () {
  //
  // A set of elements.
  //
  // Priority
  //   low
  // 
  var exports = {};
  /////////////////
  
  var G = function (space) {
    this._space = space;
  };
  
  
  
  // Accessors
  
  
  
  // Mutators
  
  
  
  // Constructor
  
  exports.create = function (space, options) {
      return new G(space, options);
  };
  
  ///////////////
  return exports;
}());


'use strict';

Taaspace.Network = (function () {
  //
  // A network of elements.
  //
  // Priority
  //   medium
  // 
  var exports = {};
  /////////////////
  
  var Net = function (space, root, options) {
    this._space = space;
  };
  
  
  
  // Accessors
  
  
  
  // Mutators
  
  
  
  // Constructor
  
  exports.create = function (space, root, options) {
      return new Net(space, root, options);
  };
  
  ///////////////
  return exports;
}());


'use strict';

Taaspace.Custom = (function () {
  //
  // A custom element.
  //
  // Priority
  //   low
  // 
  var exports = {};
  /////////////////
  
  var C = function (space, el, options) {
    this._space = space;
  };
  
  
  
  // Accessors
  
  
  
  // Mutators
  
  
  
  // Constructor
  
  exports.create = function (space, el, options) {
      return new C(space, el, options);
  };
  
  ///////////////
  return exports;
}());


'use strict';

Taaspace.KeyboardManager = (function () {
  var exports = {};
  /////////////////
  
  
  
  // Constructor
  
  var Manager = function (container) {
    // Parameter
    //   container (optional, default is document)
    //     Container DOMElement where to listen the keyboard events.
    
    if (typeof container === 'undefined') {
      container = document;
    }
    
    // DOMElement
    this._c = container;
    
    // Jwerty Codes mapped to sets of object-handler pairs.
    // 
    // Invariant
    //   The value for key in _pairs is always an array.
    // 
    // An array can have multiple instances of same pair. We could restrict
    // that but on the other hand same key combinations have many forms.
    // For example the down arrow key has both "down" and "arrow-down".
    this._pairs = {};
    
    // A set of selected objects. Only handlers of selected objects are
    // fired under the key command.
    this._selected = [];
  };
  
  exports.create = function () {
    return new Manager();
  };
  
  
  
  // Public
  
  Manager.prototype.select = function (obj) {
    // Add the object to the set of selected objects.
    // 
    // Return
    //   true
    //     if objects was not already selected
    //   false
    //     otherwise
    if (_.contains(this._selected, obj)) {
      return false;
    } // else
    this._selected.push(obj);
  };
  
  Manager.prototype.isSelected = function (obj) {
    // Return
    //   true
    //     If object is selected.
    //   false
    //     otherwise
    return _.contains(this._selected, obj);
  };
  
  Manager.prototype.deselect = function (obj) {
    // Remove the object from the set of selected objects.
    // 
    // Return
    //   true
    //     if object was removed
    //   false
    //     if object was not selected in the first place
    var oldset = this._selected;
    var newset = _.without(oldset, obj);
    this._selected = newset;
    return (oldset.length > newset.length);
  };
  
  Manager.prototype.on = function (jwertyCode, obj, handler) {
    // Attach event handler to this object. The handler will be fired
    // if the keys are pressed and the object is being selected.
    // 
    // Return
    //   this
    //     for chaining
    
    var pairSetAdded = addPair(this._pairs, jwertyCode, obj, handler);
    
    // Add only one instance of listeners per jwertyCode.
    // The handler for the listener has nothing to do with the obj
    // and handler parameters.
    if (pairSetAdded) {
    
      // Attach key listener
      // https://github.com/keithamus/jwerty/blob/master/README-DETAILED.md#jwertykey
      jwerty.key(jwertyCode, function () {
        var pairset = this._pairs[jwertyCode];
        
        // Leave only pairs with the object being selected.
        var execset = _.filter(pairset, function (p) {
          return this.isSelected(p.object);
        }, this);
        
        // Call each handler in these set of selected objects,
        // the object as a context.
        _.each(execset, function (pair) {
          pair.handler.call(pair.object);
        });
      }, this, this._c);
      
    }
    
    return this;
  };
  
  Manager.prototype.off = function (jwertyCode, obj, handler) {
    // Remove event handler for this key combination.
    removePair(this._pairs, jwertyCode, obj, handler);
    return this;
  };
  
  Manager.prototype.clean = function () {
    // Remove the jwerty handlers which do not have any pairs attached.
    // This might be necessary if the app uses large number of ons and offs
    // continuously though that situation might be very rare.
    // 
    // Priority
    //   low
    throw "not yet implemented"
  };
  
  
  
  // Private
  
  var addPair = function (pairs, jwertyCode, obj, handler) {
    // Add a pair to the pairs even if one does exist.
    // 
    // Return
    //   True
    //     if pair array was added i.e. pairs has new key
    //   False
    //     otherwise
    
    var p = {
      object: obj,
      handler: handler
    };
    
    if (pairs.hasOwnProperty(jwertyCode)) {
      pairs[jwertyCode].push(p);
      return false;
    } // else
    
    pairs[jwertyCode] = [p];
    return true;
  };
  
  var getPair = function (pairs, jwertyCode, obj, handler) {
    // Check if obj-handler pair exists under jwertyCode
    // 
    // Return
    //   pair
    //     If a matching pair found
    //   null
    //     If no pair found
    if (pairs.hasOwnProperty(jwertyCode)) {
      var pairmatch = _.find(pairs[jwertyCode], function (p) {
        if (p.object === obj && p.handler === handler) {
          return true;
        }
      });
      
      // If not found, pairmatch is undefined
      if (pairmatch) {
        return pairmatch;
      } else {
        return null;
      }
    } else {
      // No even jwertyCode yet.
      return null;
    }
  };
  
  var removePair = function (pairs, jwertyCode, obj, handler) {
    // Remove the specified object-handler pair from the pairs.
    // 
    // Return
    //   true
    //     if pair removed
    //   false
    //     if no pair removed
    if (pairs.hasOwnProperty(jwertyCode)) {
      
      var oldset = pairs[jwertyCode];
      var newset = _.reject(oldset, function (p) {
        if (p.object === obj && p.handler === handler) {
          return true;
        }
      });
      
      // Replace
      pairs[jwertyCode] = newset;
      
      return (oldset.length > newset.length);
    } // else
    
    return false;
  };
  
  
  //////////////
  return exports;
}());
