Taaspace.Grid = (function () {
  //
  // A grid to help layouting the elements to the space.
  // 
  var exports = {};
  /////////////////
  
  
  
  // Constructor
  
  var Grid = function (box, kwargs) {
    // Normalize parameters
    var columns = 1;
    var rows = 1;
    var columnMargin = 0;
    var rowMargin = 0;
    if ('box' in box) {
      if (typeof box.box === 'function') {
        box = box.box();
      } else {
        box = box.box;
      }
    } // else assume valid box object
    if (typeof kwargs === 'object') {
      if (kwargs.hasOwnProperty('columns')) {
        if (kwargs.columns !== 0) {
          columns = kwargs.columns;
        }
      }
      if (kwargs.hasOwnProperty('rows')) {
        if (kwargs.rows !== 0) {
          rows = kwargs.rows;
        }
      }
      if (kwargs.hasOwnProperty('columnMargin')) {
        columnMargin = kwargs.columnMargin;
      }
      if (kwargs.hasOwnProperty('rowMargin')) {
        rowMargin = kwargs.rowMargin;
      }
    }
    
    var boxWidth  = box.x1 - box.x0;
    var boxHeight = box.y1 - box.y0;
    
    // Grid without margins
    this.baseX = box.x0;
    this.baseY = box.y0;
    this.baseWidth  = boxWidth  / columns;
    this.baseHeight = boxHeight / rows;
    
    // Precalculate the halves.
    this.marginWidth  = columnMargin / 2;
    this.marginHeight = rowMargin    / 2;
  };
  
  // Extend Taaspace
  Taaspace.extension.createGrid = function (box, kwargs) {
    // Example
    //   var grid = space.createGrid(
    //     mySpaceElement,
    //     {
    //       columns: 2,
    //       rows: 2,
    //       columnMargin: 0.1,
    //       rowMargin: 0.1
    //     }
    //   );
    //   mySpaceElement.moveTo(grid.northWest(-2, 1));
    //   
    // Parameter
    //   box
    //     Box object or an object with box function property.
    //     Defines the cell size of the grid. See kwargs for dividing
    //     to multiple columns and rows.
    //   kwargs
    //     A set of optional parameters.
    //     See Keyword Arguments.
    // 
    // Keyword Arguments
    //   columns (optional, default 1)
    //     Integer. How many columns fits to the given box.
    //   rows (optional, default 1)
    //     Integer. How many rows fits to the given box.
    //   columnMargin (optional, default 0)
    //     Number. How much space should be left between the columns.
    //     A distance in space.
    //   rowMargin (optional, default 0)
    //     Number. How much space should be left between the rows.
    //     A distance in space.
    
    return new Grid(box, kwargs);
  };
  
  
  
  // Accessors
  
  Grid.prototype.center = function (x, y) {
    // Center point of a cell at x, y
    // 
    // Parameter
    //   x
    //     Integer
    //   y
    //     Integer
    // 
    // Parameter (Alternative)
    //   xy
    //     A point object (integer point).
    // 
    // Return
    //   point
    //     in space.
    
    // Normalize parameters
    if (typeof x === 'object') {
      y = x.y;
      x = x.x;
    }
    
    // No need to care about margins because center.
    return {
      x: this.baseX + ((x + 0.5) * this.baseWidth ),
      y: this.baseY + ((y + 0.5) * this.baseHeight)
    };
  };
  
  Grid.prototype.northWest = function (x, y) {
    // North-west point of a cell at x, y
    // See .center(...) for details.
    
    // Normalize parameters
    if (typeof x === 'object') {
      y = x.y;
      x = x.x;
    }
    
    return {
      x: this.baseX + (x * this.baseWidth ) + this.marginWidth,
      y: this.baseY + (y * this.baseHeight) + this.marginHeight
    };
  };
  
  Grid.prototype.northEast = function (x, y) {
    // North-east point of a cell at x, y
    // See .center(...) for details.
    
    // Normalize parameters
    if (typeof x === 'object') {
      y = x.y;
      x = x.x;
    }
    
    return {
      x: this.baseX + ((x + 1) * this.baseWidth ) - this.marginWidth,
      y: this.baseY + ( y      * this.baseHeight) + this.marginHeight
    };
  };
  
  Grid.prototype.southWest = function (x, y) {
    // South-west point of a cell at x, y
    // See .center(...) for details.
    
    // Normalize parameters
    if (typeof x === 'object') {
      y = x.y;
      x = x.x;
    }
    
    return {
      x: this.baseX + ( x      * this.baseWidth ) + this.marginWidth,
      y: this.baseY + ((y + 1) * this.baseHeight) - this.marginHeight
    };
  };
  
  Grid.prototype.southEast = function (x, y) {
    // South-east point of a cell at x, y
    // See .center(...) for details.
    
    // Normalize parameters
    if (typeof x === 'object') {
      y = x.y;
      x = x.x;
    }
    
    return {
      x: this.baseX + ((x + 1) * this.baseWidth ) - this.marginWidth,
      y: this.baseY + ((y + 1) * this.baseHeight) - this.marginHeight
    };
  };
  
  Grid.prototype.box = function (x, y) {
    // Box of the cell at x, y
    // See .center(...) for details.
    
    // Normalize parameters
    if (typeof x === 'object') {
      y = x.y;
      x = x.x;
    }
    
    return {
      x0: this.baseX + ( x      * this.baseWidth ) + this.marginWidth ,
      y0: this.baseY + ( y      * this.baseHeight) + this.marginHeight,
      x1: this.baseX + ((x + 1) * this.baseWidth ) - this.marginWidth ,
      y1: this.baseY + ((y + 1) * this.baseHeight) - this.marginHeight
    };
  };
  
  
  Grid.prototype.size = function (spanX, spanY) {
    // Size of a cell or multiple cells in space.
    // 
    // Parameter
    //   spanX (optional, default 1)
    //     Number of columns to include.
    //   spanY (optional, default 1)
    //     Number of rows to include.
    // 
    // Return
    //   Size object
    
    // Normalize parameters
    if (typeof spanX !== 'number') { spanX = 1; }
    if (typeof spanY !== 'number') { spanY = 1; }
    
    return {
      width:  this.baseWidth  * spanX - this.marginWidth  * 2,
      height: this.baseHeight * spanY - this.marginHeight * 2
    };
  };
  
  Grid.prototype.width = function (spanX) {
    // Width of a cell or multiple cells in space.
    // 
    // Parameter
    //   spanX (optional, default 1)
    //     Number of columns to include.
    // 
    // Return
    //   Width in space.
    
    // Normalize parameters
    if (typeof spanX !== 'number') { spanX = 1; }
    
    return this.baseWidth  * spanX - this.marginWidth  * 2;
  };
  
  Grid.prototype.height = function (spanY) {
    // Height of a cell or multiple cells in space.
    // 
    // Parameter
    //   spanY (optional, default 1)
    //     Number of rows to include.
    // 
    // Return
    //   Height in space.
    
    // Normalize parameters
    if (typeof spanY !== 'number') { spanY = 1; }
    
    return this.baseHeight * spanY - this.marginHeight * 2;
  };
  
  
  
  // Mutators
  
  Grid.prototype.moveTo = function (x, y) {
    // Move the grid so that the origo of the grid
    // will be at x, y in space.
    // 
    // Parameter
    //   x
    //   y
    // 
    // Parameter (Alternative)
    //   xy
    // 
    // Return
    //   this
    
    // Normalize params
    if (typeof x === 'object') {
      y = x.y;
      x = x.x;
    }
    
    // Remember that _px and _py are space coordinates
    var dx = x - this.baseX;
    var dy = y - this.baseY;
    
    return this.moveBy(dx, dy);
  };
  
  
  Grid.prototype.moveBy = function (dx, dy) {
    // Move the grid by delta
    // 
    // Parameter
    //   dx
    //   dy
    // 
    // Parameter (Alternative)
    //   dxdy
    // 
    // Return
    //   this
    //     for chaining
    
    // Normalize params
    if (typeof dx === 'object') {
      dy = dx.y;
      dx = dx.x;
    }
    
    this.baseX += dx;
    this.baseY += dy;
    
    return this;
  };
  
  
  
  ///////////////
  return exports;
}());
