// API v3.0.0

var nudged = require('nudged')

var SpacePoint = function (reference, xy) {
  // Example
  //   var p = taaspace.SpacePoint(taa, [x, y]);
  //
  // Parameter
  //   reference
  //     a SpaceNode, SpacePoint, or SpaceTransform
  //       an item in space, enabling coord projections.
  //   xy
  //     [x, y] array. Optional, defaults to [0,0]

  if (typeof xy === 'undefined') { xy = [0, 0] }
  this.xy = xy

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
    this._T = reference.getGlobalTransform().T
  } else {
    // Is a SpacePoint
    this._T = reference._T
  }
}

var proto = SpacePoint.prototype

proto.equals = function (point) {
  return (this.xy[0] === point.xy[0] &&
    this.xy[1] === point.xy[1] &&
    this._T.equals(point._T))
}

proto.offset = function (dx, dy) {
  // Create a new point nearby.
  //
  // Parameter
  //   dx
  //     Movement towards positive x
  //   dy
  //     ...
  var xy = [this.xy[0] + dx, this.xy[1] + dy]
  return new SpacePoint(this, xy)
}

proto.polarOffset = function (radius, radians) {
  // Create a new point moved by the polar coordinates
  var x = this.xy[0] + radius * Math.cos(radians)
  var y = this.xy[1] + radius * Math.sin(radians)
  return new SpacePoint(this, [x, y])
}

proto.to = function (target) {
  // Create a new SpacePoint at same location but on a
  // different SpacePlane.
  //
  // TODO To be deprectated because whole point of SpacePoint is that
  // user does not need to care about the points coordinate plane.
  // Use toPointOn(target)
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
    return this.toSpace()
  }

  // Target's global transformation. This._T is already global.
  var targetGT
  if (target.hasOwnProperty('_T')) {
    // SpacePoint or SpaceTransform
    targetGT = target._T
  } else if ('getGlobalTransform' in target) {
    // SpacePlane
    targetGT = target.getGlobalTransform().T
  } else {
    throw new Error('Cannot convert SpacePoint to: ' + target)
  }

  if (targetGT.equals(this._T)) {
    return this
  } // else
  var C = targetGT.inverse().multiplyBy(this._T)
  var xyTarget = C.transform(this.xy)
  return new SpacePoint(target, xyTarget)
}

proto.toPointOn = function (target) {
  // Return [x, y] on the coord plane of the target
  //
  if (target === null) {
    // Target is the root node i.e. space
    return this._T.transform(this.xy)
  }

  // The targetGt maps points on target onto space.
  // The this._T maps current xy onto space.
  // Thus, to map current xy onto target...
  var targetGt = target.getGlobalTransform().T
  var spaceXy = this._T.transform(this.xy)
  return targetGt.inverse().transform(spaceXy)
}

proto.toSpace = function () {
  // Create a new SpacePoint at same location but represented on space coords.
  //
  // Implementation note:
  //   We already have coord. transf. from the current plane to the space:
  //     plane._T
  var xySpace = this._T.transform(this.xy)
  var spaceMock = { '_T': nudged.Transform.IDENTITY }
  return new SpacePoint(spaceMock, xySpace)
}

proto.transformBy = function (tr) {
  // Create a new SpacePoint by SpaceTransform.
  //
  // Parameter
  //   tr
  //     a SpaceTransform
  var t = tr.to(this)
  var xyHat = t.T.transform(this.xy)
  return new SpacePoint(this, xyHat)
}

SpacePoint.normalize = function (points, plane) {
  // Convert all the space points onto same plane.
  //
  // Arguments:
  //   points, array of SpacePoints
  //   plane, a SpacePlane onto normalize. null = space
  // Return:
  //   array of SpacePoints
  var i, p, normalized
  normalized = []
  for (i = 0; i < points.length; i += 1) {
    p = points[i]
    normalized.push(p.to(plane))
  }
  return normalized
}

SpacePoint.toXY = function (points) {
  // Convert SpacePoints to [[x1,y1], [x2,y2], ...]
  var i, xys
  xys = []
  for (i = 0; i < points.length; i += 1) {
    xys.push(points[i].xy)
  }
  return xys
}

SpacePoint.normalizeXY = function (points, plane) {
  // Convert all the space points onto same plane and
  // represent the as xy list: [[x1,y1], [x2,y2], ...].
  //
  // Arguments:
  //   points, array of SpacePoints
  //   plane, a SpacePlane onto normalize. null = space
  // Return:
  //   array of [x,y] points
  var i, p, normalized
  normalized = []
  for (i = 0; i < points.length; i += 1) {
    p = points[i]
    normalized.push(p.to(plane).xy)
  }
  return normalized
}

module.exports = SpacePoint
