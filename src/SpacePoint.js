var SpacePoint = function (xy, reference) {
  // Example
  //   var p = taaspace.Point([x, y], taa);
  //
  // Parameter
  //   xy
  //     kldaffine.Vector2D
  //   reference
  //     item in space, enabling coord projections.
  this.xy = xy;

  // Transformation from space to member
  this.tr = reference.tr;
  if (!this.tr.isInvertible()) {
    throw new Error('Invertible transformation matrix');
  }
};

var proto = SpacePoint.prototype;


proto.offset = function (dxdy) {
  // Create a new point nearby.
  var x = this.xy[0] + dxdy[0];
  var y = this.xy[1] + dxdy[1];
  return new SpacePoint([x, y], this.tr);
};

proto.equals = function (point) {
  return (this.xy[0] === point.xy[0] &&
          this.xy[1] === point.xy[1] &&
          this.tr.equals(point.tr));
};

proto.projectTo = function (reference) {
  var inv = this.tr.inverse();
  var spacexy = this.xy.transform(inv);
  return spacexy.transform(reference.tr);
};


module.exports = SpacePoint;
