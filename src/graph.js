Taaspace.graph = (function () {
  //
  // Graph algorithms
  // 
  var exports = {};
  /////////////////
  
  
  
  exports.bfs = function (params) {
    // Asynchronic breadth first search/spread.
    // 
    // Usage example
    //   bfs({
    //     
    //     root: myvertex,
    //     
    //     handler: function (v, spreadTo, end) {
    //       if (v.mydata === 'the right one') {
    //         end(v);
    //       } else {
    //         spreadTo(v.neighbors);
    //       }
    //     },
    //     
    //     finish: function (v) {
    //       if (typeof v === 'undefined') {
    //         console.log('The right one not found');
    //       } else {
    //         console.log('Found it!', v);
    //       }
    //     }
    //     
    //   });
    // 
    // Parameter
    //   params
    //     Keyword parameters. See Params.
    // 
    // Params
    //   root
    //     Vertex that is handled first.
    //   handler
    //     Function that is called once for each vertex when the vertex is
    //     first time found.
    //     
    //     function (v, spreadTo, end, predecessor, depth)
    //       v
    //         Vertex. The currently handled vertex. Must be an object.
    //       spreadTo
    //         Function (adjacentVertices) that takes
    //         in nothing or an array of vertices adjacent to v.
    //         Must be called to continue the algorithm. If spreadTo(...)
    //         or end(...) are not called, the algorithm stops but no cleanup
    //         is done. As a result there might be some temporary properties
    //         left in the vertices (like _bfsDepth).
    //         Throws InvalidArrayError if adjacent vertices is not empty
    //         or not array.
    //       end
    //         Function. Call to end the algorithm and run the finish
    //         function. Can take in any parameters. The parameters
    //         are passed to the finish function.
    //       predecessor
    //         Vertex. When v is found first time, the predecessor
    //         is the vertex which from the algorithm spread to v.
    //         Null for root v.
    //       depth
    //         Integer. Number of edges travelled to v from the root, when v
    //         is found first time.
    //   finish (optional)
    //     Function that is executed when the algorithm
    //     finishes.
    // 
    // Return
    //   undefined
    
    // Normalize parameters
    var root, handler, finish;
    var validParams = params.hasOwnProperty('root') &&
                      params.hasOwnProperty('handler') &&
                      typeof params.root === 'object' &&
                      typeof params.handler === 'function';
    if (validParams) {
      root = params.root;
      handler = params.handler;
    } else {
      var err = {
        name: 'InvalidParameterError',
        message: 'You must specify root and handler parameters ' +
                 'and root must be an object and handler must be a function.'
      };
      console.error(err.name, err.message);
      throw err;
    }
    var validFinish = params.hasOwnProperty('finish') &&
                      typeof params.finish === 'function';
    if (validFinish) {
      finish = params.finish;
    } else {
      finish = function () {};
    }
    
    // Properties must be unique to prevent concurrency issues.
    var algorithmId = getId();
    
    // Visited vertices are marked with this property being true.
    // Visited vertices are pushed to the queue.
    var visited = '_bfsVisited' + algorithmId;
    
    // Keep track the depth of objects by settings this property.
    var deepness = '_bfsDepth' + algorithmId;
    
    // Breadth first search is based on a vertex queue
    // Push new ones back, unshift next from the front.
    var queue = [root];
    var predecessorQueue = [null];
    
    // Root is visited by default because it's pushed to the queue.
    root[visited] = true;
    // Root depth is zero. Depth equals to the lenght of path from root.
    root[deepness] = 0;
    
    // Currently iterated vertex
    var v;
    // Predecessor of the current
    var predecessor;
    
    // If true, tells that algorithm has ended.
    // Just a security method.
    var finished = false;
    
    // Keep track what vertices became polluted with _bfs* properties.
    var polluted = [root];
    var clearPolluted = function () {
      // Clean all polluted vertices. Called at the end.
      var i, pv;
      for (i = 0; i < polluted.length; i += 1) {
        pv = polluted[i];
        delete pv[visited];
        delete pv[deepness];
      }
    };
    
    var spreadTo = function (adjacentVertices) {
      // If user accidentally calls next after end.
      if (finished) {
        return;
      }
      
      if (typeof adjacentVertices === 'undefined') {
        // Maybe empty.
        adjacentVertices = [];
      }
      
      // Allow only arrays or emptys.
      // http://stackoverflow.com/questions/4775722/check-if-object-is-array
      var objClass = Object.prototype.toString.call(adjacentVertices);
      var isArray = (objClass === '[object Array]');
      if (!isArray) {
        throw {
          name: 'InvalidArrayError',
          message: 'adjacentVertices must be array, instead is:' +
                   adjacentVertices
        };
      }
      
      var i, av;
      for (i = 0; i < adjacentVertices.length; i += 1) {
        av = adjacentVertices[i];
        if (av[visited] !== true) {
          queue.push(av);
          predecessorQueue.push(v);
          // Pollute av with temporary properties
          av[visited] = true;
          av[deepness] = v[deepness] + 1;
          polluted.push(av);
        }
      }
      
      // Move to back of the event queue. Makes algorithm truly async.
      // Why? Cool?
      setTimeout(iterator, 0);
    };
    
    var end = function () {
      // Stop the algorithm, clean the trashes and call the finish.
      finished = true;
      clearPolluted();
      finish.apply({}, arguments);
    };
    
    var iterator = function () {
      // Calls the handler.
      
      if (queue.length > 0) {
        v = queue.shift();
        predecessor = predecessorQueue.shift();
        var depth = v[deepness];
        
        handler(v, spreadTo, end, predecessor, depth);
      } else {
        end();
      }
    };
    
    // Start the algorithm.
    iterator();
  };
  
  
  
  // Concurrent bfs's should have distinct _bfs* attributes.
  // Keep global id counter to distinguish the algorithms.
  var algorithmIdCounter = 0;
  var getId = function () {
    // Id as string.
    algorithmIdCounter += 1;
    return '' + algorithmIdCounter;
  };
  
  
  
  ///////////////
  return exports;
}());
