const geom = require('affineplane')
const nudged = require('nudged')

module.exports = function (params) {
  // Snap the plane based on any number of anchor and target point pairs.
  // The snap operation attempts to move the plane so that the anchor points
  // match their target points exactly or as closely as possible. Snapping
  // is a powerful way to position elements without the need to know
  // the exact rotation, scaling, or translation.
  //
  // Parameters:
  //   params, object with properties
  //     anchors
  //       a Point or an array of Points. The points on the plane.
  //     targets
  //       a Point or an array of Points. The snap targets for the anchors.
  //       ..The length must match the anchors.
  //     estimator
  //       string. The estimator type restricts the ways the plane is allowed
  //       ..to move during the snap. For details on the estimator types, see
  //       ..[nudged.estimate](https://github.com/axelpale/nudged/).
  //         'TSR': allow translation, scaling, and rotation. The default.
  //         'SR': allow scaling and rotation around the center point.
  //         'TR': allow translation and rotation but no scaling.
  //         'TS': allow translation and scaling but no rotation.
  //         'R': allow only rotation around the center point.
  //         'S': allow only scaling about the center point.
  //         'T': allow only translation aka panning.
  //         'X': allow only translation along the x-axis of the plane.
  //         'Y': allow only translation along the y-axis of the plane.
  //         'L': allow only translation along the given angle.
  //     center
  //       a Point or {x,y}. Optional.
  //       ..The center for the estimators 'SR', 'R', and 'S'.
  //     angle
  //       a number in radians or Direction. Optional.
  //       ..The angle for the estimator 'L'.
  //
  // Return
  //   this, for chaining
  //

  // Normalize to arrays
  if (!Array.isArray(params.anchors)) {
    // Assume single point was given
    params.anchors = [params.anchors]
  }
  if (!Array.isArray(params.targets)) {
    // Assume single point was given
    params.targets = [params.targets]
  }

  // Normalize the anchor points onto this plane.
  const domain = []
  for (let i = 0; i < params.anchors.length; i += 1) {
    const p = params.anchors[i]
    if (p.basis) {
      const pr = p.basis.getProjectionTo(this)
      domain.push(geom.proj2.point2(pr, p)) // becomes plain {x,y}
    } else {
      // Assume the point is already on the plane.
      domain.push({ x: p.x, y: p.y })
    }
  }

  // Normalize the target points onto this plane.
  const range = []
  for (let i = 0; i < params.targets.length; i += 1) {
    const p = params.targets[i]
    if (p.basis) {
      const pr = p.basis.getProjectionTo(this)
      range.push(geom.proj2.point2(pr, p)) // becomes plain {x,y}
    } else {
      // Assume the point is already on the plane.
      range.push({ x: p.x, y: p.y })
    }
  }

  // Normalize center if provided.
  let center = null
  if (params.center) {
    const c = params.center
    if (c.basis) {
      const pr = c.basis.getProjectionTo(this)
      center = geom.proj2.point2(pr, c) // becomes plain {x,y}
    } else {
      // Assume the point is already on the plane.
      center = { x: c.x, y: c.y } // copy to ensure immutability
    }
  }

  // Normalize the angle if provided.
  let angle = null
  if (params.angle) {
    const dir = params.angle
    if (dir.basis) {
      const pr = dir.basis.getProjectionTo(this)
      angle = geom.proj2.dir2(pr, dir.r) // becomes plain number
    } else {
      // Assume the direction is given as number and
      // already on the plane.
      angle = dir
    }
  }

  // Normalize estimator.
  let estimator = 'TSR'
  if (params.estimator) {
    estimator = params.estimator
  }

  // Use nudged least-squares optimizer
  const tran = nudged.estimate({
    estimator: estimator,
    domain: domain,
    range: range,
    center: center,
    angle: angle
  })

  // Combine into plane projection.
  // Because the tran is on the plane, it must become first (rightmost)
  const newProj = geom.tran2.compose(this.proj, tran)
  this.proj = newProj

  this.renderCss()

  return this
}
