Taaspace.Box = (function () {
  //
  // A box object representing a rectangle.
  // 
  var exports = {};
  /////////////////
  
  
  
  // Constructor
  
  var Box = function (nwx, nwy, sex, sey) {
    // Example
    //   var b = Taaspace.Box.create(nwx, nwy, sex, sey);
    //   b.northWest();
    //   
    // Parameter
    //   nwx
    //   nwy
    //     North west X- and Y-coordinate
    //   sex
    //   sey
    //     South east X- and Y-coordinate
    // 
    
    this.x = nwx;
    this.y = nwy;
    this.w = sex - nwx;
    this.h = sey - nwy;
  };
  
  exports.create = function (nwx, nwy, sex, sey) {
    return new Box(nwx, nwy, sex, sey);
  };
  
  
  
  // Accessors
  
  Box.prototype.center = function () {
    // Center point of the box.
    // 
    // Return
    //   point
    
    return {
      x: this.x + this.w / 2,
      y: this.y + this.h / 2
    };
  };
  
  Box.prototype.northWest = function () {
    // North-west point
    // See .center(...) for details.
    
    return {
      x: this.x,
      y: this.y
    };
  };
  
  Box.prototype.northEast = function () {
    // North-east point
    // See .center(...) for details.
    
    return {
      x: this.x + this.w,
      y: this.y
    };
  };
  
  Box.prototype.southWest = function () {
    // South-west point
    // See .center(...) for details.
    
    return {
      x: this.x,
      y: this.y + this.h
    };
  };
  
  Box.prototype.southEast = function () {
    // South-east point
    // See .center(...) for details.
    
    return {
      x: this.x + this.w,
      y: this.y + this.h
    };
  };
  
  Box.prototype.width = function () {
    return this.w;
  };
  
  Box.prototype.height = function () {
    return this.h;
  };
  
  Box.prototype.area = function () {
    return this.w * this.h;
  };


  
  // Mutators
  
  Box.prototype.moveTo = function (x, y) {
    // Move the box so that the north-west corner is at x, y
    // 
    // Parameter
    //   x
    //   y
    // 
    // Parameter (Alternative)
    //   xy
    // 
    // Return
    //   this, for chaining
    
    // Normalize params
    if (typeof x === 'object') {
      y = x.y;
      x = x.x;
    }
    
    this.x = x;
    this.y = y;
    
    return this;
  };
  
  
  Box.prototype.moveBy = function (dx, dy) {
    // Move the box by delta
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
    
    this.x += dx;
    this.y += dy;
    
    return this;
  };
  
  
  
  ///////////////
  return exports;
}());