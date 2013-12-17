Taaspace.Network = (function () {
  //
  // A network of elements.
  //
  // Priority
  //   medium
  // 
  var exports = {};
  /////////////////
  
  
  
  // Constructor
  
  var Net = function (space, root, options) {
    this._space = space;
  };
  
  // Extend Taaspace
  Taaspace.extension.createNetwork = function (root, options) {
    var network = new Net(this, root, options);
    return network;
  };
  
  
  
  // Accessors
  
  
  
  // Mutators
  
  
  
  
  exports.create = function (space, root, options) {
      return new Net(space, root, options);
  };
  
  ///////////////
  return exports;
}());
