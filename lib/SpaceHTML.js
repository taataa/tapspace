//
// SpaceElement
//
// A HTMLElement [1] in the space.
//
// [1] https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
//
var SpaceRectangle = require('./SpaceRectangle')
var extend = require('extend')

var SpaceHTML = function (parent, html) {
  // Parameters:
  //   parent:
  //     a SpaceNode
  //   html:
  //     a string, containing html
  //
  SpaceRectangle.call(this)

  this.html = html
  this.resize([256, 256])  // Initial element size.
  this.setParent(parent)
}

var p = extend({}, SpaceRectangle.prototype)
SpaceHTML.prototype = p

p.getHTML = function () {
  return this.html
}

module.exports = SpaceHTML
