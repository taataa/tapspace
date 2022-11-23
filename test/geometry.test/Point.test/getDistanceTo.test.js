const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Point:getDistanceTo', (t) => {
    // Setup
    container.innerHTML = template()
    const space = tapspace.create('#testspace')
    const basis = space.addBasis()
    // Create two points
    const pa = basis.at(10, 6)
    const pb = basis.at(20, 6)

    // Distance between them
    const dist = pa.getDistanceTo(pb)
    t.equal(dist.dist, 10)

    // Vector between them
    const vec = pa.getVectorTo(pb)
    t.deepEqual(vec.vec, { x: 10, y: 0, z: 0 })

    t.end()
  })
}
