const emitter = require('component-emitter')
const Size = require('../../../../geometry/Size')

const ResizeCapturer = function (component, options) {
  // Resize event capturer.
  //
  // Parameters:
  //   component
  //     the source for the resize events
  //   options, optional object with props:
  //     TODO
  //
  // Emits
  //   resize with new dimensions
  //
  // Resize event object has properties:
  //   size
  //     a Size, the new size
  //   prevSize
  //     a Size, the old size
  //   target
  //     a Component
  //   TODO deltaW
  //   TODO  horizontal movement in viewport pixels
  //   TODO deltaH
  //   TODO  vertical movement in viewport pixels
  //
  const self = this

  // Normalise argument to component
  if (component.affine) {
    component = component.affine
  } else if (!component.plane) {
    // Only affine elements can be used for capturing.
    throw new Error('Resize gestures cannot be captured ' +
      'from non-affine elements.')
  }
  this.component = component

  // Default options
  if (!options) {
    options = {}
  }
  this.options = Object.assign({
    // TODO
  }, options)

  // Set as emitter
  emitter(this)

  // Keep track of previous size
  this.prevSize = this.component.getSize()

  this.onresize = function (entries) {
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
    let width, height
    let filled = false
    for (const entry of entries) {
      if (entry.borderBoxSize && entry.borderBoxSize.length > 0) {
        width = entry.borderBoxSize[0].inlineSize
        height = entry.borderBoxSize[0].blockSize
        filled = true
      } else {
        width = entry.contentRect.width
        height = entry.contentRect.height
        filled = true
      }
    }

    if (filled) {
      const newSize = new Size(self.component, width, height)
      resizeEvent.size = newSize
      // Refresh prev size for the next event
      self.prevSize = newSize
    }

    self.emit('resize', resizeEvent)
  }

  this.observer = new window.ResizeObserver(this.onresize)
  this.observer.observe(this.component.element)
}

module.exports = ResizeCapturer
const proto = ResizeCapturer.prototype

proto.update = function (options) {
  // Update capturer options
  //
  this.options = Object.assign({}, this.options, options)
}

proto.unbind = function () {
  this.observer.disconnect()
  this.onresize = () => {} // no-op
}
