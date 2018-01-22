//
// A View into Space, implemented in HTML DOM and CSS
// This module gives a starting point for implementing
// views in other tech such as Canvas or WebGL
//
// Notes:
//
// [1]
// View has handler for 'added' event.
// View's target space has handler for 'contentAdded' event.
// When a view is parented on a space, the two handlers cause
// duplicate rendering of the view's SpaceNode.
// To go in details, calling _renderElementFor for the space
// attaches 'contentAdded' handler to the space. The handler
// will be fired after execution of the view's 'added'
// handler because the view has been just added as a child
// of the space. To prevent a double call of _renderElementFor
// for the view, the 'contentAdded' handler of the space must
// check if the added child is a view or not. If it is the view,
// then there is no need to render it because the view is
// already rendered by the view's 'added' handler.
//
var createElementFor = require('./createElementFor')
var Vector = require('../Vector')
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
  // Note that this implicitly sets
  //   this._parent = space
  // Therefore, to access the space, call this.getParent() or this._parent
  this.setParent(space)
}

// Prototype mixin

var p = extend({}, SpaceRectangle.prototype)
SpaceViewHTML.prototype = p

// Public methods

p.fitScale = function (ipath) {
  // Overwrite SpaceRectangle#fitScale() to throw an error
  // when the view is not yet mounted and thus has no proper
  // dimensions with to fit.
  //
  if (!this.isMounted()) {
    throw new Error('View is not yet mounted and thus has no proper size ' +
      'for fitting. Call mount() before fitScale().')
  }

  return SpaceRectangle.prototype.fitScale.call(this, ipath)
}

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

  var n = this._elements[spaceNode.id]

  // n will be undefined if not found.
  if (n) {
    return n
  }
  return null
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

p.isMounted = function () {
  return this._el !== null
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
  this._renderElementFor(this._parent)

  // A HTMLElement was rendered for the space itself.
  // This element is a bit special, because it should not react
  // to transformations of the Space (how could it, Space does not transform)
  // but to transformations of the SpaceViewHTML.

  var view = this
  this._viewHandlers = {
    added: function () {
      // If the view becomes attached to a new parent,
      // render the content of the new parent.
      // See [1] for interaction with the 'contentAdded' handler of the parent.
      view._renderElementFor(view._parent)
    },
    transformed: function () {
      // View becomes transformed.
      // => inverse transform HTMLElement of the Space
      //   => Browser retransforms HTMLElements of the descendants.
      // =>
      var el, vel, tr, vtr, prec, s, r, tx, ty
      el = view._elements[view._parent.id]
      vel = view._elements[view.id]
      tr = view._T.inverse()
      vtr = view._T

      prec = 8
      s = tr.s.toFixed(prec)
      r = tr.r.toFixed(prec)
      tx = tr.tx.toFixed(prec)
      ty = tr.ty.toFixed(prec)
      move(el).matrix(s, r, -r, s, tx, ty).end()

      // This undoes the transformation for the view's children
      s = vtr.s.toFixed(prec)
      r = vtr.r.toFixed(prec)
      tx = vtr.tx.toFixed(prec)
      ty = vtr.ty.toFixed(prec)
      move(vel).matrix(s, r, -r, s, tx, ty).end()
    }
  }

  this.on('added', this._viewHandlers.added)
  this.on('transformed', this._viewHandlers.transformed)
}

var setParentSuperProto = p.setParent
p.setParent = function (newParent) {
  // Override the SpaceNode#setParent so that only a Space
  // is allowed to become the parent of a SpaceView.
  if (!(newParent instanceof Space)) {
    throw new Error('A View can only be a child of a Space')
  }

  // Remove elements of the oldParent if the parent is about to change.
  // It is easier to remove the elements before _parent changes. That
  // would be the case if removal happens as a reaction to 'removed' event.
  if (this._parent === newParent) {
    return
  }
  if (this._parent !== null) {
    this._removeElementOf(this._parent)
  }

  setParentSuperProto.call(this, newParent)
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
  this.off('transformed', this._viewHandlers.transformed)
  this._viewHandlers = {}

  // Detach all rendered elements.
  this._removeElementOf(this._parent)
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
  //
  // Note that the give spaceNode is probably already detached from
  // the Space. Therefore spaceNode.isRoot() probably returns true and
  // cannot be used to determine if the spaceNode is space.
  var el, on
  var view = this
  var n = spaceNode  // alias

  if (!this.isMounted()) {
    throw new Error('Cannot remove element when view is not mounted.')
  }

  // Recursively remove the children first
  n.getChildren().forEach(function (child) {
    view._removeElementOf(child)
  })

  // Remove event handlers and the element.
  on = this._handlers[n.id]

  if (n === this || n === this._parent) {
    // When SpaceNode is the Space or SpaceViewHTML itself,
    // only a handler for contentAdded has been created.
    n.off('contentAdded', on.contentAdded)
  } else {
    n.off('contentAdded', on.contentAdded)
    n.off('removed', on.removed)
    n.off('resized', on.resized)
    n.off('transformed', on.transformed)
  }

  el = this._elements[n.id]
  delete el[DOM_SPACENODE_PROPERTY]
  delete this._elements[n.id]
  delete this._handlers[n.id]

  // Remove from DOM
  el.parentElement.removeChild(el)
}

p._renderElementFor = function (spaceNode) {
  // Creates the element for spaceNode and renders it
  // to the view. Renders also the children of the node.
  var el, parentEl, on
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

  // Create HTMLElement for the node.
  // If the node is Space, SpaceGroup, or SpaceViewHTML,
  // a special 0x0 div is created.
  // Provide SpaceViewHTML constructor to avoid a circular dependency.
  el = createElementFor(n, SpaceViewHTML)
  // Each must have unique ID so we can reference to them.
  el.id = this._getViewSpecificId(n.id)

  // Allow reference from the element to the spaceNode and vice versa.
  // It becomes important to carefully undo the reference
  // to prevent memory leaks.
  el[DOM_SPACENODE_PROPERTY] = n
  this._elements[n.id] = el

  if (n === this._parent) {
    // SpaceNode is Space. Space has a special handling for its HTMLElement.
    // The element is transformed only when the view transforms.
    // This is the way how the transformation of the view affects to
    // the CSS3 transforms of HTMLElements of the children
    // of the space. The browser takes a product of the CSS3 transforms
    // of HTMLElement and its parents.

    // Add the element to the view's container.
    this._el.appendChild(el)

    // Define how view should react to changes in Space.
    // Note that Space cannot emit 'removed', 'resized', or 'transformed'
    on = {
      contentAdded: function (childNode) {
        // Child added to parent, therefore render it to view.
        // However, if the child is the view itself, do not render
        // because the view has been already rendered in the view's
        // handler for the 'added' event. See note [1] for details.
        if (childNode !== view) {
          view._renderElementFor(childNode)
        }
      }
    }
    n.on('contentAdded', on.contentAdded)
  } else {
    // Is a descendant of Space

    // Add the new element to the parent element.
    parentEl = this._elements[n.getParent().id]
    parentEl.appendChild(el)

    // Define how view should react to changes in SpaceNode
    // by setting up handlers.

    if (n === this) {
      // View itself is a descendant of Space and therefore _renderElementFor
      // is called also for the view's SpaceNode.
      //
      // If the view's SpaceNode becomes removed, the view has
      // a special handling for that, defined in unmount().
      //
      // If the view's SpaceNode becomes resized, the view has
      // a special handler for that, defined in mount() TODO.
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
      //
      on = {
        contentAdded: function (childNode) {
          // Child added
          view._renderElementFor(childNode)
        }
      }
      n.on('contentAdded', on.contentAdded)
    } else {
      on = {
        contentAdded: function (child) {
          view._renderElementFor(child)
        },
        removed: function () {
          view._removeElementOf(n)
        },
        resized: function () {
          view._resizeElementOf(n)
        },
        transformed: function () {
          view._transformElementOf(n)
        }
      }

      n.on('contentAdded', on.contentAdded)
      n.on('removed', on.removed)
      n.on('resized', on.resized)
      n.on('transformed', on.transformed)

      // Initial size and transformation
      if (n instanceof SpaceRectangle) {
        on.resized()
      }
      on.transformed()
    }
  }

  // Store for _removeElementOf
  this._handlers[n.id] = on

  // Repeat for children to render everything.
  n.getChildren().forEach(function (child) {
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
  var el, tr, prec, s, r, tx, ty

  el = this._elements[spaceNode.id]

  // Node's local transformation.
  tr = spaceNode._T

  // Current move.js does not prevent scientific notation reaching CSS
  // which leads to problems with Safari and Opera. Therefore we must
  // prevent the notation here.
  // Of course this will cause a small deviation in the presentation.
  // However the deviation is only in the presentation and thus not a problem.
  prec = 8
  s = tr.s.toFixed(prec)
  r = tr.r.toFixed(prec)
  tx = tr.tx.toFixed(prec)
  ty = tr.ty.toFixed(prec)
  move(el).matrix(s, r, -r, s, tx, ty).end()

  // TODO el.style.transform = 'matrix(' +
}

module.exports = SpaceViewHTML
