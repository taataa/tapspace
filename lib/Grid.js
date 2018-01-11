var Transform = require('./Transform')
var extend = require('extend')

var DEFAULT_STEPMODE = {
  translate: 0,
  scale: 0,
  rotate: 0
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
  var s, r, tx, ty
  var oldScale, newScale, scaleRatio
  var oldRotation, newRotation

  if (this.mode.translate === 0) {
    tx = tr.tx
    ty = tr.ty
  } else {
    tx = Math.round(tr.tx / this.mode.translate) * this.mode.translate
    ty = Math.round(tr.ty / this.mode.translate) * this.mode.translate
  }

  oldScale = tr.getScale()
  oldRotation = tr.getRotation()

  if (this.mode.scale === 0) {
    s = tr.s
    r = tr.r
    newScale = oldScale // needed below
  } else {
    newScale = Math.round(oldScale / this.mode.scale) * this.mode.scale
    scaleRatio = newScale / oldScale
    s = tr.s * scaleRatio
    r = tr.r * scaleRatio
  }

  if (this.mode.rotate === 0) {
    // Do nothing, s and r already set above
  } else {
    // s = newScale * cos oldRotation
    // r = newScale * sin oldRotation
    // scale remains the same, only rotation changes
    newRotation = Math.round(oldRotation / this.mode.rotate) * this.mode.rotate
    s = newScale * Math.cos(newRotation)
    r = newScale * Math.sin(newRotation)
  }

  return new Transform(s, r, tx, ty)
}

proto.equals = function (grid) {
  return (
    this.mode.translate === grid.mode.translate &&
    this.mode.scale === grid.mode.scale &&
    this.mode.rotate === grid.mode.rotate
  )
}

proto.toArray = function () {
  return [this.mode]
}

module.exports = Grid
