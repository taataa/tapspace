module.exports = function (newSize, options) {
  // @FrameComponent:setSize(newSize)
  //
  // Set component size. This does not change the scale or depth of the
  // element, only the local pixel width and height.
  //
  // Note this method preserves the absolute position of the anchor.
  // Therefore the relative anchor position (relative to the size) will change.
  // To preserve the relative anchor position, see FrameComponent:resizeTo().
  //
  // Parameters:
  //   newSize
  //     a {w,h}, a {width,height}, or a Size.
  //     .. Note that the dimensions must be numbers.
  //     ...CSS length strings are not supported.
  //
  // Alternative parameters:
  //   width
  //     a number, the component width in pixels.
  //   height
  //     a number, the component height in pixels.
  //
  // Return
  //   this, for chaining
  //

  // Capture target size in pixels
  let wPx = 0
  let hPx = 0

  // Allow number arguments
  if (typeof newSize === 'number') {
    wPx = newSize
    if (typeof options === 'number') {
      hPx = options
    } else {
      hPx = newSize
    }
  } else if (typeof newSize === 'object') {
    // Allow object argument
    if (newSize.transitRaw) {
      // Normalise
      newSize = newSize.transitRaw(this)
    }

    if ('w' in newSize) {
      wPx = newSize.w
    } else if ('width' in newSize) {
      // Allow size format { width, height }
      wPx = newSize.width
    } else {
      throw new Error('Invalid width: ' + newSize.width)
    }

    if ('h' in newSize) {
      hPx = newSize.h
    } else if ('height' in newSize) {
      // Allow size format { width, height }
      hPx = newSize.height
    } else {
      throw new Error('Invalid height: ' + newSize.height)
    }

    if (typeof wPx !== 'number') {
      throw new Error('Invalid width: ' + wPx)
    }
    if (typeof hPx !== 'number') {
      throw new Error('Invalid height: ' + hPx)
    }
  }

  this.size = { w: wPx, h: hPx, d: 0 }

  // Render size
  this.element.style.width = this.size.w + 'px'
  this.element.style.height = this.size.h + 'px'

  return this
}
