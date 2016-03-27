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

var TouchHandler = require('./TouchHandler');
var utils = require('./utils');

var container = document.getElementById('space');
var space = new taaspace.Space();
var view = new taaspace.HTMLSpaceView(space, container);

(function makeSpaceTransformable() {
  var hand = new TouchHandler(container);
  var elTr;
  hand.on('start', function () {
    // Store the initial transformation from view to space.
    elTr = view.getTransform();
  });
  hand.on('move', function (transformOnView) {
    // A safety feature to protect from invalid TouchAPI implementations.
    if (elTr === null) { return; }
    // We get a new transformation on view: transformOnView
    // See note 2016-03-05-12
    //   Given transformation H_view on view and we want
    //   to apply it so that it looks that whole space is moving:
    //      V_hat = V * inv(H_view)
    //   Where V is the original view coordinate transformation.
    var tOV = transformOnView;
    var finalTr = elTr.multiplyBy(tOV.inverse());
    // Apply it.
    view.setTransform(finalTr);
  });
  hand.on('end', function () {
    // We do not need the initial transformation anymore.
    elTr = null;
  });
}());

var makeSpaceTaaTransformable = function (spacetaa) {
  var el = view.getElementBySpaceNode(spacetaa);
  var hand = new TouchHandler(el);
  var originalParent = null;
  var originalTransf = null;
  hand.on('start', function () {
    // Store original parent so we can return spacetaa onto it after gesture.
    originalParent = spacetaa.getParent();
    // Change parent to view => not dependent on how view is transformed.
    spacetaa.setParent(view);
    // Store the initial transformation from taa to space.
    originalTransf = spacetaa.getTransform();
    // Show in touch order
    el.style.zIndex = utils.getIncrementalZIndex();
  });
  hand.on('move', function (transformOnView) {
    // A safety feature to protect from invalid TouchAPI implementations.
    if (originalTransf === null) { return; }
    // Apply to spacetaa
    var newTransf = transformOnView.multiplyBy(originalTransf);
    spacetaa.setTransform(newTransf);
  });
  hand.on('end', function () {
    // Drop back to original parent.
    spacetaa.setParent(originalParent);
    // We do not need the initial transformation and parent anymore.
    originalTransf = null;
    originalParent = null;
  });
};


var imgs = [
  'img/chellah_star.jpg',
  'img/marrakech_knot.jpg',
  'img/marrakech_sun.jpg',
  'img/marrakech_mosaic.jpg',
  'img/rabat_sand.jpg',
  'img/oudaya_door.jpg',
  'img/chellah_nw.jpg'
];

var c = space.at([0,0]);
var n = imgs.length;
var putOnCircle = function (spacetaa, i) {
  var rads = i * 2 * Math.PI / n - (Math.PI / n);
  var midn = spacetaa.atMidN();
  var mids = spacetaa.atMidS();
  var offn = c.polarOffset(1.382, rads);
  var offs = c.polarOffset(0.382, rads);
  spacetaa.translateScaleRotate([midn, mids], [offn, offs]);
};

imgs.forEach(function (src, i) {
  taa = new taaspace.Taa(src);
  staa = new taaspace.SpaceTaa(space, taa);
  putOnCircle(staa, i);
  makeSpaceTaaTransformable(staa);
});

view.translateScale(
  [view.atNW(), view.atSE()],
  [space.at([-3,-3]), space.at([3,3])]
);
