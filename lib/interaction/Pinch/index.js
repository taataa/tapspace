const PinchGesture = function (source, target, options) {
  // @tapspace.interaction.Pinch(source, target, options)
  //
  // Pinch transform interaction for items and other interactive planes.
  // Drag, scale, and rotate items by using pointers.
  // During pinch the target has the class `active-pinch`.
  //
  // Parameters:
  //   source
  //     an Interactive. Get gesture input from this component.
  //     .. The source begins to emit pinch events.
  //   target
  //     a Transformer.
  //     .. Apply gesture effects to this component.
  //   options, object with properties:
  //     freedom
  //       optional object with properties:
  //         type
  //           a string, for example 'TS'
  //         pivot
  //           a Point. The pivot point for the types 'S', 'R', 'SR'.
  //           .. Default is null.
  //         angle
  //           a Direction. The line angle for the freedom type 'L'.
  //           .. Default is null.
  //
  // Makes the source emit:
  //   pinchstart
  //     when the first pointer enters
  //   pinchmove
  //     when the pointers move
  //   pinchend
  //     when the last pointer leaves
  //   pinchcancel
  //     when the last pointer cancels
  //   pinch
  //     alias for pinchmove
  //

  // Validate source
  if (source.transformBy) {
    this.source = source
  } else {
    throw new Error('You cannot read pinch input from a non-affine element.')
  }
  // Validate target
  if (target.transformBy) {
    this.target = target
  } else {
    throw new Error('You cannot apply pinch to a non-affine element.')
  }

  // Normalize options
  if (!options) {
    options = {}
  }
  this.options = {}
  if (!options.freedom) {
    this.options.freedom = {
      type: 'I',
      pivot: null,
      angle: null
    }
  } else {
    this.options.freedom = options.freedom
  }

  // Keep track of listeners for unbind
  this.ongesturestart = null
  this.ongesturemove = null
  this.ongestureend = null
  this.ongesturecancel = null

  // Track if interaction bound. Just a safeguard.
  this.bound = false
  this.capturer = null
}

module.exports = PinchGesture
const proto = PinchGesture.prototype
proto.isPinch = true

proto.applyTransform = require('./applyTransform')
proto.bind = require('./bind')
proto.disableDilation = require('./disableDilation')
proto.disableRotation = require('./disableRotation')
proto.disableTranslation = require('./disableTranslation')
proto.enableDilation = require('./enableDilation')
proto.enableRotation = require('./enableRotation')
proto.enableTranslation = require('./enableTranslation')
proto.getFreedom = require('./getFreedom')
proto.hasAnyFreedom = require('./hasAnyFreedom')
proto.unbind = require('./unbind')
