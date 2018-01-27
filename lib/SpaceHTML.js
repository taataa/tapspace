//
// SpaceElement
//
// A HTMLElement [1] in the space.
//
// [1] https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
//
var Vector = require('./geom/Vector')
var AbstractRectangle = require('./AbstractRectangle')
var extend = require('extend')

var SpaceHTML = function (parent, html) {
  // Parameters:
  //   parent:
  //     a AbstractNode
  //   html:
  //     a string, containing html
  //
  AbstractRectangle.call(this)

  this.html = html
  this.setLocalSize(new Vector(256, 256))  // Initial element size.
  this.setParent(parent)
}

var p = extend({}, AbstractRectangle.prototype)
SpaceHTML.prototype = p

p.getHTML = function () {
  return this.html
}

module.exports = SpaceHTML
