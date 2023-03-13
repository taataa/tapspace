// TODO const scalar3 = require('affineplane').scalar3

const Volume = function (basis, volume) {
  // @Volume(basis, volume)
  //
  // A volume in space. Always zero or positive.
  // Will maintain correct value when a coordinate transition changes
  // the scale of the reference frame.
  //
  // Parameters
  //   basis
  //     a Basis
  //   volume
  //     a scalar3, a number. A scalar measurement of third order.
  //

  // DEBUG
  // TODO use scalar3.validate
  if (typeof volume !== 'number') {
    throw new Error('Invalid area')
  }

  this.basis = basis
  this.volume = Math.abs(volume)
}

const proto = Volume.prototype
module.exports = Volume
proto.isVolume = true

// Methods
proto.changeBasis = require('./changeBasis')
proto.getRaw = require('./getRaw')
proto.transit = proto.changeBasis
proto.transitRaw = require('./transitRaw')
