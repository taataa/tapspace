// API v0.3.0

var SpacePoint = function (xy, reference) {
  // Example
  //   var p = taaspace.Point([x, y], taa);
  //
  // Parameter
  //   xy
  //     2D array
  //   reference
  //     a SpacePlane or SpacePoint
  //       an item in space, enabling coord projections.
  this.xy = xy;

  // The SpacePlanes transformation the xy are on.
  // Design note: at first the references were SpacePlanes. But because
  // a SpacePlane can move or be removed, we chose only the transformation
  // to be remembered.
  // For now, there is no hierarchy so local transformation _T is enough.
  this._T = reference._T;
};

var proto = SpacePoint.prototype;


proto.offset = function (dx, dy) {
  // Create a new point nearby.
  //
  // Parameter
  //   dx
  //     Movement towards positive x
  //   dy
  //     ...
  var xy = [this.xy[0] + dx, this.xy[1] + dy];
  return new SpacePoint(xy, this);
};

proto.polarOffset = function (radius, radians) {
  // Create a new point moved by the polar coordinates
  var x = this.xy[0] + radius * Math.cos(radians);
  var y = this.xy[1] + radius * Math.sin(radians);
  return new SpacePoint([x, y], this);
};

proto.equals = function (point) {
  return (this.xy[0] === point.xy[0] &&
          this.xy[1] === point.xy[1] &&
          this._T.equals(point._T));
};

proto.to = function (target) {
  // Create a new SpacePoint at same location but on a
  // different SpacePlane.
  //
  // Implementation:
  // First, compute transformation B from the current plane
  // to the space. It is equal to the inverse transformation of this._T.
  // Second, let A be transformation to the target plane.
  // Compute combined transformation AB. Given a vector x, y = ABx, where
  // y is now x when represented in the coordinates of the target plane.
  //
  // Parameter
  //   target, a SpacePlane
  
  if (target._T.equals(this._T)) {
    return this;
  } // else
  var B = this._T.inverse();
  var AB = target._T.multiplyBy(B);
  var y = AB.transform(this.xy);
  return new SpacePoint(y, target);
};

proto.transform = function (tr) {
  // Create a new point by transformation.
  //
  // Parameter
  //   tr
  //     a Transform
  var xy_hat = tr.transform(this.xy);
  return new SpacePoint(xy_hat, this);
};


module.exports = SpacePoint;
