var tapspace = require('../../index')
var $ = require('jquery')
var Space = tapspace.Space
var SpaceView = tapspace.SpaceView
var SpaceHTML = tapspace.SpaceHTML

module.exports = function (test) {
  test('should allow creation', function (t, ctx) {
    var space = new Space()
    var view = new SpaceView(space)
    view.mount(ctx.container)

    var a = new SpaceHTML('<h1>Hello</h1>', space)
    var el = $('.tapspace-html')
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

    a = new SpaceHTML('<h1>Hello</h1>', space)
    a.setSize(100, 100)
    a0 = document.elementFromPoint(150, 150)

    t.equal(a0, view.getContainer())

    a.setSize(200, 200)
    a1 = document.elementFromPoint(150, 150)

    t.equal(a1, view.getElementBySpaceItem(a))
    t.end()
  })
}
