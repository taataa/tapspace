Taaspace.Point = (function () {
  //
  // Two dimensional point. Does not know anything about space or viewport.
  // 
  var exports = {};
  /////////////////
  
  
  
  // Constructor
  
  var Point = function (x, y) {
    // Example
    //   var p = Taaspace.Point.create(x, y);
    //   p.x;
    //   
    // Parameter
    //   x
    //   y
    // 
    
    this.x = x;
    this.y = y;
  };
  
  exports.create = function (x, y) {
    return new Point(x, y);
  };
  
  
  
  // Accessors
  
  Point.prototype.offset = function (dx, dy) {
    // Create a new point nearby.
    return new Point(this.x + dx, this.y + dy);
  };

  Point.prototype.copy = function () {
    return new Point(this.x, this.y);
  };

  Point.prototype.equals = function (point) {
    return (this.x === point.x && this.y === point.y);
  };


  
  // Mutators
  
  Point.prototype.moveTo = function (x, y) {
    // Move the point to new location
    // 
    // Return
    //   this, for chaining
    
    this.x = x;
    this.y = y;
    
    return this;
  };
  
  
  Point.prototype.moveBy = function (dx, dy) {
    // Move by delta
    // 
    // Return
    //   this
    //     for chaining
    
    this.x += dx;
    this.y += dy;
    
    return this;
  };
  
  
  
  ///////////////
  return exports;
}());