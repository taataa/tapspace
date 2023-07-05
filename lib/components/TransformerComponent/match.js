const fine = require('affineplane')
const dir2 = fine.dir2
const nudged = require('nudged')

module.exports = function (params) {
  // @TransformerComponent:match(params)
  //
  // Matching is a powerful way to position elements without the need to know
  // their exact rotation, scaling, or translation. Give one or more source
  // points and their targets. The match operation attempts to move the basis
  // so that the source points match their target points exactly or as
  // closely as possible. Supports translations 3D but scalings and rotations
  // only in 2D on xy-plane.
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
  //       a string. Optional, default 'TSR'.
  //       The estimator type restricts the ways the plane is allowed
  //       ..to move during the operation. For details on the estimator types,
  //       ..see [nudged.estimate](https://github.com/axelpale/nudged/).
  //         'TSR': allow translation, scaling, and rotation. The default.
  //         'SR': allow scaling and rotation around the pivot point.
  //         'TR': allow translation and rotation but no scaling.
  //         'TS': allow translation and scaling but no rotation.
  //         'R': allow only rotation around the pivot point.
  //         'S': allow only scaling about the pivot point.
  //         'T': allow only translation aka panning.
  //         'X': allow only translation along the x-axis of the plane.
  //         'Y': allow only translation along the y-axis of the plane.
  //         'L': allow only translation along the given angle.
  //     pivot
  //       a Point or {x,y}. Optional.
  //       ..The pivot for the estimators 'SR', 'R', and 'S' acts as a
  //       ..fixed origin of rotation and scaling.
  //     angle
  //       a number in radians or Direction. Optional.
  //       ..The line angle for the estimator 'L'.
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

  // Normalize the source points into this basis.
  const domain = []
  for (let i = 0; i < params.sources.length; i += 1) {
    const p = params.sources[i]
    if (p.transitRaw) {
      domain.push(p.transitRaw(this)) // to point3
    } else {
      // Assume the point is already in the basis.
      domain.push({ x: p.x, y: p.y, z: p.z || 0 })
    }
  }

  // Normalize the target points onto this plane.
  const range = []
  for (let i = 0; i < params.targets.length; i += 1) {
    const p = params.targets[i]
    if (p.transitRaw) {
      range.push(p.transitRaw(this)) // to point3
    } else {
      // Assume the point is already in the basis.
      range.push({ x: p.x, y: p.y, z: p.z || 0 })
    }
  }

  // Normalize pivot if provided.
  let pivot = null
  if (params.pivot) {
    const c = params.pivot
    if (c.transitRaw) {
      pivot = c.transitRaw(this) // to point3
    } else {
      // Assume the point is already in the basis.
      // Copy to ensure immutability. Support point2.
      const cz = c.z || 0
      pivot = { x: c.x, y: c.y, z: cz }
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
  const tr = nudged.estimate({ estimator, domain, range, center: pivot, angle })

  // Nudged is 2d, thus we must estimate dz separately,
  // given that the translation is allowed.
  let dz = 0
  if (estimator.indexOf('T') >= 0) {
    const len = Math.min(domain.length, range.length)
    let domainSum = 0
    let rangeSum = 0
    for (let i = 0; i < len; i += 1) {
      domainSum += domain[i].z
      rangeSum += range[i].z
    }

    if (len > 0) {
      const domainAvgZ = domainSum / len
      const rangeAvgZ = rangeSum / len
      // How much delta-z to move domain to match range in average?
      dz = rangeAvgZ - domainAvgZ
    }
  }
  tr.z = dz

  // Transform the plane.
  // - Use transformBy because subclass instances like viewports
  //   may implement their own transformBy.
  // - use zero transform origin because nudged estimator is that way.
  const trOrigin = { x: 0, y: 0 }
  this.transformBy(tr, trOrigin)

  return this
}
