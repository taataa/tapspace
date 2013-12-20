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
