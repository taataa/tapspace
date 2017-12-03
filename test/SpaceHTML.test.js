var taaspace = require('../index')
var $ = require('jquery')

module.exports = function (test) {

  test('should allow creation', function (t, ctx) {

    var space = new taaspace.Space()
    var view = new taaspace.HTMLSpaceView(space, ctx.container)

    var a = new taaspace.SpaceHTML(space, '<h1>Hello</h1>')
    var el = $('.taaspace-html')
    var h1 = el.find('h1')
    var b = view.getSpaceNodeByElementId(el.attr('id'))

    t.equal(h1.length, 1, 'h1 exists')
    t.equal(b, a)
    t.end()
  })

  test('should be resizable', function (t, ctx) {
    var a, a0, a1
    var space = new taaspace.Space()
    var view = new taaspace.HTMLSpaceView(space, ctx.container)

    a = new taaspace.SpaceHTML(space, '<h1>Hello</h1>')
    a.resize([100, 100])
    a0 = document.elementFromPoint(150, 150)

    t.equal(a0, view.getRootElement())

    a.resize([200, 200])
    a1 = document.elementFromPoint(150, 150)

    t.equal(a1, view.getElementBySpaceNode(a))
    t.end()
  })
}
