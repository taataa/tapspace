const emitter = require('component-emitter')

const TreeLoader = function (config) {

  this.viewport = config.viewport
  this.placeholder = config.placeholder
  this.generator = config.generator
  this.fetcher = config.fetcher
  this.tracker = config.tracker
  this.mapper = config.mapper
  this.backer = config.backer

  // Track which spaces are loading.
  // id -> Component
  this.placeholders = {}

  // Track which spaces are finished loading.
  // id -> Component
  this.spaces = {}

  // Callbacks that wait for spaces to finish.
  // id -> array of function
  this.callbacks = {}
}

module.exports = TreeLoader
const proto = TreeLoader.prototype
proto.isTreeLoader = true

// Inherit
emitter(proto)

proto.init = require('./init')
proto.closeChildren = require('./closeChildren')
proto.closeNeighbors = require('./closeNeighbors')
proto.closeParent = require('./closeParent')
proto.openChild = require('./openChild')
proto.openChildren = require('./openChildren')
proto.openNeighbors = require('./openNeighbors')
proto.openParent = require('./openParent')
proto.registerCallback = require('./registerCallback')
proto.resolveCallbacks = require('./resolveCallbacks')
proto.removeSpace = require('./removeSpace')
