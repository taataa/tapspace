module.exports = function () {
  // @Interactive:disableContent()
  //
  // Disable interaction with content.
  // Make the content proxy interactions of the item and its ancestors.
  //
  // Return
  //   this, for chaining.
  //

  // In capturers, if the event arrived through a proxy,
  // treat the event as it arrived directly from the proxy.
  this.element.classList.add('affine-proxy')
}
