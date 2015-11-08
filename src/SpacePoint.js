// API v0.2.0

var SpacePoint = function (xy, reference) {
  // Example
  //   var p = taaspace.Point([x, y], taa);
  //
  // Parameter
  //   xy
  //     2D array
  //   reference
  //     a SpacePlane
  //       an item in space, enabling coord projections.
  this.xy = xy;

  // The SpacePlane the xy are on.
  this.reference = reference;
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
  return new SpacePoint(xy, this.reference);
};

proto.polarOffset = function (radius, radians) {
  // Create a new point moved by the polar coordinates
  var x = this.xy[0] + radius * Math.cos(radians);
  var y = this.xy[1] + radius * Math.sin(radians);
  return new SpacePoint([x, y], this.reference);
};

proto.equals = function (point) {
  return (this.xy[0] === point.xy[0] &&
          this.xy[1] === point.xy[1] &&
          this.reference.equals(point.reference));
};

proto.to = function (target) {
  // Create a new SpacePoint at same location but on a
  // different SpacePlane.
  //
  // Implementation:
  // First, compute transformation B from the current plane
  // to the space. It is equal to the inverse transformation of
  // the reference. Second, let A be transformation to the target plane.
  // Compute combined transformation AB. Given a vector x, y = ABx, where
  // y is the same vector on the target plane.
  //
  // Parameter
  //   target, a SpacePlane
  if (target === this.reference) {
    return this;
  } // else
  var B = this.reference.transformation.getInverse();
  var AB = reference.transformation.product(B);
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
  return new SpacePoint(xy_hat, this.reference);
};


module.exports = SpacePoint;
