/*! taaspace - v2.10.1 - 2014-03-15
 * https://github.com/taataa/taaspace
 *
 * Copyright (c) 2014 Akseli Palen <akseli.palen@gmail.com>;
 * Licensed under the MIT license */

(function(window, undefined) {
  'use strict';
  


var Taaspace = (function () {
  //
  // Usage
  //   var space = Taaspace.create('#space');
  //
  var exports = {};
  /////////////////
  
  
  
  // Constructor
  
  var Space = function (containerHtmlElement, options) {
    // Parameter
    //   containerHtmlElement
    //     Query string, HTMLElement or jQuery object
    //   options (optional)
    //     See Options
    // 
    // Option
    //   See Taaspace.Viewport.View
    
    // Normalize params
    if (typeof containerHtmlElement === 'undefined') {
      throw {
        name: 'MissingParameterError',
        message: 'No container HTMLElement specified. ' +
                 'Taaspace should have one.',
      };
    }
    if (typeof options !== 'object') {
      options = {};
    }
    
    
    // SpaceElements, like Texts and Images in space
    this._elems = [];
    
    // Make SpaceElements referencable by id to be stored in objects.
    // Makes implementing collections easy.
    this._idCounter = 0;
    
    // Maps keyboard events to selected objects.
    this._keyboardManager = Taaspace.KeyboardManager.create();
    
    // The container HTMLElement in DOM. Wrap inside jQuery object.
    // Container is a property of Space instead of property of Viewport
    // because one space can have only one container.
    this._container = jQuery(containerHtmlElement);
    
    // Viewport to the space. Handles conversions between screen and space.
    this._vp = Taaspace.Viewport.create(this, options);
    
  };
  
  exports.create = function (containerHtmlElement, options) {
    return new Space(containerHtmlElement, options);
  };
  
  // For extendability.
  // Usage: Taaspace.extension.createMyElement = function (...) {...};
  exports.extension = Space.prototype;
  
  
  
  // Accessors
  
  Space.prototype.getViewport = function () {
    // The viewport to the space.
    return this._vp;
  };
  
  Space.prototype.width = function () {
    // Width of the space. See Space.box().
    var b = this.box();
    return b.x1 - b.x0;
  };
  
  Space.prototype.height = function () {
    // Height of the space. See Space.box().
    var b = this.box();
    return b.y1 - b.y0;
  };
  
  Space.prototype.center = function () {
    // Center point of space box. Not same as origo. See Space.box().
    var b = this.box();
    return {
      x: b.x0 + (b.x1 - b.x0) / 2,
      y: b.y0 + (b.y1 - b.y0) / 2
    };
  };
  
  Space.prototype.northwest = function () {
    // Top-left point of the element in space. See Space.box().
    var b = this.box();
    return {
      x: b.x0,
      y: b.y0
    };
  };
  
  Space.prototype.northeast = function () {
    // Top-right point of the element in space. See Space.box().
    var b = this.box();
    return {
      x: b.x0 + (b.x1 - b.x0),
      y: b.y0
    };
  };
  
  Space.prototype.southwest = function () {
    // Bottom-left point of the element in space. See Space.box().
    var b = this.box();
    return {
      x: b.x0,
      y: b.y0 + (b.y1 - b.y0)
    };
  };
  
  Space.prototype.southeast = function () {
    // Bottom-right point of the element in space. See Space.box().
    var b = this.box();
    return {
      x: b.x0 + (b.x1 - b.x0),
      y: b.y0 + (b.y1 - b.y0)
    };
  };
  
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
  
  Space.prototype.origo = function (xyOrElement) {
    // Move the location of the space origo so that the relations between
    // the elements stay the same. Handy to avoid number overflow in big space.
    // If no parameters specified, return 0,0
    
    var xy = xyOrElement;
    
    if (typeof xy === 'undefined') {
      return {x:0, y:0};
    }
    
    // If is element
    if ('pivot' in xy && typeof xy.pivot === 'function') {
      xy = xy.pivot();
    }
    
    // Should move all the elements accordingly and set the scaling.
    throw 'Not implemented';
    //this._moveElemsBy(xy);
  };
  
  Space.prototype.remove = function (elem) {
    // DEPRECATED
    // Remove the SpaceElement and associated HTMLElement from the space.
    // See also SpaceElement.remove()
    
    console.warn('Space.remove(elem) is deprecated. ' +
                 'Use SpaceElem.remove() instead.');
    
    elem._removeHtmlElement();
    this._removeSpaceElement(elem);
  };
  
  Space.prototype.importSpaceElement = function (pluginElement) {
    // Call this in the extension constructor of the plugin element.
    // 
    // Usage
    //   myelement.js
    //     ...
    //     Taaspace.extension.createMyElement = function (arg1, arg2) {
    //       var myelem = MyElement.create(this, arg1, arg2);
    //       return this.importSpaceElement(myelem);
    //     };
    //     ...
    
    // Becomes SpaceElement after having _id.
    var spaceElement = this._identify(pluginElement);
    
    // Store SpaceElement into space to be able to move all.
    this._addSpaceElement(spaceElement);
    
    // Append SpaceElement to DOM
    spaceElement._appendHtmlElement();
    
    return spaceElement;
  };
  
  
  
  // Pseudo-private mutators
  
  Space.prototype._identify = function (obj) {
    // Extends the object with unique _id property (is a string).
    // Used to SpaceElements.
    obj._id = String(this._idCounter);
    this._idCounter += 1;
    return obj;
  };
  
  
  Space.prototype._addSpaceElement = function (elem) {
    // Only add the SpaceElement to the model. Does not create HTMLElement.
    // Only SpaceElement knows how to do that.
    //
    // Precondition
    //   elem must have _id property set.
    //
    // Parameter
    //   elem
    //     SpaceElement to be added
    this._validateSpaceElement(elem); // throws InvalidSpaceElement
    this._elems.push(elem);
  };
  
  Space.prototype._validateSpaceElement = function (elem) {
    // Test if elem is valid SpaceElement and throw error if not.
    // To be valid spaceElement, _id property is required.
    // 
    // Throw
    //   InvalidSpaceElement
    // 
    if ('_id' in elem && typeof elem._id === 'string') {
      return;
    } // else
    
    throw {
      name: 'InvalidSpaceElement',
      message: 'Element does not fulfill SpaceElement requirements.'
    };
  };
  
  Space.prototype._removeSpaceElement = function (elem) {
    // Only removes the SpaceElement from the model. Does not
    // remove the HTMLElement. Only SpaceElement knows how to do that.
    // Call this from SpaceElement.remove().
    // 
    // Parameter
    //   elem
    //     SpaceElement to be removed.
    this._elems = _.reject(this._elems, function (i) { return elem === i; });
  };
  
  
  Space.prototype._eachSpaceElement = function (fn) {
    // Execute function fn for each SpaceElement
    _.each(this._elems, fn);
  };
  
  
  Space.prototype._select = function (element) {
    // Selected elements' keyboard event handler are enabled.
    // With this you can set some elements selected and call
    // only the handler functions of those elements.
    this._keyboardManager.select(element);
  };
  
  Space.prototype._deselect = function (element) {
    // Deselected elements' keyboard event handlers will not fire.
    this._keyboardManager.deselect(element);
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


Taaspace.Box = (function () {
  //
  // A box object representing a rectangle.
  // 
  var exports = {};
  /////////////////
  
  
  
  // Constructor
  
  var Box = function (nwx, nwy, sex, sey) {
    // Example
    //   var b = Taaspace.Box.create(nwx, nwy, sex, sey);
    //   b.northWest();
    //   
    // Parameter
    //   nwx
    //   nwy
    //     North west X- and Y-coordinate
    //   sex
    //   sey
    //     South east X- and Y-coordinate
    // 
    
    this.x = nwx;
    this.y = nwy;
    this.w = sex - nwx;
    this.h = sey - nwy;
  };
  
  exports.create = function (nwx, nwy, sex, sey) {
    return new Box(nwx, nwy, sex, sey);
  };
  
  
  
  // Accessors
  
  Box.prototype.center = function () {
    // Center point of the box.
    // 
    // Return
    //   point
    
    return {
      x: this.x + this.w / 2,
      y: this.y + this.h / 2
    };
  };
  
  Box.prototype.northWest = function () {
    // North-west point
    // See .center(...) for details.
    
    return {
      x: this.x,
      y: this.y
    };
  };
  
  Box.prototype.northEast = function () {
    // North-east point
    // See .center(...) for details.
    
    return {
      x: this.x + this.w,
      y: this.y
    };
  };
  
  Box.prototype.southWest = function () {
    // South-west point
    // See .center(...) for details.
    
    return {
      x: this.x,
      y: this.y + this.h
    };
  };
  
  Box.prototype.southEast = function () {
    // South-east point
    // See .center(...) for details.
    
    return {
      x: this.x + this.w,
      y: this.y + this.h
    };
  };
  
  Box.prototype.width = function () {
    return this.w;
  };
  
  Box.prototype.height = function () {
    return this.h;
  };
  
  Box.prototype.area = function () {
    return this.w * this.h;
  };


  
  // Mutators
  
  Box.prototype.moveTo = function (x, y) {
    // Move the box so that the north-west corner is at x, y
    // 
    // Parameter
    //   x
    //   y
    // 
    // Parameter (Alternative)
    //   xy
    // 
    // Return
    //   this, for chaining
    
    // Normalize params
    if (typeof x === 'object') {
      y = x.y;
      x = x.x;
    }
    
    this.x = x;
    this.y = y;
    
    return this;
  };
  
  
  Box.prototype.moveBy = function (dx, dy) {
    // Move the box by delta
    // 
    // Parameter
    //   dx
    //   dy
    // 
    // Parameter (Alternative)
    //   dxdy
    // 
    // Return
    //   this
    //     for chaining
    
    // Normalize params
    if (typeof dx === 'object') {
      dy = dx.y;
      dx = dx.x;
    }
    
    this.x += dx;
    this.y += dy;
    
    return this;
  };
  
  
  
  ///////////////
  return exports;
}());

Taaspace.Point = (function () {
  //
  // Two dimensional point. Does not know anything about space or viewport.
  // 
  var exports = {};
  /////////////////
  
  
  
  // Constructor
  
  var Point = function (x, y) {
    // Example
    //   var p = Taaspace.Point.create(x, y);
    //   p.x;
    //   
    // Parameter
    //   x
    //   y
    // 
    
    this.x = x;
    this.y = y;
  };
  
  exports.create = function (x, y) {
    return new Point(x, y);
  };
  
  
  
  // Accessors
  
  Point.prototype.offset = function (dx, dy) {
    // Create a new point nearby.
    return new Point(this.x + dx, this.y + dy);
  };

  Point.prototype.copy = function () {
    return new Point(this.x, this.y);
  };

  Point.prototype.equals = function (point) {
    return (this.x === point.x && this.y === point.y);
  };


  
  // Mutators
  
  Point.prototype.moveTo = function (x, y) {
    // Move the point to new location
    // 
    // Return
    //   this, for chaining
    
    this.x = x;
    this.y = y;
    
    return this;
  };
  
  
  Point.prototype.moveBy = function (dx, dy) {
    // Move by delta
    // 
    // Return
    //   this
    //     for chaining
    
    this.x += dx;
    this.y += dy;
    
    return this;
  };
  
  
  
  ///////////////
  return exports;
}());

Taaspace.SpaceElement = (function () {
  //
  // Abstract prototype for all objects floating in the space.
  // 
  // Usage
  //   MyElemType.prototype = Taaspace.SpaceElement.create()
  //
  // Animation options
  //   ease (optional, default none)
  //     "in", "out", "in-out", "snap", "none"
  //   duration (optional)
  //       Requires ease to be set.
  //       e.g. "2s"
  //   delay (optional)
  //       Requires ease to be set.
  //       e.g. "2s"
  //   end (optional)
  //       Requires ease to be set.
  //       Function fires when the animation ends.
  //
  var exports = {};
  /////////////////
  
  
  
  // Constructor
  
  var Elem = function () {
    this._space = null;
    
    // HTMLElement wrappend in jQuery object.
    // Represents the SpaceElement.
    this._htmlElement = null;
    
    // For mouse and touch gestures
    this._hammertime = null;
    
    // Location of left top corner in space
    this._x = 0;
    this._y = 0;
    
    // Width in space
    this._w = 0;
    this._h = 0;
    
    // Pivot point
    this._px = 0;
    this._py = 0;
    
    // Events FIXME use minibus
    this._onScaled = [];
    //this._onMoved = [];
    //this._onRotated = [];
    
    // Is animation currently playing.
    // Makes possible to cancel animations.
    this._animation = null;
    
    // Model for movability. Defined in movable().
    this._movable = {};
    
    // Model for scalability. Defined in scalable().
    this._scalable = {};
  };
  
  exports.create = function () {
    return new Elem();
  };
  
  
  
  // Accessors
  
  Elem.prototype.width = function () {
    // Width of the element in space
    // 
    return this._w;
  };
  
  Elem.prototype.height = function () {
    // Height of the element in space
    // 
    return this._h;
  };
  
  Elem.prototype.center = function () {
    // Center point of the element in space
    // 
    return {
      x: this._x + this._w / 2,
      y: this._y + this._h / 2
    };
  };
  
  Elem.prototype.northwest = function () {
    // Top-left point of the element in space
    // 
    return {
      x: this._x,
      y: this._y
    };
  };
  
  Elem.prototype.northeast = function () {
    // Top-right point of the element in space
    // 
    return {
      x: this._x + this._w,
      y: this._y
    };
  };
  
  Elem.prototype.southwest = function () {
    // Bottom-left point of the element in space
    // 
    return {
      x: this._x,
      y: this._y + this._h
    };
  };
  
  Elem.prototype.southeast = function () {
    // Bottom-right point of the element in space
    // 
    return {
      x: this._x + this._w,
      y: this._y + this._h
    };
  };
  
  Elem.prototype.box = function () {
    // Bounding box of the element in the space.
    // 
    // Return
    //   {x0, y0, x1, y1}
    // 
    return {
      x0: this._x,
      y0: this._y,
      x1: this._x + this._w,
      y1: this._y + this._h
    };
  };
  
  Elem.prototype.area = function () {
    // Area of the box of the element in the space.
    // 
    // Return
    //   Number
    //     SpaceUnit^2
    // 
    return this._w * this._h;
  };
  
  Elem.prototype.visibilityRatio = function () {
    // See Viewport.visibilityRatioOf
    return this._space.getViewport().visibilityRatioOf(this);
  };
  
  Elem.prototype.distanceRatio = function () {
    // See Viewport.distanceRatioOf
    return this._space.getViewport().distanceRatioOf(this);
  };
  
  Elem.prototype.focusRatio = function () {
    // See Viewport.focusRatioOf
    return this._space.getViewport().focusRatioOf(this);
  };
  
  Elem.prototype.isInside = function (box) {
    // Return
    //   true
    //     if obj inside given box
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
  
  Elem.prototype.pivot = function (x, y) {
    // Set or get the pivot point.
    // Move the point to moveTo, scale in and rotate around.
    // Does not move the view in relation to the space origo.
    // 
    // Parameter
    //   x
    //   y
    // 
    // Parameter (Alternative)
    //   xy
    //     Place for new pivot in space units.
    // 
    // Return
    //   xy of the current pivot
    //     if no new pivot specified.
    //   this
    //     if new pivot specified.
    // 
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
  
  Elem.prototype.size = function (width, height) {
    // Parameter
    //   width
    //     in space
    //   height (optional, default to width)
    //     in space
    // 
    // Parameter (Alternative)
    //   widthheight
    //     {width: <width_in_space>, height: <height_in_space>}
    //
    // Parameter (Alternative)
    //   <nothing>
    //     Returns the current {width, height} of the element
    // 
    // Return
    //   {width, height} if no parameters
    //  OR
    //   this for chaining
    
    // Normalize parameters
    if (typeof width === 'object') {
      this._w = width.width;
      this._h = width.height;
    } else if (typeof width === 'undefined') {
      return {
        width: this._w,
        height: this._h
      };
    } else if (typeof height === 'undefined') {
      // Missing height, make square
      this._w = width;
      this._h = width;
    } else {
      this._w = width;
      this._h = height;
    }
    
    this._scaleHtmlElement();
    
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
    // Option
    //   disableHtmlUpdate
    // 
    // Return
    //   this
    //     for chaining

    
    // Normalize params
    if (typeof options === 'undefined') {
      options = {};
    }
    
    // Pivot in relation to element before scaling
    var px0 = (this._px - this._x);
    var py0 = (this._py - this._y);
    
    // Scaling
    this._w *= multiplier;
    this._h *= multiplier;
    
    // Pivot in relation to element after scaling
    var px1 = px0 * multiplier;
    var py1 = py0 * multiplier;
    
    // Move element so that the pivot is at the same position in
    // scaled coordinates.
    var dx = px0 - px1;
    var dy = py0 - py1;
    this.moveBy(dx, dy, {
      disableHtmlUpdate: true
    });
    
    // Scale the element
    if (!(options.hasOwnProperty('disableHtmlUpdate') &&
          options.disableHtmlUpdate === true)) {
      // Scale and move the HTMLElement.
      this._scaleHtmlElement(options);
    }
    
    return this;
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
    throw 'Not implemented';
  };
  
  Elem.prototype.moveTo = function (x, y, options) {
    // Move the element so that the pivot of the element
    // will be at x y in space.
    // 
    // Parameter
    //   x
    //   y
    //     New place in space
    //   options (optional)
    // 
    // Parameter (Alternative)
    //   xy
    //     Point as new place in space.
    //   options (optional)
    // 
    // Options
    //   disableHtmlUpdate
    //   + Animation Options
    // 
    // Return
    //   this
    //     for chaining
    // 
    
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
    
    // Take pivot into account
    var dx = x - this._px;
    var dy = y - this._py;
    
    return this.moveBy(dx, dy, options);
  };
  
  Elem.prototype.moveBy = function (dx, dy, options) {
    // Move the element by distance specified in space coordinates.
    // 
    // Parameter
    //   dx
    //   dy
    //     Distance in space
    //   options (optional)
    // 
    // Parameter (Alternative)
    //   dxdy
    //   options (optional)
    // 
    // Options
    //   disableHtmlUpdate
    //   + Animation Options
    // 
    // Return
    //   this
    //     for chaining
    
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
    
    var disableHtml = ('disableHtmlUpdate' in options &&
                       options.disableHtmlUpdate === true);
    if (!disableHtml) {
      this._moveHtmlElement(options);
    }
    
    return this;
  };
  
  Elem.prototype.draggable = function () {
    // DEPRECATED, alias to Elem.movable
    /* jshint multistr: true */
    console.warn('Element.draggable is deprecated. \
Use Element.movable instead.');
    return this.movable.apply(this, arguments);
  };
  
  Elem.prototype.movable = function (onoff, options) {
    // Make element movable by dragging with pointer or finger.
    // 
    // Parameter
    //   onoff (optional, default true)
    //
    // Parameter (Alternative)
    //   options (optional)
    //
    // Parameter (Alternative)
    //   onoff
    //   options
    //     Scaling limits
    // 
    // Return
    //   this
    //     for chaining
    
    // Normalize parameters
    if (typeof onoff === 'object') {
      options = onoff;
      onoff = true;
    } else if (typeof onoff !== 'boolean') { // e.g. undefined
      onoff = true;
    }
    if (typeof options !== 'object') {
      options = {};
    }
    
    if (!this._movable.hasOwnProperty('status')) {
      // Movability not yet initialized
      
      // Capture difference between events
      var prevdx = 0;
      var prevdy = 0;
      
      var that = this;
      
      var vp = this._space.getViewport();
      var delta = function () {
        // Make key moves relative to scale.
        return vp.translateDistanceToSpace(100);
      };
      
      this._movable = {
        status: false,
        ondragstart: function (ev) {
          // Reset difference
          prevdx = 0;
          prevdy = 0;
          // Prevent affecting the viewport. Viewport might be movable also.
          ev.stopPropagation();
        },
        defaultAnimOptions: {
          ease: 'in-out',
          duration: '0.3s'
        },
        animOptions: {}, // set when checking disableAnimation
        ondrag: function (ev) {
          ev.gesture.preventDefault();
          
          var dx = vp.translateDistanceToSpace(ev.gesture.deltaX);
          var dy = vp.translateDistanceToSpace(ev.gesture.deltaY);
          
          that.moveBy(dx - prevdx, dy - prevdy);
          prevdx = dx;
          prevdy = dy;
          
          // Prevent affecting the viewport. Viewport might be movable also.
          ev.stopPropagation();
        },
        onkeyup: function () {
          that.moveBy(0, -delta(), that._movable.animOptions);
        },
        onkeydown: function () {
          that.moveBy(0, delta(), that._movable.animOptions);
        },
        onkeyleft: function () {
          that.moveBy(-delta(), 0, that._movable.animOptions);
        },
        onkeyright: function () {
          that.moveBy(delta(), 0, that._movable.animOptions);
        }
      };
    }
    
    // Modify animation options before return.
    // If user specifies disableAnimation, then user wants to disable it
    // regardless of on or off.
    if (options.hasOwnProperty('disableAnimation') &&
        options.disableAnimation === true) {
      this._movable.animOptions = {};
    } else {
      // Revert back to default.
      this._movable.animOptions = this._movable.defaultAnimOptions;
    }
    
    if (onoff === false) {
      // Turn movability off
      this._movable.status = false;
      this.off('dragstart', this._movable.ondragstart);
      this.off('drag', this._movable.ondrag);
      this.off('key-up', this._movable.onkeyup);
      this.off('key-down', this._movable.onkeydown);
      this.off('key-left', this._movable.onkeyleft);
      this.off('key-right', this._movable.onkeyright);
      return this;
    } // else
    
    // Avoid double ons
    if (this._movable.status === true) {
      return this;
    } // else
    
    // Turn movability on
    this._movable.status = true;
    this.on('dragstart', this._movable.ondragstart);
    this.on('drag', this._movable.ondrag);
    this.on('key-up', this._movable.onkeyup);
    this.on('key-down', this._movable.onkeydown);
    this.on('key-left', this._movable.onkeyleft);
    this.on('key-right', this._movable.onkeyright);
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
  
  
  Elem.prototype.remove = function () {
    // Remove the element from space.
    
    this._removeHtmlElement();
    this._space._removeSpaceElement(this);
  };
  
  
  
  // Include jQuery functions.
  // In future it might be possible that some jQuery functionality
  // must be prevented. This explains why user should not use
  // the _htmlElement directly in the first place.
  _.each(
    [
    // Data
    'data', 'removeData',
    // Manipulation
    'attr', 'css', 'prop', 'removeAttr', 'removeProp',
    'addClass', 'hasClass', 'removeClass',
    // Effects
    'hide', 'show', 'toggle',
    'fadeIn', 'fadeOut', 'fadeTo', 'fadeToggle',
    'finish', 'queue', 'stop'
    ],
    function include(key) {
      // Ensure there is no namespace collisions. They may happen
      // by accident.
      if (key in Elem.prototype) {
        throw {
          name: 'NamespaceCollisionError',
          message: 'Property already defined: ' + key
        };
      } // else
      Elem.prototype[key] = function caller() {
        // Call the jQuery function.
        return this._htmlElement[key].apply(this._htmlElement, arguments);
      };
    }
  );
  
  
  
  // Events
  
  Elem.prototype.on = function (eventType, callback) {
    // Attach an event to the element
    // 
    // Usage:
    //   myimage.on('tap', function () { ... });
    
    this._eventOnHtmlElement(eventType, callback);
  };
  
  Elem.prototype.off = function (eventType, callback) {
    // Detach an event from the element
    // 
    // Priority
    //   medium
    this._eventOffHtmlElement(eventType, callback);
  };
  
  Elem.prototype.emit = function (eventType) {
    // Fire an event.
    // FIXME just a quick'n'dirty
    
    var handlerList;
    if (eventType === 'scaled') {
      handlerList = this._onScaled;
    }
    
    var i, handler;
    for (i = 0; i < handlerList.length; i += 1) {
      handler = handlerList[i];
      handler.call(this);
    }
  };
  
  Elem.prototype.select = function () {
    this._selectHtmlElement();
    this._space._select(this);
  };
  
  Elem.prototype.deselect = function () {
    this._selectHtmlElement(false);
    this._space._deselect(this);
  };
  
  
  
  // Somewhat abstract pseudo-private mutators
  
  Elem.prototype._appendHtmlElement = function (options) {
    // Post-conditions
    //   this._hammertime is a Hammer object.
    //   this._htmlElement is a jQuery object.
    //   this._htmlElement is appended to this._space._container
    throw 'Abstract function. Must be implemented by the instance.';
  };
  
  Elem.prototype._removeHtmlElement = function () {
    // Remove the HTMLElement from DOM
    // 
    // Can be overridden in the child prototype.
    if (this._htmlElement !== null) {
      this._htmlElement.remove();
      this._htmlElement = null;
    } else {
      console.warn('SpaceElement removed already. ' +
                   'Does the code an unnecessary remove call?');
    }
  };
  
  Elem.prototype._animationEnder = function (options) {
    // Helper fn. Helps to handle options and run the 
    // animation with optional end handler.
    // Used by _moveHtmlElement and _scaleHtmlElement
    
    if (options.hasOwnProperty('duration')) {
      this._animation = this._animation.duration(options.duration);
    }
    
    if (options.hasOwnProperty('delay')) {
      this._animation = this._animation.delay(options.delay);
    }
    
    // Exec animation
    var that = this;
    this._animation.end(function () {
      that._animation = null;
      if (options.hasOwnProperty('end') &&
          typeof options.end === 'function') {
        options.end.call(that);
      }
    });
  };
  
  Elem.prototype._moveHtmlElement = function (options) {
    // Move the HTMLElement on viewport.
    // 
    // Can be reimplemented in the child prototype.
    // 
    // Element knows its position in space and uses viewports fromSpace
    // function to find out position on screen.
    
    // Normalize
    if (typeof options !== 'object') {
      options = {};
    }
    
    // New place in viewport
    var vp = this._space.getViewport();
    var xy = vp.translatePointFromSpace(this._x, this._y);
    
    
    if (options.hasOwnProperty('ease')) {
      // Use animation by Move.js
      
      this._animation = move(this._htmlElement.get(0))
        .set('left', xy.x)
        .set('top', xy.y);
      this._animationEnder(options);
      
    } else {
      
      // Cancel ongoing animation
      if (this._animation !== null) {
        move(this._htmlElement.get(0))
          .set('left', xy.x)
          .set('top', xy.y)
          .duration('0s')
          .end();
        this._animation = null;
      } else {
      
        // Feels quite raw after Move.js :)
        this._htmlElement.css({
          left: xy.x + 'px',
          top: xy.y + 'px'
        });
      }
    }
  };
  
  Elem.prototype._scaleHtmlElement = function (options) {
    // Can be overridden in the child prototype.
    // 
    // Emit
    //   scaled
    //     When the scale is finished.
    
    // Normalize
    if (typeof options !== 'object') {
      options = {};
    }
    
    // Place in new viewport
    var vp = this._space.getViewport();
    var nw = vp.translatePointFromSpace(this._x, this._y);
    var se = vp.translatePointFromSpace(this._x + this._w, this._y + this._h);
    var x = nw.x;
    var y = nw.y;
    var w = (se.x - nw.x);
    var h = (se.y - nw.y);
    
    // If ease is not a valid easing function name, do not animate.
    var animate = options.hasOwnProperty('ease') &&
                  options.ease !== 'none' &&
                  typeof options.ease === 'string';
    
    if (animate) {
      // Animate
      // with Move.js
      
      this._animation = move(this._htmlElement.get(0))
        .set('left', x)
        .set('top', y)
        .set('width', w)
        .set('height', h);
      this._animationEnder(options);
      
    } else {
      // Do not animate
      
      if (this._animation !== null) {
      
        // Cancel ongoing animation
        move(this._htmlElement.get(0))
          .set('left', x)
          .set('top', y)
          .set('width', w)
          .set('height', h)
          .duration('0s')
          .end();
        this._animation = null;
        
      } else {
      
        // Raw step.
        this._htmlElement.css({
          left: x + 'px',
          top: y + 'px',
          width: w + 'px',
          height: h + 'px'
        });
      }
      
    }
    
    this.emit('scaled');
  };
  
  
  Elem.prototype._rotateHtmlElement = function () {
    throw 'Abstract function. Must be implemented by the instance.';
  };
  
  Elem.prototype._eventOnHtmlElement = function (eventType, handler) {
  
    if (eventType === 'mousewheel') {
      // Mousewheel event
      this._htmlElement.on('mousewheel', handler);
    } else if (eventType.indexOf('key-') === 0) {
      // Keyboard event
      var jwertyCode = eventType.substring(4);
      this._space._onKey(jwertyCode, this, handler);
    } else if (eventType === 'scaled') {
      this._onScaled.push(handler); // FIXME, use minibus
    } else {
      // Mouse or touch event
      this._hammertime.on(eventType, handler);
    }
  };
  
  Elem.prototype._eventOffHtmlElement = function (eventType, handler) {
    if (eventType === 'mousewheel') {
      // Mousewheel event
      this._htmlElement.off('mousewheel', handler);
    } else if (eventType.indexOf('key-') === 0) {
      // Keyboard event
      var jwertyCode = eventType.substring(4);
      this._space._offKey(jwertyCode, this, handler);
    } else if (eventType === 'scaled') {
      this._onScaled = []; // FIXME, use minibus
    } else {
      // Mouse or touch event
      this._hammertime.off(eventType, handler);
    }
  };
  
  Elem.prototype._selectHtmlElement = function (onoff) {
    // Add selection class
    // 
    // Parameter
    //   onoff (optional, default true)
    
    // Normalize
    if (typeof onoff !== 'boolean') {
      onoff = true;
    }
    this._htmlElement.toggleClass('taaspace-selected', onoff);
  };
  
  
  
  ///////////////
  return exports;
}());


Taaspace.Viewport = (function () {
  //
  // Viewport into the space.
  // 
  // Methods
  //   create(space, options)
  // 
  // Animation options
  //   ease (optional, default none)
  //     "in", "out", "in-out", "snap", "none"
  //   duration (optional)
  //       Requires ease to be set.
  //       e.g. "2s"
  //   delay (optional)
  //       Requires ease to be set.
  //       e.g. "2s"
  //   end (optional)
  //       Requires ease to be set.
  //       Function fires when the animation ends.
  //
  var exports = {};
  /////////////////
  
  
  
  // Constructor
  
  var View = function (space, options) {
    // Parameter
    //   space
    //     The space wanted to be displayed by the viewport
    //   options (optional)
    //     object of options
    // 
    // Options
    //   width
    //     Sets width of the container element. E.g. 120, '240px' or '100%'
    //     ? Is this really needed
    //   height
    //     Sets height. See width.
    //     ? Is this really needed
    
    // Normalize parameters
    if (typeof options === 'undefined') {
      options = {};
    }
    
    // Viewport to the space
    this._space = space;
    
    // The container HTMLElement wrapped in jQuery object.
    this._container = this._space._container;
    
    // Set styles and attributes of the container
    (function initContainer(c) {
    
      // Requires style
      c.css({
        // Absolutely positioned elements have their position in relation
        // to the parent element if the parent has position relative.
        position: 'relative',
        
        // There will be lots of elements outside of the container element.
        // The will be hidden by setting overflow to hidden.
        overflow: 'hidden',
      });
      
      // Set width and height of the viewport
      if (options.hasOwnProperty('width')) {
        // Normalize to css string with unit. Default to pixels
        if (typeof options.width === 'number') {
          options.width = options.width + 'px';
        }
        c.css('width', options.width);
      }
      if (options.hasOwnProperty('height')) {
        if (typeof options.height === 'number') {
          options.height = options.height + 'px';
        }
        c.css('height', options.height);
      }
    
    }(this._container));
    
    
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
    this._hammertime = Hammer(this._container.get(0));
    
    // Model for movability. Defined in movable().
    this._movable = {};
    
    // Model for scalability. Defined in scalable().
    this._scalable = {};
    
  };
  
  // Make the prototype accessible from outside.
  // Needed to import functions from Viewport to Space.
  exports._View = View;
  
  exports.create = function (space, options) {
    return new View(space, options);
  };
  
  
  
  // Accessors
  
  View.prototype.width = function () {
    // Width of viewport in space
    // 
    // Return
    //   Number
    var screenW = this._container.width();
    return this.translateDistanceToSpace(screenW);
  };
  
  View.prototype.height = function () {
    // Height of viewport in space
    // 
    // Return
    //   Number
    var screenH = this._container.height();
    return this.translateDistanceToSpace(screenH);
  };
  
  View.prototype.center = function () {
    // Center point in space
    // 
    // Return
    //   xy
    
    // Naive, does not count rotation
    return {
      x: this._x + this.width() / 2,
      y: this._y + this.height() / 2
    };
  };
  
  View.prototype.northwest = function () {
    // Top-left point of the element in space
    // 
    return {
      x: this._x,
      y: this._y
    };
  };
  
  View.prototype.northeast = function () {
    // Top-right point of the element in space
    // 
    return {
      x: this._x + this.width(),
      y: this._y
    };
  };
  
  View.prototype.southwest = function () {
    // Bottom-left point of the element in space
    // 
    return {
      x: this._x,
      y: this._y + this.height()
    };
  };
  
  View.prototype.southeast = function () {
    // Bottom-right point of the element in space
    // 
    return {
      x: this._x + this.width(),
      y: this._y + this.height()
    };
  };
  
  View.prototype.box = function () {
    // Viewport borders in space.
    // 
    // Return
    //   {x0, y0, x1, y1}
    // 
    // Naive, does not count rotation
    return {
      x0: this._x,
      y0: this._y,
      x1: this._x + this.width(),
      y1: this._y + this.height()
    };
  };
  
  View.prototype.area = function () {
    // Area of the viewport in space. spaceUnit^2
    // 
    // Return
    //   Number
    return this.width() * this.height();
  };
  
  View.prototype.visibilityRatioOf = function (boxOrElem) {
    // Visible area of the box divided by the area of the viewport.
    // 
    // Return
    //   number
    //     In range [0, 1]
    
    var box;
    
    // Validate and normalize params
    if (typeof boxOrElem === 'object') {
      if ('box' in boxOrElem && typeof boxOrElem.box === 'function') {
        box = boxOrElem.box();
      } else {
        // use boxOrElem as is.
        box = boxOrElem;
      }
    } else {
      console.error('Viewport.visibilityRatioOf() invalid parameter:',
                    boxOrElem);
      return;
    }
    
    // Viewport box
    var vbox = this.box();
    
    // Area of a rectangle inside of a rectangle.
    var iarea = Taaspace.util.intersectionArea(vbox, box);
    
    // Area of the viewport
    var varea = Taaspace.util.boxArea(vbox);
    
    // Ratio
    return iarea / varea;
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
  
  
  View.prototype.translatePointToSpace = function (x, y) {
    // Translate point on the container HTMLElement to point in space.
    // 
    // Parameter
    //   x
    //     Number in space
    //   y
    //     Number in space
    // 
    // Parameter (Alternative)
    //   xy
    //     Point object in space
    //   
    // Return
    //   xyInSpace
    
    // Normalize params
    if (typeof x === 'object') {
      y = x.y;
      x = x.x;
    }
    
    return {
      x: this._x + (x / this._scale),
      y: this._y + (y / this._scale)
    };
  };
  
  
  View.prototype.translatePointFromSpace = function (x, y) {
    // Translate point in space to point on the container HTMLElement.
    // 
    // Usage
    //   fromSpace(12, -2.1) // {x: 200, y: 400}
    //   fromSpace({x: 12, y: -2.1}) // {x: 200, y: 400}
    // 
    // Parameter
    //   x
    //     Number in space
    //   y
    //     Number in space
    // 
    // Parameter (Alternative)
    //   xy
    //     Point object in space
    // 
    // Return
    //   xyInViewport
    
    // Normalize params
    if (typeof x === 'object') {
      y = x.y;
      x = x.x;
    }
    
    return {
      x: (x - this._x) * this._scale,
      y: (y - this._y) * this._scale
    };
  };
  
  
  View.prototype.translateDistanceToSpace = function (d) {
    // Translate distance on container HTMLElement to distance in space.
    // 
    // Parameter
    //   d
    //     Number, distance in viewport
    // 
    // Return
    //   distanceInSpace
    return d / this._scale;
  };
  
  
  View.prototype.translateDistanceFromSpace = function (d) {
    // Translate distance in space to distance on container.
    // 
    // Usage
    //   translateDistanceFromSpace(2.3) // 200
    // 
    // Parameter
    //   d
    //     Number, distance in space
    // 
    // Return
    //   distanceInViewport
    return d * this._scale;
  };
  
  
  
  // Mutators
  
  View.prototype.pivot = function (x, y) {
    // Move the point to moveTo, scale in and rotate around.
    // Does not move the view in relation to the space origo.
    // 
    // Parameter
    //   x
    //   y
    // 
    // Parameter (Alternative)
    //   xy
    //     Place for new pivot in space units.
    // 
    // Return
    //   xy of the current pivot, if no new pivot specified.
    //   this, if new pivot specified.
    // 
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
    // 
    // Parameter (Alternative)
    //   xy
    //   options
    // 
    // Options
    //   disableHtmlUpdate
    //     Set true to skip updating the position of the HTMLElements
    //     after the move.
    // 
    
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
    
    // Remember that _px and _py are space coordinates
    var dx = x - this._px;
    var dy = y - this._py;
    
    return this.moveBy(dx, dy, options);
  };
  
  
  View.prototype.moveBy = function (dx, dy, options) {
    // Move the viewport by ...
    // 
    // Parameter
    //   dx
    //   dy
    //   options (optional)
    // 
    // Parameter (Alternative)
    //   dxdy
    //   options (optional)
    // 
    // Options
    //   silent (default false) NOT IMPLEMENTED
    //     Set true to disable firing 'moved' event.
    //   disableHtmlUpdate
    //     Set true to skip updating the position of the HTMLElements
    //     after the move.
    //   +Animation Options
    // 
    // Return
    //   this
    //     for chaining
    
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
    
    if (!('disableHtmlUpdate' in options &&
          options.disableHtmlUpdate === true)) {
      // Move the HTMLElements. A place for optimization if all the elements
      // could be moved with a single command.
      this._space._eachSpaceElement(function (el) {
        el._moveHtmlElement(options);
      });
    }
    
    return this;
  };
  
  
  View.prototype.scale = function (multiplier, options) {
    // Multiply scale so that pivot stays still.
    // 
    // Option
    //   silent (default false)
    //     Set true to disable firing 'scaled' event.
    //   disableHtmlUpdate (default false)
    // 
    // Return
    //   this
    //     for chaining
    
    // Normalize params
    if (typeof options === 'undefined') {
      options = {};
    }
    
    // Pivot on viewport before scaling
    var ob = this.translatePointFromSpace(this._px, this._py);
    
    // Scaling
    this._scale *= multiplier;
    
    // Pivot on screen after scaling
    var oa = this.translatePointFromSpace(this._px, this._py);
    
    // Move space so that pivot stays in the same space
    var dx = this.translateDistanceToSpace(oa.x - ob.x);
    var dy = this.translateDistanceToSpace(oa.y - ob.y);
    this.moveBy(dx, dy, {
      disableHtmlUpdate: true
    });
    
    // Scale the elements
    if (!(options.hasOwnProperty('disableHtmlUpdate') &&
          options.disableHtmlUpdate === true)) {
      // Scale and move the HTMLElements. A place for optimization if all
      // the elements could be moved with a single command.
      this._space._eachSpaceElement(function (el) {
        el._scaleHtmlElement(options);
      });
    }
    
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
    //   disableHtmlUpdate (default false)
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
    // 
    // Option
    //   silent (default false)
    //     Set true to disable firing 'focused' event.
    //   +Animation options
    // 
    
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
      disableHtmlUpdate: true
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
  
  View.prototype.draggable = function () {
    // DEPRECATED, alias to View.movable
    /* jshint multistr: true */
    console.warn('Viewport.draggable is deprecated. \
Use Viewport.movable instead.');
    return this.movable.apply(this, arguments);
  };
  
  View.prototype.movable = function (onoff, options) {
    // Make viewport movable aka pannable aka translatable.
    // 
    // Parameter
    //   onoff (optional, default true)
    //     True to turn movability on (default).
    //     False to turn movability off.
    //   options (optional)
    //     Object, Panning limits in space coordinates.
    // 
    // Options
    //   disableKeys, not implemented yet
    //   invertKeys, not implemented yet
    //   disableAnimation
    //     Do not use animation with discrete moves like with arrow keys.
    //     Is not so smooth but computationally lightweight.
    //   
    // Return
    //   this
    //     for chaining
    
    // Normalize parameters
    if (typeof onoff === 'object') {
      options = onoff;
      onoff = true;
    } else if (typeof onoff !== 'boolean') { // e.g. undefined
      onoff = true;
    }
    if (typeof options !== 'object') {
      options = {};
    }
    
    if (!this._movable.hasOwnProperty('status')) {
      // Movability not yet initialized
      
      // Capture difference between events
      var prevdx = 0;
      var prevdy = 0;
      
      var that = this;
      var delta = function () {
        // Make key moves relative to scale.
        return 100 / that._scale; // same as toSpaceDistance
      };
      
      this._movable = {
        status: false,
        ondragstart: function () {
          // Reset difference
          prevdx = 0;
          prevdy = 0;
        },
        defaultAnimOptions: {
          ease: 'in-out',
          duration: '0.3s'
        },
        animOptions: {}, // set when checking disableAnimation
        ondrag: function (ev) {
          ev.gesture.preventDefault();
          
          var dx = that.translateDistanceToSpace(ev.gesture.deltaX);
          var dy = that.translateDistanceToSpace(ev.gesture.deltaY);
          
          that.moveBy(prevdx - dx, prevdy - dy);
          prevdx = dx;
          prevdy = dy;
        },
        onkeyup: function () {
          that.moveBy(0, -delta(), that._movable.animOptions);
        },
        onkeydown: function () {
          that.moveBy(0, delta(), that._movable.animOptions);
        },
        onkeyleft: function () {
          that.moveBy(-delta(), 0, that._movable.animOptions);
        },
        onkeyright: function () {
          that.moveBy(delta(), 0, that._movable.animOptions);
        }
      };
    }
    
    // Modify animation options before return.
    // If user specifies disableAnimation, then user wants to disable it
    // regardless of on or off.
    if (options.hasOwnProperty('disableAnimation') &&
        options.disableAnimation === true) {
      this._movable.animOptions = {};
    } else {
      // Revert back to default.
      this._movable.animOptions = this._movable.defaultAnimOptions;
    }
    
    if (onoff === false) {
      // Turn movability off
      this._movable.status = false;
      this.off('dragstart', this._movable.ondragstart);
      this.off('drag', this._movable.ondrag);
      this.off('key-up', this._movable.onkeyup);
      this.off('key-down', this._movable.onkeydown);
      this.off('key-left', this._movable.onkeyleft);
      this.off('key-right', this._movable.onkeyright);
      return this;
    } // else
    
    // Avoid doubles
    if (this._movable.status === true) {
      return this;
    } // else
    
    // Turn movability on
    this._movable.status = true;
    this.on('dragstart', this._movable.ondragstart);
    this.on('drag', this._movable.ondrag);
    this.on('key-up', this._movable.onkeyup);
    this.on('key-down', this._movable.onkeydown);
    this.on('key-left', this._movable.onkeyleft);
    this.on('key-right', this._movable.onkeyright);
    return this;
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
    // 
    // Options
    //   disableKeys
    //   invertKeys, not implemented yet
    //   + Animation options
    // 
    // Return
    //   this
    //     for chaining
    // 
    // Priority
    //   high
    
    // Normalize parameters
    if (typeof onoff === 'object') {
      options = onoff;
      onoff = true;
    } else if (typeof onoff !== 'boolean') { // e.g. undefined
      onoff = true;
    }
    if (typeof options !== 'object') {
      options = {};
    }
    
    // We need this, see below
    var that = this;
    
    // Initialize if first time.
    if (!this._scalable.hasOwnProperty('status')) {
      this._scalable = {
        status: false,
        animationOptions: {},
        disableKeys: false,
        onmousewheel: function (event, delta, deltax, deltay) {
          
          // Convert a page point to a point container HTMLElement
          var offset = that._container.offset();
          var cx = event.pageX - offset.left;
          var cy = event.pageY - offset.top;
          
          // pivot to mouse position
          var spacePivot = that.translatePointToSpace(cx, cy);
          that.pivot(spacePivot);
          
          if (delta > 0) {
            that.scale(1.25, that._scalable.animationOptions);
          } else {
            that.scale(1/1.25, that._scalable.animationOptions);
          }
        },
        onkeyplus: function () {
          if (that._scalable.disableKeys) {
            return;
          } // else
          that
            .pivot(that.center())
            .scale(1.25, that._scalable.animationOptions);
        },
        onkeyminus: function () {
          if (that._scalable.disableKeys) {
            return;
          } // else
          that
            .pivot(that.center())
            .scale(1/1.25, that._scalable.animationOptions);
        }
      };
    }
    
    
    // Animation options can change independent of onoff
    _.each(['ease', 'duration', 'delay'], function (p) {
      if (options.hasOwnProperty(p)) {
        that._scalable.animationOptions[p] = options[p];
      }
    });
    
    
    if (onoff === false) {
      // Turn scalablity off
      this._scalable.status = false;
      this.off('mousewheel', this._scalable.onmousewheel);
      this.off('key-plus', this._scalable.onkeyplus);
      this.off('key-subtract', this._scalable.onkeyminus);
      return this;
    } // else
    
    // Avoid doubles
    if (this._scalable.status === true) {
      return this;
    } // else
    
    // Turn scalability on
    this._scalable.status = true;
    this.on('mousewheel', this._scalable.onmousewheel);
    this.on('key-plus', this._scalable.onkeyplus);
    this.on('key-subtract', this._scalable.onkeyminus);
    return this;
  };
  
  View.prototype.rotatable = function (onoff, options) {
    // Make viewport rotatable by touch gestures.
    // 
    // Priority
    //   low
    throw 'Not implemented';
  };
  
  
  
  
  // Events
  
  View.prototype.on = function (eventType, handler) {
    // Attach an event to the viewport
    
    if (eventType === 'mousewheel') {
      // Mousewheel event
      this._container.on('mousewheel', handler);
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
    
    if (eventType === 'mousewheel') {
      // Mousewheel event
      this._container.off('mousewheel', handler);
    } else if (eventType.indexOf('key-') === 0) {
      // Keyboard event
      var jwertyCode = eventType.substring(4);
      this._space._offKey(jwertyCode, this, handler);
    } else {
      // Mouse or touch event
      this._hammertime.off(eventType, handler);
    }
  };
  
  View.prototype.select = function () {
    // Select the viewport to react to keyboard events.
    // 
    // Return
    //   this
    //     for chaining
    this._selectHtmlElement(true);
    this._space._select(this);
    return this;
  };
  
  View.prototype.deselect = function () {
    // Viewport does not react to keyboard events anymore.
    // 
    // Return
    //   this
    //     for chaining
    this._selectHtmlElement(false);
    this._space._deselect(this);
    return this;
  };
  
  
  
  // Pseudo-private
  
  View.prototype._selectHtmlElement = function (onoff) {
    // Add selection class to container
    // 
    // Parameter
    //   onoff (optional, default true)
    
    // Normalize
    if (typeof onoff !== 'boolean') {
      onoff = true;
    }
    this._container.toggleClass('taaspace-selected', onoff);
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
  
  // Inherit from SpaceElement
  Text.prototype = Taaspace.SpaceElement.create();
  
  // Extend Taaspace
  Taaspace.extension.createText = function (string, options) {
    var txt = new Text(this, string, options);
    return this.importSpaceElement(txt);
  };
  
  
  
  // Mutators
  
  Text.prototype.text = function (newText, options) {
    // Parameter
    //   newText (optional)
    //     String. If omitted, returns the original text.
    //   options (optional)
    //     Object
    // 
    // Options
    //   disableHtml
    //     Handle string as plain text. See jQuery .text() and .html()


    // Normalize params

    if (typeof newText === 'string') {
      if (typeof options !== 'object') {
        options = {};
      }

      this._string = newText;

      // The content. Plain text or HTML.
      var method = 'html';
      if (options.hasOwnProperty('disableHTML')) {
        if (options.disableHTML === true) {
          method = 'text';
        }
      }
      this._htmlElement[method](this._string);
      return this; // chain 
    }
    return this._string;
  };

  Text.prototype.fontSize = function (newSize, options) {
    // Parameter
    //   options
    // 
    // Options
    //   Animation NOT IMPLEMENTED YET
    //   disableHtmlUpdate NOT IMPLEMENTED YET
    // 
    // Return
    //   this
    //     for chaining
    this._fontSize = newSize;
    this._scaleHtmlElement(options);
    return this;
  };
  
  Text.prototype.fontScale = function (multiplier, options) {
    // Scale font size by multiplier. Do not affect to element width.
    // 
    // Parameter
    //   options
    // 
    // Options
    //   Animation NOT IMPLEMENTED YET
    //   disableHtmlUpdate NOT IMPLEMENTED YET
    throw 'Not implemented';
  };
  
  
  
  // Pseudo-private mutators
  
  Text.prototype._appendHtmlElement = function (options) {
    // Called by space.
    // Appends HTMLElement into DOM.
    // 
    // Parameter
    //   options (optional)
    // 
    // Option
    //   disableHTML
    //     See .text()
    
    // Normalize params
    if (typeof options !== 'object') {
      options = {};
    }
    
    var p = $(document.createElement('p'));
    this._htmlElement = p;
    
    // Mouse and touch gestures
    this._hammertime = Hammer(this._htmlElement[0]);
    
    // The content. Plain text or HTML.
    var method = 'html';
    if (options.hasOwnProperty('disableHTML')) {
      if (options.disableHTML === true) {
        method = 'text';
      }
    }
    p[method](this._string);
    
    // Important attributes and styles.
    p.attr({
      'class': Taaspace.SPACE_ELEMENT_CLASS + ' taaspace-text'
    });
    p.css({
      position: 'absolute'
    });
    
    this._space._container.append(p);
    
    // Init position
    this._moveHtmlElement(options);
    
    return p;
  };
  
  Text.prototype._scaleHtmlElement = function (options) {
    // Parameter
    //   options
    // 
    // Option
    //   Animation options
    
    /*var vp = this._space.getViewport();
    var nw = vp.translatePointFromSpace(this._x, this._y);
    var se = vp.translatePointFromSpace(this._x + this._w, this._y + this._h);
    var size = vp.translateDistanceFromSpace(this._fontSize);
    
    this._htmlElement.css({
      'font-size': size + 'px',
      left: nw.x + 'px',
      top: nw.y + 'px',
      width: (se.x - nw.x) + 'px',
      height: (se.y - nw.y) + 'px'
    });*/
    
    // Normalize
    if (typeof options !== 'object') {
      options = {};
    }
    
    // Place in new viewport
    var vp = this._space.getViewport();
    var nw = vp.translatePointFromSpace(this._x, this._y);
    var se = vp.translatePointFromSpace(this._x + this._w, this._y + this._h);
    var size = vp.translateDistanceFromSpace(this._fontSize);
    var x = nw.x;
    var y = nw.y;
    var w = (se.x - nw.x);
    var h = (se.y - nw.y);
    
    // If ease is not a valid easing function name, do not animate.
    var animate = options.hasOwnProperty('ease') &&
                  options.ease !== 'none' &&
                  typeof options.ease === 'string';
    
    if (animate) {
      // Animate
      // with Move.js
      
      this._animation = move(this._htmlElement.get(0))
        .set('left', x)
        .set('top', y)
        .set('width', w)
        .set('height', h)
        .set('font-size', size);
      this._animationEnder(options);
      
    } else {
      // Do not animate
      
      if (this._animation !== null) {
      
        // Cancel ongoing animation
        move(this._htmlElement.get(0))
          .set('left', x)
          .set('top', y)
          .set('width', w)
          .set('height', h)
          .set('font-size', size)
          .duration('0s')
          .end();
        this._animation = null;
        
      } else {
      
        // Raw step.
        this._htmlElement.css({
          'font-size': size + 'px',
          left: x + 'px',
          top: y + 'px',
          width: w + 'px',
          height: h + 'px'
        });
      }
    }
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
    
    this._w = null; // Set at the latest when appending HTML
    this._h = null;
    
    if (typeof options === 'object') {
      if (options.hasOwnProperty('width')) {
        this._w = options.width;
      }
      
      if (options.hasOwnProperty('height')) {
        this._h = options.height;
      }
    }
  };
  
  // Inherit from SpaceElement
  Img.prototype = Taaspace.SpaceElement.create();
  
  // Extend Taaspace
  Taaspace.extension.createImage = function (src, options) {
    var image = new Img(this, src, options);
    return this.importSpaceElement(image);
  };
  
  
  
  // Mutators

  Img.prototype.sourceImage = function (newSrc) {
    // Change source image path or return the current.
    if (typeof newSrc === 'undefined') {
      return this._src;
    } // else
    this._htmlElement.attr('src', newSrc);
    return this;
  };

  
  
  // Pseudo-private mutators
  
  Img.prototype._appendHtmlElement = function (options) {
    // Called by viewports.
    // Appends HTMLElement into DOM.
    
    var el = jQuery(document.createElement('img'));
    this._htmlElement = el;
    
    // Mouse and touch gestures
    this._hammertime = Hammer(this._htmlElement[0]);
    
    // Required styles and attributes.
    el.attr({
      'src': this._src,
      'class': Taaspace.SPACE_ELEMENT_CLASS + ' taaspace-image'
    });
    el.css({
      position: 'absolute',
      width: this._w + 'px',
      height: this._h + 'px'
    });
    this._space._container.append(el);
    
    
    // Init position
    this._moveHtmlElement(options);
    
    return el;
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
  // A network of elements. A breadth-first search based algorithm
  // to help handling dynamically loaded content and created SpaceElements.
  // 
  var exports = {};
  /////////////////
  
  
  
  // Constructor
  
  var Net = function (space, kwargs) {
    
    // Validate parameters
    var valid = false;
    if (typeof kwargs === 'object') {
      if (kwargs.hasOwnProperty('create') &&
          typeof kwargs.create === 'function' &&
          kwargs.hasOwnProperty('neighbors') &&
          typeof kwargs.neighbors === 'function' &&
          kwargs.hasOwnProperty('remove') &&
          typeof kwargs.remove === 'function') {
        valid = true;
      }
    }
    if (!valid) {
      var err = {
        name: 'InvalidParameterError',
        message: 'Missing parameter or parameter type is not a function.'
      };
      console.error(err.name, err.message);
      throw err;
    }
    
    this._space = space;
    this._create = kwargs.create;
    this._neighbors = kwargs.neighbors;
    this._remove = kwargs.remove;
    
    this._vertices = [];
  };
  
  // Extend Taaspace
  Taaspace.extension.createNetwork = function (kwargs) {
    // Usage
    //   var net = space.createNetwork({
    //     create: function (space, obj, done, predecessor, depth) {
    //     },
    //     neighbors: function (space, obj, done, predecessor, depth) {
    //     },
    //     remove: function (space, obj, done) {
    //     }
    //   });
    //   
    // Parameter
    //   kwargs
    //     A set of parameters, some of them are required.
    //     See Keyword Arguments.
    // 
    // Keyword Arguments
    //   create (required)
    //     Function that defines how to create the SpaceElement(s) of the
    //     given object. Must call done when finished.
    //   neighbors (required)
    //     Function that defines which objects are adjancent to the 
    //     given object. Must call done with the adjacent in an array.
    //   remove (required)
    //     Function that defines how to remove the SpaceElement(s) of the
    //     given object. Must call done when finished.
    
    var network = new Net(this, kwargs);
    return network;
  };
  
  
  
  // Accessors
  
  
  
  // Mutators
  
  Net.prototype.spreadFrom = function (rootObj, toDepth, callback) {
    // Create the local neighborhood of the rootObj and
    // remove the rest of the network.
    // 
    // Parameter
    //   obj
    //     Any object in a role of a vertex in the network. Must have
    //     type of object. In future strings and ints also?
    //   toDepth (optional, default 3)
    //     The creating distance. To how many steps/edges/neighbors ahead will
    //     be created with the given create function. The ones farther away
    //     will be removed with the given remove function.
    //   callback (optional)
    //     Function to be called when spreadFrom finishes.
    // 
    // Throws
    //   InvalidParameterError
    //     if rootObj is not object.
    // 
    // Will permanently flag the objects with property '_taaspace_isDrawn'
    
    // Normalize parameters
    if (typeof rootObj !== 'object') {
      var err = {
        name: 'InvalidParameterError',
        message: 'rootObj must be an object'
      };
      console.error(err.name, err.message);
      throw err;
    }
    if (typeof toDepth !== 'number') {
      toDepth = 3;
    }
    if (typeof callback !== 'function') {
      callback = function () {};
    }
    
    var that = this;
    var isCreated = '_taaspace_isCreated';
    var removeMe = '_taaspace_removeMe';
    
    
    // First, mark all the known vertices with removeMe mark
    that._each(function (vertex) {
      vertex[removeMe] = true;
    });
    
    // Use breadth first search to find ones near the root.
    // Create the ones that haven't been created and remove the removeMe mark
    // from reached ones.
    Taaspace.graph.bfs({
      
      root: rootObj,
      
      handler: function (vertex, spreadTo, end, predecessor, distance) {
        
        // Mark to be keeped by removing the removeMe mark.
        delete vertex[removeMe];
        
        var done = function () {
          
          // Do not continue to this direction if too far.
          if (distance + 1 > toDepth) {
            spreadTo([]);
            return;
          }
          
          that._neighbors(that.space, vertex, spreadTo, predecessor, distance);
        };
        
        if (!vertex.hasOwnProperty(isCreated)) {
          // Is done only once per vertex during the lifespan of the vertex.
          vertex[isCreated] = true;
          that._vertices.push(vertex);
          that._create(that._space, vertex, done, predecessor, distance);
        } else {
          // Skip creating, go get the neighbors.
          done();
        }
      },
      
      finish: function () {
        // Remove all with the remove me mark by reconstructing the
        // list of the non-removed ones.
        var newVertices = [];
        that._asyncEach(function (vertex, next) {
          if (vertex.hasOwnProperty(removeMe)) {
            that._remove(that._space, vertex, function done() {
              delete vertex[removeMe];
              delete vertex[isCreated];
              next();
            });
          } else {
            newVertices.push(vertex);
            next();
          }
        });
        that._vertices = newVertices;
        
        // Everything finished.
        callback();
      }
    
    });
    
  };
  
  
  
  Net.prototype.remove = function () {
    // Remove the network and all the elements in it.
    throw 'Not implemented.';
  };
  
  
  
  // Pseudo-private functions
  
  Net.prototype._each = function (iterator) {
    // Synchronic for-each.
    // Execute iterator function for each currently existing object of
    // the network.
    var i;
    var list = this._vertices;
    for (i = 0; i < list.length; i += 1) {
      iterator(list[i], i, list);
    }
  };
  
  Net.prototype._asyncEach = function (iterator) {
    // Asynchronic for-each.
    
    var i = 0;
    var list = this._vertices;
    var next = function next() {
      if (i >= list.length) {
        return;
      }
      i += 1; // tail recursion
      iterator(list[i], next, i - 1, list);
    };
    next(); // start
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
    //     Container HTMLElement where to listen the keyboard events.
    
    if (typeof container === 'undefined') {
      container = document;
    }
    
    // HTMLElement
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
    // Do the actual event unbinding with clean().
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


Taaspace.Grid = (function () {
  //
  // A grid to help layouting the elements to the space.
  // 
  var exports = {};
  /////////////////
  
  
  
  // Constructor
  
  var Grid = function (box, kwargs) {
    // Example
    //   var grid = space.createGrid(
    //     mySpaceElement,
    //     {
    //       columns: 2,
    //       rows: 2,
    //       columnMargin: 0.1,
    //       rowMargin: 0.1
    //     }
    //   );
    //   mySpaceElement.moveTo(grid.northWest(-2, 1));
    //   
    // Parameter
    //   box
    //     Box object or an object with box function property.
    //     Defines the cell size of the grid. See kwargs for dividing
    //     to multiple columns and rows.
    //   kwargs
    //     A set of optional parameters.
    //     See Keyword Arguments.
    // 
    // Keyword Arguments
    //   columns (optional, default 1)
    //     Integer. How many columns fits to the given box.
    //   rows (optional, default 1)
    //     Integer. How many rows fits to the given box.
    //   columnMargin (optional, default 0)
    //     Number. How much space should be left between the columns.
    //     A distance in space.
    //   rowMargin (optional, default 0)
    //     Number. How much space should be left between the rows.
    //     A distance in space.
    
    // Normalize parameters
    var columns = 1;
    var rows = 1;
    var columnMargin = 0;
    var rowMargin = 0;
    if ('box' in box) {
      if (typeof box.box === 'function') {
        box = box.box();
      } else {
        box = box.box;
      }
    } // else assume valid box object
    if (typeof kwargs === 'object') {
      if (kwargs.hasOwnProperty('columns')) {
        if (kwargs.columns !== 0) {
          columns = kwargs.columns;
        }
      }
      if (kwargs.hasOwnProperty('rows')) {
        if (kwargs.rows !== 0) {
          rows = kwargs.rows;
        }
      }
      if (kwargs.hasOwnProperty('columnMargin')) {
        columnMargin = kwargs.columnMargin;
      }
      if (kwargs.hasOwnProperty('rowMargin')) {
        rowMargin = kwargs.rowMargin;
      }
    }
    
    var boxWidth  = box.x1 - box.x0;
    var boxHeight = box.y1 - box.y0;
    
    // Grid without margins
    this.baseX = box.x0;
    this.baseY = box.y0;
    this.baseWidth  = boxWidth  / columns;
    this.baseHeight = boxHeight / rows;
    
    // Precalculate the halves.
    this.marginWidth  = columnMargin / 2;
    this.marginHeight = rowMargin    / 2;
  };
  
  // Extend Taaspace
  Taaspace.extension.createGrid = function (box, kwargs) {
    // See Grid.
    return new Grid(box, kwargs);
  };
  
  
  
  // Accessors
  
  Grid.prototype.center = function (x, y) {
    // Center point of a cell at x, y
    // 
    // Parameter
    //   x
    //     Integer
    //   y
    //     Integer
    // 
    // Parameter (Alternative)
    //   xy
    //     A point object (integer point).
    // 
    // Return
    //   point
    //     in space.
    
    // Normalize parameters
    if (typeof x === 'object') {
      y = x.y;
      x = x.x;
    }
    
    // No need to care about margins because center.
    return {
      x: this.baseX + ((x + 0.5) * this.baseWidth ),
      y: this.baseY + ((y + 0.5) * this.baseHeight)
    };
  };
  
  Grid.prototype.northWest = function (x, y) {
    // North-west point of a cell at x, y
    // See .center(...) for details.
    
    // Normalize parameters
    if (typeof x === 'object') {
      y = x.y;
      x = x.x;
    }
    
    return {
      x: this.baseX + (x * this.baseWidth ) + this.marginWidth,
      y: this.baseY + (y * this.baseHeight) + this.marginHeight
    };
  };
  
  Grid.prototype.northEast = function (x, y) {
    // North-east point of a cell at x, y
    // See .center(...) for details.
    
    // Normalize parameters
    if (typeof x === 'object') {
      y = x.y;
      x = x.x;
    }
    
    return {
      x: this.baseX + ((x + 1) * this.baseWidth ) - this.marginWidth,
      y: this.baseY + ( y      * this.baseHeight) + this.marginHeight
    };
  };
  
  Grid.prototype.southWest = function (x, y) {
    // South-west point of a cell at x, y
    // See .center(...) for details.
    
    // Normalize parameters
    if (typeof x === 'object') {
      y = x.y;
      x = x.x;
    }
    
    return {
      x: this.baseX + ( x      * this.baseWidth ) + this.marginWidth,
      y: this.baseY + ((y + 1) * this.baseHeight) - this.marginHeight
    };
  };
  
  Grid.prototype.southEast = function (x, y) {
    // South-east point of a cell at x, y
    // See .center(...) for details.
    
    // Normalize parameters
    if (typeof x === 'object') {
      y = x.y;
      x = x.x;
    }
    
    return {
      x: this.baseX + ((x + 1) * this.baseWidth ) - this.marginWidth,
      y: this.baseY + ((y + 1) * this.baseHeight) - this.marginHeight
    };
  };
  
  Grid.prototype.box = function (x, y) {
    // Box of the cell at x, y
    // See .center(...) for details.
    
    // Normalize parameters
    if (typeof x === 'object') {
      y = x.y;
      x = x.x;
    }
    
    return {
      x0: this.baseX + ( x      * this.baseWidth ) + this.marginWidth ,
      y0: this.baseY + ( y      * this.baseHeight) + this.marginHeight,
      x1: this.baseX + ((x + 1) * this.baseWidth ) - this.marginWidth ,
      y1: this.baseY + ((y + 1) * this.baseHeight) - this.marginHeight
    };
  };
  
  
  Grid.prototype.size = function (spanX, spanY) {
    // Size of a cell or multiple cells in space.
    // 
    // Parameter
    //   spanX (optional, default 1)
    //     Number of columns to include.
    //   spanY (optional, default 1)
    //     Number of rows to include.
    // 
    // Return
    //   Size object
    
    // Normalize parameters
    if (typeof spanX !== 'number') { spanX = 1; }
    if (typeof spanY !== 'number') { spanY = 1; }
    
    return {
      width:  this.baseWidth  * spanX - this.marginWidth  * 2,
      height: this.baseHeight * spanY - this.marginHeight * 2
    };
  };
  
  Grid.prototype.width = function (spanX) {
    // Width of a cell or multiple cells in space.
    // 
    // Parameter
    //   spanX (optional, default 1)
    //     Number of columns to include.
    // 
    // Return
    //   Width in space.
    
    // Normalize parameters
    if (typeof spanX !== 'number') { spanX = 1; }
    
    return this.baseWidth  * spanX - this.marginWidth  * 2;
  };
  
  Grid.prototype.height = function (spanY) {
    // Height of a cell or multiple cells in space.
    // 
    // Parameter
    //   spanY (optional, default 1)
    //     Number of rows to include.
    // 
    // Return
    //   Height in space.
    
    // Normalize parameters
    if (typeof spanY !== 'number') { spanY = 1; }
    
    return this.baseHeight * spanY - this.marginHeight * 2;
  };
  
  
  
  // Mutators
  
  Grid.prototype.moveTo = function (x, y) {
    // Move the grid so that the origo of the grid
    // will be at x, y in space.
    // 
    // Parameter
    //   x
    //   y
    // 
    // Parameter (Alternative)
    //   xy
    // 
    // Return
    //   this
    
    // Normalize params
    if (typeof x === 'object') {
      y = x.y;
      x = x.x;
    }
    
    // Remember that _px and _py are space coordinates
    var dx = x - this.baseX;
    var dy = y - this.baseY;
    
    return this.moveBy(dx, dy);
  };
  
  
  Grid.prototype.moveBy = function (dx, dy) {
    // Move the grid by delta
    // 
    // Parameter
    //   dx
    //   dy
    // 
    // Parameter (Alternative)
    //   dxdy
    // 
    // Return
    //   this
    //     for chaining
    
    // Normalize params
    if (typeof dx === 'object') {
      dy = dx.y;
      dx = dx.x;
    }
    
    this.baseX += dx;
    this.baseY += dy;
    
    return this;
  };
  
  
  
  ///////////////
  return exports;
}());


Taaspace.graph = (function () {
  //
  // Graph algorithms
  // 
  var exports = {};
  /////////////////
  
  
  
  exports.bfs = function (params) {
    // Asynchronic breadth first search/spread.
    // 
    // Usage example
    //   bfs({
    //     
    //     root: myvertex,
    //     
    //     handler: function (v, spreadTo, end) {
    //       if (v.mydata === 'the right one') {
    //         end(v);
    //       } else {
    //         spreadTo(v.neighbors);
    //       }
    //     },
    //     
    //     finish: function (v) {
    //       if (typeof v === 'undefined') {
    //         console.log('The right one not found');
    //       } else {
    //         console.log('Found it!', v);
    //       }
    //     }
    //     
    //   });
    // 
    // Parameter
    //   params
    //     Keyword parameters. See Params.
    // 
    // Params
    //   root
    //     Vertex that is handled first.
    //   handler
    //     Function that is called once for each vertex when the vertex is
    //     first time found.
    //     
    //     function (v, spreadTo, end, predecessor, depth)
    //       v
    //         Vertex. The currently handled vertex. Must be an object.
    //       spreadTo
    //         Function (adjacentVertices) that takes
    //         in nothing or an array of vertices adjacent to v.
    //         Must be called to continue the algorithm. If spreadTo(...)
    //         or end(...) are not called, the algorithm stops but no cleanup
    //         is done. As a result there might be some temporary properties
    //         left in the vertices (like _bfsDepth).
    //         Throws InvalidArrayError if adjacent vertices is not empty
    //         or not array.
    //       end
    //         Function. Call to end the algorithm and run the finish
    //         function. Can take in any parameters. The parameters
    //         are passed to the finish function.
    //       predecessor
    //         Vertex. When v is found first time, the predecessor
    //         is the vertex which from the algorithm spread to v.
    //         Null for root v.
    //       depth
    //         Integer. Number of edges travelled to v from the root, when v
    //         is found first time.
    //   finish (optional)
    //     Function that is executed when the algorithm
    //     finishes.
    // 
    // Return
    //   undefined
    
    // Normalize parameters
    var root, handler, finish;
    var validParams = params.hasOwnProperty('root') &&
                      params.hasOwnProperty('handler') &&
                      typeof params.root === 'object' &&
                      typeof params.handler === 'function';
    if (validParams) {
      root = params.root;
      handler = params.handler;
    } else {
      var err = {
        name: 'InvalidParameterError',
        message: 'You must specify root and handler parameters ' +
                 'and root must be an object and handler must be a function.'
      };
      console.error(err.name, err.message);
      throw err;
    }
    var validFinish = params.hasOwnProperty('finish') &&
                      typeof params.finish === 'function';
    if (validFinish) {
      finish = params.finish;
    } else {
      finish = function () {};
    }
    
    // Properties must be unique to prevent concurrency issues.
    var algorithmId = getId();
    
    // Visited vertices are marked with this property being true.
    // Visited vertices are pushed to the queue.
    var visited = '_bfsVisited' + algorithmId;
    
    // Keep track the depth of objects by settings this property.
    var deepness = '_bfsDepth' + algorithmId;
    
    // Breadth first search is based on a vertex queue
    // Push new ones back, unshift next from the front.
    var queue = [root];
    var predecessorQueue = [null];
    
    // Root is visited by default because it's pushed to the queue.
    root[visited] = true;
    // Root depth is zero. Depth equals to the lenght of path from root.
    root[deepness] = 0;
    
    // Currently iterated vertex
    var v;
    // Predecessor of the current
    var predecessor;
    
    // If true, tells that algorithm has ended.
    // Just a security method.
    var finished = false;
    
    // Keep track what vertices became polluted with _bfs* properties.
    var polluted = [root];
    var clearPolluted = function () {
      // Clean all polluted vertices. Called at the end.
      var i, pv;
      for (i = 0; i < polluted.length; i += 1) {
        pv = polluted[i];
        delete pv[visited];
        delete pv[deepness];
      }
    };
    
    var spreadTo = function (adjacentVertices) {
      // If user accidentally calls next after end.
      if (finished) {
        return;
      }
      
      if (typeof adjacentVertices === 'undefined') {
        // Maybe empty.
        adjacentVertices = [];
      }
      
      // Allow only arrays or emptys.
      // http://stackoverflow.com/questions/4775722/check-if-object-is-array
      var objClass = Object.prototype.toString.call(adjacentVertices);
      var isArray = (objClass === '[object Array]');
      if (!isArray) {
        throw {
          name: 'InvalidArrayError',
          message: 'adjacentVertices must be array, instead is:' +
                   adjacentVertices
        };
      }
      
      var i, av;
      for (i = 0; i < adjacentVertices.length; i += 1) {
        av = adjacentVertices[i];
        if (av[visited] !== true) {
          queue.push(av);
          predecessorQueue.push(v);
          // Pollute av with temporary properties
          av[visited] = true;
          av[deepness] = v[deepness] + 1;
          polluted.push(av);
        }
      }
      
      // Move to back of the event queue. Makes algorithm truly async.
      // Why? Cool?
      setTimeout(iterator, 0);
    };
    
    var end = function () {
      // Stop the algorithm, clean the trashes and call the finish.
      finished = true;
      clearPolluted();
      finish.apply({}, arguments);
    };
    
    var iterator = function () {
      // Calls the handler.
      
      if (queue.length > 0) {
        v = queue.shift();
        predecessor = predecessorQueue.shift();
        var depth = v[deepness];
        
        handler(v, spreadTo, end, predecessor, depth);
      } else {
        end();
      }
    };
    
    // Start the algorithm.
    iterator();
  };
  
  
  
  // Concurrent bfs's should have distinct _bfs* attributes.
  // Keep global id counter to distinguish the algorithms.
  var algorithmIdCounter = 0;
  var getId = function () {
    // Id as string.
    algorithmIdCounter += 1;
    return '' + algorithmIdCounter;
  };
  
  
  
  ///////////////
  return exports;
}());


Taaspace.util = (function () {
  //
  // Utility functions for example handling asynchronicity.
  // 
  var exports = {};
  /////////////////
  
  
  
  exports.mapReduce = function (array, mapfn, reducefn) {
    // Asynchronic map-reduce variant that can be used to
    // execute parallel async function calls and collect the results
    // after everything has finished.
    // 
    // See also
    //   https://en.wikipedia.org/wiki/MapReduce
    // 
    // Usage example
    //   mapReduce(
    //     [1, 0, 1],
    //     function map(x, done, index, array) {
    //       done(index, x + 1);
    //     },
    //     function reduce(resultArray) {
    //       // resultArray === [2, 1, 2]
    //     }
    //   });
    // 
    // Parameter
    //   array
    //     Keyword parameters. See Params.
    //   mapfn
    //     Function that maps array element to something that is passed
    //     to done function.
    //     function (x, done, index, array)
    //       x
    //         The element of array at index
    //       done
    //         Function to be called when mapping is calculated/done.
    //         function (index, value)
    //           index
    //             To which position the value should be stored in
    //             the resulting array.
    //           value
    //             The result of the map function. Is stored at index.
    //       index
    //          Index of the x in the given array.
    //       array
    //          The array given.
    //   reducefn
    //     Function to be executed when all mapfns are done.
    //     function (resultArray)
    //       resultArray
    //         Array of the mapped values.
    // 
    // Return
    //   undefined
    
    // Normalize and validate parameters
    var isKindOfArray = typeof array === 'object' &&
                        'length' in array;
    var validParams = typeof mapfn === 'function' &&
                      typeof reducefn === 'function' &&
                      isKindOfArray;
    if (!validParams) {
      throw {
        name: 'InvalidParameterError',
        message: 'Parameter \'array\' must be an array, ' +
                 '\'mapfn\' must be a function and ' +
                 '\'reducefn\' must be a function.'
      };
    }
    
    // If empty, result with new empty array.
    if (array.length === 0) {
      reducefn([]);
    }
    
    // Collect results here.
    var result = [];
    
    // A safety thing to prevent calling reducefn multiple times.
    var finished = false;
    
    // Wait for each done to accomplish.
    var numOfResults = 0;
    var requiredResults = array.length;
    
    var done = function (index, mappedElem) {
      result[index] = mappedElem;
      numOfResults += 1;
      
      if (numOfResults >= requiredResults) {
        if (!finished) {
          // Finish
          finished = true;
          reducefn(result);
        }
      }
    };
    
    var i, elem;
    for (i = 0; i < array.length; i += 1) {
      elem = array[i];
      mapfn(elem, done, i, array);
    }
    
  };
  
  
  exports.boxArea = function (box) {
    // Area of a box.
    // 
    // Return
    //   number
    //     Positive or 0;
    
    //                     area
    //                     w * h
    //               (width) * (height)
    return (box.x1 - box.x0) * (box.y1 - box.y0);
  };
  
  
  exports.intersectionArea = function (boxA, boxB) {
    // Calculate area of the intersection of two boxes.
    // 
    // Return
    //   number
    //     Positive number if boxes collide.
    //     0 if the boxes do not collide.
    var ItlX = Math.max(boxA.x0, boxB.x0);
    var ItlY = Math.max(boxA.y0, boxB.y0);
    var IbrX = Math.min(boxA.x1, boxB.x1);
    var IbrY = Math.min(boxA.y1, boxB.y1);
    var Iwidth;
    var Iheight;
    
    if (ItlX <= IbrX && ItlY <= IbrY) {
      Iwidth = IbrX - ItlX;
      Iheight = IbrY - ItlY;
      return Iwidth * Iheight;
    }
    
    // else
    return 0;
  };
  
  
  ///////////////
  return exports;
}());


  // Constants as a settings for Taaspace.
  Taaspace.SPACE_ELEMENT_CLASS = 'taaspace-element';


  // Version
  Taaspace.version = '2.10.1';
  
  // Modules
  if(typeof module === 'object' && typeof module.exports === 'object') {
    // Common JS
    // http://wiki.commonjs.org/wiki/Modules/1.1
    module.exports = Taaspace;
  } else {
    // Browsers
    window.Taaspace = Taaspace;
  }
})(this);
