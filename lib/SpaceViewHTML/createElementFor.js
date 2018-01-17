
var SpaceGroup = require('../SpaceGroup')
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
    // SpaceView will have only a zero-size container for its children.
    // This way touch events are not catched by the view but by the space
    // container.
    // TODO does work with multiple views
    el = document.createElement('div')
    el.className = 'taaspace-view'
    el.style.width = '0px'
    el.style.height = '0px'
    el.style.display = 'inline-block'
    el.style.position = 'absolute'
    el.style.transformOrigin = '0 0'
    return el
  } else if (spaceNode instanceof SpaceGroup) {
    // Only a zero-size container. The default overflow: visible
    // will allow the children to be rendered outside the zero.
    el = document.createElement('div')
    el.className = 'taaspace-group'
    el.style.width = '0px'
    el.style.height = '0px'
    el.style.display = 'inline-block'
    el.style.position = 'absolute'
    el.style.transformOrigin = '0 0'
    return el
  } else {
    throw new Error('Unknown SpaceNode subtype; cannot represent')
  }

  // Common styles for SpaceRectangle instances
  // -- Resize
  wh = spaceNode.getLocalSize()
  el.style.width = wh.x + 'px'
  el.style.height = wh.y + 'px'
  // -- Positioning. Absolute position allows elements to overlap
  //    before and during transforms.
  el.style.display = 'inline-block'
  el.style.position = 'absolute'
  // -- The default transform-origin is at the middle of the image.
  //    That would mess up the top-left based coordinate system.
  el.style.transformOrigin = '0 0'

  return el
}
