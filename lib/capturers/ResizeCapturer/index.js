const Capturer = require('../Capturer')
const createResizeHandler = require('./createResizeHandler')

const ResizeCapturer = function (component, options) {
  // tapspace.capturers.ResizeCapturer(component, options)
  //
  // Resize event capturer.
  //
  // Parameters:
  //   component
  //     a Plane, the source for the resize events
  //   options, optional object with props:
  //     TODO
  //
  // Emits
  //   resize with new size dimensions of the element.
  //
  // Resize event object has properties:
  //   size
  //     a Size, the new size
  //   prevSize
  //     a Size, the old size
  //   target
  //     a Plane
  //   TODO deltaW
  //   TODO  horizontal movement in viewport pixels
  //   TODO deltaH
  //   TODO  vertical movement in viewport pixels
  //

  // Inherit
  Capturer.call(this)

  // Validate component
  if (!component || !component.tran) {
    throw new Error('Invalid component')
  }
  this.component = component

  // Default options
  if (!options) {
    options = {}
  }
  this.options = Object.assign({
    // TODO
  }, options)

  // Keep track of previous size
  this.prevSize = this.component.getSize()

  this.bound = false
  this.onresize = null
}

module.exports = ResizeCapturer
const proto = ResizeCapturer.prototype

// Inherit
Object.assign(proto, Capturer.prototype)

proto.bind = function () {
  // tapspace.capturers.ResizeCapturer:bind()
  //
  // Start listeners and observers.
  //

  // Prevent double bind
  if (this.bound) {
    return
  }
  this.bound = true

  this.onresize = createResizeHandler(this)
  this.observer = new window.ResizeObserver(this.onresize)
  this.observer.observe(this.component.element)
}

proto.update = function (options) {
  // tapspace.capturers.ResizeCapturer:update(options)
  //
  // Update capturer options.
  //
  this.options = Object.assign({}, this.options, options)
}

proto.unbind = function () {
  // tapspace.capturers.ResizeCapturer:unbind()
  //
  // Stop resize observation.
  //

  if (!this.bound) {
    return
  }
  this.bound = false

  this.observer.disconnect()
  this.observer = null
  this.onresize = () => {} // no-op
}
