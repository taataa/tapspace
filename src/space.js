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
    throw 'Not implemented';
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
