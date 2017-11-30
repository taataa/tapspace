var TouchHandler = require('./TouchHandler')

exports.makeViewTransformable = function (view) {
  (function makeViewTransformable () {
    var container = view.getRootElement()
    var hand = new TouchHandler(container)
    var tr = null
    hand.on('start', function () {
      // Store the initial transformation from view to space.
      tr = view.getLocalTransform()
    })
    hand.on('move', function (transformOnView) {
      // A safety feature to protect from invalid TouchAPI implementations.
      if (tr === null) { return }
      // Turn to SpaceTransform on original view.
      var t = new taaspace.SpaceTransform(tr, transformOnView)
      var ft = tr.transformBy(t.inverse())
      // Apply
      view.setLocalTransform(ft)
    })
    hand.on('end', function () {
      // We do not need the initial transformation anymore.
      tr = null
    })
  }())
}

exports.makeSpaceNode = function (spacetaa) {
  var el = view.getElementBySpaceNode(spacetaa)
  var hand = new TouchHandler(el)
  var originalParent = null
  var originalLocal = null
  hand.on('start', function () {
    // Store original parent so we can return spacetaa onto it after gesture.
    originalParent = spacetaa.getParent()
    // Change parent to view => not dependent on how view is transformed.
    // Keep location the same.
    var t = spacetaa.getGlobalTransform()
    spacetaa.setParent(view)
    spacetaa.setGlobalTransform(t)
    // Store new local transformation. Gesture modifies it instead
    // of global transform so therefore view location does not affect.
    originalLocal = spacetaa.getLocalTransform()
    // Render in touch order
    el.style.zIndex = utils.getIncrementalZIndex()
  })
  hand.on('move', function (transfOnView) {
    // A safety feature to protect from invalid TouchAPI implementations.
    if (originalLocal === null) { return }
    // Turn to SpaceTransform
    var spaceGesture = new taaspace.SpaceTransform(view, transfOnView)
    // View might be transformed, therefore we graft a new
    // local transformation. We transform the result.
    var t = originalLocal.switchTo(view).transformBy(spaceGesture)
    // Apply to spacetaa
    spacetaa.setLocalTransform(t)
  })
  hand.on('end', function () {
    // Drop back to original parent.
    var t = spacetaa.getGlobalTransform()
    spacetaa.setParent(originalParent)
    spacetaa.setGlobalTransform(t)
    // We do not need the initial transformation and parent anymore.
    originalLocal = null
    originalParent = null
  })
}
