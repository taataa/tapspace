module.exports = (capturer) => {
  return function (ev) {
    // Parameters:
    //   ev
    //     a KeyboardEvent, the browser keydown event.
    //

    capturer.emit('keydown', ev)
  }
}
