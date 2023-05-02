const fine = require('affineplane')
const compose = fine.helm3.compose

module.exports = (tr, origin) => {
  // Convert from passive to active transformation.
  // The passive has a location such as known origin position.
  // Remove the origin data to cancel any translation caused by
  // the scaling or rotation alone.
  //
  const x = origin.x
  const y = origin.y
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
