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
proto.isNodeAlive = require('./isNodeAlive')
proto.isNodeOpen = require('./isNodeOpen')
proto.openChildren = require('./openChildren')
proto.openParent = require('./openParent')
proto.openSiblings = require('./openSiblings')
proto.removeNode = require('./removeNode')
proto.retireNode = require('./retireNode')
proto.reuniteNode = require('./reuniteNode')
