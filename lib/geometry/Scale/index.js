const Scale = function (basis, multiplier) {
  // @Scale(basis, multiplier)
  //
  // The scale in space.
  // The scale depends on the scale of the coordinate space and
  // therefore needs conversion between planes.
  //
  // In contrast, a scaling aka dilation is not the same as the scale.
  // Dilation is a change in the scale, for example doubling,
  // and therefore does not depend on the plane.
  //
  // Parameters
  //   basis
  //     a Component
  //   multiplier
  //     a number, the scale multiplier relative to the basis scale.
  //
  this.basis = basis
  this.m = multiplier
}

module.exports = Scale
const proto = Scale.prototype
proto.isScale = true

proto.changeBasis = require('./changeBasis')
proto.getRaw = require('./getRaw')
proto.scaleBy = require('./scaleBy')
proto.transit = proto.changeBasis
proto.transitRaw = require('./transitRaw')
proto.transitRawOuter = require('./transitRawOuter')
