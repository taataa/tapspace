const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Box :detectCollision', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space)

    const plain = { a: 1, b: 0, x: 0, y: 0, z: 0, w: 1, h: 1, d: 1 }
    const box = new tapspace.geometry.Box(space, plain)

    t.true(
      box.detectCollision(space.at(0.5, 0.5, 0.5)),
      'point should hit box inside'
    )
    t.true(
      box.detectCollision(space.at(1, 1, 1)),
      'point should hit box corner'
    )
    t.false(
      box.detectCollision(space.at(0, 2)),
      'point should be outside the box'
    )

    t.throws(() => {
      box.detectCollision(space.createVector(1, 0, 0))
    }, 'should detect unsupported geometry')

    const plainn = { a: 1, b: 0, x: -1, y: -1, z: 0, w: 1, h: 1, d: 1 }
    const boxAlt = new tapspace.geometry.Box(view, plainn)

    t.true(
      box.detectCollision(boxAlt),
      'boxes should touch at edge'
    )

    const boxRot = boxAlt.rotateBy(0.1, boxAlt.atNorm(0.5, 0.5))

    t.false(
      box.detectCollision(boxRot),
      'boxes should not touch'
    )

    t.end()
  })
}
