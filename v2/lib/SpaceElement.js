
const SpaceElement = function (el) {
  if (typeof el === 'string') {
    // Treat as selector string. The querySelector returns the first match.
    // If not found, results null
    el = document.querySelector(el)
  }
  if (!el) {
    throw new Error('Element does not exist')
  }

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
  const w = this.el.offsetWidth;
  const h = this.el.offsetHeight;
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
    w: this.el.offsetWidth;
    h: this.el.offsetHeight;
  }
}

proto.touchable = () => {
  // TODO return a Touch object
}

proto.wheelable = () => {
  // TODO return a Wheel object
}
