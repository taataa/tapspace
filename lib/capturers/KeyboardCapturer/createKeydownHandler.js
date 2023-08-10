module.exports = (capturer) => {
  return function (ev) {
    // KeydownHandler
    //
    // Parameters:
    //   ev
    //     a KeyboardEvent, the browser keydown event.
    //
    if (ev.target === capturer.component.element) {
      // Re-emit
      capturer.emit('keydown', ev)
    }
  }
}
