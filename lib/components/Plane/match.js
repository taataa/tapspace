const fine = require('affineplane')
const point2 = fine.point2
const dir2 = fine.dir2
const nudged = require('nudged')

module.exports = function (params) {
  // @Plane:match(params)
  //
  // Matching is a powerful way to position elements without the need to know
  // the exact rotation, scaling, or translation. Give one or more source
  // points and their targets. The match operation attempts to move the plane
  // so that the source points match their target points exactly or as
  // closely as possible.
  //
  // Parameters:
  //   params, object with properties
  //     source, alias sources
  //       a Point or an array of Points. The length must match the targets.
  //       ..Alias: source.
  //     target, alias targets
  //       a Point or an array of Points. The length must match the sources.
  //       ..Alias: target.
  //     estimator
  //       string. The estimator type restricts the ways the plane is allowed
  //       ..to move during the operation. For details on the estimator types,
  //       ..see [nudged.estimate](https://github.com/axelpale/nudged/).
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

  // Allow singular param names
  if (params.source && !params.sources) {
    params.sources = params.source
  }
  if (params.target && !params.targets) {
    params.targets = params.target
  }

  // Ensure required params given
  if (!params.sources) {
    throw new Error('Missing parameter: sources')
  }
  if (!params.targets) {
    throw new Error('Missing parameter: targets')
  }

  // Normalize to arrays
  if (!Array.isArray(params.sources)) {
    // Assume single point was given
    params.sources = [params.sources]
  }
  if (!Array.isArray(params.targets)) {
    // Assume single point was given
    params.targets = [params.targets]
  }

  // Normalize the source points onto this plane.
  const domain = []
  for (let i = 0; i < params.sources.length; i += 1) {
    const p = params.sources[i]
    if (p.basis) {
      const pr = p.basis.getTransitionTo(this)
      domain.push(point2.transitFrom(p.point, pr)) // to point2
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
      const pr = p.basis.getTransitionTo(this)
      range.push(point2.transitFrom(p.point, pr)) // to point2
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
      const pr = c.basis.getTransitionTo(this)
      center = point2.transitFrom(c.point, pr) // c becomes plain {x,y}
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
      const pr = dir.basis.getTransitionTo(this)
      const dirOnThis = dir2.transitFrom(dir.dir, pr)
      angle = dir2.toAngle(dirOnThis)
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
  const tr = nudged.estimate({
    estimator: estimator,
    domain: domain,
    range: range,
    center: center,
    angle: angle
  })

  // Nudged is 2d, thus we must add z.
  tr.z = this.tran.z

  // Transform the plane.
  // Subclass instances like viewports may implement their own transformBy.
  this.transformBy(tr)

  return this
}
