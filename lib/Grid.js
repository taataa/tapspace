//
// A Grid to snap transformations.
// In other words, a Grid defines a discrete set of transformations
// and provides methods to find the nearest transformation for
// any given transformation.
//
var Transform = require('./Transform')
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
  rotatePhase: 0
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

proto.snap = function (tr) {
  // Return a Transform snapped to the grid.
  //
  var s, r, tx, ty
  var oldScale, newScale, scaleRatio
  var oldRotation, newRotation
  var m = this.mode // short alias

  if (m.xStep === 0) {
    tx = tr.tx // xPhase does not matter because infinitesimal step
  } else {
    tx = snap(tr.tx, m.xStep, m.xPhase)
  }

  if (m.yStep === 0) {
    ty = tr.ty
  } else {
    ty = snap(tr.ty, m.yStep, m.yPhase)
  }

  oldScale = tr.getScale()
  oldRotation = tr.getRotation()

  if (m.scaleStep === 0) {
    s = tr.s
    r = tr.r
    newScale = oldScale // needed below
  } else {
    newScale = snap(newScale, m.scaleStep, m.scalePhase)
    // Following only needed if mode.rotateStep === 0
    scaleRatio = newScale / oldScale
    s = tr.s * scaleRatio
    r = tr.r * scaleRatio
  }

  if (m.rotateStep === 0) {
    // Do nothing, s and r already set above
  } else {
    // s = newScale * cos oldRotation
    // r = newScale * sin oldRotation
    // scale remains the same, only rotation changes
    newRotation = snap(oldRotation, m.rotateStep, m.rotatePhase)
    s = newScale * Math.cos(newRotation)
    r = newScale * Math.sin(newRotation)
  }

  return new Transform(s, r, tx, ty)
}

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

proto.toArray = function () {
  return [this.mode]
}

proto.transform = function (tr) {
  // Convert to another Grid
  var tm = this.mode
  var result = {}  // transformed mode

  var scale = tr.getScale()
  var rotation = tr.getRotation()

  // X and Y steps are altered by scale and rotation but not by translation.
  var xyStep = new Vector(tm.xStep, tm.yStep)
  var resultXyStep = xyStep.multiply(scale).rotate(rotation)
  result.xStep = resultXyStep.x
  result.yStep = resultXyStep.y

  // X and Y phase is fully transformed
  var xyPhase = new Vector(tm.xPhase, tm.yPhase)
  var resultXyPhase = xyPhase.transform(tr)
  result.xPhase = resultXyPhase.x
  result.yPhase = resultXyPhase.y

  // Rotation step is not affected at all.
  // Rotation phase is affected by rotation.
  result.rotateStep = tm.rotateStep
  result.rotatePhase = tm.rotatePhase + rotation

  // Scale step is probably (TODO) not affected at all.
  // Scale phase however is affected by scaling.
  result.scaleStep = tm.scaleStep
  result.scalePhase = tm.scalePhase + scale

  return new Grid(result)
}

module.exports = Grid
