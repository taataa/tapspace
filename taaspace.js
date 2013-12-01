/*! taaspace - v1.0.0 - 2013-12-01
 * https://github.com/taataa/taaspace
 *
 * Copyright (c) 2013 Akseli Palen <akseli.palen@gmail.com>;
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
    // because ... no reason. Lets refactor later if this seems bad.
    this._container = jQuery(containerHtmlElement);
    
    // Viewport to the space. Handles conversions between screen and space.
    this._vp = Taaspace.Viewport.create(this, options);
    
    // Import the public functions of the viewport to the space.
    // Public functions are those not beginning with underscore _.
    // After this, user can call e.g.
    //   var space = Taaspace.create('#space');
    //   var areaOfViewport = space.area();
    var proto = Taaspace.Viewport._View.prototype;
    var that = this;
    var importViewportProperty = function (property) {
      that[property] = function () {
        // 'this' references to window so that needs to be used. Why?
        return proto[property].apply(that._vp, arguments);
      };
    };
    var property;
    for (property in proto) {
      if (proto.hasOwnProperty(property)) {
        if (typeof proto[property] === 'function') {
          // If is meant public
          if (property[0] !== '_') {
            // Ensure there is no namespace collisions.
            if (property in this) {
              throw {
                name: 'NamespaceCollisionError',
                message: 'Space and Viewport namespaces collide: ' + property
              };
            }
            // No collisions, import
            importViewportProperty(property);
          }
        }
      }
    }
    
  };
  
  exports.create = function (containerHtmlElement, options) {
    return new Space(containerHtmlElement, options);
  };
  
  // For extendability.
  // Usage: Taaspace.extension.createMyElement = function (...) {...};
  exports.extension = Space.prototype;
  
  
  
  // Accessors
  
  Space.prototype.boundingBox = function () {
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
    // Remove the SpaceElement and associated HTMLElement from the space.
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
  
  Space.prototype.select = function () {
    // Select the viewport of the space to react to keyboard events.
    this._select(this._vp);
    return this;
  };
  
  Space.prototype.deselect = function () {
    // Viewport does not react to keyboard events anymore.
    this._deselect(this._vp);
    return this;
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
    
    // Is animation currently playing
    // Makes possible to cancel animations.
    this._animation = null;
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
    return this._space.visibilityRatioOf(this);
  };
  
  Elem.prototype.distanceRatio = function () {
    // See Viewport.distanceRatioOf
    return this._space.distanceRatioOf(this);
  };
  
  Elem.prototype.focusRatio = function () {
    // See Viewport.focusRatioOf
    return this._space.focusRatioOf(this);
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
    //   height
    //     in space
    // 
    // Parameter (Alternative)
    //   wh
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
      height = width.height;
      width = width.width;
    } else if (typeof width === 'undefined') {
      return {
        width: this._w,
        height: this._h
      };
    } else if (typeof height === 'undefined') {
      // Missing height
      this._w = width;
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
    // 
    // Priority
    //   medium
    
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
    throw 'Not implemented';
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
    //   See Animation Options
    // 
    // Return
    //   this
    //     for chaining
    // 
    
    if (typeof dx === 'object') {
      if (typeof dy === 'object') {
        options = dy;
      }
      dy = dx.y;
      dx = dx.x;
    }
    
    this._x += dx;
    this._y += dy;
    
    this._moveHtmlElement(options);
    
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
    
    this._removeHtmlElement();
    this._space._removeSpaceElement(this);
  };
  
  Elem.prototype.attr = function () {
    // Set attributes of the HTMLElement.
    // Interface matches jQuery .attr().
    // http://api.jquery.com/attr/
    // 
    // In future it might be possible that setting some known attributes
    // must be prevented. This explains why not to just return the 
    // HTMLElement in the first place.
    this._htmlElement.attr.apply(this._htmlElement, arguments);
  };
  
  Elem.prototype.css = function () {
    // Set style of the HTMLElement.
    // Interface matches jQuery .css().
    // http://api.jquery.com/attr/
    // 
    // In future it might be possible that setting some known styles
    // must be prevented. This explains why not to just return the 
    // HTMLElement in the first place.
    this._htmlElement.css.apply(this._htmlElement, arguments);
  };
  
  
  
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
  
  Elem.prototype.select = function () {
    this._selectHtmlElement();
    this._space._select(this);
  };
  
  Elem.prototype.deselect = function () {
    this._deselectHtmlElement();
    this._space._deselect(this);
  };
  
  
  
  // Somewhat abstract pseudo-private mutators
  
  Elem.prototype._appendHtmlElement = function (options) {
    throw 'Abstract function. Must be implemented by the instance.';
  };
  
  Elem.prototype._removeHtmlElement = function () {
    // Remove the HTMLElement from DOM
    // 
    // Can be overridden in the child prototype.
    this._htmlElement.remove();
    this._htmlElement = null;
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
    var xy = this._space.translatePointFromSpace(this._x, this._y);
    
    
    if (options.hasOwnProperty('ease')) {
      // Use animation by Move.js
      
      this._animation = move(this._htmlElement.get(0))
        .set('left', xy.x)
        .set('top', xy.y);
      
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
    } else {
      
      if (this._animation !== null) {
        // Cancel ongoing animation
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
    
    var from = this._space.translatePointFromSpace;
    var nw = from(this._x, this._y);
    var se = from(this._x + this._w, this._y + this._h);
    
    this._htmlElement.css({
      left: nw.x + 'px',
      top: nw.y + 'px',
      width: (se.x - nw.x) + 'px',
      height: (se.y - nw.y) + 'px'
    });
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
    } else {
      // Mouse or touch event
      this._hammertime.off(eventType, handler);
    }
  };
  
  Elem.prototype._selectHtmlElement = function () {
    this._htmlElement.toggleClass('taaspace-selected', true);
  };
  
  Elem.prototype._deselectHtmlElement = function () {
    this._htmlElement.toggleClass('taaspace-selected', false);
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
    
    // DEPRECATED
    // translatePointFromSpace and translateDistanceFromSpace
    // are commonly passed to functions
    // in other modules, e.g. to be used with HTML operations.
    // Here we make a function that does not depend on the context, i.e.
    // value of 'this' and therefore can easily be passed.
    //var that = this;
    //this._translatePointFromSpace = function () {
    //  return that.translatePointFromSpace.apply(that, arguments);
    //};
    //this._translateDistanceFromSpace = function () {
    //  return that.translateDistanceFromSpace.apply(that, arguments);
    //};
    
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
    
    
    this.moveBy(x - this._px, y - this._py, options);
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
    //     Animation options
    // 
    // Option
    //   silent (default false)
    //     Set true to disable firing 'focused' event.
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
        
        // Convert a page point to a point container HTMLElement
        var offset = that._container.offset();
        var cx = event.pageX - offset.left;
        var cy = event.pageY - offset.top;
        
        // pivot to mouse position
        var spacePivot = that.translatePointToSpace(cx, cy);
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
    
    // Turn scalability on
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
  
  View.prototype.draggable = function () {
    // DEPRECATED, alias to View.movable
    /* jshint multistr: true */
    console.warn('Viewport.draggable is deprecated. \
Use Viewport.movable instead.');
    return this.movable.apply(this, arguments);
  };
  
  View.prototype.movable = function (onoff, options) {
    // Make viewport movable aka pannable aka translateable.
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
    //     Not so smooth but computationally lightweight.
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
    //     Handle string as plain text. See jQuery .text() and .html()
    
    // Normalize params
    if (typeof options !== 'object') {
      options = {};
    }
    
    var p = $(document.createElement('p'));
    this._htmlElement = p;
    
    var method = 'html';
    if (options.hasOwnProperty('disableHTML')) {
      if (options.disableHTML === true) {
        method = 'text';
      }
    }
    p[method](this._string);
    
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
    //   Animation (Not implemented)
    
    var from = this._space.translatePointFromSpace;
    var nw = from(this._x, this._y);
    var se = from(this._x + this._w, this._y + this._h);
    
    var dist = this._space.translateDistanceFromSpace;
    var size = dist(this._fontSize);
    
    this._htmlElement.css({
      'font-size': size + 'px',
      left: nw.x + 'px',
      top: nw.y + 'px',
      width: (se.x - nw.x) + 'px',
      height: (se.y - nw.y) + 'px'
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
  
  
  
  
  
  // Pseudo-private mutators
  
  Img.prototype._appendHtmlElement = function (options) {
    // Called by viewports.
    // Appends HTMLElement into DOM.
    
    var el = jQuery(document.createElement('img'));
    this._htmlElement = el;
    
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
    
    // Mouse and touch gestures
    this._hammertime = Hammer(this._htmlElement[0]);
    
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


  // Constants as a settings for Taaspace.
  Taaspace.SPACE_ELEMENT_CLASS = 'taaspace-element';


  // Version
  Taaspace.version = '1.0.0';
  
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
