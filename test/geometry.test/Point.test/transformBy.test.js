const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Point:transformBy', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space)

    // Create a Point
    const p = space.at(10, 6)

    // Create a Transformation
    const traw = { a: 2, b: 0, x: 0, y: 0, z: 0 }
    const tr = new tapspace.geometry.Transform(space, traw)

    t.deepEqual(
      p.transformBy(tr, p).getRaw(),
      p.getRaw(),
      'should not scale same origin'
    )

    t.deepEqual(
      p.transformBy(tr, space.at(10, 10)).getRaw(),
      space.at(10, 2).getRaw(),
      'should scale about the point'
    )

    // Create a transformation with translation
    const traw2 = { a: 2, b: 0, x: 10, y: 10, z: 10 }
    const tr2 = new tapspace.geometry.Transform(space, traw2)

    t.deepEqual(
      p.transformBy(tr2, p).getRaw(),
      space.at(20, 16, 10).getRaw(),
      'should translate regardless the same origin'
    )

    t.deepEqual(
      p.transformBy(tr2, space.at(10, 10)).getRaw(),
      space.at(20, 12, 10).getRaw(),
      'should scale and translate'
    )

    t.end()
  })
}
