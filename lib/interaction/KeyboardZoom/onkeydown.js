module.exports = (interaction) => {
  return function (ev) {
    // This is keydown event handler
    //

    // Translation per step
    const step = interaction.step

    // Choose direction.
    // Use ev.key instead of ev.code to depend on key character
    // instead of physical position.
    let dz = 0
    switch (ev.key) {
      case '+':
        dz = step
        break
      case '-':
        dz = -step
        break
      default:
        break
    }

    if (dz !== 0) {
      interaction.target.translateBy({ x: 0, y: 0, z: dz })
      interaction.source.emit('keyzoom')
    }
  }
}
