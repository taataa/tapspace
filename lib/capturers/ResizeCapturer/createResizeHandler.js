const Size = require('../../geometry/Size')

module.exports = (capturer) => {
  return (entries) => {
    // Handler for window.ResizeObserver
    //
    // Parameters
    //   entries
    //     array of ResizeObserverEntry objects
    //

    const resizeEvent = {
      target: capturer.component,
      prevSize: capturer.prevSize,
      size: capturer.prevSize
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
      const newSize = new Size(capturer.component, wh)
      resizeEvent.size = newSize
      // Store the new size for the previous size of the next event.
      capturer.prevSize = newSize
    }

    capturer.emit('resize', resizeEvent)
  }
}
