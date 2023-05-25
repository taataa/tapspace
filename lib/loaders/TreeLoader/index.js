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

  this.registerCallback = (id, cb) => {
    const cbs = this.callbacks[id]
    if (cbs) {
      cbs.push(cb)
    } else {
      this.callbacks[id] = [cb]
    }
  }
  this.resolveCallbacks = (id, err) => {
    setTimeout(() => {
      const cbs = this.callbacks[id]
      if (cbs) {
        delete this.callbacks[id]
        if (err) {
          cbs.forEach(cb => cb(err))
        } else {
          const space = this.spaces[id]
          if (space) {
            cbs.forEach(cb => cb(null, id, space))
          } else {
            cbs.forEach(cb => cb(null, id, null))
          }
        }
      }
    }, 0)
  }
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
proto.removeSpace = require('./removeSpace')
