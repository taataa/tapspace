//
// Plane-Invariant Grid. Immutable.
//
var IVector = require('./IVector')
var IPath = require('./IPath')
var ITransform = require('./ITransform')
var Grid = require('./Grid')

var IGrid = function (grid, plane) {
  // Example
  //   var igrid = new tapspace.IGrid(grid, plane)
  //
  // Parameters
  //   grid (optional, default to default Grid())
  //     a Grid or a plain Grid step mode object
  //   plane (optional, defaults to Space)
  //     a AbstractPlane
  //       an item in space, the plane of the grid.

  if (typeof grid === 'undefined') {
    this._grid = new Grid()
  } else {
    if (!grid.hasOwnProperty('mode')) {
      // Step mode given
      grid = new Grid(grid)
    }

    if (typeof plane === 'undefined') {
      this._grid = grid
    } else {
      this._grid = grid.transform(plane.getGlobalTransform())
    }
  }
}

var proto = IGrid.prototype

proto.almostEqual = function (igrid) {
  return this._grid.almostEqual(igrid._grid)
}

proto.at = function (x, y) {
  return new IVector(this._grid.at(x, y))
}

proto.equal =
proto.equals = function (igrid) {
  // Return true if grids match.
  return this._grid.equals(igrid._grid)
}

proto.getHullOf = function (x, y) {
  var hull = this._grid.getHullOf(x, y)
  return new IPath(hull)
}

proto.getOrigin = function () {
  var orig = this._grid.getOrigin()
  return new IVector(orig)
}

proto.snap = function (pivot, itr) {
  // Parameters:
  //   pivot
  //     IVector
  //   itr
  //     ITransform
  //
  // Return
  //   ITransform
  //     The original transformed to snap to the grid.
  //

  // Grid requires that the pivot must be given on the source plane.
  var piv = pivot.toSpace().transform(itr._tr.inverse())
  return new ITransform(this._grid.snap(piv, itr._tr))
}

proto.to = function (plane) {
  // Represent the grid on the target coordinate plane.
  //
  // Parameters
  //   plane
  //     a AbstractPlane
  //
  // Return
  //   a Path
  //
  if (plane === null || plane.isRoot()) {
    return this._grid
  }

  // Transformation from space to the target plane
  var tr = plane.getGlobalTransform().inverse()
  return this._grid.transform(tr)
}

proto.toSpace = function () {
  // Represent the grid on the space coordinate plane.
  //
  // Return
  //   a Grid.
  //
  return this._grid
}

proto.transform = function (itr) {
  // Create a new IGrid by transforming this
  // by invariant transformation.
  //
  // Parameters
  //   itr
  //     an ITransform
  //
  // Return
  //   an IGrid
  //
  return new IGrid(this._grid.transform(itr._tr))
}

module.exports = IGrid
