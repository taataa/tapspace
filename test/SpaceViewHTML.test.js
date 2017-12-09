/* global Image */
var $ = require('jquery')
var taaspace = require('../index')

module.exports = function (test) {
  test('create img element immediately', function (t, ctx) {
    // Without need to wait for the image to load

    var space = new taaspace.Space()
    var view = new taaspace.SpaceViewHTML(space)
    view.mount(ctx.container)

    var img = new Image()
    img.src = 'lib/black256.png'
    var spaceimg = new taaspace.SpaceImage(space, img)
    var el = $('img.taaspace-image')

    t.equal(el.length, 1, 'img element found')

    var st2 = view.getSpaceNodeByElementId(el.attr('id'))
    t.equal(st2, spaceimg, 'img element matches space image')

    t.end()
  })

  test('should position the image correctly', function (t, ctx) {
    var space = new taaspace.Space()
    var view = new taaspace.SpaceViewHTML(space)
    var si = new taaspace.SpaceImage(space, ctx.images.black256)
    view.mount(ctx.container)

    t.deepEqual(si.at([0, 0]).to(view).xy, [0, 0])
    t.deepEqual(si.atNorm([0.5, 0.5]).to(view).xy, [128, 128])
    t.deepEqual(si.atNorm([1, 1]).xy, [256, 256])

    si.translate(si.at([0, 0]), view.at([256, 256]))
    // Allow time for translation to take place
    setTimeout(function () {
      t.deepEqual(si.atNorm([1, 1]).to(view).xy, [512, 512])
      t.end()
    }, 200)
  })

  test('should be able to translate', function (t, ctx) {
    var space = new taaspace.Space()
    var view = new taaspace.SpaceViewHTML(space)
    view.mount(ctx.container)
    var si = new taaspace.SpaceImage(space, ctx.images.black256)

    si.translate(si.atNorm([0, 0]), si.atNorm([1, 1]))

    var el1 = document.elementFromPoint(300, 300) // null if outside window
    var el2 = $('img.taaspace-image')[0]
    var el3 = view.getElementBySpaceNode(si)

    t.equal(el1, el2, 'elementFromPoint matches with jQuery')
    t.equal(el2, el3, 'jQuery matches with getElementBySpaceNode')
    t.end()
  })

  test('present reparented nodes', function (t, ctx) {
    var space = new taaspace.Space()
    var view = new taaspace.SpaceViewHTML(space)
    var si = new taaspace.SpaceImage(space, ctx.images.black256)
    view.mount(ctx.container)

    // Move a bit and reparent to view
    si.translate(si.atNW(), si.atSE())
    si.setParent(view)
    // This should keep node's local transform.
    // Because view has not moved, the taa should appear at same place.
    // Let's see if spacenode is still in place.
    var el1 = document.elementFromPoint(300, 300) // null if outside window

    t.equal(el1, view.getElementBySpaceNode(si))
    // Let's see if spacenode follows the view.
    // If it does, it should stay visually at the same place.
    view.translate(space.at([0, 0]), space.at([2000, 2000]))
    var el2 = document.elementFromPoint(300, 300) // null if outside window
    t.equal(el2, el1)
    t.end()
  })

  test('remove node', function (t, ctx) {
    // Create SpaceNode
    var space = new taaspace.Space()
    var node = new taaspace.SpaceHTML(space, 'foo')
    var view = new taaspace.SpaceViewHTML(space)

    view.mount(ctx.container)
    node.resize([100, 100])

    // Test if representation is removed.
    var el1 = document.elementFromPoint(50, 50)
    node.remove()
    var el2 = document.elementFromPoint(50, 50)
    t.notEqual(el1, el2)
    t.equal(el2.id, 'taaspace-sandbox')
    t.end()
  })

  test('reparent to another space', function (t, ctx) {
    // Create two spaces but only other is viewed.
    var space = new taaspace.Space()
    var space2 = new taaspace.Space()
    var view = new taaspace.SpaceViewHTML(space)
    view.mount(ctx.container)

    var node = new taaspace.SpaceHTML(space, 'foo')
    node.resize([100, 100])

    // Test if representation is removed when node is reparented.
    var el1 = document.elementFromPoint(50, 50)
    node.setParent(space2)
    var el2 = document.elementFromPoint(50, 50)

    t.notEqual(el1, el2)
    t.equal(el2.id, 'taaspace-sandbox')
    t.end()
  })

  test('do not become child of non-Space', function (t, ctx) {
    var space = new taaspace.Space()
    var view = new taaspace.SpaceViewHTML(space)
    var node = new taaspace.SpaceHTML(space, 'foo')
    view.mount(ctx.container)

    t.throws(function () {
      view.setParent(node)
    }, /child/, 'view not reparented to a node')
    t.end()
  })

  test('switch space of view', function (t, ctx) {
    // Setup:
    //   A space with a node B
    //   Another space with one child node C.
    //   C has a child D that is located next to C.

    var space = new taaspace.Space()
    var space2 = new taaspace.Space()
    var view = new taaspace.SpaceViewHTML(space)
    view.mount(ctx.container)

    var nodeB = new taaspace.SpaceHTML(space, 'foo')
    nodeB.resize([100, 100])

    var nodeC = new taaspace.SpaceHTML(space2, 'bar')
    nodeC.resize([100, 100])
    var nodeD = new taaspace.SpaceHTML(nodeC, 'baz')
    nodeD.resize([100, 100])
    nodeD.translate(nodeD.atNW(), nodeC.atSE())

    // Test the setup is rendered correctly
    var el = document.elementFromPoint(50, 50)
    t.equal(view.getSpaceNodeByElementId(el.id), nodeB, 'B at left-top')

    // Reparent the view
    console.log('before setParent')
    view.setParent(space2)
    console.log('after setParent')

    // Test that view content has changed.
    t.equal(
      document.elementFromPoint(50, 50),
      view.getElementBySpaceNode(nodeC),
      'C at left-top corner'
    )
    t.equal(
      document.elementFromPoint(150, 150),
      view.getElementBySpaceNode(nodeD),
      'D at the middle'
    )
    t.equal(view.getElementBySpaceNode(nodeB), null, 'no element for B')
    t.end()
  })
}
