module.exports = (capturer) => {
  return function (ev) {
    // KeyupHandler
    //
    // Parameters:
    //   ev
    //     a KeyboardEvent, the browser keyup event
    //
    if (ev.target === capturer.component.element) {
      // Avoid e.g. arrow navigation causing the page to scroll.
      // TODO Maybe the interaction should be responsible for the prevention?
      ev.preventDefault()
      // Re-emit
      capturer.emit('keyup', ev)
    }
  }
}
