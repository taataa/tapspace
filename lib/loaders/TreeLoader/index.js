const emitter = require('component-emitter')

const TreeLoader = function (config) {
  this.viewport = config.viewport
  this.placeholder = config.placeholder
  this.generator = config.generator
  this.fetcher = config.fetcher
  this.tracker = config.tracker
  this.mapper = config.mapper
  this.backer = config.backer

  // id -> Component
  this.spaces = {}
}

module.exports = TreeLoader
const proto = TreeLoader.prototype
proto.isFractalLoaderAlt = true

// Inherit
emitter(proto)

proto.init = require('./init')
proto.closeChildren = require('./closeChildren')
proto.closeNeighbors = require('./closeNeighbors')
proto.closeParent = require('./closeParent')
proto.getTreeDistance = require('./getTreeDistance')
proto.openChild = require('./openChild')
proto.openNeighbors = require('./openNeighbors')
proto.openParent = require('./openParent')
