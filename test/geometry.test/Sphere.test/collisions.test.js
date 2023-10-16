const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Sphere :detectCollision', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space)

    const plain = { x: 1, y: 1, z: 1, r: 1 }
    const sphere = new tapspace.geometry.Sphere(space, plain)

    t.true(
      sphere.detectCollision(space.at(1, 1, 1)),
      'point should hit sphere inside'
    )
    t.true(
      sphere.detectCollision(space.at(1, 0, 1)),
      'point should hit sphere surface'
    )
    t.false(
      sphere.detectCollision(space.at(0, 0, 0)),
      'point should be outside the sphere'
    )

    t.throws(() => {
      sphere.detectCollision(space.createVector(1, 0, 0))
    }, 'should detect unsupported geometry')

    const plainn = { x: 3, y: 1, z: 1, r: 1 }
    const spheree = new tapspace.geometry.Sphere(view, plainn)

    t.true(
      sphere.detectCollision(spheree),
      'spheres should touch'
    )

    const plainnn = { x: 4, y: 1, z: 1, r: 1 }
    const sphereee = new tapspace.geometry.Sphere(view, plainnn)
    t.false(
      sphere.detectCollision(sphereee),
      'spheres should not touch'
    )

    t.end()
  })
}
