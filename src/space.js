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
