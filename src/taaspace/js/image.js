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
  
  var Img = function (space, src, options) {
    this._space = space;
  };
  
  
  
  // Accessors
  
  
  
  // Mutators
  
  
  
  // Constructor
  
  exports.create = function (space, src, options) {
      return new Img(space, src, options);
  };
  
  ///////////////
  return exports;
}());
