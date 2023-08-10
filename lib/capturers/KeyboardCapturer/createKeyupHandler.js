module.exports = (capturer) => {
  return function (ev) {
    // KeyupHandler
    //
    // Parameters:
    //   ev
    //     a KeyboardEvent, the browser keyup event
    //
    if (ev.target === capturer.component.element) {
      // Re-emit
      capturer.emit('keyup', ev)
    }
  }
}
