module.exports = (interaction) => {
  return function (ev) {
    // Handle keydown event.
    //

    // Skip panning if modifier keys are used.
    // The user likely meant to do something else than pan.
    if (ev.altKey || ev.ctrlKey || ev.metaKey) {
      return
    }

    // Step size in px
    const step = interaction.step

    // Choose direction.
    let dx = 0
    let dy = 0

    if (interaction.enableArrows) {
      // Use ev.code instead of ev.key to depend on key positions
      // instead of actual characters.
      switch (ev.code) {
        case 'ArrowDown':
          dy = step
          break
        case 'ArrowLeft':
          dx = -step
          break
        case 'ArrowRight':
          dx = step
          break
        case 'ArrowUp':
          dy = -step
          break
        default:
          break
      }
    }

    if (interaction.enableWasd) {
      switch (ev.code) {
        case 'KeyS':
          dy = step
          break
        case 'KeyA':
          dx = -step
          break
        case 'KeyD':
          dx = step
          break
        case 'KeyW':
          dy = -step
          break
        default:
          break
      }
    }

    if (dx !== 0 || dy !== 0) {
      // Default prevention.
      // Avoid arrow navigation causing the page to scroll.
      ev.preventDefault()
      interaction.target.translateBy({ x: dx, y: dy })
      interaction.source.emit('keypan')
    }
  }
}
