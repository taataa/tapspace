const Plane = require('../../components/Plane')

const FractalLoader = function (config) {
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

  // Create initial
  // TODO initial basis
  this.generator(initial, (err, nodes) => {
    if (err) {
      throw err
    }

    // Create initial plane
    const plane = Plane.create()
    self.viewport.addChild(plane)

    nodes.forEach((node, i) => {
      const id = initial[i]
      // Register
      self.nodes[id] = node
      // Populate space
      plane.addChild(node)
    })
  })
}

module.exports = FractalLoader
const proto = FractalLoader.prototype

// Methods
proto.closeNode = require('./closeNode')
proto.getChildren = require('./getChildren')
proto.getSpace = require('./getSpace')
proto.getSiblings = require('./getSiblings')
proto.growAndPrune = require('./growAndPrune')
proto.isAlive = require('./isAlive')
proto.isOpen = require('./isOpen')
proto.openChildren = require('./openChildren')
proto.openParent = require('./openParent')
proto.openSiblings = require('./openSiblings')
proto.removeNode = require('./removeNode')
proto.retireNode = require('./retireNode')
proto.reuniteNode = require('./reuniteNode')
