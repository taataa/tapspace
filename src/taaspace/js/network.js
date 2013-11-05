'use strict';

Taaspace.Network = (function () {
  //
  // A network of elements.
  //
  // Priority
  //   medium
  // 
  var exports = {};
  /////////////////
  
  var Net = function (space, root, options) {
    this._space = space;
  };
  
  
  
  // Accessors
  
  
  
  // Mutators
  
  
  
  // Constructor
  
  exports.create = function (space, root, options) {
      return new Net(space, root, options);
  };
  
  ///////////////
  return exports;
}());
