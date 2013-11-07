'use strict';

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
      position: 'absolute'
    });
    
    $(container).append(domElem);
    
    // Init position
    this._domMove(domElem, fromSpace, options);
    
    return domElem;
  };
  
  
  
  ///////////////
  return exports;
}());
