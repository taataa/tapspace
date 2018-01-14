//
// A Grid to snap transformations.
// In other words, a Grid defines a discrete set of transformations
// and provides methods to find the nearest transformation in the set
// for any given transformation.
//
var Vector = require('./Vector')
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
  this.mode = stepMode
}

var proto = Grid.prototype

proto.equal =
proto.equals = function (grid) {
  // Return bool. True ff modes of the grids equal.
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
  //piv1 = pivot

  //console.log()
  //console.log('Transform', tr)
  //console.log('pivot', pivot)
  //console.log('piv1', piv1)

  // The pivot point must hit the grid. Therefore, for starters,
  // let us translate so that pivot is on the grid.
  // The grid is defined by basis vectors gvx, gvy.
  // Magnitude of gvx is xStep and direction xRotation
  // Magnitude of gvy is yStep and direction yRotation
  // Therefore for snapping, we change the basis of the pivot
  //
  if (m.xStep === 0) {
    if (m.yStep === 0) {
      // No xy grid
      piv2 = piv1
    } else {
      // Free x axis, snap y
      gby = Vector.createFromPolar(m.yStep, m.yRotation) // grid basis vector
      gbx = gby.rotate(Math.PI / 2) // artificial orthogonal
      piv1g = piv1.changeBasis(gbx, gby)
      // Snap only in the direction of grid's y-basis vector
      piv2g = new Vector(piv1g.x, snap(piv1g.y, 1, m.yPhase / m.yStep))
      // Change back
      piv2 = piv2g.changeFromBasis(gbx, gby)
    }
  } else {
    if (m.yStep === 0) {
      // Free y axis, snap x
      gbx = Vector.createFromPolar(m.xStep, m.xRotation) // grid basis vector
      gby = gbx.rotate(Math.PI / 2) // artificial orthogonal
      piv1g = piv1.changeBasis(gbx, gby)
      // Snap only in the direction of grid's x-basis vector
      piv2g = new Vector(snap(piv1g.x, 1, m.xPhase / m.xStep), piv1g.y)
      // Change back
      piv2 = piv2g.changeFromBasis(gbx, gby)
    } else {
      // Snap both
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
  }

  // How much did the pivot move?
  dx = piv2.x - piv1.x
  dy = piv2.y - piv1.y
  tr1 = tr.translateBy(dx, dy)

  //console.log('tr1', tr1)

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

  if (tm.xStep === 0) {
    result.xRotation = DEFAULT_STEPMODE.xRotation
  } else {
    result.xRotation = xt.getRotation()
  }

  if (tm.yStep === 0) {
    result.yRotation = DEFAULT_STEPMODE.yRotation
  } else {
    result.yRotation = yt.getRotation()
  }

  // Scale and translation affects the phase.
  // Find how much the translation affects by changing the basis
  // of the translation to original grid basis. This gives us
  // the phase of the translation.

  // Create artificial second basis vector to find new phase
  // if one of the basis vectors has zero length.
  var phasebx, phaseby, phaseShift, phaseOnGrid
  if (tm.xStep === 0 && tm.yStep === 0) {
    // No need for phase shift
    result.xPhase = DEFAULT_STEPMODE.xPhase
    result.yPhase = DEFAULT_STEPMODE.yPhase
  } else {
    if (tm.xStep === 0) {
      phasebx = gby.rotate(Math.PI / 2)
      phaseby = gby
    }

    if (tm.yStep === 0) {
      phasebx = gbx
      phaseby = gbx.rotate(Math.PI / 2)
    }

    // Phase shift caused by translation
    phaseShift = (new Vector(tr.tx, tr.ty)).changeBasis(phasebx, phaseby)
    // Add initial phase
    phaseOnGrid = phaseShift.translate(tm.xPhase, tm.yPhase)
    // Then scale. Other way would have been to change the translation basis to
    // the already transformed grid basis and add scaled phases
    result.xPhase = phaseOnGrid.x * scale
    result.yPhase = phaseOnGrid.y * scale
  }

  // Rotation step is not affected at all.
  // Rotation phase is affected by rotation.
  result.rotateStep = tm.rotateStep
  if (tm.rotateStep === 0) {
    result.rotatePhase = 0
  } else {
    result.rotatePhase = tm.rotatePhase + rotation
  }

  // Scale step is probably (TODO) not affected at all.
  // Scale phase however is affected by scaling.
  result.scaleStep = tm.scaleStep
  if (tm.scaleStep === 0) {
    result.scalePhase = 0
  } else {
    result.scalePhase = tm.scalePhase + scale
  }

  return new Grid(result)
}

module.exports = Grid
