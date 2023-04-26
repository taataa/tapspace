module.exports = (capturer) => {
  return function (ev) {
    // Parameters:
    //   ev
    //     a KeyboardEvent, the browser keydown event.
    //
    if (ev.target === capturer.component.element) {
      capturer.emit('keydown', ev)
    }
  }
}
