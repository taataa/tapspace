const AbstractActive = function () {
  // tapspace.components.AbstractActive()
  //
  // Interaction methods for affine components.
  // Designed to be inherited by instance classes that
  // inherit also from Plane or down.
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

module.exports = AbstractActive
const proto = AbstractActive.prototype

proto.addInteraction = require('./addInteraction')
proto.capturer = require('./capturer')
proto.converter = require('./converter')
proto.getInteraction = require('./getInteraction')
proto.removeInteraction = require('./removeInteraction')
