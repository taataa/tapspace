module.exports = (capturer) => {
  return function (ev) {
    // Parameters:
    //   ev
    //     a KeyboardEvent, the browser keyup event
    //

    capturer.emit('keyup', ev)
  }
}
