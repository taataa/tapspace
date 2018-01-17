//
// A View into Space, implemented in HTML DOM and CSS
// This module gives a starting point for implementing
// views in other tech such as Canvas or WebGL
//
var createElementFor = require('./createElementFor')
var Vector = require('../Vector')
var InvariantTransform = require('../InvariantTransform')
var SpaceRectangle = require('../SpaceRectangle')
var Space = require('../Space')
var extend = require('extend')
var move = require('move-js')

// Disable animations by default.
move.defaults = { duration: 0 }

var DOM_SPACENODE_PROPERTY = '_taaspace_node'

// Constructor

var SpaceViewHTML = function (space) {
  // Parameters
  //   space

  // Test if valid space
  if (!(space instanceof Space)) {
    throw new Error('Parent of a View must be a Space.')
  }

  SpaceRectangle.call(this)

  this._space = space
  // This is the DOM container. Populated in mount().
  this._el = null
  // Handlers for events like 'added'. Populated in mount()
  this._handlers = null

  // View is now ready to be added onto the space.
  this.setParent(space)
}

// Prototype mixin

var p = extend({}, SpaceRectangle.prototype)
SpaceViewHTML.prototype = p

// Public methods

p.getElementBySpaceNode = function (spaceNode) {
  // Get HTML element representation of the space node.
  // If spaceNode is the view itself, return the container.
  // TODO or should return the 0x0 element of the view and require
  // TODO that the container is requested via getHtmlContainer?
  // Return null if not found.
  //
  // if (spaceNode === this) {
  //   return this._el
  // }

  return spaceNode._elements[this.id]
}

p.getHtmlContainer = function () {
  // Return the DOM root element of the space view.
  // Return null if not yet mounted.
  return this._el
}

p.getSpaceNodeByElementId = function (id) {
  // Get SpaceNode by HTML element id
  // Return null if no node for such id.
  var el = document.getElementById(id)

  if (el && el.hasOwnProperty(DOM_SPACENODE_PROPERTY)) {
    return el[DOM_SPACENODE_PROPERTY]
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

  // Render the space
  this._renderElementFor(this._space)

  var view = this
  this._handlers = {
    added: function () {
      // If view becomes attached to a new parent space,
      // render the content of the new space.
      view._renderElementFor(view._space)
    },
    removed: function () {
      // If view becomes removed from the parent space,
      // remove all associated HTMLElements and bindings.
      view._removeElementOf(view._space)
    },
    transformed: function () {
      // View becomes transformed.
      // => Retransform all HTMLElements.
      view._space.getChildren().map(function (child) {
        view._transformElementOf(child)
      })
    }
  }

  this.on('added', this._handlers.added)
  this.on('removed', this._handlers.removed)
  this.on('transformed', this._handlers.transformed)
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

  if (!this.isMounted()) {
    // No need to remove anything.
    // Unnecessary unmount call can be a programming error
    // but sometimes we just want to be sure the view is unmounted.
    return
  }

  this.off('added', this._handlers.added)
  this.off('removed', this._handlers.removed)
  this.off('transformed', this._handlers.transformed)
  this._handlers = {}

  // Detach all children
  this._removeElementOf(this._space)
}

// Privateish methods

p._getViewSpecificId = function (spaceNodeId) {
  // Each rendered element has own ID. The ID differs from
  // the id of space nodes because a space node can become
  // visualized through multiple views.
  return this.id + '-' + spaceNodeId
}

p._removeElementOf = function (spaceNode) {
  // Removes the HTMLElement of spaceNode.
  // Does not remove the spaceNode from the view,
  // only from DOM.
  var el, on
  var view = this
  var n = spaceNode  // alias

  if (!this.isMounted()) {
    throw new Error('Cannot remove element when view is not mounted.')
  }

  // Recursively remove the children first
  n.getChildren().map(function (child) {
    view._removeElementOf(child)
  })

  if (n.isRoot()) {
    // Is Space. Only remove event handlers.
    on = n._handlers[this.id]
    n.off('contentAdded', on.contentAdded)
    delete n._handlers[this.id]
  } else {
    // Is a descendant of Space. Remove event handlers and the element.

    on = n._handlers[view.id]
    n.off('contentAdded', on.contentAdded)
    n.off('removed', on.removed)
    n.off('resized', on.resized)
    n.off('transformed', on.transformed)

    el = n._elements[this.id]
    delete el[DOM_SPACENODE_PROPERTY]
    delete n._elements[this.id]
    delete n._handlers[this.id]

    // Remove from parent element
    el.parentElement.removeChild(el)
  }
}

p._renderElementFor = function (spaceNode) {
  // Creates the element for spaceNode and renders it
  // to the view. Renders also the children of the node.
  var el, parentEl
  var view = this
  var n = spaceNode

  // Ensure that the view if mounted to DOM. Otherwise
  // asking for the render is a bug.
  if (!this.isMounted()) {
    throw new Error('Do not render elements before mounting the view')
  }

  // Init _handlers and _elements.
  // Handlers is a mapping from view.id to a handler
  // function and is attached to the SpaceNode.
  // Elements is a mapping from view.id to a HTMLElement created
  // for the SpaceNode.
  if (!n.hasOwnProperty('_elements')) {
    n._handlers = {}
    n._elements = {}
  }

  // Prevent bugs that double-render elements
  if (n._elements.hasOwnProperty(this.id)) {
    throw new Error('An element should not be added twice to the same view.')
  }

  // TODO what if view itself becomes rendered

  if (n.isRoot()) {
    // Is Space

    // Define how view should react to changes in Space
    n._handlers[this.id] = {
      contentAdded: function (childNode) {
        // Child added
        view._renderElementFor(childNode)
      }
    }
    n.on('contentAdded', n._handlers[this.id].contentAdded)
  } else {
    // Is a descendant of Space

    // Create HTMLElement for the node. Provide View constructor to avoid
    // a circular dependency.
    el = createElementFor(n, SpaceViewHTML)

    // Each must have unique ID so we can reference to them.
    el.id = this._getViewSpecificId(n.id)

    // Allow reference from the element to the spaceNode and vice versa.
    // It becomes important to carefully undo the reference
    // to prevent memory leaks.
    el[DOM_SPACENODE_PROPERTY] = n
    n._elements[this.id] = el

    // Add the new element to the parent element.
    // However, if the Space is the parent, then add
    // the element to the view container.
    if (n.getParent().isRoot()) {
      this._el.appendChild(el)
    } else {
      parentEl = n.getParent()._elements[this.id]
      parentEl.appendChild(el)
    }

    // Define how view should react to changes in SpaceNode
    // by setting up handlers.

    n._handlers[this.id] = {
      contentAdded: function (childNode) {
        // Child added
        view._renderElementFor(childNode)
      },
      removed: function () {
        view._removeElementOf(spaceNode)
      },
      resized: function () {
        view._resizeElementOf(spaceNode)
      },
      transformed: function () {
        view._transformElementOf(spaceNode)
      }
    }

    n.on('contentAdded', n._handlers[this.id].contentAdded)
    n.on('removed', n._handlers[this.id].removed)
    n.on('resized', n._handlers[this.id].resized)
    n.on('transformed', n._handlers[this.id].transformed)

    // Initial size and transformation
    n._handlers[this.id].resized()
    n._handlers[this.id].transformed()
  }

  // Repeat for children
  n.getChildren().map(function (child) {
    view._renderElementFor(child)
  })
}

p._resizeElementOf = function (spaceRectangle) {
  var el, wh
  wh = spaceRectangle.getLocalSize()
  el = spaceRectangle._elements[this.id]
  el.style.width = wh.x + 'px'
  el.style.height = wh.y + 'px'
}

p._transformElementOf = function (spaceNode) {
  // Update transformation of a HTMLElement.
  // They are HTMLElements parented on view's container, not nodes on space.
  //
  var el, itr, elt, prec, s, r, tx, ty

  el = spaceNode._elements[this.id]

  // Represent node's local transformation on the view.
  itr = new InvariantTransform(spaceNode._T, spaceNode._parent)
  elt = itr.to(this)

  // Current move.js does not prevent scientific notation reaching CSS
  // which leads to problems with Safari and Opera. Therefore we must
  // prevent the notation here.
  // Of course this will cause a small deviation in the presentation.
  // However the deviation is only in the presentation and thus not a problem.
  prec = 8
  s = elt.s.toFixed(prec)
  r = elt.r.toFixed(prec)
  tx = elt.tx.toFixed(prec)
  ty = elt.ty.toFixed(prec)
  move(el).matrix(s, r, -r, s, tx, ty).end()

  // TODO el.style.transform = 'matrix(' +
}

module.exports = SpaceViewHTML
