module.exports = (capturer) => {
  return function (ev) {
    // Parameters:
    //   ev
    //     a KeyboardEvent, the browser keyup event
    //
    if (ev.target === capturer.component.element) {
      capturer.emit('keyup', ev)
    }
  }
}
