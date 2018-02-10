/* global Image */
var $ = require('jquery')
var tapspace = require('../../index')
var Space = tapspace.Space
var SpaceView = tapspace.SpaceView
var SpaceImage = tapspace.SpaceImage
var SpaceHTML = tapspace.SpaceHTML

module.exports = function (test) {
  test('create img element immediately', function (t, ctx) {
    // Without need to wait for the image to load

    var space = new Space()
    var view = new SpaceView(space)
    view.mount(ctx.container)

    var img = new Image()
    img.src = 'lib/black256.png'
    var spaceimg = new SpaceImage(img, space)
    var el = $('img.tapspace-image')

    t.equal(el.length, 1, 'img element found')

    var st2 = view.getSpaceItemByElementId(el.attr('id'))
    t.equal(st2, spaceimg, 'img element matches space image')

    t.end()
  })

  test('should position the image correctly', function (t, ctx) {
    var space = new Space()
    var view = new SpaceView(space)
    var si = new SpaceImage(ctx.images.black256, space)
    view.mount(ctx.container)

    t.ok(si.at(0, 0).equals(view.at(0, 0)), 'north-west')
    t.ok(si.atNorm(0.5, 0.5).equals(view.at(128, 128)), 'center')
    t.ok(si.atNorm(1, 1).equals(view.at(256, 256)), 'south-east')

    // Move one tile right and down
    si.translate(si.at(0, 0), view.at(256, 256))

    // Allow time for browser to render the translation
    setTimeout(function () {
      t.ok(si.atNorm(1, 1).equals(view.at(512, 512)))
      t.end()
    }, 200)
  })

  test('should be able to translate', function (t, ctx) {
    var space = new Space()
    var view = new SpaceView(space)
    view.mount(ctx.container)
    var si = new SpaceImage(ctx.images.black256, space)

    si.translate(si.atNorm(0, 0), si.atNorm(1, 1))

    var el1 = document.elementFromPoint(300, 300) // null if outside window
    var el2 = $('img.tapspace-image')[0]
    var el3 = view.getElementBySpaceItem(si)

    t.equal(el1, el2, 'elementFromPoint matches with jQuery')
    t.equal(el2, el3, 'jQuery matches with getElementBySpaceItem')
    t.end()
  })

  test('transform view', function (t, ctx) {
    // Tests that items' HTMLElements are transformed correctly
    // when only the view transforms.
    var space = new Space()
    var view = new SpaceView(space)
    view.mount(ctx.container)

    var si = new SpaceImage(ctx.images.black256, space)

    view.translate(view.atMid(), si.atMid())

    // Test that the image can be found where it should be
    var v = si.atMid().to(view)
    var el1 = document.elementFromPoint(v.x, v.y)

    t.equal(el1, view.getElementBySpaceItem(si), 'image at middle')
    t.end()
  })

  test('present reparented nodes', function (t, ctx) {
    var space = new Space()
    var view = new SpaceView(space)
    var si = new SpaceImage(ctx.images.black256, space)
    view.mount(ctx.container)

    // Move a bit and reparent to view
    si.translate(si.atNW(), si.atSE())
    si.setParent(view)
    // This should keep node's local transform.
    // Because view has not moved, the item should appear at same place.
    // Let's see if spacenode is still in place.
    var el1 = document.elementFromPoint(300, 300) // null if outside window

    t.equal(el1, view.getElementBySpaceItem(si), 'in place after setParent')
    // Let's see if spacenode follows the view.
    // If it does, it should stay visually at the same place.
    view.translate(space.at(0, 0), space.at(2000, 2000))
    var el2 = document.elementFromPoint(300, 300) // null if outside window
    t.equal(el2, el1, 'in place after view translate')

    t.end()
  })

  test('remove node', function (t, ctx) {
    // Create AbstractNode
    var space = new Space()
    var node = new SpaceHTML('foo', space)
    var view = new SpaceView(space)

    view.mount(ctx.container)
    node.setSize(100, 100)

    // Test if representation is removed.
    var el1 = document.elementFromPoint(50, 50)
    node.remove()
    var el2 = document.elementFromPoint(50, 50)

    t.notEqual(el1, el2, 'element should be removed')
    t.equal(el2.id, 'tapspace-sandbox')

    t.end()
  })

  test('reparent to another space', function (t, ctx) {
    // Create two spaces but only other is viewed.
    var space = new Space()
    var space2 = new Space()
    var view = new SpaceView(space)
    view.mount(ctx.container)

    var node = new SpaceHTML('foo', space)
    node.setSize(100, 100)

    // Test if representation is removed when node is reparented.
    var el1 = document.elementFromPoint(50, 50)
    node.setParent(space2)
    var el2 = document.elementFromPoint(50, 50)

    t.notEqual(el1, el2)
    t.equal(el2.id, 'tapspace-sandbox')
    t.end()
  })

  test('do not become child of non-Space', function (t, ctx) {
    var space = new Space()
    var view = new SpaceView(space)
    var node = new SpaceHTML('foo', space)
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

    var space = new Space()
    var space2 = new Space()
    var view = new SpaceView(space)
    view.mount(ctx.container)

    var nodeB = new SpaceHTML('foo', space)
    nodeB.setSize(100, 100)

    var nodeC = new SpaceHTML('bar', space2)
    nodeC.setSize(100, 100)
    var nodeD = new SpaceHTML('baz', nodeC)
    nodeD.setSize(100, 100)
    nodeD.translate(nodeD.atNW(), nodeC.atSE())

    // Test the setup is rendered correctly
    var el = document.elementFromPoint(50, 50)
    t.equal(view.getSpaceItemByElementId(el.id), nodeB, 'B at left-top')
    t.equal(
      document.elementFromPoint(150, 50),
      view.getContainer(),
      'container'
    )

    // Reparent the view
    view.setParent(space2)

    // Test that view content has changed.
    t.equal(
      document.elementFromPoint(50, 50),
      view.getElementBySpaceItem(nodeC),
      'C at left-top corner'
    )
    t.equal(
      document.elementFromPoint(150, 150),
      view.getElementBySpaceItem(nodeD),
      'D at the middle'
    )
    t.equal(view.getElementBySpaceItem(nodeB), null, 'no element for B')
    t.end()
  })

  test('getElementBySpaceItem', function (t, ctx) {
    var space = new Space()
    var view = new SpaceView(space)

    t.equal(view.getElementBySpaceItem(view), null, 'no element yet')
    t.equal(view.getContainer(), null, 'no container yet')

    view.mount(ctx.container)

    // A 0x0 element has been created for the space to contain children.
    // A similar 0x0 element has been created for the view.
    var se = ctx.container.childNodes[0]
    var ve = se.childNodes[0]
    t.equal(view.getElementBySpaceItem(space), se, 'space has element')
    t.equal(view.getElementBySpaceItem(view), ve, 'view has element')
    t.equal(view.getContainer(), ctx.container, 'view has container')

    t.end()
  })

  test('mount and unmount before setParent', function (t, ctx) {
    var space = new Space()
    var view = new SpaceView()

    view.mount(ctx.container)
    view.unmount()
    view.mount(ctx.container)

    space.addChild(view)

    var se = ctx.container.childNodes[0]
    var ve = se.childNodes[0]
    t.equal(view.getElementBySpaceItem(space), se, 'space has element')
    t.equal(view.getElementBySpaceItem(view), ve, 'view has element')

    t.end()
  })

  test('reorder elements', function (t, ctx) {
    var space = new Space()
    var view = new SpaceView()

    var a = new SpaceImage(ctx.images.black256, space)
    var b = new SpaceImage(ctx.images.black256, space)
    var c = new SpaceImage(ctx.images.black256, space)

    space.addChild(view)
    view.mount(ctx.container)

    t.equal(
      document.elementFromPoint(150, 150),
      view.getElementBySpaceItem(c),
      'initial order: c on top'
    )

    c.sendBelow(a)
    t.equal(
      document.elementFromPoint(150, 150),
      view.getElementBySpaceItem(b),
      'after ordering: b on top'
    )

    c.bringToFront()
    t.equal(
      document.elementFromPoint(150, 150),
      view.getElementBySpaceItem(c),
      'back to front: c on top'
    )

    t.end()
  })
}
