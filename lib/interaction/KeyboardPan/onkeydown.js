module.exports = (interaction) => {
  return function (ev) {
    // DEBUG
    // console.log('keypan', ev)

    const step = interaction.step

    // Choose direction.
    // Use ev.code instead of ev.key to depend on key positions
    // instead of actual characters.
    let dx = 0
    let dy = 0
    switch (ev.code) {
      case 'ArrowDown':
      case 'KeyS':
        dy = step
        break
      case 'ArrowLeft':
      case 'KeyA':
        dx = -step
        break
      case 'ArrowRight':
      case 'KeyD':
        dx = step
        break
      case 'ArrowUp':
      case 'KeyW':
        dy = -step
        break
      default:
        break
    }

    interaction.target.translateBy({ x: dx, y: dy })

    interaction.source.emit('keypan')
  }
}
