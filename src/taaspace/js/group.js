Taaspace.Group = (function () {
  //
  // A set of elements.
  //
  // Priority
  //   low
  // 
  var exports = {};
  /////////////////
  
  var G = function (space) {
    this._space = space;
  };
  
  
  
  // Accessors
  
  
  
  // Mutators
  
  
  
  // Constructor
  
  exports.create = function (space, options) {
      return new G(space, options);
  };
  
  ///////////////
  return exports;
}());
