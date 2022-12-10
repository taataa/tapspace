const Interactive = function () {
  // @Interactive()
  //
  // Interaction methods for affine components.
  // Designed to be inherited by instance classes that
  // inherit also from Plane.
  //

  // TODO Parameters:
  //   opts
  //     TODO maybe which capturers are possible?
  //     TODO options to autostart capturers, maybe
  //

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

module.exports = Interactive
const proto = Interactive.prototype

proto.addInteraction = require('./addInteraction')
proto.capturer = require('./capturer')
proto.stopCapturer = require('./stopCapturer')
proto.converter = require('./converter')
proto.getInteraction = require('./getInteraction')
proto.removeInteraction = require('./removeInteraction')
