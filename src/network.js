Taaspace.Network = (function () {
  //
  // A network of elements. A breadth-first search based algorithm
  // to help handling dynamically loaded content and created SpaceElements.
  // 
  var exports = {};
  /////////////////
  
  
  
  // Constructor
  
  var Net = function (space, kwargs) {
    this._space = space;
    this._create = kwargs.create;
    this._neighbors = kwargs.neighbors;
    this._remove = kwargs.remove;
    
    this._objects = [];
  };
  
  // Extend Taaspace
  Taaspace.extension.createNetwork = function (kwargs) {
    // Usage
    //   var net = space.createNetwork({
    //     create: function (space, obj, done, predecessor, depth) {
    //     },
    //     neighbors: function (space, obj, done, predecessor, depth) {
    //     },
    //     remove: function (space, obj, done) {
    //     }
    //   });
    //   
    // Parameter
    //   kwargs
    //     A set of parameters, some of them are required.
    //     See Keyword Arguments.
    // 
    // Keyword Arguments
    //   create
    //     Function that defines how to create the SpaceElements for the
    //     given object. Must call done when finished.
    //   neighbors
    //     Function that defines which objects are adjancent to the 
    //     given object. Must call done with the adjacent in an array.
    //   remove
    //     Function that defines how to remove the SpaceElements for the
    //     given object. Must call done when finished.
    
    var network = new Net(this, kwargs);
    return network;
  };
  
  
  
  // Accessors
  
  
  
  // Mutators
  
  Net.prototype.spreadFrom = function (rootObj, toDepth) {
    // Create the local neighborhood of the rootObj and
    // remove the rest of the network.
    // 
    // Parameter
    //   obj
    //     Any object in a role of a vertex in the network. Must have
    //     type of object. In future strings and ints also?
    //   toDepth (optional, default 3)
    //     The creating distance. To how many steps/edges/neighbors ahead will
    //     be created with the given create function. The ones farther away
    //     will be removed with the given remove function.
    // 
    // Throws
    //   InvalidParameterError
    //     if rootObj is not object.
    // 
    // Will permanently flag the objects with property '_taaspace_isDrawn'
    
    // Normalize parameters
    if (typeof rootObj !== 'object') {
      var err = {
        name: 'InvalidParameterError',
        message: 'rootObj must be an object'
      };
      console.error(err.name, err.message);
      throw err;
    }
    if (typeof toDepth !== 'number') {
      toDepth = 3;
    }
    
    
    var that = this;
    var isCreated = '_taaspace_isCreated';
    var removeMe = '_taaspace_removeMe';
    
    
    // First, mark all the known vertices with removeMe mark
    that._each(function (vertex) {
      vertex[removeMe] = true;
    });
    
    // Use breadth first search to find ones near the root.
    // Create the ones that haven't been created and remove the removeMe mark
    // from reached ones.
    Taaspace.graph.bfs({
      
      root: rootObj,
      
      handler: function (vertex, spreadTo, end, predecessor, distance) {
        
        var done = function () {
          
          // End if too far.
          if (distance + 1 >= toDepth) {
            spreadTo([]);
          }
          
          that._neighbors(that.space, vertex, spreadTo, predecessor, distance);
        };
        
        if (!vertex.hasOwnProperty(isCreated)) {
          vertex[isCreated] = true;
          that._create(that._space, vertex, done, predecessor, distance);
        } else {
          // Skip creating, go get the neighbors.
          done();
        }
      },
      
      finish: function () {
        // Remove all with the remove me mark by reconstructing the
        // list of the non-removed ones.
        var newVertices = [];
        that._asyncEach(function (vertex, next) {
          if (vertex.hasOwnProperty(removeMe)) {
            that._remove(that._space, vertex, function done() {
              delete vertex[removeMe];
              delete vertex[isCreated];
              next();
            });
          } else {
            newVertices.push(vertex);
          }
        });
        that._objects = newVertices;
      }
    
    });
    
  };
  
  
  
  Net.prototype.remove = function () {
    // Remove the network and all the elements in it.
    throw 'Not implemented.';
  };
  
  
  
  // Pseudo-private functions
  
  Net.prototype._each = function (iterator) {
    // Synchronic for each.
    // Execute iterator function for each currently existing object of
    // the network.
    var i, obj;
    for (i = 0; i < this._objects; i += 1) {
      obj = this._objects[i];
      iterator(obj, i, this._objects);
    }
  };
  
  Net.prototype._asyncEach = function (iterator) {
    // Asynchronic for each.
    
    var i = 0;
    var obj;
    var list = this._objects;
    var next = function next() {
      if (i >= list.length) {
        return;
      }
      obj = list[i];
      i += 1;
      iterator(obj, next, i - 1, list);
    };
  };
  
  
  
  
  
  ///////////////
  return exports;
}());
