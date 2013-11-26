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
    
    // Make elements and viewports referencable by id to be stored in objects.
    // Makes implementing collections easy.
    this._spaceElementIdCounter = 0;
    this._vpIdCounter = 0;
    
    // Maps keyboard events to selected objects.
    this._keyboardManager = Taaspace.KeyboardManager.create();
  };
  
  exports.create = function () {
    return new Space();
  };
  
  // For extendability.
  // Usage: Taaspace.extension.createMyElement = function (...) {...};
  exports.extension = Space.prototype;
  
  
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
    
    pluginElement._id = String(this._spaceElementIdCounter);
    this._spaceElementIdCounter += 1;
    
    // Becomes SpaceElement after having _id.
    var spaceElement = pluginElement;
    
    // Store SpaceElement into space. Why?
    this._elems.push(spaceElement);
    
    // Append SpaceElement to all viewports to be visible.
    _.each(this._vps, function (vp) {
      vp._createDomElement(spaceElement);
    });
    
    return spaceElement;
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
  
  Space.prototype._addViewport = function (vp) {
    // New viewport to space.
    this._vps.push(vp);
    
    // Append all existing elements to the new viewport.
    _.each(this._elems, function (elem) {
      vp._createDomElement(elem);
    });
  };
  
  ///?????????
  Space.prototype._eachDomElement = function (elem, fn, args) {
    // Execute function fn for each domElement of elem
    _.each(this._vps, function (vp) {
      vp._applyDomElement(elem, fn, args);
    });
  };
  
  ///?????????
  Space.prototype._moveDomElement = function (elem, options) {
    // Called from Element when element moves.
    _.each(this._vps, function (vp) {
      vp._moveDomElement(elem, options);
    });
  };
  
  ///?????????
  Space.prototype._scaleDomElement = function (elem, options) {
    // Called from Element when element is scaled
    _.each(this._vps, function (vp) {
      vp._scaleDomElement(elem, options);
    });
  };
  
  ///?????????
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
