const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Item:setBasis', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space)

    const foo = tapspace.createItem('<p>Foo</p>')
    foo.setSize(400, 200)
    space.addChild(foo)
    foo.rotateBy(Math.PI / 2) // 90 deg

    const bar = tapspace.createItem('<p>Bar</p>')
    bar.setSize(200, 200)
    space.addChild(bar)

    // Match basis
    bar.setBasis(foo.getBasis())

    t.almostEqualPoint(
      foo.at(100, 100).changeBasis(space),
      space.at(-100, 100),
      'should have correct basis'
    )

    t.almostEqualPoint(
      bar.at(0, 0).transitRaw(view),
      foo.at(0, 0).transitRaw(view),
      'should match bases at origin'
    )

    t.almostEqualPoint(
      bar.at(10, 10).transitRaw(view),
      foo.at(10, 10).transitRaw(view),
      'should match bases at point'
    )

    t.end()
  })
}
