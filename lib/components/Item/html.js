module.exports = function (content) {
  // @Item:html(content)
  //
  // Set affine element contents. Any pre-existing content is removed.
  //
  // content
  //   a HTMLElement or HTML string. The given element(s) will
  //   .. replace the affine element contents.
  //
  // Return
  //   this, for chaining
  //

  // First, clear the wrapper. See https://stackoverflow.com/a/3955238
  while (this.element.firstChild) {
    this.element.removeChild(this.element.lastChild)
  }

  // Insert the given content.
  if (typeof content === 'string') {
    // Treat as HTML string.
    this.element.innerHTML = content
  } else if (typeof content === 'object') {
    if (content.nodeType) {
      // Content is a HTMLElement. Append the element.
      this.element.appendChild(content)
    } else {
      throw new Error('Invalid content type.')
    }
  }

  return this
}
