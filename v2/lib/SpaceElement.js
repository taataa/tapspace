
const SpaceElement = function (el) {
  this.el = el
  // TODO capture transformation from css
  // TODO decide if we need to duplicate the coordinates
  this.a = 0
  this.b = 0
  this.x = 0
  this.y = 0
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
