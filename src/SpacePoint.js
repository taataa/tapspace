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
    throw new Error('Transformation matrix should be invertible');
  }
};

var proto = SpacePoint.prototype;


proto.offset = function (dxdy) {
  // Create a new point nearby.
  //
  // Parameter
  //   dxdy
  //     Vector2D
  return new SpacePoint(this.xy.add(dxdy), this.tr);
};

proto.equals = function (point) {
  return (this.xy[0] === point.xy[0] &&
          this.xy[1] === point.xy[1] &&
          this.tr.equals(point.tr));
};

proto.projectTo = function (reference) {
  var inv = this.tr.inverse();
  var spacexy = this.xy.transform(inv);
  var transVect = spacexy.transform(reference.tr);
  return new SpacePoint(transVect, reference);
};


module.exports = SpacePoint;
