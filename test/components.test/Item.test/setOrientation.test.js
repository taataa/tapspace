const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Item:setOrientation', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = view.createSpace()

    const foo = tapspace.createItem('<p>Foo</p>')
    foo.setSize(400, 200)
    space.addChild(foo)
    foo.rotateBy(Math.PI / 2) // 90 deg

    const bar = tapspace.createItem('<p>Bar</p>')
    bar.setSize(200, 200)
    space.addChild(bar)

    // Match orientation
    bar.setOrientation(foo.getOrientation(), bar.atBottomRight())

    t.almostEqualPoint(
      bar.at(0, 0).changeBasis(space),
      space.at(400, 0),
      'should have rotated around corner'
    )

    t.end()
  })
}
