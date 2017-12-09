
var SpaceHTML = require('../SpaceHTML')
var SpaceImage = require('../SpaceImage')
var SpacePixel = require('../SpacePixel')

module.exports = function (spaceNode, SpaceViewHTML) {
  // Build a HTMLElement for the given space node.
  // The HTMLElement is not added to DOM.
  //
  // Parameters
  //   spaceNode
  //     a SpaceNode
  //   SpaceViewHTML
  //     to avoid circular dependency, the constructor
  //     of SpaceViewHTML must be provided here.
  //     Otherwise createElementFor requires SpaceViewHTML and vice versa.
  var el, wh

  if (spaceNode instanceof SpaceImage) {
    // SpaceImage
    el = spaceNode.image.cloneNode()  // probably efficient
    el.className = 'taaspace-image'
  } else if (spaceNode instanceof SpaceHTML) {
    // SpaceHTML
    el = document.createElement('div')  // container
    el.innerHTML = spaceNode.html
    el.className = 'taaspace-html'
  } else if (spaceNode instanceof SpacePixel) {
    // SpacePixel
    el = document.createElement('div')
    el.className = 'taaspace-pixel'
    el.style.backgroundColor = spaceNode.color  // pixel color
  } else if (spaceNode instanceof SpaceViewHTML) {
    // No representation for views.
    return null
  } else {
    throw new Error('Unknown SpaceNode subtype; cannot represent')
  }

  // Styles
  // -- Resize
  wh = spaceNode.getSize()
  el.style.width = wh[0] + 'px'
  el.style.height = wh[1] + 'px'
  // -- Positioning
  el.style.display = 'inline-block'
  el.style.position = 'absolute'
  // -- The default transform-origin is at the middle of the image.
  //    That would mess up the top-left based coordinate system.
  el.style.transformOrigin = '0 0'

  return el
}
