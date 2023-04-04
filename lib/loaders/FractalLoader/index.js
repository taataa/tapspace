
const FractalLoader = function (config) {
  this.viewport = config.viewport
  // A function that returns IDs and placements of next nodes.
  this.kernel = config.kernel
  // Gives parent node identifiers
  this.backtracker = config.backtracker
  // Generate a node from an identifier
  this.generator = config.generator
  // First identifier
  const initial = config.initial

  // Catalog of planes, id -> node group
  this.planes = {}
  // Catalog of nodes, id -> node
  this.nodes = {}

  const self = this
  this.viewport.on('idle', () => {
    self.growAndPrune()
    self.viewport.rescale()
  })

  // Create initial
  this.createInitialNode(initial)
}

module.exports = FractalLoader
const proto = FractalLoader.prototype

// Methods
proto.closeNode = require('./closeNode')
proto.createInitialNode = require('./createInitialNode')
proto.createNode = require('./createNode')
proto.createPlane = require('./createPlane')
proto.getSiblings = require('./getSiblings')
proto.growAndPrune = require('./growAndPrune')
proto.isAlive = require('./isAlive')
proto.isEmpty = require('./isEmpty')
proto.isOpen = require('./isOpen')
proto.openNode = require('./openNode')
proto.openParent = require('./openParent')
proto.populatePlane = require('./populatePlane')
proto.removeEmptyPlane = require('./removeEmptyPlane')
proto.removeNode = require('./removeNode')
proto.retireNode = require('./retireNode')
proto.reuniteNode = require('./reuniteNode')
