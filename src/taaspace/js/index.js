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
