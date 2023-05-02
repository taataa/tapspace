const Capturer = require('../Capturer')
const createResizeHandler = require('./createResizeHandler')

const ResizeCapturer = function (component) {
  // @ResizeCapturer(component)
  //
  // Inherits Capturer
  //
  // Resize event capturer.
  //
  // Parameters:
  //   component
  //     a BlockComponent, the source for the resize events
  //
  // Emits
  //   resize with new size dimensions of the element.
  //
  // Resize event object has properties:
  //   size
  //     a Size, the new size
  //   previousSize
  //     a Size, the old size
  //   target
  //     a BlockComponent
  //

  // TODO resize event properties
  //   deltaW
  //     horizontal movement in viewport pixels
  //   deltaH
  //     vertical movement in viewport pixels
  //

  // Inherit
  Capturer.call(this)

  // Validate component
  if (!component || !component.tran) {
    throw new Error('Invalid component')
  }
  this.component = component

  this.previousSize = null
  this.bound = false
  this.onresize = null
}

module.exports = ResizeCapturer
const proto = ResizeCapturer.prototype

// Inherit
Object.assign(proto, Capturer.prototype)

proto.bind = function () {
  // @ResizeCapturer:bind()
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

  // Keep track of previous size
  this.previousSize = this.component.getSize()
}

proto.unbind = function () {
  // @ResizeCapturer:unbind()
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

  // The clients of the capturer could have registered
  // listeners. We close them because the capturer is destroyed.
  this.off()
}
