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

  // Mapping from SpaceNode#id to HTMLElement
  // Every HTMLElement created by the view is stored here.
  this._elements = {}
  // Mapping from SpaceNode#id to a map from an event name to a handler fn.
  // Event handlers of every rendered SpaceNode are stored here.
  this._handlers = {}
  // Mapping from an event name to a handler fn.
  // Handlers for the view's events like 'added'. Populated in mount().
  this._viewHandlers = {}

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
  return this._elements[spaceNode.id]
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

  // Render the space.
  // Note that this renders also an element for the SpaceViewHTML.
  // Although the element will be 0x0 and meant for the children of the view.
  this._renderElementFor(this._space)

  var view = this
  this._viewHandlers = {
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
      // => Retransform HTMLElements that are children of the container.
      view._space.getChildren().map(function (child) {
        view._transformElementOf(child)
      })
    }
  }

  this.on('added', this._viewHandlers.added)
  this.on('removed', this._viewHandlers.removed)
  this.on('transformed', this._viewHandlers.transformed)
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

  // No need to react to events in the space.
  this.off('added', this._viewHandlers.added)
  this.off('removed', this._viewHandlers.removed)
  this.off('transformed', this._viewHandlers.transformed)
  this._viewHandlers = {}

  // Detach all rendered elements.
  this._removeElementOf(this._space)
}

// Private(ish) methods

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
    // SpaceNode is Space. Only remove event handlers,
    // because no element for the Space.
    on = this._handlers[n.id]
    n.off('contentAdded', on.contentAdded)
    delete this._handlers[n.id]
  } else {
    // Is a descendant of Space. Remove event handlers and the element.

    on = this._handlers[n.id]
    n.off('contentAdded', on.contentAdded)

    if (n !== this) {
      // When SpaceNode is the SpaceViewHTML itself,
      // only a handler for contentAdded has been created.
      n.off('removed', on.removed)
      n.off('resized', on.resized)
      n.off('transformed', on.transformed)
    }

    el = this._elements[n.id]
    delete el[DOM_SPACENODE_PROPERTY]
    delete this._elements[n.id]
    delete this._handlers[n.id]

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

  // Prevent bugs that double-render elements
  if (this._elements.hasOwnProperty(n.id)) {
    throw new Error('An element should not be added twice to the same view.')
  }

  // TODO what if view itself becomes rendered

  if (n.isRoot()) {
    // SpaceNode is Space. Space has no HTMLElement.

    // Define how view should react to changes in Space
    this._handlers[n.id] = {
      contentAdded: function (childNode) {
        // Child added
        view._renderElementFor(childNode)
      }
    }
    n.on('contentAdded', this._handlers[n.id].contentAdded)
  } else {
    // Is a descendant of Space

    // Create HTMLElement for the node.
    // If the node is SpaceViewHTML, a 0x0 div is created.
    // Provide View constructor to avoid a circular dependency.
    el = createElementFor(n, SpaceViewHTML)

    // Each must have unique ID so we can reference to them.
    el.id = this._getViewSpecificId(n.id)

    // Allow reference from the element to the spaceNode and vice versa.
    // It becomes important to carefully undo the reference
    // to prevent memory leaks.
    el[DOM_SPACENODE_PROPERTY] = n
    this._elements[n.id] = el

    // Add the new element to the parent element.
    // However, if the Space is the parent, then add
    // the element to the view container.
    if (n.getParent().isRoot()) {
      // Parent is Space
      this._el.appendChild(el)
    } else {
      parentEl = this._elements[n.getParent().id]
      parentEl.appendChild(el)
    }

    // Define how view should react to changes in SpaceNode
    // by setting up handlers.

    this._handlers[n.id] = {
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

    n.on('contentAdded', this._handlers[n.id].contentAdded)

    if (n !== this) {
      // View is a descendant of Space and therefore _renderElementFor
      // is called also for the view's SpaceNode.
      //
      // If the view's SpaceNode becomes removed, the view has
      // a special handler for that, defined in mount().
      //
      // If the view's SpaceNode becomes resized, the view has
      // a special handler for that, defined in mount().
      // The HTMLElement for the view is a 0x0 and should remain so
      // and therefore we cannot use the default _resizeElementOf.
      //
      // If the view becomes transformed, there is no need to
      // transform it's HTMLElement because the element should stay still.
      // By avoiding unnecessary retransformation we also avoid possible
      // rounding errors.
      //
      // Note that we bound has contentAdded handler also for the view.
      // This way we can fix elements to the view, like a health bar, or
      // dropdown menu.
      n.on('removed', this._handlers[n.id].removed)
      n.on('resized', this._handlers[n.id].resized)
      n.on('transformed', this._handlers[n.id].transformed)

      // Initial size and transformation
      this._handlers[n.id].resized()
      this._handlers[n.id].transformed()
    }
  }

  // Repeat for children to render everything.
  n.getChildren().map(function (child) {
    view._renderElementFor(child)
  })
}

p._resizeElementOf = function (spaceRectangle) {
  var el, wh
  wh = spaceRectangle.getLocalSize()
  el = this._elements[spaceRectangle.id]
  el.style.width = wh.x + 'px'
  el.style.height = wh.y + 'px'
}

p._transformElementOf = function (spaceNode) {
  // Update transformation of a HTMLElement.
  // They are HTMLElements parented on view's container, not nodes on space.
  //
  var el, itr, elt, prec, s, r, tx, ty

  el = this._elements[spaceNode.id]

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
