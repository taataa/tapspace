/*

Design note:
  It felt wrong to compute the transformation with each pointer move
  by having the previous, only slightly different set of pointers as domain.
  These microtransformations might cause inaccurate transformations.
  However, I did not try them.

Algorithm:
  Gesture is divided to subgestures. Arriving or leaving pointer ends
  a subgesture and starts another one.
  Element has a set of touches, so each interactive element has own
  gesture handler.
  The touches move.
  For each move, we estimate transformation for the pointers from
  the beginning of the subgesture.
  Subgesture train builds a total transformation.
  We store the initial transformation of the interactive object and
  multiply the gesture's current total transformation with it.
  As the gesture ends, we commit the total transformation to the object,
  forget the initial transformation and  we permanently transform the object.

Future notes:
  How to allow a coder to program how input changes the space?
  Taa is under manipulation: that could be an explicit state.

  MDN:
  Touch.target points to the element where the touch point started from.

*/

var TouchHandler = require('./TouchHandler')
var utils = require('./utils')

var container = document.getElementById('space')
var space = new taaspace.Space()
var view = new taaspace.SpaceView(space, container);

(function makeViewTransformable () {
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

var makeSpaceTaaTransformable = function (spacetaa) {
  var el = view.getElementBySpaceItem(spacetaa)
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

var imgs = [
  'img/chellah_star.jpg',
  'img/marrakech_knot.jpg',
  'img/marrakech_sun.jpg',
  'img/marrakech_mosaic.jpg',
  'img/rabat_sand.jpg',
  'img/oudaya_door.jpg',
  'img/chellah_nw.jpg'
]

var c = space.at([0, 0])
var n = imgs.length
var putOnCircle = function (spacetaa, i) {
  var rads = i * 2 * Math.PI / n - (Math.PI / n)
  var midn = spacetaa.atMidN()
  var mids = spacetaa.atMidS()
  var offn = c.polarOffset(1.382, rads)
  var offs = c.polarOffset(0.382, rads)
  spacetaa.translateScaleRotate([midn, mids], [offn, offs])
}

imgs.forEach(function (src, i) {
  taa = new taaspace.Taa(src)
  staa = new taaspace.SpaceTaa(space, taa)
  putOnCircle(staa, i)
  makeSpaceTaaTransformable(staa)
})

view.translateScale(
  [view.atNW(), view.atSE()],
  [space.at([-3, -3]), space.at([3, 3])]
)
