/*
Similarly as a point can be represented in multiple coordinate systems,
so can a transformation. To prevent users from thinking about representations,
we have InvariantTransform.

InvariantTransform is a planeless representation of a transformation.
Thus, most exact name would be a coordinate-plane-invariant transformation.

Alternative names:
  PlaneInvariantTransform
  PITransform
  InvariantTransform
  InvariantTransformation
  FreeTransform
  PlanelessTransform
*/
var Transform = require('./Transform')
var nudged = require('nudged')

// NOT YET USED ANYWHERE
// var getTrBetweenPlanes = function (sourcePlane, targetPlane) {
//   // Return a Transform that represents a mapping from sourcePlane
//   // to the targetPlane.
//   var source2space = sourcePlane.getGlobalTransform().toSpace()
//   var target2space = targetPlane.getGlobalTransform().toSpace()
//   return target2space.inverse().multiplyBy(source2space)
// }

var getTrOnPlane = function (tr, trToPlane) {
  // A same transformation can be represented on different coordinate systems.
  // This fn takes a transformation tr on plane A and another transformation
  // trToPlane from plane A to plane B. The result is a transformation
  // that is globally equivalent to tr but represented on plane B.
  //
  // Parameters:
  //   tr
  //     a Transform on plane A
  //   trToPlane
  //     a Transform from plane A to plane B.
  //     This is called a covariant transformation in math literature.
  //
  // Implementation note:
  //   So, the resulting transformation tr' maps a vector X' to vector Y'
  //   on plane B. The given transformation tr maps a vector X to vector Y
  //   on plane A. Therefore, the raw approach is to:
  //     1. map X' to X (= inverse of trToPlane)
  //     2. map X to Y  (= tr)
  //     3. map Y to Y' (= trToPlane)
  //   Fortunately we can combine the mappings.
  return trToPlane.multiplyBy(tr.multiplyBy(trToPlane.inverse()))
}

var InvariantTransform = function (transf, plane) {
  // Immutable i.e. new instances are returned.
  //
  // Example
  //   var t = taaspace.InvariantTransform(taaspace.Transform.IDENTITY, pixel)
  //
  // Parameter
  //   transf
  //     Optional. A taaspace.Transform. Default to identity transform.
  //   plane
  //     An optional SpacePlane. Defaults to space.
  //       an item in space, gives the reference plane of transf.
  //
  // Design note:
  //   fn (transf, plane) has this parameter order to make difference
  //   to SpaceNodes' (parent, prop1, prop2, ...)

  // DEBUG
  if (plane && !('_T' in plane)) {
    throw new Error('invalid reference')
  }
  if (transf && !transf.hasOwnProperty('tx')) {
    throw new Error('invalid transform')
  }

  // transf is the transformation on the plane.
  if (typeof transf === 'undefined') { transf = Transform.IDENTITY }

  if (plane) {
    // Convert transformation to space
    this._tr = getTrOnPlane(transf, plane.getGlobalTransform().toSpace())
  } else {
    // transf already in space
    this._tr = transf
  }
}

var proto = InvariantTransform.prototype

proto.equals = function (gt) {
  // Test if given InvariantTransform represents equivalent transformation
  // regardless of reference.
  //
  // Parameters:
  //   gt
  //     an InvariantTransform

  return this._tr.equals(gt._tr)
}

proto.inverse = function () {
  // Return inversed transformation on the same plane.
  return new InvariantTransform(this, this.T.inverse())
}

proto.to = function (plane) {
  // Represent the transform on the target coordinate plane.
  //
  // Parameters:
  //   plane: a SpacePlane
  //
  // Return:
  //   a Transform
  //
  if (plane === null || plane.isRoot()) {
    return this._tr
  }

  // Transformation from space to the target plane
  var covTr = plane.getGlobalTransform().toSpace().inverse()
  return getTrOnPlane(this._tr, covTr)
}

proto.toSpace = function () {
  // Represent the transform on the space coordinate plane.
  //
  // Return a Transform.
  //
  return this._tr
}

proto.multiplyBy =
proto.transformBy = function (itr) {
  // Transform the image of this by given InvariantTransform.
  //
  // Parameters:
  //   itr
  //     an InvariantTransform
  //
  return itr._tr.multiplyBy(this._tr)
}

proto.translate = function (domain, range) {
  // Move transform image horizontally and vertically with control points.
  //
  // Translate so that after the translation, the domain points
  // would be as close to given range points as possible.
  //
  // Parameters:
  //   domain: array of InvariantVector
  //   range: array of InvariantVector
  //
  // Return:
  //   an InvariantTransform
  //
  var itr = InvariantTransform.estimate(this, 'T', domain, range)
  return itr.multiplyBy(this)
}

proto.scale = function (pivot, multiplierOrDomain, range) {
  // Parameters:
  //   pivot: a InvariantVector
  //   multiplier: the scale factor, > 0
  //  OR
  //   pivot: a InvariantVector
  //   domain: array of InvariantVector
  //   range: array of InvariantVector
  var useMultiplier, normPivot, domain, multiplier, tr, itr

  useMultiplier = (typeof range === 'undefined')

  if (useMultiplier) {
    normPivot = pivot.toSpace()
    multiplier = multiplierOrDomain
    // Multiplier does not depend on plane.
    tr = this._tr.scaleBy(multiplier, normPivot)
    return new InvariantTransform(tr)
  } else {
    domain = multiplierOrDomain
    itr = InvariantTransform.estimate(this, 'S', domain, range, pivot)
    return itr.multiplyBy(this)
  }
}

proto.rotate = function (pivot, radiansOrDomain, range) {
  // Parameters:
  //   pivot: a InvariantVector
  //   radians: rotation angle
  //  OR
  //   pivot: a InvariantVector
  //   domain: array of InvariantVector
  //   range: array of InvariantVector
  var useRadians, normPivot, domain, radians, tr, itr

  useRadians = (typeof range === 'undefined')

  if (useRadians) {
    normPivot = pivot.toSpace()
    radians = radiansOrDomain
    // Radians do not depend on plane.
    tr = this._tr.rotateBy(radians, normPivot)
    return new InvariantTransform(tr)
  } else {
    domain = radiansOrDomain
    itr = InvariantTransform.estimate(this, 'R', domain, range, pivot)
    return itr.multiplyBy(this)
  }
}

proto.translateScale = function (domain, range) {
  // Parameters:
  //   domain: array of InvariantVector
  //   range: array of InvariantVector
  var itr = InvariantTransform.estimate(this, 'TS', domain, range)
  return itr.multiplyBy(this)
}

proto.translateRotate = function (domain, range) {
  // Parameters:
  //   domain: array of InvariantVector
  //   range: array of InvariantVector
  var itr = InvariantTransform.estimate(this, 'TR', domain, range)
  return itr.multiplyBy(this)
}

proto.scaleRotate = function (pivot, domain, range) {
  // Parameters:
  //   pivot: InvariantVector
  //   domain: array of InvariantVector
  //   range: array of InvariantVector
  var itr = InvariantTransform.estimate(this, 'SR', domain, range, pivot)
  return itr.multiplyBy(this)
}

proto.translateScaleRotate = function (domain, range) {
  // Parameters:
  //   domain: array of InvariantVector
  //   range: array of InvariantVector
  var itr = InvariantTransform.estimate(this, 'TSR', domain, range)
  return itr.multiplyBy(this)
}

// Class methods

InvariantTransform.estimate = function (type, domain, range, pivot) {
  // Estimate InvariantTransform from control points.
  //
  // Parameters:
  //   type: transformation type.
  //     Available types: T,S,R,TS,TR,SR,TSR (see nudged for further details)
  //   domain
  //     array of InvariantVector
  //   range
  //     array of InvariantVector
  //   pivot
  //     InvariantVector, an optional pivot, used with types S,R,SR
  //
  var normPivot, normDomain, normRange, tr

  if (typeof pivot !== 'undefined') {
    normPivot = pivot.toSpace()
  }

  // Allow singles
  if (domain.hasOwnProperty('_vec')) { domain = [domain] }
  if (range.hasOwnProperty('_vec')) { range = [range] }

  // Convert all InvariantVectors onto the plane and to arrays
  normDomain = domain.map(function (iv) { return iv.toSpace() })
  normRange = range.map(function (iv) { return iv.toSpace() })

  // Then compute optimal transformation on the plane
  tr = nudged.estimate(type, normDomain, normRange, normPivot)
  return new InvariantTransform(tr)
}

module.exports = InvariantTransform
