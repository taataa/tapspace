// API Tapspace v2

const Element = require('./lib/Element')
const Viewport = require('./lib/Viewport')
const Plane = require('./lib/Plane')

const main = (el) => {
  return new Element(el)
}

main.element = (el) => {
  return new Element(el)
}

main.viewport = (el) => {
  console.log('view created')
  return new Viewport(el)
}

main.plane = (el) => {
  return new Plane(el)
}
// or .space or .plane or .layer

// main.geom = require('./lib/geom')
main.preload = require('loadimages')
main.version = require('./lib/version')

module.exports = main
