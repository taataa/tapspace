const emitter = require('component-emitter')

const EventTreeLoader = function (config) {
  // @tapspace.loaders.EventTreeLoader(config)
  // @EventTreeLoader
  //
  // An asynchronous and recursive loader for your tree-structured content.
  // Use this to build infinite or very deep, zoomable web applications
  // to overcome limits of floating point arithmetics.
  //
  // To setup the loader, you need to implement a few functions:
  // mapper, backmapper, tracker, and backtracker.
  // The mappers define the relative positions of content and
  // the trackers define the order of content.
  // The mappers are optional in a sense that you need to implement only
  // one of the two for the loader to work.
  // Pick the one that best suits your data: if your datum stores
  // its location relative to the parent, implement a backmapper;
  // if your datum stores the locations of its children, implement a mapper.
  //
  // Parameters:
  //   config
  //     an object with properties:
  //       viewport
  //         a tapspace.components.Viewport
  //       mapper
  //         optional function (parentId, parent, childId), synchronous, where
  //         .. parent is a Component. Determine the placement of the child
  //         .. by returning a Basis relative to the parent.
  //       backmapper
  //         optional function (childId, child, parentId), synchronous, where
  //         .. child is a Component. Determine the placement of the parent
  //         .. by returning a Basis relative to the child.
  //       tracker
  //         a function (parentId, parent), synchronous.
  //         .. The parent is a Component.
  //         .. Return a list of ID strings
  //         .. where each ID represents a child of the parent.
  //       backtracker
  //         a function (childId, child), synchronous.
  //         .. The child is a Component.
  //         .. Return the parent ID string.
  //         .. Return null if the child does not have a parent.
  //
  // By calling `loader.init(id, basis)` the loader is initiated and
  // the tree-building starts.
  // However, the loader does not yet know your content.
  // To provide the content, and also means to render and retrieve the content,
  // you need to set an 'open' event handler:
  //
  // ```
  // loader.on('open', (id) => {
  //   ...
  // })
  // ```
  //
  // Inside the handler, you can create your content for your tree node,
  // like text, images, html, loading animations.
  // Place the content into a tapspace item or plane,
  // and call `loader.open(id, content)`.
  // You can also call `loader.placeholder(id, content)`
  // to place a placeholder that will be replaced when the actual content
  // is retrieved and opened.
  //
  // Here is a minimal example:
  //
  // ```
  // loader.on('open', (id) => {
  //   loader.placeholder(id, '...')
  //   fetch('https://api.example.com/data')
  //     .then(response => {
  //       if (!response.ok) throw new Error('Network response was not OK')
  //       return response.json()
  //     })
  //     .then(data => {
  //       loader.open(id, data.html)
  //       callback(null)
  //     })
  //     .catch(error => {
  //       loader.open(id, error.message)
  //       console.error('Error:', error)
  //       callback(error)
  //     })
  // })
  // ```
  //
  // The loader also emits 'close' event.
  // While the loader closes content automatically,
  // if your code needs some deconstruction behavior,
  // place a listener. For example:
  //
  // ```
  // loader.on('close', (id) => {
  //   streams[id].close()
  // })
  // ```
  //
  // Here is a complete configuration example:
  //
  // ```
  // const loader = new tapspace.loaders.TreeLoader({
  //   viewport: viewport,
  //
  //   mapper: function (parentId, parent, childId) {
  //     // Find the location for the child, relative to the parent.
  //     // The return value must be a Basis.
  //     // Get the parent basis, and transform it as you like.
  //     // Return null if there is no place for the child.
  //     const data = store[parentId]
  //     const dataPoint = data.points[childId]
  //     if (dataPoint) {
  //       return parent.getBasis().offset(dataPoint.x, dataPoint.y)
  //     }
  //     return null
  //   },
  //
  //   backmapper: function (childId, child, parentId) {
  //     // Find the location for the parent, relative to the child.
  //     // The mapper and backmapper are optional, but you need to implement
  //     // at least one of the two.
  //     const data = store[childId]
  //     const dataPoint = data.parent.point
  //     if (dataPoint) {
  //       return child.getBasis().offset(dataPoint.x, dataPoint.y)
  //     }
  //     return null
  //   },
  //
  //   tracker: function (parentId, parent) {
  //     // Find IDs of the child nodes, given the parent node.
  //     // Return an empty array if there are no childred.
  //     const dataPoints = store[parentId].points
  //     const idArray = dataPoints.map(p => p.id)
  //     return idArray
  //   },
  //
  //   backtracker: function (childId, child) {
  //     // Find ID of the parent node, given the child node.
  //     // Return null if there are no parents. Such child is the root node.
  //     const data = store[childId]
  //     if (data.parent.id) {
  //       return data.parent.id
  //     }
  //     return null
  //   }
  // })
  // ```
  //
  // Now you have the TreeLoader constructed.
  // You still need to build a driver for it. See examples.
  //
  this.viewport = config.viewport

  this.mapper = config.mapper
  this.backmapper = config.backmapper || null
  this.tracker = config.tracker
  this.backtracker = config.backtracker

  // Track created spaces.
  // id -> Component
  this.spaces = {}

  // Cached bases, at least for the init basis.
  this.bases = {}

  // Track which spaces are still loading.
  this.loading = {}

  // Track to which depth the node should open.
  this.demand = {}
}

module.exports = EventTreeLoader
const proto = EventTreeLoader.prototype
proto.isEventTreeLoader = true

// Inherit
emitter(proto)

proto.init = require('./init')
proto.closeChild = require('./closeChild')
proto.closeChildren = require('./closeChildren')
proto.closeNeighbors = require('./closeNeighbors')
proto.closeParent = require('./closeParent')
proto.open = require('./open')
proto.openChild = require('./openChild')
proto.openChildren = require('./openChildren')
proto.openNeighbors = require('./openNeighbors')
proto.openParent = require('./openParent')
proto.placeholder = require('./placeholder')
proto.remapChildren = require('./remapChildren')
proto.removeSpace = require('./removeSpace')
