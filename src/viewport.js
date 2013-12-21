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
