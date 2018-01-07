//
// SpaceGroup
// A group of objects in space.
// The group should not have any representation in views.
//
var Vector = require('./Vector')
var InvariantVector = require('./InvariantVector')
var InvariantPath = require('./InvariantPath')
var SpaceTransformer = require('./SpaceTransformer')
var extend = require('extend')

var SpaceGroup = function (parent) {
  // A set of SpaceTransformers.
  //
  // Parameters:
  //   parent
  //     a SpaceNode
  //
  SpaceTransformer.call(this)

  this.setParent(parent)
}

var p = extend({}, SpaceTransformer.prototype)
SpaceGroup.prototype = p

p.atMid = function () {
  var minNW = new Vector(0, 0) // 2 owls
  var maxSE = new Vector(0, 0)

  this.getChildren().forEach(function (child) {
    minNW = child.atNW().to(this).min(minNW)
    maxSE = child.atSE().to(this).max(maxSE)
  })

  var diag = maxSE.subtract(minNW)
  return new InvariantVector(diag.multiply(0.5), this)
}

p.fit = function (ipa) {
  // Scale and translate to fit around
  // the given InvariantPath or SpaceRectangle or SpaceGroup.
  //
  // Parameters:
  //   ipa
  //     InvariantPath
  //
  // Emits:
  //   transformed
  //
  var domain = new InvariantPath(this.getHull().to(this).getBounds(), this)
  var target = new InvariantPath(ipa.getHull().to(this).getBounds(), this)
  return this.translateScale(domain, target)
}

p.getHull = function () {
  // Get bounding box as an InvariantPath. Equals the convex hull
  // of the children.
  var ip = this.getChildren().reduce(function (acc, child) {
    return acc.add(child.getHull())
  }, new InvariantPath())

  return ip.getHull()
}

module.exports = SpaceGroup
