//
// A Grid to snap transformations.
// In other words, a Grid defines a discrete set of transformations
// and provides methods to find the nearest transformation in the set
// for any given transformation.
//
var EPSILON = require('./epsilon')
var Vector = require('./Vector')
var Path = require('./Path')
var extend = require('extend')

var DEFAULT_STEPMODE = {
  xStep: 0,
  yStep: 0,
  scaleStep: 0,
  rotateStep: 0,
  xPhase: 0,
  yPhase: 0,
  scalePhase: 0,
  rotatePhase: 0,
  xRotation: 0, // The angle of the xy grid
  yRotation: Math.PI / 2
}

var snap = function (x, step, phase) {
  // Find x' in { i * step + phase | i in N }
  // such that abs(x - x') is minimal. N is the set of integers.
  //
  // Parameters:
  //   x
  //     number
  //   step
  //     number
  //   phase
  //     number
  //
  // Return
  //   number
  //
  return (Math.round((x - phase) / step) * step) + phase
}

var Grid = function (stepMode) {
  if (typeof stepMode !== 'object') {
    stepMode = DEFAULT_STEPMODE
  } else {
    stepMode = extend({}, DEFAULT_STEPMODE, stepMode)
  }

  if ((stepMode.xStep < EPSILON && stepMode.yStep > EPSILON) ||
      (stepMode.xStep > EPSILON && stepMode.yStep < EPSILON)) {
    throw new Error('Grid xStep and yStep must be either both zero or ' +
      'both greater than zero.')
    // because otherwise handling with grid basis vectors becomes
    // unnecessarily complicated.
  }

  if (Math.abs(stepMode.xRotation - stepMode.yRotation) < EPSILON) {
    throw new Error('Grid xRotation and yRotation cannot be the same.')
    // because otherwise grid basis vectors become linearly dependent
    // and could not be used as basis vectors without unnecessarily
    // complicated checking for special cases.
  }

  this.mode = stepMode
}

var proto = Grid.prototype

proto.almostEqual = function (grid) {
  // Return bool. True if modes of the grids are equal
  // with a tiny margin left for floating point arithmetic rounding errors.
  var k
  var tm = this.mode
  var gm = grid.mode

  for (k in tm) {
    if (tm.hasOwnProperty(k)) {
      if (gm.hasOwnProperty(k)) {
        if (Math.abs(tm[k] - gm[k]) > EPSILON) {
          return false
        }
      } else {
        return false
      }
    }
  }

  return true
}

proto.at = function (i, j) {
  // Get a Vector to the crossing (i, j) on the grid.
  // The vector grid.at(0,0) equals the grid.getOrigin()
  //
  // Return
  //   Vector
  //
  var m = this.mode

  if (m.xStep === 0 || m.yStep === 0) {
    // No grid
    return new Vector(0, 0)
  }

  // Grid basis vectors
  var gbx = Vector.createFromPolar(m.xStep, m.xRotation)
  var gby = Vector.createFromPolar(m.yStep, m.yRotation)

  // Get origin defined by phase
  var phx = gbx.multiply(m.xPhase / m.xStep)
  var phy = gby.multiply(m.yPhase / m.yStep)
  var origin = phx.add(phy)

  // Add grid coordinate vectors to the origin to get the result.
  return origin.add(gbx.multiply(i)).add(gby.multiply(j))
}

proto.equal =
proto.equals = function (grid) {
  // Return bool. True if modes of the grids equal.
  //
  var k
  var tm = this.mode
  var gm = grid.mode

  for (k in tm) {
    if (tm.hasOwnProperty(k)) {
      if (gm.hasOwnProperty(k)) {
        if (tm[k] !== gm[k]) {
          return false
        }
      } else {
        return false
      }
    }
  }

  return true
}

proto.getHullOf = function (i, j) {
  // Get hull Path of (i, j):th eye of the grid.
  // To define the (0, 0):th eye, consider the example:
  //   Let G be grid with xStep=1, yStep=1, xPhase=0.5, yPhase=0.
  //   Now the hull of (0, 0) is a four-point Path:
  //   [(0.5, 0), (0.5, 1), (1.5, 1), (1.5, 0)]
  // Thus, the eye at x,y origin may not be (0, 0).
  //
  // Parameters:
  //   i
  //     number
  //   j
  //     number
  //
  // Return:
  //   Path
  //   null
  //     if xStep=0 or yStep=0
  //

  // Grid basis vectors
  var m = this.mode
  var gbx = Vector.createFromPolar(m.xStep, m.xRotation)
  var gby = Vector.createFromPolar(m.yStep, m.yRotation)

  // Vector to grid origin
  var vor = this.getOrigin()

  // Corners
  var c0 = vor.add(gbx.multiply(i)).add(gby.multiply(j))
  var c1 = vor.add(gbx.multiply(i)).add(gby.multiply(j + 1))
  var c2 = vor.add(gbx.multiply(i + 1)).add(gby.multiply(j + 1))
  var c3 = vor.add(gbx.multiply(i + 1)).add(gby.multiply(j))

  // Call getHull to ensure correct order.
  return (new Path([c0, c1, c2, c3])).getHull()
}

proto.getOrigin = function () {
  // Get the origin point of the grid, specified by xPhase and yPhase.
  //
  // Return:
  //   Vector
  //

  // Grid basis vectors
  var m = this.mode
  var gbx = Vector.createFromPolar(m.xStep, m.xRotation)
  var gby = Vector.createFromPolar(m.yStep, m.yRotation)

  // Normalize phase and turn to components
  var phx = gbx.multiply(m.xPhase / m.xStep)
  var phy = gby.multiply(m.yPhase / m.yStep)

  // Together they point to the origin
  return phx.add(phy)
}

proto.snap = function (pivot, tr) {
  // Snap a Transform to the grid.
  // In other words, find the nearest Transform allowed
  // by the grid.
  //
  // Parameters
  //   pivot
  //     Vector, represented on the source plane of tr.
  //   tr
  //     Transform, a mapping from a node plane to its parent
  //
  // Return
  //   Transform snapped to the grid.
  //
  var dx, dy
  var gbx, gby
  var tr1, tr2
  var piv1, piv1g, piv2g, piv2
  var oldScale, newScale, scalingMultiplier
  var oldRotation, newRotation
  var m = this.mode // short alias

  // The pivot is represented on source plane but the grid
  // is on the target. Thus convert the pivot onto target.
  piv1 = pivot.transform(tr)

  if (m.xStep === 0 || m.yStep === 0) {
    // No x y snapping
    piv2 = piv1
  } else {
    // The pivot point must hit the grid. Therefore, for starters,
    // let us translate so that pivot is on the grid.
    // The grid is defined by basis vectors gvx, gvy.
    // Magnitude of gvx is xStep and direction xRotation
    // Magnitude of gvy is yStep and direction yRotation
    // Therefore for snapping, we change the basis of the pivot.
    gbx = Vector.createFromPolar(m.xStep, m.xRotation) // grid basis vectors
    gby = Vector.createFromPolar(m.yStep, m.yRotation)
    piv1g = piv1.changeBasis(gbx, gby)
    piv2g = new Vector(
      snap(piv1g.x, 1, m.xPhase / m.xStep), // snap step 1 because on grid
      snap(piv1g.y, 1, m.yPhase / m.yStep)
    )
    // Change basis back to original coordinate space
    piv2 = piv2g.changeFromBasis(gbx, gby)
  }

  // How much did the pivot move?
  dx = piv2.x - piv1.x
  dy = piv2.y - piv1.y
  tr1 = tr.translateBy(dx, dy)

  // Now the pivot is on the grid.
  // Let us then snap the scaling.
  // Any change to the scale must be done around the pivot.
  oldScale = tr1.getScale()
  if (m.scaleStep === 0) {
    newScale = oldScale // needed below
  } else {
    newScale = snap(oldScale, m.scaleStep, m.scalePhase)
  }

  scalingMultiplier = newScale / oldScale
  tr2 = tr1.scaleBy(scalingMultiplier, piv2.toArray())

  // After scaling, pivot stays the same.
  // Let us rotate around the pivot.

  oldRotation = tr2.getRotation()
  if (m.rotateStep === 0) {
    newRotation = oldRotation
  } else {
    // s = newScale * cos oldRotation
    // r = newScale * sin oldRotation
    // scale remains the same, only rotation changes
    newRotation = snap(oldRotation, m.rotateStep, m.rotatePhase)
  }

  // We can use the same pivot because scaling is done so that
  // it stays still.
  return tr2.rotateBy(newRotation - oldRotation, piv2.toArray())
}

proto.toArray = function () {
  return [this.mode]
}

proto.transform = function (tr) {
  // Convert to another Grid
  var tm = this.mode
  var result = {}  // transformed mode

  var scale = tr.getScale()
  var rotation = tr.getRotation()

  // Rotation step is not affected at all.
  // Rotation phase is affected by rotation.
  result.rotateStep = tm.rotateStep
  result.rotatePhase = tm.rotatePhase + rotation

  // Scale step is probably (TODO) not affected at all.
  // Scale phase however is affected by scaling.
  // For example, let 1, 2, 3, 4 be allowed scalings on source.
  // If target has x2 magnification, thus 2, 4, 6, and 8 are allowed.
  // Another example, let 1.5, 2.5, and 3.5 be allowed scalings on source.
  // Thus scaleStep = 1 and scalePhase = 0.5
  // If target has x2 magnification, then 3, 5, and 7 are allowed.
  // Thus scaleStep = 2 and scalePhase = 1 on the target.
  result.scaleStep = tm.scaleStep * scale
  result.scalePhase = tm.scalePhase * scale

  if (tm.xStep === 0 || tm.yStep === 0) {
    // No xy snapping
    result.xStep = tm.xStep
    result.yStep = tm.yStep
    result.xRotation = tm.xRotation
    result.yRotation = tm.yRotation
    result.xPhase = tm.xPhase
    result.yPhase = tm.yPhase
  } else {
    // Update grid basis vectors.
    // Zero basis vectors do no trouble because they remain zero.
    // xStep and yStep are altered by scale and rotation but not by translation.
    // Represent step and rotation as Vector for easier transformation.
    var gbx = Vector.createFromPolar(tm.xStep, tm.xRotation)
    var gby = Vector.createFromPolar(tm.yStep, tm.yRotation)

    // Transform the basis, but without translation
    var trSR = tr.translateBy(-tr.tx, -tr.ty) // a bit dirty?
    var xt = gbx.transform(trSR)
    var yt = gby.transform(trSR)

    result.xStep = xt.getMagnitude()
    result.yStep = yt.getMagnitude()
    result.xRotation = xt.getRotation()
    result.yRotation = yt.getRotation()

    // Transformation affects the phase.

    // The xPhase/xStep and yPhase/yStep are coordinates on the grid
    var normXPhase = tm.xPhase / tm.xStep
    var normYPhase = tm.yPhase / tm.yStep
    var normPhaseOnSourceGrid = new Vector(normXPhase, normYPhase)
    var normPhaseOnSource = normPhaseOnSourceGrid.changeFromBasis(gbx, gby)
    // Phase is about to change. Convert phase to the target plane.
    var normPhaseOnTarget = normPhaseOnSource.transform(tr)
    // And from the target plane to the new grid on the target plane.
    var normPhaseOnTargetGrid = normPhaseOnTarget.changeBasis(xt, yt)
    // Then undo the normalization.
    var xPhaseOnTargetGrid = normPhaseOnTargetGrid.x * xt.getMagnitude()
    var yPhaseOnTargetGrid = normPhaseOnTargetGrid.y * yt.getMagnitude()
    // And store the result
    result.xPhase = xPhaseOnTargetGrid
    result.yPhase = yPhaseOnTargetGrid
  }

  return new Grid(result)
}

module.exports = Grid
