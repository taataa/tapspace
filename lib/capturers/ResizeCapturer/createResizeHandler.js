const Size = require('../../geometry/Size')

module.exports = (capturer) => {
  // Create a handler.
  //
  // Returns
  //   a function
  //
  return (entries) => {
    // Handler for window.ResizeObserver
    //
    // Parameters
    //   entries
    //     array of ResizeObserverEntry objects
    //

    const resizeEvent = {
      target: capturer.component,
      previousSize: capturer.previousSize,
      size: capturer.previousSize
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
      wh.d = 0 // patch to size3
      const newSize = new Size(capturer.component, wh)
      resizeEvent.size = newSize
      // Store the new size for the previous size of the next event.
      capturer.previousSize = newSize
    }

    capturer.emit('resize', resizeEvent)
  }
}
