const Plane = require('../../components/Plane')
const emitter = require('component-emitter')

const FractalLoader = function (config) {
  // @tapspace.loaders.FractalLoader(config)
  //
  // Recursive, scale-free, and asynchronous content loader and layout manager
  // for navigating fractal-like network structures. The loader guards against
  // underflow and overflow of floating point arithmetics and helps in reducing
  // the number of concurrently rendered elements.
  //
  // Parameters:
  //   config
  //     an object with properties:
  //       viewport
  //         a Viewport
  //       tracker
  //         a function (array of track) -> array of track. Synchronous.
  //         The tracker defines the identifiers and locations of
  //         .. child components given identifiers and locations of
  //         .. their parents. See below for details.
  //       backtracker
  //         a function (array of track) -> array of track. Synchronous.
  //         The backtracker defines the identifiers and locations of
  //         .. parent components given identifiers and locations of
  //         .. one or more of their children. See below for details.
  //       generator
  //         a function (ids, callback), where callback (err, nodes).
  //         .. Asynchronous.
  //         The generator constructs the component and may fetch data
  //         .. from background services to do so. This data often contain
  //         .. information about the children of the component that is
  //         .. needed by the trackers.
  //       initial
  //         an array of track. The initial component identifiers
  //         .. and locations.
  //       limits
  //         optional object with properties:
  //           minCount
  //             a number, default is 1. Minimum number of fractal nodes
  //             .. to keep rendered. Minimum of 1 prevents the destruction
  //             .. of the fractal.
  //           maxCount
  //             a number, default is 500. Maximum number of fractal nodes
  //             .. to keep rendered. The other limits may be strict enough
  //             .. so that the max count is never reached.
  //           minVisibleCover
  //             a number, default is 0.0001. Minimum area the node can cover
  //             .. in the viewport and still stay rendered.
  //             .. Smaller nodes are removed.
  //             .. The number is the node area relative to the viewport area.
  //           minOpenCover
  //             a number, default is 0.001. Minimum area the node can cover
  //             .. in the viewport and still have its parent, siblings, and
  //             .. children rendered. Smaller nodes are closed.
  //             .. The number is the node area relative to the viewport area.
  //           maxOpenCover
  //             a number, default is 1. Maximum area the node can cover
  //             .. in the viewport and still have its parent, siblings, and
  //             .. children rendered. Parents of larger nodes are removed.
  //             .. The number is the node area relative to the viewport area.
  //           maxVisibleCover
  //             a number, default is 2. Maximum area the node can cover
  //             .. in the viewport and still be rendered.
  //             .. Larger nodes are removed.
  //             .. The number is the node area relative to the viewport area.
  //           maxDistance
  //             a number, default is 1500. Maximum distance in the viewport
  //             .. pixels from the viewport center so that the node
  //             .. is still kept rendered. Nodes farther away are removed.
  //
  // Tracker functions define the fractal layout. They consume an array of
  // tracks and output another array of tracks. Each track is an object
  // `{ id, basis }` where the `id` is an identifier string for the node and
  // the `basis` gives the placement of the node in the space.
  // The tracker defines the children relative to the parents and
  // the backtracker defines the parents relative to the children.
  // In order to layout the fractal in an expected manner, the two tracker
  // functions must be carefully designed to work in tandem.
  //

  this.viewport = config.viewport
  // A function that returns IDs and placements of next nodes.
  this.tracker = config.tracker
  // Gives parent node identifiers and bases.
  this.backtracker = config.backtracker
  // Generate nodes from identifiers
  this.generator = config.generator
  // The first identifiers
  const initial = config.initial

  // Default visibility limits
  if (!config.limits) {
    config.limits = {}
  }
  this.limits = Object.assign({
    minCount: 1,
    maxCount: 500,
    minVisibleCover: 0.0001, // covered area relative to viewport area
    minOpenCover: 0.001,
    maxOpenCover: 1,
    maxVisibleCover: 2,
    maxDistance: 1500 // distance from camera
  }, config.limits)

  // Catalog of nodes, id -> node
  this.nodes = {}

  const self = this
  this.viewport.on('idle', () => {
    self.growAndPrune()
    self.viewport.rescale()
  })

  // Create initial nodes
  const initialIds = initial.map(track => track.id)
  this.generator(initialIds, (err, nodes) => {
    if (err) {
      throw err
    }

    // Create initial plane
    const plane = Plane.create()
    self.viewport.addChild(plane)
    const firstBasis = initial[0].basis
    plane.setBasis(firstBasis)

    nodes.forEach((node, i) => {
      const id = initial[i].id
      const basis = initial[i].basis
      // Register
      self.nodes[id] = node
      node.fractalId = id
      // Populate space
      plane.addChild(node)
      node.setBasis(basis)
    })

    // Ensure async emit even with sync generator.
    setTimeout(() => {
      self.emit('initiated')
    }, 0)
  })
}

module.exports = FractalLoader
const proto = FractalLoader.prototype
proto.isFractalLoader = true

// Inherit
emitter(proto)

// Methods
proto.closeNode = require('./closeNode')
proto.getChildren = require('./getChildren')
proto.getSpace = require('./getSpace')
proto.getSiblings = require('./getSiblings')
proto.growAndPrune = require('./growAndPrune')
proto.isNodeAlive = require('./isNodeAlive')
proto.isNodeOpen = require('./isNodeOpen')
proto.openChildren = require('./openChildren')
proto.openParent = require('./openParent')
proto.openSiblings = require('./openSiblings')
proto.removeNode = require('./removeNode')
proto.retireNode = require('./retireNode')
