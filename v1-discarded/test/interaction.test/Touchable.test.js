
var tapspace = require('../../index')
var Space = tapspace.Space
var SpaceView = tapspace.SpaceView
var SpacePixel = tapspace.SpacePixel
var Touchable = tapspace.Touchable

module.exports = function (test) {
  test('constructor precondition', function (t, ctx) {
    // Touchable requires that the given item has an element.
    // Here, we forgot to add the pixel to the space.
    // Such error happens easily and thus a clear error message
    // should be thrown.
    var space = new Space()
    var view = new SpaceView(space)
    view.mount(ctx.container)

    var px = new SpacePixel('black') // not added to space

    t.throws(function () {
      var tou = new Touchable(view, px) // eslint-disable-line no-unused-vars
    }, /No HTMLElement found/, 'note for programmer')

    t.end()
  })
}
