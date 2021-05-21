// Projetions are maps from plane A to plane B.
// A projection can be used as a function that converts
// coordinates of geometric structures from plane to plane.
// The structure stays completely intact: isomorphism.
// Only the representation changes.
// The structures are in affine space: there is no origin or 'global' plane.
//
// The projection defines the location of plane A on plane B.
// The projection defines the orientation of plane A on plane B.
// A projection maps plane A (0,0) to the position of the plane A on plane B.

// If plane A is a child element and plane B the parent, then
// the projection from A to B is equivalent to the location of A on B.
// This is named as spaceElement.proj.

exports.copy = (proj) {
  return Object.assign({}, proj)
}

exports.create = (a, b, x, y) {
  return {
    a: 1,
    b: 0,
    x: 0,
    y: 0
  }
}

// exports.add =
// exports.apply =
// exports.multiply =
exports.combine =
exports.compose = (p, q) => {
  // Combine two projections
  //
  // Parameters:
  //   p
  //     projection to be applied last
  //   q
  //     projection to be applied first
  //
  // Return
  //   proj
  //
  return {
    a: p.a * q.a - p.b * q.b,
    b: p.b * q.a + p.a * q.b,
    x: p.a * q.x - p.b * q.y + p.x,
    y: p.b * q.x + p.a * q.y + p.y
  }
}

exports.invert =
exports.inverse = (p) => {
  // Invert the projection. A projection from plane P to plane Q
  // becomes a projection from plane Q to plane P.

  // See note 2015-10-27 at 2015-10-26-16-30 for analysis
  // Test if singular transformation. These might occur when all the range
  // points are the same, forcing the scale to drop to zero.
  const det = p.a * p.a + p.b * p.b
  if (Math.abs(det) < exports.EPSILON) {
    throw new Error('Singular transformations cannot be inversed.')
  }

  return {
    a: p.a / det,
    b: -p.b / det,
    x: (-p.a * p.x - p.b * p.y) / det,
    y: (p.b * p.x - p.a * p.y) / det
  }
}

// TODO is needed? spaceEl.projectionTo(anotherSpaceEl) exists
// exports.project =
exports.projectBetween = (sourceProj, targetProj, point) => {

}

// TODO is needed? spaceEl.projectionTo(anotherSpaceEl) exists
exports.relative =
exports.projectionBetween = (sourceProj, targetProj) => {
  // Combination of source projection and the inverse of target projection.
  return
}

exports.point2 = (pr, p2) => {
  // Project a point2
  //
  // Parameters:
  //   pr
  //     projection between planes
  //
  // Return
  //   point2
  //
  return {
    x: pr.a * p2.x - pr.b * p2.y + pr.x,
    y: pr.b * p2.x + pr.a * p2.y + pr.y
  }
}

// exports.projectTranslation =
// exports.projectVector =
exports.vector2 = (pr, v2) => {
  // Project vector2 from plane to another.
  // Translations do not affect vectors,
  // only scaling and rotation do.
  //
  // Parameters:
  //   pr
  //     projection between planes
  //   v2
  //     vector2, a translation on a plane,
  //     represented on the source plane.
  //
  // Return:
  //   vector2, represented on the target plane,
  //
  return {
    dx: pr.a * v2.dx - pr.b * v2.dy,
    dy: pr.b * v2.dx + pr.a * v2.dy
  }
}

// exports.lin2 =
// exports.linear =
exports.tran2 = (pr, tr2) => {
  // Project a linear transformation from plane to another.
  // Use to represent the linear transformation on another plane.
  //
  // Parameters:
  //   pr
  //     projection between planes
  //   tr2
  //     tran2, linear transformation, represented on the source plane.
  //
  // Return:
  //   tran2, represented on the target plane
  //
  return {
    da: pr.a * tr2.da - pr.b * tr2.db,
    db: pr.b * tr2.da + pr.a * tr2.db
  }
}

// exports.projectProj =
// exports.projectTransform =
// exports.tran =
exports.tran4 = (pr, tr) => {
  // Transforms are quite similar to projections but they
  // happen on the plane, and thus are automorphisms.
  //
  // Parameters:
  //   pr
  //     proj, projection to be applied
  //   tr
  //     tran4, an affine similarity transformation
  //
  // Return
  //   tran4
  //

  // Matrix multiplication matrix(pr) * matrix(tr)
  return {
    a: pr.a * tr.da - pr.b * tr.db,
    b: pr.b * tr.da + pr.a * tr.db,
    x: pr.a * tr.dx - pr.b * tr.dy + pr.x,
    y: pr.b * tr.dx + pr.a * tr.dy + pr.y
  }
}
