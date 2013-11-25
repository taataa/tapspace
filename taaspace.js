/*! taaspace - v0.0.2 - 2013-11-25
 * https://github.com/taataa/taaspace
 *
 * Copyright (c) 2013 Akseli Palen <akseli.palen@gmail.com>;
 * Licensed under the MIT license */

(function(window, undefined) {
  'use strict';


var Taaspace = (function () {
  //
  // Usage
  //   var space = Taaspace.create()
  //
  var exports = {};
  /////////////////
  
  
  
  // Constructor
  
  var Space = function () {
    
    // Elements, like Texts and Images in space
    this._elems = [];
    
    // Viewports to the space
    this._vps = [];
    
    // Make elements referencable by id to be stored in objects.
    // Makes implementing collections easy.
    this._elemIdCounter = 0;
    
    // Maps keyboard events to selected objects.
    this._keyboardManager = Taaspace.KeyboardManager.create();
  };
  
  exports.create = function () {
    return new Space();
  };
  
  
  
  
  // Accessors
  
  Space.prototype.box = function () {
    // The bounding box for all the elements in the space. Can be used
    // to focus to all the elements.
    // 
    // Return
    //   {x0, y0, x1, y1}
    
    // Slow implementation but easier to handle for now.
    // Improve from O(n) to O(1) by checking boxes during adding
    // or removing.
    
    var minx = 0;
    var miny = 0;
    var maxx = 0;
    var maxy = 0;
    var i, b;
    if (this._elems.length > 0) {
      // If space is not empty we cannot give zero values as defaults.
      // First
      b = this._elems[0].box();
      minx = b.x0;
      miny = b.y0;
      maxx = b.x1;
      maxy = b.y1;
      
      // Rest
      for (i = 1; i < this._elems.length; i += 1) {
        b = this._elems[i].box();
        minx = Math.min(minx, b.x0);
        miny = Math.min(miny, b.y0);
        maxx = Math.max(maxx, b.x1);
        maxy = Math.max(maxy, b.y1);
      }
    }
    
    return {
      x0: minx,
      y0: miny,
      x1: maxx,
      y1: maxy
    };
  };
  
  
  
  
  // Mutators
  
  Space.prototype.pivot = function (xyOrViewportOrElement) {
    // Move the location of the space pivot so that the relations between
    // the elements stay the same. Handy to avoid number overflow in big space.
    // If no parameters specified, return 0,0
    
    var xy = xyOrViewportOrElement;
    
    if (typeof xy === 'undefined') {
      return {x:0, y:0};
    }
    
    // If is viewport or element
    if ('pivot' in xy && typeof xy.pivot === 'function') {
      xy = xy.pivot();
    }
    
    // Should move all the elements accordingly and set the scaling.
    throw 'Not implemented';
    //this._moveElemsBy(xy);
  };
  
  Space.prototype.remove = function (elem) {
    // Remove the element from the space.
    this._elems = _.reject(this._elems, function (i) { return elem === i; });
    throw 'Not implemented'; // Should remove the DOMElements too.
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
    throw 'Not implemented';
  };
  
  Space.prototype.createNetwork = function () {
    // Attach a network to be visualised. Define position of root.
    throw 'Not implemented';
  };
  
  Space.prototype.createGroup = function () {
    // Create a group for space elements.
    throw 'Not implemented';
  };
  
  Space.prototype.createViewport = function (containerEl, options) {
    // Create a new view to the space. Kind of a window to the garden.
    var vp = Taaspace.Viewport.create(this, containerEl, options);
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
    // Attach jwerty key combination event to element or viewport
    this._keyboardManager.on(code, elementOrViewport, handler);
  };
  
  Space.prototype._offKey = function (code, elementOrViewport, handler) {
    // Detach jwerty key combination
    this._keyboardManager.off(code, elementOrViewport, handler);
  };
  
  
  
  
  ///////////////
  return exports;
}());


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
  
  Elem.prototype.visibilityRatio = function (viewport) {
    // See Viewport.visibilityRatioOf
    return viewport.visibilityRatioOf(this);
  };
  
  Elem.prototype.distanceRatio = function (viewport) {
    // See Viewport.distanceRatioOf
    return viewport.distanceRatioOf(this);
  };
  
  Elem.prototype.focusRatio = function (viewport) {
    // See Viewport.focusRatioOf
    return viewport.focusRatioOf(this);
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
  
  
  
  // Constructor
  
  var View = function (space, container, options) {
    // Parameter
    //   space
    //     The space wanted to be displayed by the viewport
    //   container
    //     selector string, DOMElement or jQuery element
    //   options (optional)
    //     object of options
    // 
    // Options
    //   width
    //     Sets width of the container element. E.g. 120, '240px' or '100%'
    //   height
    //     Sets height. See width.
    
    // Normalize parameters
    if (typeof options === 'undefined') {
      options = {};
    }
    
    // Viewport to the space
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
    
    // Requires style
    $(this._container).css({
      // Absolutely positioned elements have their position in relation
      // to the parent element if the parent has position relative.
      position: 'relative',
      
      // There will be lots of elements outside of the container element.
      // The will be hidden by setting overflow to hidden.
      overflow: 'hidden',
      
      // To use em units default font size should be defined.
      'font-size': '1px'
    });
    
    // Set width and height of the viewport
    if (options.hasOwnProperty('width')) {
      // Normalize to css string with unit. Default to pixels
      if (typeof options.width === 'number') {
        options.width = options.width + 'px';
      }
      $(this._container).css('width', options.width);
    }
    if (options.hasOwnProperty('height')) {
      if (typeof options.height === 'number') {
        options.height = options.height + 'px';
      }
      $(this._container).css('height', options.height);
    }
    
    
    // The location of the left-top corner in space.
    this._x = 0;
    this._y = 0;
    
    // The location of viewport pivot in space.
    this._px = 0;
    this._py = 0;
    
    // The unit scale. Answers to the question:
    // How many units there are on the viewport for one unit in space.
    this._scale = 1;
    
    // Initialize Hammer instance where handlers can be attached to.
    this._hammertime = Hammer(this._container);
    
    // Mapping from element ids to (elem, DOMElement) pairs.
    this._domPairs = {};
    
    // Model for draggability. Defined in draggable().
    this._draggable = {};
    
    // Model for scalability. Defined in scalable().
    this._scalable = {};
    
    // fromSpace is commonly passed to functions in other modules, e.g.
    // to be used in dom operations.
    // Here we make a function that does not depend on the context, i.e.
    // value of 'this' and therefore can easily be passed.
    var that = this;
    this._fromSpace = function () {
      return that.fromSpace.apply(that, arguments);
    };
    
  };
  
  exports.create = function (space, containerEl, options) {
    return new View(space, containerEl, options);
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
    };
  };
  
  
  View.prototype.box = function () {
    // Viewport borders in space.
    // 
    // Return
    //   {x0, y0, x1, y1}
    // 
    // Priority
    //   high
    throw 'Not implemented';
  };
  
  
  View.prototype.visibilityRatioOf = function (boxOrElem) {
    // Visible area of the box divided by the area of the viewport.
    // 
    // Return
    //   number
    //     In range [0, 1]
    throw 'Not implemented';
  };
  
  View.prototype.distanceRatioOf = function (boxOrElem) {
    // A distance measure of the box independent of the size of the viewport.
    // To be more specific, the distance to the center of the box
    // from the center of the viewport
    // divided by the distance to the nearest border of the viewport
    // from the center of the viewport.
    //
    // Return
    //   number
    //     in range [0, Inf)
    throw 'Not implemented';
  };
  
  View.prototype.focusRatioOf = function (boxOrElem) {
    // A heuristic mixture of visibilityRatio and distanceRatio.
    // Tells how focused the box is currently.
    throw 'Not implemented';
  };
  
  
  View.prototype.toSpace = function (x, y) {
    // Translate point on the container DOMElement to point in space.
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
    // Translate point in space to point on the container DOMElement.
    // 
    // Usage
    //   fromSpace(12, -2.1) // {x: 200, y: 400}
    //   fromSpace({x: 12, y: -2.1}) // {x: 200, y: 400}
    // 
    // Return
    //   xyOnDom
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
    return d / this._scale;
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
    return d * this._scale;
  };
  
  
  
  // Mutators
  
  View.prototype.pivot = function (x, y) {
    // Move the point to moveTo, scale in and rotate around.
    // Does not move the view in relation to the space pivot.
    // 
    // Parameter
    //   xy (optional)
    //     Place for new pivot in space units.
    // 
    // Return
    //   xy of the current pivot, if no new pivot specified.
    //   this, if new pivot specified.
    // 
    // Priority
    //   medium
    if (typeof x === 'object') {
      y = x.y;
      x = x.x;
    } else {
      if (typeof x === 'undefined') {
        return {x: this._px, y: this._py};
      } // else
    }
    
    // Update the pivot
    this._px = x;
    this._py = y;
    
    return this;
  };
  
  
  View.prototype.moveTo = function (x, y, options) {
    // Move the viewport so that pivot will be at x, y in space.
    // 
    // Parameter
    //   x
    //   y
    //   options
    //  OR
    //   xy
    //   options
    // 
    // Options
    //   disableDomUpdate
    //     Set true to skip updating the position of the DOM elements
    //     after the move.
    // 
    // Priority
    //   high
    
    // Normalize params
    if (typeof x === 'object') {
      if (typeof y === 'object') {
        options = y;
      }
      y = x.y;
      x = x.x;
    }
    if (typeof options === 'undefined') {
      options = {};
    }
    
    
    this.moveBy(x - this._px, y - this._py, options);
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
    //   silent (default false)
    //     Set true to disable firing 'moved' event.
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
    
    // Normalize params
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
    
    this._px += dx;
    this._py += dy;
    
    if (!('disableDomUpdate' in options && options.disableDomUpdate === true)) {
      this._moveEachDomElement(options);
    }
    
    return this;
  };
  
  
  View.prototype.scale = function (multiplier, options) {
    // Multiply scale so that pivot stays still.
    // 
    // Option
    //   silent (default false)
    //     Set true to disable firing 'scaled' event.
    // 
    // Return
    //   this
    //     for chaining
    // 
    // Priority 
    //   high
    
    // Pivot on screen before scaling
    var ob = this.fromSpace(this._px, this._py);
    
    // Scaling
    this._scale *= multiplier;
    
    // Pivot on screen after scaling
    var oa = this.fromSpace(this._px, this._py);
    
    // Move space so that pivot stays in the same space
    var dx = this.toSpaceDistance(oa.x - ob.x);
    var dy = this.toSpaceDistance(oa.y - ob.y);
    this.moveBy(dx, dy, {
      disableDomUpdate: true
    });
    
    this._scaleEachDomElement(options);
    
    return this;
  };
  
  
  View.prototype.rotate = function (angle, options) {
    // Rotate the viewport around its pivot.
    // 
    // Parameter
    //   angle
    //     Degrees e.g. 30, -120.2
    //   options
    //     See Animation Options
    // 
    // Option
    //   silent (default false)
    //     Set true to disable firing 'rotated' event.
    // 
    // Return
    //   this
    //     for chaining
    // 
    // Priority
    //   low
    throw 'Not implemented';
  };
  
  
  View.prototype.focusTo = function (box, coverage, options) {
    // Move viewport so that the box is visible, middle of the viewport
    // and covers the viewport in some degree.
    // 
    // Parameter
    //   box
    //     A box object or an object with box() property.
    //   coverage (optional, default 0.8)
    //     Positive number
    //     0 = Box will be so small it can not be seen.
    //     1 = Box fits in the viewport fully i.e. no margins.
    //     1.5 = Scale the 1 by 1.5, duh.
    //   options (optional)
    //     Animation options
    // 
    // Option
    //   silent (default false)
    //     Set true to disable firing 'focused' event.
    // 
    // Priority
    //   medium
    
    // Normalize param
    if (typeof coverage === 'undefined') {
      coverage = 0.8;
    } else {
      if (typeof coverage === 'object') {
        options = coverage;
        coverage = 0.8;
      } // else coverage is coverage
    }
    if (typeof options !== 'object') {
      options = {};
    }
    if ('box' in box && typeof box.box === 'function') {
      box = box.box();
    }
    
    // Move to center
    this.pivot(this.center());
    var bcx = (box.x0 + box.x1) / 2;
    var bcy = (box.y0 + box.y1) / 2;
    this.moveTo(bcx, bcy, {
      disableDomUpdate: true
    });
    
    // Scale. How many times box should be multiplied.
    var bw = box.x1 - box.x0;
    var bh = box.y1 - box.y0;
    
    var scalex = 1;
    var scaley = 1;
    if (bw !== 0 && bh !== 0) {
      // Equation: scalex * bw = this._w
      scalex = this.width() / bw;
      scaley = this.height() / bh;
    }
    var s = Math.min(scalex, scaley);
    
    this.scale(s * coverage, options);
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
        
        // Convert a page point to a point container DOMElement
        var offset = $(that._container).offset();
        var cx = event.pageX - offset.left;
        var cy = event.pageY - offset.top;
        
        // pivot to mouse position
        var spacePivot = that.toSpace(cx, cy);
        that.pivot(spacePivot);
        
        if (delta > 0) {
          that.scale(1.25);
        } else {
          that.scale(1/1.25);
        }
      };
      op.onkeyplus = function () {
        that.pivot(that.center()).scale(1.25);
      };
      op.onkeyminus = function () {
        that.pivot(that.center()).scale(1/1.25);
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
    // Make viewport rotatable by touch gestures.
    // 
    // Priority
    //   low
    throw 'Not implemented';
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
      var delta = function () {
        // Make key moves relative to scale.
        return 50 / that._scale; // same as toSpaceDistance
      };
      
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
          that.moveBy(0,-delta());
        },
        onkeydown: function () {
          that.moveBy(0,delta());
        },
        onkeyleft: function () {
          that.moveBy(-delta(),0);
        },
        onkeyright: function () {
          that.moveBy(delta(),0);
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
  
  View.prototype.hideElement = function (element) {
    // Hide an element from the viewport
    // 
    // Priority
    //   low
    throw 'Not implemented';
  };
  
  View.prototype.showElement = function (element) {
    // Show a hidden element.
    // 
    // Priority
    //   low
    throw 'Not implemented';
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
    if (this._domPairs.hasOwnProperty(id)) {
      return this._domPairs[id];
    } else {
      throw {
        name: 'UnknownElementError',
        message: 'The element with _id ' + id + ' is not yet known'
      };
    }
  };
  
  View.prototype._eachDomPair = function (iterator) {
    for (var id in this._domPairs) {
      if (this._domPairs.hasOwnProperty(id)) {
        iterator(this._domPairs[id]);
      }
    }
  };
  
  View.prototype._createDomElement = function (elem) {
    // Called in every viewport by Space when an element is added to space.
    
    // Limit access to viewport by handing only the stuff needed.
    var domElem = elem._domAppend(this._container, this._fromSpace);
    this._domPairs[elem._id] = {
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
  
  
  
  ///////////////
  return exports;
}());


Taaspace.Text = (function () {
  //
  // Methods
  //   create(space, string, options)
  //
  var exports = {};
  /////////////////
  
  
  
  // Constructor
  
  var Text = function (space, string, options) {
    
    // Normalize parameters
    if (typeof options === 'undefined') {
      options = {};
    }
    
    this._space = space;
    this._string = string;
    
    // Font size
    if (options.hasOwnProperty('fontSize')) {
        this._fontSize = options.fontSize;
    } else {
        this._fontSize = 1;
    }
    
  };
  
  exports.create = function (space, string, options) {
      return new Text(space, string, options);
  };
  
  Text.prototype = Taaspace.Element.create();
  
  
  
  // Mutators
  
  Text.prototype.fontSize = function (newSize, options) {
    // Parameter
    //   Options
    //     Animation
    // 
    // Return
    //   this
    //     for chaining
    this._fontSize = newSize;
    this._space._scaleDomElement(this, options);
    return this;
  };
  
  Text.prototype.fontScale = function (multiplier, options) {
    // Scale font size by multiplier. Do not affect to element width.
    // 
    // Parameter
    //   Options
    //     Animation
    throw 'Not implemented';
  };
  
  
  
  // Pseudo-private mutators
  
  Text.prototype._domAppend = function (container, fromSpace, options) {
    // Called by viewports.
    // Appends element into DOM.
    // 
    // Parameter
    //   container
    //     DOMElement to append to
    //   fromSpace
    //     A function to convert space coordinates to screen coordinates.
    //   options (optional)
    // 
    // Option
    //   disableHTML
    
    // Normalize params
    if (typeof options !== 'object') {
      options = {};
    }
    
    var p = $(document.createElement('p'));
    var span = $(document.createElement('span'));
    p.append(span);
    
    var method = 'html';
    if (options.hasOwnProperty('disableHTML')) {
      if (options.disableHTML === true) {
        method = 'text';
      }
    }
    span[method](this._string);
    
    p.css({
      position: 'absolute',
    });
    
    $(container).append(p);
    
    // Init position
    this._domMove(p, fromSpace, options);
    
    return p;
  };
  
  Text.prototype._domScale = function (domElem, fromSpace, scale, options) {
    
    var nw = fromSpace(this._x, this._y);
    var se = fromSpace(this._x + this._w, this._y + this._h);
    
    // :/ We should have direct reference to the child element to
    // make things fast
    
    domElem.children().css('font-size', (this._fontSize * scale) + 'em');
    domElem.css({
      left: nw.x + 'em',
      top: nw.y + 'em',
      width: (se.x - nw.x) + 'em',
      height: (se.y - nw.y) + 'em'
    });
  };
  
  
  
  ///////////////
  return exports;
}());


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
      // https://github.com/keithamus/jwerty/blob/master/
      // README-DETAILED.md#jwertykey
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
    throw 'not yet implemented';
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


  if(typeof module === 'object' && typeof module.exports === 'object') {
    // Common JS
    // http://wiki.commonjs.org/wiki/Modules/1.1
    module.exports = Taaspace;
  } else {
    // Browsers
    window.Taaspace = Taaspace;
  }
})(this);
