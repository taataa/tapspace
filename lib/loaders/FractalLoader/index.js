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
  //         .. their parents. Synchronous.
  //       backtracker
  //         a function (array of track) -> array of track. Synchronous.
  //         The backtracker defines the identifiers and locations of
  //         .. parent components given identifiers and locations of
  //         .. one or more of their children.
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
