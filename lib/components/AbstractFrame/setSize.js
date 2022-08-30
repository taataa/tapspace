const toPx = require('to-px')

module.exports = function (size) {
  // tapspace.components.AbstractFrame:setSize(size)
  //
  // Set component size.
  //
  // Parameters:
  //   size
  //     a {w,h}, a {width,height}, or a Size.
  //     .. If {w,h} or {width,height} format is used, the dimensions can be
  //     .. either number of pixels or CSS length strings. Note that if the
  //     .. component is not yet in DOM, relative length units might not work.
  //
  // Return
  //   this, for chaining
  //

  // Capture target size in pixels
  let wPx = 0
  let hPx = 0

  if (size.changeBasis) {
    // Normalise
    size = size.changeBasis(this)
  }

  if ('w' in size) {
    wPx = size.w
  } else if ('width' in size) {
    // Allow size format { width, height }
    wPx = size.width
  } else {
    throw new Error('Invalid width: ' + size.width)
  }

  if ('h' in size) {
    hPx = size.h
  } else if ('height' in size) {
    // Allow size format { width, height }
    hPx = size.height
  } else {
    throw new Error('Invalid height: ' + size.height)
  }

  // Allow and convert CSS strings to pixel numbers.
  if (typeof wPx === 'string') {
    wPx = toPx(wPx)
  }
  if (typeof hPx === 'string') {
    hPx = toPx(hPx)
  }

  this.size = {
    w: wPx,
    h: hPx
  }

  // Render size
  this.element.style.width = this.size.w + 'px'
  this.element.style.height = this.size.h + 'px'

  return this
}
