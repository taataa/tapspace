//
// A View into Space, implemented in HTML DOM and CSS
// This module gives a starting point for implementing
// views in other tech such as Canvas or WebGL
//
var createElementFor = require('./createElementFor')
var handlers = require('./handlers')
var Vector = require('../Vector')
var SpaceRectangle = require('../SpaceRectangle')
var Space = require('../Space')
var extend = require('extend')
var move = require('move-js')

// Disable animations by default.
move.defaults = { duration: 0 }

// Constructor

var SpaceViewHTML = function (space) {
  // Parameters
  //   space

  // Test if valid space
  if (!(space instanceof Space)) {
    throw new Error('Parent of a View must be a Space.')
  }

  SpaceRectangle.call(this)

  // This is the DOM container. Use mount() to set.
  this._el = null

  // Two mappings from spacenode IDs:
  // 1. to rendered HTML elements.
  // 2. to SpaceNode instances
  // The _elements is a subset of _nodes because not all nodes
  // are rendered. The view might not even have a container.
  // Dev decision:
  //   For data structure, dict over list because key search time complexity.
  this._elements = {}
  this._nodes = {}

  // We listen the space for events like new or removed nodes, transformations,
  // or other changes. We store the event handlers to be able to remove them
  // if the space of view changes.
  this._handlers = {}

  // View becomes attached to a new parent space.
  // => Render the content of the new space.
  this.on('added', function (view, newSpace, oldSpace) {
    handlers.viewAdded(view, newSpace, oldSpace)
  })

  // View becomes removed from the parent space.
  // => Remove all associated HTMLElements and bindings.
  this.on('removed', function (view, newSpace, oldSpace) {
    handlers.viewRemoved(view, newSpace, oldSpace)
  })

  // View becomes transformed.
  // => Retransform all HTMLElements.
  this.on('transformed', function (view) {
    handlers.viewTransformed(view)
  })

  // View is now ready to be added onto the space.
  // Must position below this.on('added', fn) because setParent
  // emits the 'added' event.
  this.setParent(space)
}

// Prototype mixin

var p = extend({}, SpaceRectangle.prototype)
SpaceViewHTML.prototype = p

// Public methods

p.getElementBySpaceNode = function (spaceNode) {
  // Get HTML element representation of the space taa.
  // Return null if not found.
  if (this._elements.hasOwnProperty(spaceNode.id)) {
    return this._elements[spaceNode.id]
  }
  return null
}

p.getHtmlContainer = function () {
  // Return the DOM root element of the space view.
  // Return null if not yet mounted.
  return this._el
}

p.getSpaceNodeByElementId = function (id) {
  // Get space taa by HTML element id
  // Return null if no space taa for such id.
  var i = id.split('-')
  var spaceViewId = i[0]
  var spaceNodeId = i[1]
  if (this.id === spaceViewId) {
    if (this._nodes.hasOwnProperty(spaceNodeId)) {
      return this._nodes[spaceNodeId]
    }
  }
  return null
}

p.mount = function (htmlContainer) {
  // Begin to use htmlContainer as the DOM root for the space.
  // Design decision:
  //   In v3 the HTML container was provided via the constructor.
  //   This led to a poor coding style where 'new SpaceViewHTML'
  //   was called just for its rendering side-effect. In v4
  //   we wanted the side-effect to be more explicit and made
  //   it a separate method 'mount'.
  //
  var nodeId

  // Test if valid dom element
  if (!(htmlContainer && 'tagName' in htmlContainer)) {
    throw new Error('Container should be a DOM Element')
  }

  // If same container, no reason to do anything
  if (this._el === htmlContainer) {
    return
  }

  // Clear the old container
  this.unmount()
  this._el = htmlContainer

  // Init style.
  // Note:
  // "position: relative" is needed to enable "overflow: hidden".
  // Without "overflow: hidden", if transformed elements get outside
  // the initial viewport, Chrome on Android increases
  // the dimensions of the document.
  this._el.style.position = 'relative'
  this._el.style.overflow = 'hidden'
  this._el.style.display = 'block'

  // Init size in space.
  this.setLocalSize(new Vector(this._el.clientWidth, this._el.clientHeight))

  for (nodeId in this._nodes) {
    if (this._nodes.hasOwnProperty(nodeId)) {
      this._renderElementFor(this._nodes[nodeId])
    }
  }
}

p.isMounted = function () {
  return this._el !== null
}

var setParentSuperProto = p.setParent
p.setParent = function (space) {
  // Override the SpaceNode#setParent so that only a Space
  // is allowed to become the parent of a SpaceView.
  if (!(space instanceof Space)) {
    throw new Error('A View can only be a child of a Space')
  }
  return setParentSuperProto.call(this, space)
}

p.unmount = function () {
  // Detach the view from HTML DOM
  var id

  if (this.isMounted()) {
    for (id in this._elements) {
      if (this._elements.hasOwnProperty(id)) {
        this._el.removeChild(this._elements[id])
        delete this._elements[id]
      }
    }
  }
}

// Private methods

p._addSpaceNode = function (spaceNode) {
  // Call when the spaceNode is totally new to the view.
  // Renders the node and begins to watch the node for changes.
  var h
  var this2 = this

  // Prevent doubles and self
  if (this._nodes.hasOwnProperty(spaceNode.id) || spaceNode === this) {
    return
  }

  // Make referencable by node ID
  this._nodes[spaceNode.id] = spaceNode

  // Add to DOM
  this._renderElementFor(spaceNode)

  // Begin listening further changes in the node
  h = {
    transformed: function (node) {
      handlers.contentTransformed(this2, node)
    },
    resized: function (node) {
      handlers.contentResized(this2, node)
    }
  }
  this._handlers[spaceNode.id] = h
  spaceNode.on('transformed', h.transformed)
  spaceNode.on('resized', h.resized)
}

p._getViewSpecificId = function (spaceNodeId) {
  // Each rendered element has own ID. The ID differs from
  // the id of space nodes because a space node can become
  // visualized through multiple views.
  return this.id + '-' + spaceNodeId
}

p._removeElementOf = function (spaceNode) {
  // Removes the HTMLElement of spaceNode.
  // Does not remove the spaceNode from the view
  // only from DOM.
  var el

  if (this.isMounted()) {
    if (this._elements.hasOwnProperty(spaceNode.id)) {
      el = this._elements[spaceNode.id]
      this._el.removeChild(el)
      delete this._elements[spaceNode.id]
    }
  }
}

p._removeSpaceNode = function (spaceNode) {
  // Call when the view must totally forget the spaceNode.
  var h

  if (this._nodes.hasOwnProperty(spaceNode.id)) {
    // Remove handlers.
    h = this._handlers[spaceNode.id]
    spaceNode.off('transformed', h.transformed)
    spaceNode.off('resized', h.resized)
    delete h.transformed
    delete h.resized
    delete this._handlers[spaceNode.id]

    // Remove HTML element from DOM
    this._removeElementOf(spaceNode)

    // Remove from memory.
    // JS feature of delete: does not throw if key does not exist
    delete this._nodes[spaceNode.id]
  }
}

p._renderElementFor = function (spaceNode) {
  // Creates the element for spaceNode and renders it
  // to the view.
  var el

  if (this.isMounted()) {
    // Create HTMLElement. Provide View constructor to avoid
    // circular dependency.
    el = createElementFor(spaceNode, SpaceViewHTML)

    if (el) {
      // Each must have unique ID
      el.id = this._getViewSpecificId(spaceNode.id)

      // Render
      this._el.appendChild(el)

      // Make element referencable by node ID
      this._elements[spaceNode.id] = el

      // Make transformation
      this._transformElementOf(spaceNode)
    }
  }
}

p._resizeElementOf = function (spaceRectangle) {
  var el, wh

  if (this._elements.hasOwnProperty(spaceRectangle.id)) {
    // Safeguard: allow resize only on SpaceRectangles
    if ('getLocalSize' in spaceRectangle) {
      wh = spaceRectangle.getLocalSize()
      el = this._elements[spaceRectangle.id]
      el.style.width = wh.x + 'px'
      el.style.height = wh.y + 'px'
    }
  }
}

p._transformElementOf = function (spaceNode) {
  // Update transformation of HTMLElements of the view.
  // They are HTMLElements parented on view's container, not nodes on space.
  // See 2016-03-05-09 for math.
  var el, gt, et, prec, s, r, tx, ty

  if (this._elements.hasOwnProperty(spaceNode.id)) {
    el = this._elements[spaceNode.id]
    gt = spaceNode.getGlobalTransform().toSpace()
    et = this._T.inverse().multiplyBy(gt)
    // Current move.js does not prevent scientific notation reaching CSS
    // which leads to problems with Safari and Opera. Therefore we must
    // prevent the notation here.
    // Of course this will cause error in the presentation.
    // However the error is only in the presentation and thus not a problem.
    prec = 8
    s = et.s.toFixed(prec)
    r = et.r.toFixed(prec)
    tx = et.tx.toFixed(prec)
    ty = et.ty.toFixed(prec)
    move(el).matrix(s, r, -r, s, tx, ty).end()
  }
}

module.exports = SpaceViewHTML
