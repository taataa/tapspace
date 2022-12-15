const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {

  test('meta: template is working', function (t) {
    // Setup
    container.innerHTML = template()

    const elem = document.querySelector('#testspace')
    t.notEqual(elem, null, 'element exists')

    t.end()
  })

  test('Item:at', (t) => {
    // Setup
    container.innerHTML = template()
    const space = tapspace.createSpace('#testspace')
    const view = space.getViewport()
    const basis = space.addBasis()

    const item = tapspace.createItem('<h1>Hello</h1>')
    basis.addChild(item)
    item.translateBy({ x: 10, y: 6 })

    const xyOnElem = item.at(0, 0)
    const xyOnView = item.at(0, 0).changeBasis(view)

    t.equal(xyOnElem.basis, item, 'item is the basis')
    t.equal(xyOnElem.point.x, 0)
    t.equal(xyOnElem.point.y, 0)
    t.equal(xyOnView.basis, view, 'view is the basis')
    t.equal(xyOnView.point.x, 10, 'view x match')
    t.equal(xyOnView.point.y, 6, 'view y match')

    t.end()
  })

  test('Item:rotateBy', (t) => {
    // Setting
    container.innerHTML = template()
    const space = tapspace.createSpace('#testspace')
    const view = space.getViewport()
    const basis = space.addBasis()

    const item = tapspace.createItem('<h1>Hello</h1>')
    item.setSize(400, 200)
    basis.addChild(item)

    item.rotateBy(Math.PI / 2, item.atTopLeft())
    // Bring back to visible area
    item.matchPoints(item.atBottomLeft(), view.at(0, 0))

    setTimeout(() => {
      t.notEqual(document.elementFromPoint(300, 100),
        item.element, 'item not at 300,100')
      t.equal(document.elementFromPoint(100, 300),
        item.element, 'item at 100,300')

      t.end()
    }, 10)
  })

  test('Item:transformBy', (t) => {
    // Setup
    container.innerHTML = template()
    const space = tapspace.createSpace('#testspace')
    const view = space.getViewport()
    const basis = space.addBasis()

    const tr = tapspace.geometry.Transform.fromFeatures({
      basis: view,
      rotate: Math.PI / 6, // rotate 30 degrees clockwise
      scale: 0.5
    })

    const item = tapspace.createItem('Hello')
    item.setSize(400, 200)
    basis.addChild(item)

    // Allow browser a moment to render
    setTimeout(() => {
      t.equal(document.elementFromPoint(100, 100),
        item.element, 'item not at 100,100')
      item.transformBy(tr, item.atTopRight())

      // Allow browser a moment to render
      setTimeout(() => {
        t.notEqual(document.elementFromPoint(100, 100),
        item.element, 'item not at 100,100')

        t.end()
      }, 0)
    }, 0)
  })
}
