const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Item :getBoundingBox', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space)

    const item = tapspace.createItem('<h1>Hello</h1>')
    space.addChild(item)
    item.setSize(100, 100)
    item.translateBy({ x: 10, y: 6 })

    const bbox = item.getBoundingBox()

    t.equal(
      bbox.basis,
      item,
      'should have correct basis'
    )

    t.deepEqual(
      bbox.transitRaw(space),
      { a: 1, b: 0, x: 10, y: 6, z: 0, w: 100, h: 100, d: 0 },
      'should have correct props'
    )

    const orientation = space.getBasis().rotateBy(Math.PI / 4).getOrientation()
    const orientedBox = item.getBoundingBox(orientation)

    t.equal(
      orientedBox.basis,
      item,
      'should still have correct basis'
    )

    t.almostEqualBox(
      orientedBox.transitRaw(space),
      {
        a: Math.SQRT2 / 2,
        b: Math.SQRT2 / 2,
        x: 60,
        y: -44,
        z: 0,
        w: Math.SQRT2 * 100,
        h: Math.SQRT2 * 100,
        d: 0
      },
      'should have correct props'
    )

    t.end()
  })

  test('Item :getBoundingCircle', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space)

    const item = tapspace.createItem('<h1>Hello</h1>')
    space.addChild(item)
    item.setSize(100, 100)
    item.translateBy({ x: 10, y: 6 })

    const bsphere = item.getBoundingCircle()

    t.equal(
      bsphere.basis,
      item,
      'should have correct basis'
    )

    t.deepEqual(
      bsphere.transitRaw(space),
      { x: 60, y: 56, z: 0, r: Math.sqrt(50 * 50 * 2) },
      'should have correct radius'
    )

    t.end()
  })
}
