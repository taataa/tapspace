Taaspace.Network = (function () {
  //
  // A network of elements. A breadth-first search based algorithm
  // to help handling dynamically loaded content and created SpaceElements.
  // 
  var exports = {};
  /////////////////
  
  
  
  // Constructor
  
  var Net = function (space, kwargs) {
    
    // Validate parameters
    var valid = false;
    if (typeof kwargs === 'object') {
      if (kwargs.hasOwnProperty('create') &&
          typeof kwargs.create === 'function' &&
          kwargs.hasOwnProperty('neighbors') &&
          typeof kwargs.neighbors === 'function' &&
          kwargs.hasOwnProperty('remove') &&
          typeof kwargs.remove === 'function') {
        valid = true;
      }
    }
    if (!valid) {
      var err = {
        name: 'InvalidParameterError',
        message: 'Missing parameter or parameter type is not a function.'
      };
      console.error(err.name, err.message);
      throw err;
    }
    
    this._space = space;
    this._create = kwargs.create;
    this._neighbors = kwargs.neighbors;
    this._remove = kwargs.remove;
    
    this._vertices = [];
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
    //   create (required)
    //     Function that defines how to create the SpaceElement(s) of the
    //     given object. Must call done when finished.
    //   neighbors (required)
    //     Function that defines which objects are adjancent to the 
    //     given object. Must call done with the adjacent in an array.
    //   remove (required)
    //     Function that defines how to remove the SpaceElement(s) of the
    //     given object. Must call done when finished.
    
    var network = new Net(this, kwargs);
    return network;
  };
  
  
  
  // Accessors
  
  
  
  // Mutators
  
  Net.prototype.spreadFrom = function (rootObj, toDepth, callback) {
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
    //   callback (optional)
    //     Function to be called when spreadFrom finishes.
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
    if (typeof callback !== 'function') {
      callback = function () {};
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
        
        // Mark to be keeped by removing the removeMe mark.
        delete vertex[removeMe];
        
        var done = function () {
          
          // Do not continue to this direction if too far.
          if (distance + 1 > toDepth) {
            spreadTo([]);
            return;
          }
          
          that._neighbors(that.space, vertex, spreadTo, predecessor, distance);
        };
        
        if (!vertex.hasOwnProperty(isCreated)) {
          // Is done only once per vertex during the lifespan of the vertex.
          vertex[isCreated] = true;
          that._vertices.push(vertex);
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
            next();
          }
        });
        that._vertices = newVertices;
        
        // Everything finished.
        callback();
      }
    
    });
    
  };
  
  
  
  Net.prototype.remove = function () {
    // Remove the network and all the elements in it.
    throw 'Not implemented.';
  };
  
  
  
  // Pseudo-private functions
  
  Net.prototype._each = function (iterator) {
    // Synchronic for-each.
    // Execute iterator function for each currently existing object of
    // the network.
    var i;
    var list = this._vertices;
    for (i = 0; i < list.length; i += 1) {
      iterator(list[i], i, list);
    }
  };
  
  Net.prototype._asyncEach = function (iterator) {
    // Asynchronic for-each.
    
    var i = 0;
    var list = this._vertices;
    var next = function next() {
      if (i >= list.length) {
        return;
      }
      i += 1; // tail recursion
      iterator(list[i], next, i - 1, list);
    };
    next(); // start
  };
  
  
  
  
  
  ///////////////
  return exports;
}());
