
const SpaceElement = function (el) {
  if (typeof el === 'string') {
    // Treat as selector string. The querySelector returns the first match.
    // If not found, results null
    el = document.querySelector(el)
  }
  if (!el) {
    throw new Error('Element does not exist')
  }

  // TODO The parent DOM element must be a space element.
  // TODO Allow bastard space elements.
  // TODO allow viewless dom spaces. Much easier for the programmers
  // Use parentNode instead of parentElement. See:
  //   https://stackoverflow.com/a/8685780/638546

  // The element must be absolutely positioned to free
  // from the browser layout.
  // TODO detect instead of reset
  el.style.position = 'absolute'
  el.style.top = '0'
  el.style.left = '0'
  el.style.transform = 'matrix(1, 0, 0, 1, 0, 0)'

  this.el = el
  // TODO capture transformation from css
  // TODO decide if we need to duplicate the coordinates
  this.a = 0
  this.b = 0
  this.x = 0
  this.y = 0
}

SpaceElement.createView = (el) => {
  // TODO Is separate viewport creation needed?
  // TODO name viewport or createViewport?
}

const proto = SpaceElement.prototype

proto.at = (x, y) => {
  return {
    el: this.el,
    x: x,
    y: y
  }
}

proto.atNorm = (px, py) => {
  const w = this.el.offsetWidth
  const h = this.el.offsetHeight
  return {
    el: this.el, // base
    x: px * w,
    y: py * h
  }
}

proto.atTopLeft = () => {}
proto.atTopMid = () => {}
proto.atTopRight = () => {}
proto.atMidLeft = () => {}
proto.atMid = () => {}
proto.atMidRight = () => {}
proto.atBottomLeft = () => {}
proto.atBottomMid = () => {}
proto.atBottomRight = () => {}

proto.delta = (targetEl) => {
  // TODO find common root and combine transformations
  // TODO maybe apply a lowest common ancestor algorithm? See:
  // TODO https://www.baeldung.com/cs/tree-lowest-common-ancestor

  // Extra naive method: travel always to view
  // Naive method: assign depth for each, then travel towards root until same

  // See also: element.compareDocumentPosition()


  // TODO benchmark in-memory coordinates versus css parsed ones.
  // Allow all DOM nodes where position absolute, 0, 0 and
  // transform set
}

proto.move = (delta) => {
  // TODO
}

proto.on = (evName, evHandler) => {
  // TODO
}

proto.off = (evName, evHandler) => {
  // TODO
}

proto.size = () => {
  // clientWidth and clientHeight include margin but not border.
  // offsetWidth and offsetHeight include margin and border.
  // Reference:
  // https://www.javascripttutorial.net/javascript-dom/javascript-width-height/
  return {
    w: this.el.offsetWidth,
    h: this.el.offsetHeight
  }
}

proto.touchable = () => {
  // TODO return a Touch object
}

proto.wheelable = () => {
  // TODO return a Wheel object
}
