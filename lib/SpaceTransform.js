/*
Similarly as a point can be represented in multiple coordinate systems,
so can a transformation. To prevent users from figuring out how transformations
are converted to other representations, we have SpaceTransform.

The API is similar to SpacePoint. However, instead of offset methods, we have
a set of similarity transformation methods.
*/
var Transform = require('./Transform')
var SpacePoint = require('./SpacePoint')
var nudged = require('nudged')

var SpaceTransform = function (reference, T) {
  // Immutable i.e. new instances are returned.
  //
  // Example
  //   var t = taaspace.SpaceTransform(taa, taaspace.Transform.IDENTITY);
  //
  // Parameter
  //   reference
  //     a SpacePlane, SpacePoint, or SpaceTransform
  //       an item in space, enabling coord projections.
  //   T
  //     Optional. A taaspace.Transform. Default to identity transform.

  // DEBUG
  if (!reference.hasOwnProperty('_T')) throw 'invalid reference'
  if (T && !T.hasOwnProperty('tx')) throw 'invalid transform'

  // A transformation on the plane.
  if (typeof T === 'undefined') { T = Transform.IDENTITY }
  this.T = T

  // The coordinate transformation of the plane.
  if (reference.hasOwnProperty('getGlobalTransform')) {
    // Is a SpacePlane
    this._T = reference.getGlobalTransform().T
  } else {
    // Is a SpacePoint or SpaceTransform
    this._T = reference._T
  }
}

var proto = SpaceTransform.prototype

proto.switchTo = function (newReference) {
  // Combine the transformation to a new coordinate system.
  // Return new SpaceTransform.
  return new SpaceTransform(newReference, this.T)
}

proto.equals = function (st) {
  // Parameters:
  //   st: a SpaceTransform
  return (this.T.equals(st.T) && this._T.equals(st._T))
}

proto.inverse = function () {
  // Return inversed transformation on the same plane.
  return new SpaceTransform(this, this.T.inverse())
}

proto.to = function (target) {
  // Convert the transform onto the target coordinate plane.
  //
  // Parameters:
  //   target: a SpacePlane, SpacePoint, or SpaceTransform
  //
  // Return:
  //   new SpaceTransform
  var targetGT, this2target, tOnTarget

  if (target === null) {
    // target is the root node (space)
    return this.toSpace()
  }

  // Target's global transformation. This._T is already global.
  if (target.hasOwnProperty('_T')) {
    targetGT = target._T
  } else if ('getGlobalTransform' in target) {
    targetGT = target.getGlobalTransform().T
  } else {
    throw new Error('Cannot convert SpaceTransform to: ' + target)
  }

  // Avoid unnecessary, probably rounding errors inducing computation.
  if (targetGT.equals(this._T)) {
    return this
  } // else

  // The transformation on the target plane equals to:
  // 1) convert from target to current
  // 2) execute the transformation
  // 3) convert back to target.
  // Fortunately we can combine these steps into a one transformation matrix.
  // Let us first compute conversion from this to target and remember that:
  //   x_space = T_plane * x_plane
  this2target = targetGT.inverse().multiplyBy(this._T)
  tOnTarget = this2target.multiplyBy(this.T.multiplyBy(this2target.inverse()))
  return new SpaceTransform(target, tOnTarget)
}

proto.toSpace = function () {
  // Convert the transform onto the space coordinate plane.
  // Return a new SpaceTransform.
  //
  // Implementation note:
  //   We already have coord. transf. from the current plane to the space:
  //     this._T

  // To simulate the transformation on space:
  // 1) convert from space to the plane: this._T.inverse()
  // 2) apply the transformation
  // 3) convert from plane back to the space: this._T
  var tOnSpace = this._T.multiplyBy(this.T.multiplyBy(this._T.inverse()))
  var spaceMock = { '_T': Transform.IDENTITY }
  return new SpaceTransform(spaceMock, tOnSpace)
}

proto.transformBy = function (spaceTransform) {
  // Transform the image of this by given SpaceTransform.
  var t = spaceTransform.to(this).T
  var nt = t.multiplyBy(this.T)
  return new SpaceTransform(this, nt)
}

proto.translate = function (domain, range) {
  // Move transform image horizontally and vertically by example.
  //
  // Translate the plane so that after the translation, the domain points
  // would be as close to given range points as possible.
  //
  // Parameters:
  //   domain: array of SpacePoints
  //   range: array of SpacePoints
  var st = SpaceTransform.estimate(this, 'T', domain, range)
  return new SpaceTransform(this, st.T.multiplyBy(this.T))
}

proto.scale = function (pivot, multiplierOrDomain, range) {
  // Parameters:
  //   pivot: a SpacePoint
  //   multiplier: the scale factor, > 0
  //  OR
  //   pivot: a SpacePoint
  //   domain: array of SpacePoints
  //   range: array of SpacePoints
  var useMultiplier, normPivot, domain, t, st

  useMultiplier = (typeof range === 'undefined')

  if (useMultiplier) {
    normPivot = pivot.to(this)
    // Multiplier does not depend on plane.
    t = this.T.scaleBy(multiplierOrDomain, normPivot.xy)
    return new SpaceTransform(this, t)
  } else {
    domain = multiplierOrDomain
    st = SpaceTransform.estimate(this, 'S', domain, range, pivot)
    // Combine it with the current transformation
    t = st.T.multiplyBy(this.T)
    return new SpaceTransform(this, t)
  }
}

proto.rotate = function (pivot, radiansOrDomain, range) {
  // Parameters:
  //   pivot: a SpacePoint
  //   radians: rotation angle
  //  OR
  //   pivot: a SpacePoint
  //   domain: array of SpacePoints
  //   range: array of SpacePoints
  var useRadians, normPivot, domain, t, st

  useRadians = (typeof range === 'undefined')

  if (useRadians) {
    normPivot = pivot.to(this)
    // Radians do not depend on plane.
    t = this.T.rotateBy(radiansOrDomain, normPivot.xy)
    return new SpaceTransform(this, t)
  } else {
    domain = radiansOrDomain
    st = SpaceTransform.estimate(this, 'R', domain, range, pivot)
    // Combine it with the current transformation
    t = st.T.multiplyBy(this.T)
    return new SpaceTransform(this, t)
  }
}

proto.translateScale = function (domain, range) {
  // Parameters:
  //   domain: array of SpacePoints
  //   range: array of SpacePoints
  var st = SpaceTransform.estimate(this, 'TS', domain, range)
  return new SpaceTransform(this, st.T.multiplyBy(this.T))
}

proto.translateRotate = function (domain, range) {
  // Parameters:
  //   domain: array of SpacePoints
  //   range: array of SpacePoints
  var st = SpaceTransform.estimate(this, 'TR', domain, range)
  return new SpaceTransform(this, st.T.multiplyBy(this.T))
}

proto.scaleRotate = function (pivot, domain, range) {
  // Parameters:
  //   pivot: SpacePoint
  //   domain: array of SpacePoints
  //   range: array of SpacePoints
  var st = SpaceTransform.estimate(this, 'SR', domain, range, pivot)
  return new SpaceTransform(this, st.T.multiplyBy(this.T))
}

proto.translateScaleRotate = function (domain, range) {
  // Parameters:
  //   domain: array of SpacePoints
  //   range: array of SpacePoints
  var st = SpaceTransform.estimate(this, 'TSR', domain, range)
  return new SpaceTransform(this, st.T.multiplyBy(this.T))
}

SpaceTransform.estimate = function (plane, type, domain, range, pivot) {
  // Estimate SpaceTransform.
  //
  // Parameters:
  //   plane: SpacePlane, the plane of the returned SpaceTransform
  //   types: transformation type.
  //     Available types: T,S,R,TS,TR,SR,TSR (see nudged for further details)
  //   domain: array of SpacePoints
  //   range: array of SpacePoints
  //   pivot: SpacePoint, optional pivot, used with types S,R,SR

  var normPivot
  if (typeof pivot !== 'undefined') {
    normPivot = SpacePoint.normalizeXY([pivot])[0]
  }

  // Allow single points
  if (domain.hasOwnProperty('_T')) { domain = [domain] }
  if (range.hasOwnProperty('_T')) { range = [range] }

  // Convert all SpacePoints onto the plane and to arrays
  var normDomain = SpacePoint.normalizeXY(domain, plane)
  var normRange = SpacePoint.normalizeXY(range, plane)

  // Then compute optimal transformation on the plane
  var T = nudged.estimate(type, normDomain, normRange, normPivot)
  return new SpaceTransform(plane, T)
}

module.exports = SpaceTransform
