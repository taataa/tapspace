
module.exports = function (newSize) {
  // tapspace.components.AbstractView:setSize(newSize)
  //
  // Set viewport size.
  //
  // Parameters:
  //   newSize
  //     a {w,h} or a {width,height} object.
  //     .. If {w,h} or {width,height} format is used, the dimensions can be
  //     .. either number of pixels or CSS length strings.
  //
  // Return
  //   this, for chaining
  //

  // Capture target size
  let w = 0
  let h = 0

  if ('w' in newSize) {
    w = newSize.w
  } else if ('width' in newSize) {
    // Allow size format { width, height }
    w = newSize.width
  } else {
    throw new Error('Invalid width: ' + newSize.width)
  }

  if ('h' in newSize) {
    h = newSize.h
  } else if ('height' in newSize) {
    // Allow size format { width, height }
    h = newSize.height
  } else {
    throw new Error('Invalid height: ' + newSize.height)
  }

  // Allow and convert numbers to CSS strings.
  // Note that this is opposite of what we do in AbstractFrame:setSize
  if (typeof w === 'number') {
    w = w + 'px'
  }
  if (typeof h === 'number') {
    h = h + 'px'
  }

  // Ensure viewport does not use the size prop by setting it null.
  // Use DOM dimensions instead.
  this.size = null

  this.element.style.width = w
  this.element.style.height = h

  return this
}
