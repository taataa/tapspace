const Interactive = function () {
  // @Interactive()
  //
  // Interaction methods for affine components.
  // Designed to be inherited by instance classes that
  // also inherit Transformer.
  //

  // TODO Parameters:
  //   opts
  //     TODO idleIntervalMs
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

  // Sketch for alternative per-device control
  // this.pointerActions = {
  //   // tap, pan, rotate, dilate, slide, content/default
  // }
  // this.wheelActions = {
  //   // zoom, dilate, pan, rotate, content/default
  // }
  // this.keyboardActions = {
  //   // pan, walk, zoom, rotate, content/default
  // }
  // this.focusActions = {
  //   // tab, pan-to, zoom-to
  // }
  // this.cameraActions = {
  //   // approach/proximity, visibility
  // }
  // TODO this.voiceActions
}

module.exports = Interactive
const proto = Interactive.prototype
proto.isInteractive = true

// Methods
proto.addInteraction = require('./addInteraction')
proto.capturer = require('./capturer')
proto.converter = require('./converter')
proto.getCapturer = require('./getCapturer')
proto.getInteraction = require('./getInteraction')
proto.hasCapturer = require('./hasCapturer')
proto.hasInteraction = require('./hasInteraction')
proto.focus = require('./focus')
proto.focusable = require('./focusable')
proto.removeAllInteractions = require('./removeAllInteractions')
proto.removeInteraction = require('./removeInteraction')
proto.setContentInput = require('./setContentInput')
proto.startCapturer = proto.capturer
proto.stopCapturer = require('./stopCapturer')
proto.updateCapturer = proto.capturer
