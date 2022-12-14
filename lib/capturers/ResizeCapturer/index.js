const Capturer = require('../Capturer')
const Size = require('../../geometry/Size')

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
  const self = this

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

  this.onresize = function (entries) {
    // Handler for window.ResizeObserver
    //
    // Parameters
    //   entries
    //     array of ResizeObserverEntry objects
    //

    const resizeEvent = {
      target: self.component,
      prevSize: self.prevSize,
      size: self.prevSize
    }

    // Probably only one entry because we observe one element.
    let wh = null
    for (const entry of entries) {
      if (entry.borderBoxSize && entry.borderBoxSize.length > 0) {
        wh = {
          w: entry.borderBoxSize[0].inlineSize,
          h: entry.borderBoxSize[0].blockSize
        }
      } else {
        wh = {
          w: entry.contentRect.width,
          h: entry.contentRect.height
        }
      }
    }

    if (wh) {
      const newSize = new Size(self.component, wh)
      resizeEvent.size = newSize
      // Store the new size for the previous size of the next event.
      self.prevSize = newSize
    }

    self.emit('resize', resizeEvent)
  }
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
  this.observer.disconnect()
  this.onresize = () => {} // no-op
}
