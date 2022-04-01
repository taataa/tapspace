// API Tapspace v2

const Element = require('./lib/Element')
const Viewport = require('./lib/Viewport')

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

// main.geom = require('./lib/geom')
main.preload = require('loadimages')
main.version = require('./lib/version')

module.exports = main
