// API Tapspace v2

const Element = require('./lib/Element')
const Viewport = require('./lib/Viewport')
const Transform = require('./lib/Transform')

const main = (el, opts) => {
  const ael = new Element(el, opts)
  console.log('AffineElement created:', ael) // TODO remove debug
  return ael
}

main.element = (el, opts) => {
  const ael = new Element(el, opts)
  console.log('AffineElement created:', ael)
  return ael
}

main.viewport = (el, opts) => {
  const av = new Viewport(el, opts)
  console.log('AffineViewport created:', av)
  return av
}

main.createTransform = Transform.createFromParams
main.estimateTransform = Transform.estimate

// Interaction
main.input = require('./lib/input')

// main.geom = require('./lib/geom') // geom classes or affineplane?
main.preload = require('loadimages')
main.version = require('./lib/version')

module.exports = main
