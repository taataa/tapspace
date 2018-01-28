var taaspace = require('../../index')
var $ = require('jquery')
var Space = taaspace.Space
var SpaceView = taaspace.SpaceView
var SpaceHTML = taaspace.SpaceHTML
var Vector = taaspace.geom.Vector

module.exports = function (test) {
  test('should allow creation', function (t, ctx) {
    var space = new Space()
    var view = new SpaceView(space)
    view.mount(ctx.container)

    var a = new SpaceHTML(space, '<h1>Hello</h1>')
    var el = $('.taaspace-html')
    var h1 = el.find('h1')
    var b = view.getSpaceItemByElementId(el.attr('id'))

    t.equal(h1.length, 1, 'h1 exists')
    t.equal(b, a)
    t.end()
  })

  test('should be resizable', function (t, ctx) {
    var a, a0, a1
    var space = new Space()
    var view = new SpaceView(space)
    view.mount(ctx.container)

    a = new SpaceHTML(space, '<h1>Hello</h1>')
    a.setLocalSize(new Vector(100, 100))
    a0 = document.elementFromPoint(150, 150)

    t.equal(a0, view.getContainer())

    a.setLocalSize(new Vector(200, 200))
    a1 = document.elementFromPoint(150, 150)

    t.equal(a1, view.getElementBySpaceItem(a))
    t.end()
  })
}
