const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  const Ray = tapspace.geometry.Ray

  test('Ray .create', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space)

    // Create a ray
    const p = space.at(2, 3)
    const v = space.getVector(1, 0, 0)
    const ray = Ray.create(space, p, v)

    t.almostEqualPoint(
      ray.at(0),
      p,
      'should have origin at 0'
    )

    t.almostEqualPoint(
      ray.at(1),
      space.at(3, 3),
      'should have working span'
    )

    t.end()
  })
}
