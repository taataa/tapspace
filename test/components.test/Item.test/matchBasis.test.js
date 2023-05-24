const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Item:matchBasis', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space)

    const foo = tapspace.createItem('<p>Foo</p>')
    foo.setSize(400, 200)
    space.addChild(foo)

    const bar = tapspace.createItem('<p>Bar</p>')
    bar.setSize(200, 200)
    space.addChild(bar)

    t.deepEqual(
      bar.tran,
      { a: 1, b: 0, x: 0, y: 0, z: 0 },
      'correct init basis'
    )

    // Match basis
    const sourceBasis = bar.getBasis().offset(300, 0)
    const targetBasis = foo.getBasis().offset(400, 0).rotateByDegrees(90)
    bar.matchBasis(sourceBasis, targetBasis)

    t.almostEqual(bar.tran.a, 0, 'correct scale a')
    t.almostEqual(bar.tran.b, 1, 'correct scale b')
    t.almostEqual(bar.tran.x, 400, 'correct translation x')
    t.almostEqual(bar.tran.y, -300, 'correct translation y')
    t.almostEqual(bar.tran.z, 0, 'correct translation z')

    t.almostEqualBasis(
      bar.getBasis().changeBasis(space),
      space.getBasis().offset(400, -300).rotateByDegrees(90),
      'should have correct basis'
    )

    t.end()
  })
}
