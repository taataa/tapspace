'use strict';

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
