module.exports = (interaction) => {
  return function (ev) {
    // This is keydown event handler
    //

    // Skip zoom if modifier keys are used.
    // The user likely meant to do something else than zoom.
    if (ev.altKey || ev.ctrlKey || ev.metaKey) {
      return
    }

    let dir = 0

    // Choose direction.
    // Use ev.key instead of ev.code to depend on key character
    // instead of physical position.
    switch (ev.key) {
      case '+':
        dir = 1
        break
      case '-':
        dir = -1
        break
      default:
        break
    }

    if (dir !== 0) {
      // Prevent browser default zooming
      ev.preventDefault()
      interaction.applyTransform(dir)
    }
  }
}
