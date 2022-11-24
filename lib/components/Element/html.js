module.exports = function (content) {
  // Set affine element contents
  //
  // content
  //   a HTMLElement or HTML string. The given element(s) will
  //   .. replace the affine element contents.
  //
  // Return
  //   this, for chaining
  //

  // Insert the given content.
  if (typeof content === 'string') {
    // Treat as HTML string.
    this.element.innerHTML = content
  } else if (typeof content === 'object') {
    if (content.nodeType) {
      // Content is HTMLElement
      this.element.appendChild(content)
    } else {
      throw new Error('Invalid content type.')
    }
  }

  return this
}
