const emitter = require('component-emitter')

const TreeLoader = function (config) {
  // @TreeLoader(config)
  //
  // An asynchronous and recursive loader for your tree-structured content.
  // Use this to build infinite or very deep, zoomable web applications
  // to overcome limits of floating point arithmetics.
  //
  // Each node of the tree is a space. Each space should have unique ID.
  //
  // To setup the loader, you need to implement a few functions:
  // mapper, backmapper, tracker, and backtracker.
  // The mappers define the relative positions of content and
  // the trackers define the structure and order of content.
  //
  // The mappers are allowed to be incomplete in a sense that
  // if one yields null result then another will be called in reverse manner.
  // If both yield null, then the loader determines that
  // no mapping is available and avoids placing the space
  // until the tree has enough context to facilitate the mapping.
  // Implement the mappers to suit your data: if your datum stores
  // its position relative to the parent, you only need a good backmapper;
  // if your datum stores the locations of its children, a good mapper.
  // If your data allows both mappers to be good, this provides the benefit
  // that the placeholder content such as loading animations can be positioned
  // for adjacent spaces before their data are fetched.
  //
  // Parameters:
  //   config
  //     an object with properties:
  //       viewport
  //         a tapspace.components.Viewport
  //       mapper
  //         a function (parentId, parent, childId), synchronous, where
  //         .. parent is a Component. Determine the placement of the child
  //         .. by returning a Basis relative to the parent.
  //       backmapper
  //         a function (childId, child, parentId), synchronous, where
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
  // Emits:
  //   open
  //     when you should build a space and call loader.addSpace(...).
  //     Called with `{ id, data }`.
  //   opened
  //     when a space has been added to the loader successfully.
  //     Called with `{ id, space }`.
  //   close
  //     when you should deconstruct a space and call loader.removeSpace(...).
  //     Called with `{ id, space, data }`.
  //   closed
  //     when a space has been closed successfully.
  //     Called with `{ id }`.
  //
  // By calling `loader.loadSpace(id, basis)` the loader is initiated and
  // the tree-building starts.
  // However, the loader does not yet know your content.
  // To provide the content, and also means to render and retrieve the content,
  // you need to write an 'open' event handler:
  //
  // ```
  // loader.on('open', (ev) => {
  //   ...
  // })
  // ```
  //
  // Inside the handler, you can create your content for your tree node,
  // like text, images, html, loading animations.
  // Place the content into a tapspace item or plane,
  // and call `loader.addSpace(id, content)`.
  //
  // Here is a minimal example:
  //
  // ```
  // loader.on('open', (ev) => {
  //   const placeholder = tapspace.createItem('loading...')
  //   loader.addSpace(ev.id, placeholder)
  //   fetch('https://api.example.com/data')
  //     .then(response => {
  //       if (!response.ok) throw new Error('Network response was not OK')
  //       return response.json()
  //     })
  //     .then(data => {
  //       const item = tapspace.createItem(data.html)
  //       loader.addSpace(ev.id, item)
  //       loader.openNeighbors(ev.id, ev.depth)
  //     })
  //     .catch(error => {
  //       const item = tapspace.createItem(error.message)
  //       loader.addSpace(ev.id, item)
  //       console.error('Error:', error)
  //     })
  // })
  // ```
  //
  // The loader also emits 'close' event.
  // You must handle the event by calling `loader.removeSpace(ev.id)`
  // and some other deconstruction behavior if your code needs it.
  // For example:
  //
  // ```
  // loader.on('close', (ev) => {
  //   streams[ev.id].close()
  //   loader.removeSpace(ev.id)
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
  // You still need to build a driver for it.
  // The driver is a function ran at each viewport idle event
  // or similar, non-realtime schedule.
  // Its purpose is to find our current location in the tree
  // and open/close the TreeLoader nodes accordingly.
  // See examples.
  //

  if (!config.viewport || !config.viewport.isViewport) {
    throw new Error('Invalid loader viewport.')
  }
  if (typeof config.mapper !== 'function') {
    throw new Error('Invalid loader mapper.')
  }
  if (typeof config.backmapper !== 'function') {
    throw new Error('Invalid loader backmapper.')
  }
  if (typeof config.tracker !== 'function') {
    throw new Error('Invalid loader tracker.')
  }
  if (typeof config.backtracker !== 'function') {
    throw new Error('Invalid loader backtracker.')
  }

  this.viewport = config.viewport

  // TODO this.driver = config.driver

  // Wrap the functions to help the app developer
  // to detect bad configuration.

  // Wrap mapper.
  const nakedMapper = config.mapper
  this.mapper = (parentId, parentSpace, childId) => {
    if (parentId === childId) {
      const msg = 'Misconfigured tracker or backtracker. ' +
        'Space cannot parent itself: ' + childId
      throw new Error(msg)
    }
    const basis = nakedMapper(parentId, parentSpace, childId)
    if (typeof basis !== 'object' || (basis !== null && !basis.isBasis)) {
      throw new Error('Invalid mapper. Should return a Basis or null.')
    }
    if (basis && basis.changeBasis) {
      // Ensure a basis is on the space. Prerequisite for getMatchedOuter calls.
      return basis.changeBasis(parentSpace)
    }
    return null
  }

  // Wrap backmapper.
  const nakedBackmapper = config.backmapper
  this.backmapper = (childId, childSpace, parentId) => {
    if (parentId === childId) {
      const msg = 'Misconfigured tracker or backtracker. ' +
        'Space cannot parent itself: ' + childId
      throw new Error(msg)
    }
    const basis = nakedBackmapper(childId, childSpace, parentId)
    if (typeof basis !== 'object' || (basis !== null && !basis.isBasis)) {
      throw new Error('Invalid backmapper. Should return a Basis or null.')
    }
    if (basis && basis.changeBasis) {
      // Ensure a basis is on the space. Prerequisite for getMatchedOuter calls.
      return basis.changeBasis(childSpace)
    }
    return null
  }

  // Wrap tracker.
  const nakedTracker = config.tracker
  this.tracker = (id, space) => {
    const tracks = nakedTracker(id, space)
    if (!Array.isArray(tracks)) {
      throw new Error('Invalid tracker. Should return an array.')
    }
    const someInvalid = tracks.some(track => {
      return track === '' || (typeof track !== 'string' && track !== null)
    })
    if (someInvalid) {
      throw new Error('Invalid tracker. IDs must be non-empty strings.')
    }
    return tracks
  }

  // Wrap backtracker.
  const nakedBacktracker = config.backtracker
  this.backtracker = (id, space) => {
    const parentId = nakedBacktracker(id, space)
    if (typeof parentId !== 'string' && parentId !== null) {
      throw new Error('Invalid backtracker. Should return string or null.')
    }
    if (parentId === '') {
      throw new Error('Invalid backtracker. ID cannot be an empty string.')
    }
    return parentId
  }

  // Track created spaces.
  // id -> Component
  this.spaces = {}

  // Cached bases, at least for the init basis.
  this.bases = {}

  // Track which spaces are loading and for which neighbor.
  // Purpose: prevent further 'open' emissions before a space is added
  //   to prevent unnecessary duplicate additions and rendering.
  // Purpose: prevent addition of spaces that are not loading and not existing.
  // Purpose: storing the neighbor ID instead of a boolean helps to
  //   clear loading outside neighborhood.
  // Exception: the initial loading space has the neighbor ID of self.
  // Clarification: host app may continue loading updates externally.
  //   The loading tracking is only for the loader to track the period
  //   between 'open' event and addSpace call.
  // Set by: anywhere before emitting 'open'
  // Cleared by: a successful addSpace call
  // Cleared by: any close* call, even when space does not exist.
  // Rule: if this.loading[id] is set then this.spaces[id] is not set.
  // Rule: if this.spaces[id] is set then this.loading[id] is not set.
  // Structure: a map: id -> neighborId
  this.loading = {}
}

module.exports = TreeLoader
const proto = TreeLoader.prototype
proto.isTreeLoader = true

// Inherit
emitter(proto)

// Methods
proto.addSpace = require('./addSpace')
proto.closeAll = require('./closeAll')
proto.closeChild = require('./closeChild')
proto.closeChildren = require('./closeChildren')
proto.closeNeighbors = require('./closeNeighbors')
proto.closeParent = require('./closeParent')
proto.countSpaces = require('./countSpaces')
proto.getFrontier = require('./getFrontier')
proto.getSpace = require('./getSpace')
proto.getSpaces = require('./getSpaces')
proto.hasSpace = require('./hasSpace')
proto.initSpace = require('./initSpace')
proto.openChild = require('./openChild')
proto.openChildren = require('./openChildren')
proto.openNeighbors = require('./openNeighbors')
proto.openParent = require('./openParent')
proto.remapChildren = require('./remapChildren')
proto.remapParent = require('./remapParent')
proto.removeSpace = require('./removeSpace')
