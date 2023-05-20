const applicators = require('./applicators')

module.exports = (interaction) => {
  return function (ev) {
    // This is keydown event handler
    //

    // Choose direction.
    // Use ev.key instead of ev.code to depend on key character
    // instead of physical position.
    switch (ev.key) {
      case '+':
        interaction.applyTransform(1)
        break
      case '-':
        interaction.applyTransform(-1)
        break
      default:
        break
    }
  }
}
