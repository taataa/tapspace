// Functions designed to handle events that should
// affect the view.

exports.contentAdded = function (view, spaceNode, newParent, oldParent) {
  // A node is added onto space.
  // => Render the new node and begin listening it.
  //
  // A space node is for example a SpaceImage, SpaceView...
  //
  // Parameters:
  //   spaceNode: a SpaceNode i.e. the content unit that was added.
  //   newParent: optional. The new parent of the SpaceNode
  //     Not used for anything for now but probably in the future.
  //   oldParent: optional. The old parent of the SpaceNode.
  //     Not used for anything for now but probably in the future.
  //
  if (typeof oldParent === 'undefined') { oldParent = null }
  if (typeof newParent === 'undefined') { newParent = null }

  // Ensure the spaceNode is in same space. Otherwise,
  // if view's space has been just changed, a waiting
  // contentAdded event could add spaceNode from the old space.
  if (spaceNode.getRootParent() !== view.getRootParent()) {
    return
  }

  view._addSpaceNode(spaceNode)
}

exports.contentRemoved = function (view, spaceNode, newParent, oldParent) {
  // A node is removed from the space.
  // => Remove associated HTMLElements and event bindings.
  //
  if (typeof oldParent === 'undefined') { oldParent = null }
  if (typeof newParent === 'undefined') { newParent = null }

  var sameRoot

  // Decide sameRoot
  if (oldParent === null || newParent === null) {
    sameRoot = false
  } else {
    sameRoot = oldParent.getRootParent() === newParent.getRootParent()
  }

  // No reason to remove and then add again.
  if (!sameRoot) {
    // New parent in different space, so not displayed in this view anymore.
    view._removeSpaceNode(spaceNode)
  }
}

exports.contentResized = function (view, spaceNode) {
  // A SpaceRectangle becomes resized.
  // => Update CSS width and height.
  view._resizeElementOf(spaceNode)
}

exports.contentTransformed = function (view, spaceNode) {
  // A SpaceNode becomes transformed.
  // => Update CSS transformation.
  // The possible children of the node must also be transformed
  // because the children do not emit 'transformed' by themselves.
  var nodes, i
  nodes = spaceNode.getDescendants()
  nodes.push(spaceNode)

  for (i = 0; i < nodes.length; i += 1) {
    view._transformElementOf(nodes[i])
  }
}

exports.viewAdded = function (view, newSpace, oldSpace) {
  var des, i, h

  if (oldSpace === newSpace) {
    // Already set up. Do nothing.
    return
  }

  // Render nodes from the new space.
  des = newSpace.getDescendants()
  for (i = 0; i < des.length; i += 1) {
    view._addSpaceNode(des[i])
  }

  // Start to listen for changes in space.
  // Store handlers for unbind
  h = {
    contentAdded: function (spaceNode, newParent, oldParent) {
      exports.contentAdded(view, spaceNode, newParent, oldParent)
    },
    contentRemoved: function (spaceNode, newParent, oldParent) {
      exports.contentRemoved(view, spaceNode, newParent, oldParent)
    }
  }
  newSpace.on('contentAdded', h.contentAdded)
  newSpace.on('contentRemoved', h.contentRemoved)
  view._handlers[newSpace.id] = h
}

exports.viewRemoved = function (view, newSpace, oldSpace) {
  var des, i, h

  if (newSpace === oldSpace) {
    // Already set up. Do nothing.
    return
  }

  // Stop listening for changes in space.
  h = view._handlers[oldSpace.id]
  oldSpace.off('contentAdded', h.contentAdded)
  oldSpace.off('contentRemoved', h.contentRemoved)
  delete h.contentAdded
  delete h.contentRemoved
  delete view._handlers[oldSpace.id]

  // Remove all elements of nodes of old space.
  des = oldSpace.getDescendants()
  for (i = 0; i < des.length; i += 1) {
    view._removeSpaceNode(des[i])
  }
}

exports.viewTransformed = function (view) {
  var id
  if (view.isMounted()) {
    for (id in view._nodes) {
      if (view._nodes.hasOwnProperty(id)) {
        view._transformElementOf(view._nodes[id])
      }
    }
  }
}
