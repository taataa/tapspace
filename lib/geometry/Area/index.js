const scalar2 = require('affineplane').scalar2

const Area = function (basis, area) {
  // @Area(basis, area)
  //
  // An area in space. Always zero or positive.
  // Will behave like an area when a coordinate transition changes the scale
  // of the reference frame.
  //
  // Parameters
  //   basis
  //     a Component
  //   area
  //     a scalar2, a number.
  //

  // DEBUG
  if (!scalar2.validate(area)) {
    throw new Error('Invalid area')
  }

  this.basis = basis
  this.area = Math.abs(area)
}

const proto = Area.prototype
module.exports = Area
proto.isArea = true

// Methods
proto.changeBasis = require('./changeBasis')
proto.getNumber = require('./getRaw')
proto.getRaw = proto.getNumber
proto.projectTo = require('./projectTo')
proto.transit = proto.changeBasis
proto.transitRaw = require('./transitRaw')
