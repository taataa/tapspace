const fine = require('affineplane')
const compose = fine.helm3.compose

module.exports = (tr, center) => {
  // Convert from passive to active transformation.
  // The passive has location such as known center position.
  // Remove the center data to cancel any translation caused by
  // the scaling or rotation alone.
  //
  const x = center.x
  const y = center.y
  const pan = {
    a: 1,
    b: 0,
    x: x,
    y: y,
    z: 0
  }
  const ipan = {
    a: 1,
    b: 0,
    x: -x,
    y: -y,
    z: 0
  }
  return compose(ipan, compose(tr, pan))
}
