module.exports = function (ev) {
  // @Sensor:registerModifiers(ev)
  //
  // Update sensor modifier keyboard key (ctrl, alt, meta, shift) state
  // by the given pointer event.
  // The state is attached to the sent events.
  // Pointer events are MouseEvents and have altKey etc properties.
  //

  this.modifiers.ctrlKey = ev.ctrlKey
  this.modifiers.altKey = ev.altKey
  this.modifiers.metaKey = ev.metaKey
  this.modifiers.shiftKey = ev.shiftKey
}
