module.exports = function () {
  // Sensor:unbind()
  //
  // Remove all listeners we made.
  //

  this.element.removeEventListener('pointerdown', this.onpointerdown)
  this.element.removeEventListener('pointermove', this.onpointermove)
  this.element.removeEventListener('pointerup', this.onpointerup)
  this.element.removeEventListener('pointercancel', this.onpointercancel)
  this.onpointerdown = null
  this.onpointermove = null
  this.onpointerup = null
  this.onpointercancel = null

  window.removeEventListener('contextmenu', this.oncontextmenu)
  this.oncontextmenu = null
}
