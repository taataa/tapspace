//
// SpaceElement
//
// A HTMLElement [1] in the space.
//
// [1] https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
//
var AbstractRectangle = require('./AbstractRectangle')
var extend = require('extend')

var SpaceHTML = function (html, parent) {
  // Parameters
  //   html
  //     a string, containing html
  //   parent
  //     a AbstractNode, optional, default to null
  //
  AbstractRectangle.call(this)

  this.html = html
  this.setSize(256, 256)  // Initial element size.

  if (typeof parent === 'object') {
    this.setParent(parent)
  }
}

var p = extend({}, AbstractRectangle.prototype)
SpaceHTML.prototype = p

p.getHTML = function () {
  return this.html
}

module.exports = SpaceHTML
