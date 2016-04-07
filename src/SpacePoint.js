// API v3.0.0

var Transform = require('./Transform');

var SpacePoint = function (xy, reference) {
  // Example
  //   var p = taaspace.SpacePoint([x, y], taa);
  //
  // Parameter
  //   xy
  //     2D array
  //   reference
  //     a SpaceNode or SpacePoint
  //       an item in space, enabling coord projections.
  this.xy = xy;

  // The SpacePlane's transformation the xy are on.
  // Design note: at first, the references were SpacePlanes and not
  // transformations. But because a SpacePlane can move or be removed,
  // we chose only the transformation to be remembered.
  // Design note: later we found it would be convenient for debugging
  // to know where the point came from, which led to this._origin.
  // After that we found that in toSpace method, we would need reference
  // to space, although we only have implicit reference to its coords.
  // Therefore this._origin was dropped.

  if (reference.hasOwnProperty('getGlobalTransform')) {
    // Is a SpacePlane
    this._T = reference.getGlobalTransform();
  } else {
    // Is a SpacePoint
    this._T = reference._T;
  }
};

var proto = SpacePoint.prototype;

proto.equals = function (point) {
  return (this.xy[0] === point.xy[0] &&
    this.xy[1] === point.xy[1] &&
    this._T.equals(point._T));
};

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

proto.to = function (target) {
  // Create a new SpacePoint at same location but on a
  // different SpacePlane.
  //
  // Parameter
  //   target, a SpacePlane or null.
  //
  // Implementation note (See 2016-03-05-09):
  //
  // First, compute coord. transf. B from the current plane
  // to the space:
  //   x_space = B * x_plane  <=>  x_plane = inv(B) * x_space
  //   B = plane._T
  // Second, let A be coord. transf. from the space to the target plane:
  //   x_target = A * x_space
  //   A = inv(target._T)
  // Therefore combined coord. transf. C from the curr. plane to the target:
  //   x_target = C * x_plane
  //   <=> A * x_space = C * inv(B) * x_space
  //   <=> A = C * inv(B)
  //   <=> C = AB
  //   <=> C = inv(target._T) * plane._T
  //

  if (target === null) {
    // target is the root node (space)
    return this.toSpace();
  }

  // Target's global transformation. This._T is already global.
  var target_gT = target.getGlobalTransform();

  if (target_gT.equals(this._T)) {
    return this;
  } // else
  var C = target_gT.inverse().multiplyBy(this._T);
  var xy_target = C.transform(this.xy);
  return new SpacePoint(xy_target, target);
};

proto.toSpace = function () {
  // Create a new SpacePoint at same location but represented on space coords.
  //
  // Implementation note:
  //   We already have coord. transf. from the current plane to the space:
  //     plane._T
  var xySpace = this._T.transform(this.xy);
  var spaceMock = {'_T': Transform.IDENTITY};
  return new SpacePoint(xySpace, spaceMock);
};

proto.transform = function (tr) {
  // Create a new point by transformation.
  // TODO rename to transformBy and take a SpaceTransform
  //
  // Parameter
  //   tr
  //     a Transform
  var xy_hat = tr.transform(this.xy);
  return new SpacePoint(xy_hat, this);
};


SpacePoint.normalize = function (points, plane) {
  // Convert all the space points onto same plane and.
  //
  // Arguments:
  //   points, array of SpacePoints
  //   plane, a SpacePlane onto normalize. null = space
  // Return:
  //   array of SpacePoints
  var i, p, normalized;
  normalized = [];
  for (i = 0; i < points.length; i += 1) {
    p = points[i];
    normalized.push(p.to(plane));
  }
  return normalized;
};

SpacePoint.toXY = function (points) {
  // Convert SpacePoints to [[x1,y1], [x2,y2], ...]
  var i, xys;
  xys = [];
  for (i = 0; i < points.length; i += 1) {
    xys.push(points[i].xy);
  }
  return xys;
};


module.exports = SpacePoint;
