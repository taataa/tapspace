
const ApproachGesture = function (source, target, options) {
  // @tapspace.interaction.Approach(source, target, options)
  //
  // Makes the source emit approach events when the camera enters or
  // leaves a threshold distance radius.
  // Toggles 'active-approach' class on target.
  //
  // Parameters:
  //   options
  //     threshold
  //       a number, distance in viewport pixels
  //     maxDistance or maxScale or maxCover
  //       TODO. no emissions if farther than this
  //     minDistance or minScale or minCover
  //       TODO. no emissions if closer than this
  //
  // Makes source emit:
  //   approachstart
  //   approachend
  //
  // TODO Alternative names:
  //   proximityenter, proximityin, approachin, proximitystart
  //   proximityleave, proximityout, approachout, proximityend
  //
  this.source = source
  this.target = target

  if (!options) {
    options = {}
  }

  this.threshold = 1000
  if (typeof options.threshold === 'number') {
    this.threshold = options.threshold
  }

  // Track if camera inside.
  this.inside = false

  // Remember event handlers for unbind.
  this.bound = false
  this.capturer = null
  this.oncameraenter = null
  this.oncameraleave = null
}

module.exports = ApproachGesture
const proto = ApproachGesture.prototype

proto.bind = function () {
  // @tapspace.interaction.Approach:bind()
  //
  // Bind event listeners.
  //
  if (this.bound) {
    return
  }
  this.bound = true

  // Construct offable listeners.
  const self = this
  this.oncameraenter = (ev) => {
    // ev is a measure event.
    if (self.bound) {
      if (ev.distancePx < self.threshold) {
        if (!self.inside) {
          self.inside = true
          self.target.element.classList.add('active-approach')
          self.source.emit('approachstart')
        }
        // Else camera inside already.
      }
    }
  }
  this.oncameraleave = (ev) => {
    // ev is a measure event.
    if (self.bound) {
      if (ev.distancePx > self.threshold) {
        if (self.inside) {
          // Camera escaped outside.
          self.inside = false
          self.target.element.classList.remove('active-approach')
          self.source.emit('approachend')
        }
        // Else camera outside already
      }
    }
  }

  // Bind listeners to the component capturer
  this.capturer = this.source.capturer('camera')
  this.capturer.on('cameraenter', this.oncameraenter)
  this.capturer.on('cameraleave', this.oncameraleave)
}

proto.unbind = function () {
  // @tapspace.interaction.Approach:unbind()
  //
  // Unbind capturer and listeners.
  //
  if (this.bound) {
    this.bound = false
    this.capturer.off('cameraenter', this.oncameraenter)
    this.capturer.off('cameraleave', this.oncameraleave)
    this.capturer = null
    this.oncameraenter = null
    this.oncameraleave = null
  }
}
