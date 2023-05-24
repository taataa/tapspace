const emitter = require('component-emitter')

const FractalLoaderAlt = function (config) {
  this.viewport = config.viewport
  this.placeholder = config.placeholder
  this.generator = config.generator
  this.fetcher = config.fetcher
  this.tracker = config.tracker
  this.mapper = config.mapper
  this.backer = config.backer
  this.limiter = config.limiter

  // id -> Component
  this.spaces = {}
}

module.exports = FractalLoaderAlt
const proto = FractalLoaderAlt.prototype
proto.isFractalLoaderAlt = true

// Inherit
emitter(proto)

proto.init = require('./init')
proto.closeChildren = require('./closeChildren')
proto.closeParent = require('./closeParent')
proto.openChild = require('./openChild')
proto.openNeighbors = require('./openNeighbors')
proto.openParent = require('./openParent')
