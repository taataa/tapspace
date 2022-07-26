
module.exports = function (size) {
  // tapspace.components.AbstractView:setSize(size)
  //
  // Set viewport size.
  //
  // Parameters:
  //   size
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

  if ('w' in size) {
    w = size.w
  } else if ('width' in size) {
    // Allow size format { width, height }
    w = size.width
  } else {
    throw new Error('Invalid width: ' + size.width)
  }

  if ('h' in size) {
    h = size.h
  } else if ('height' in size) {
    // Allow size format { width, height }
    h = size.height
  } else {
    throw new Error('Invalid height: ' + size.height)
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
