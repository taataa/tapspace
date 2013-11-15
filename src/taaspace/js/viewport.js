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
      overflow: 'hidden'
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
        
        // Convert a page point to a point container DOMElement
        var offset = $(that._container).offset();
        var cx = event.pageX - offset.left;
        var cy = event.pageY - offset.top;
        
        // Origo to mouse position
        var spaceOrigo = that.toSpace(cx, cy);
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
  
  View.prototype.hideElement = function (element) {
    // Hide an element from the viewport
    // 
    // Priority
    //   low
  };
  
  View.prototype.showElement = function (element) {
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
  
  
  
  ///////////////
  return exports;
}());
