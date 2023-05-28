const emitter = require('component-emitter')

const TreeLoader = function (config) {
  // @tapspace.loaders.TreeLoader(config)
  // @TreeLoader
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
  //       fetcher
  //         a function (id, callback), asynchronous.
  //         .. Fetch the content data from your data store.
  //         .. and then call the callback.
  //         .. The callback is a function (err, data).
  //         .. The data is later fed to the generator.
  //       generator
  //         a function (id, data), synchronous. Render the content element
  //         .. given its freshly-fetched data. Return a Component.
  //       mapper
  //         a function (parentId, parent, childId), synchronous, where
  //         .. parent is a Component. Determine the placement of the child
  //         .. by returning a Basis relative to the parent.
  //       tracker
  //         a function (parentId, parent), synchronous, where
  //         .. parent is a Component.
  //         .. Return a list of ID strings
  //         .. where each ID represents a child of the parent.
  //       backtracker
  //         a function (childId, child), synchronous.
  //         .. The child is a Component.
  //         .. Return the parent ID string.
  //         .. Return null if the child does not have a parent.
  //
  // Here is a minimal function for it:
  //
  // ```
  // const loader = new tapspace.loaders.TreeLoader({
  //   viewport: viewport,
  //
  //   placeholder: function (id) {
  //     // Render placeholder
  //     const plane = tapspace.createPlane()
  //     return plane
  //   },
  //
  //   fetcher: function (id, callback) {
  //     // Call your API or data store here.
  //     fetch('https://api.example.com/data')
  //       .then(response => {
  //         if (!response.ok) {
  //           throw new Error('Network response was not OK')
  //         }
  //         return response.json()
  //       })
  //       .then(data => {
  //         console.log('Data:', data)
  //         callback(null, data)
  //       })
  //       .catch(error => {
  //         console.error('Error:', error)
  //         callback(error)
  //       })
  //   },
  //
  //   generator: function (id, data) {
  //     // Render content to replace the placeholder
  //     const plane = tapspace.createPlane()
  //     return plane
  //   },
  //
  //   mapper: function (parentId, parent, childId) {
  //     // Place the child relative to the parent.
  //     // In other words, find a basis for the child.
  //     // Return null if there is no place for the child.
  //
  //     return basis
  //     return null
  //   },
  //
  //   tracker: function (parentId, parent) {
  //     // Get IDs of the children of the parent component.
  //     // Return empty array if there are no childs.
  //     const childrenIds = parent.data.points.map(p => p.id)
  //     return childrenIds
  //   },
  //
  //   backtracker: function (childId) {
  //     // Find parent id.
  //     // Return null if there is no parent i.e. child is the root.
  //
  //     return parentId
  //     return null
  //   }
  // })
  // ```
  //
  this.viewport = config.viewport
  this.placeholder = config.placeholder
  this.fetcher = config.fetcher
  this.generator = config.generator
  this.mapper = config.mapper
  this.tracker = config.tracker
  this.backtracker = config.backtracker

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
