const AbstractActive = function (opts) {
  // tapspace.components.AbstractActive(opts)
  //
  // Interaction methods for affine components.
  // Designed to be inherited by an instance class that
  // inherit also from AbstractPlane or down.
  //
  // Parameters:
  //   opts
  //     TODO maybe which capturers are possible?
  //     TODO options to autostart capturers, maybe
  //

  // Default params
  opts = Object.assign({
    // example: size: { width: 256, height: 256 }
  }, opts)

  // Init input capturers' object.
  // Capturers recognise and normalise input sequences.
  this.capturers = {
    // gesture
    // wheel
    // keyboard
  }

  // Init input converters' object.
  // Converters modify or redirect input events.
  this.converters = {
    // mouse
  }

  // Init interactions object.
  // The object effectively limits one interaction for each interaction type.
  this.interactions = {
    // pinch
    // wheel
    // resize
  }
}

module.exports = AbstractActive
const proto = AbstractActive.prototype

proto.capturer = require('./capturer')
proto.converter = require('./converter')
