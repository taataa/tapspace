const emitter = require('component-emitter')

const TreeLoader = function (config) {
  // @tapspace.loaders.TreeLoader(config)
  //
  // An asynchronous and recursive loader for your tree-structured content.
  // Use this to build infinite or very deep, zoomable web applications
  // to overcome limits of floating point arithmetics.
  //
  // To ignite the loader, you need to implement a few functions.
  //
  // Parameters:
  //   config
  //     an object with properties:
  //       viewport
  //         a tapspace.components.Viewport
  //       placeholder
  //         a function (id), synchronous. Render a placeholder element
  //         .. that is displayed during fetching of the actual content.
  //         .. Return a Component.
  //       generator
  //         a function (id, data), synchronous. Render the content element
  //         .. given its freshly-fetched data. Return a Component.
  //       fetcher
  //         a function (id, callback), asynchronous.
  //         .. Fetch the content data from your data store.
  //         .. and then call the callback.
  //         .. The callback is a function (err, data).
  //         .. The data is later fed to the generator.
  //       tracker
  //         a function (parent), synchronous, where parent is a Component.
  //         .. Return a list of ID strings
  //         .. where each ID represents a child of the parent.
  //       mapper
  //         a function (parent, childId), synchronous, where
  //         .. parent is a Component. Determine the position of the child
  //         .. by returning a Basis.
  //       backer
  //         a function (id), synchronous. Return the parent ID of the
  //         .. the given ID. Return null if the ID does not have a parent.
  //
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
