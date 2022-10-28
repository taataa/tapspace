const tapspace = require('../../index')
const template = require('./template.ejs')

module.exports = function (test) {
  const container = document.getElementById('container')

  test('Point:getDistanceTo', (t) => {
    // Setup
    container.innerHTML = template()
    const aspace = tapspace.create('#testspace')
    const aview = aspace.viewport()
    const abasis = aspace.basis()
    // Create two points
    const pa = abasis.at(10, 6)
    const pb = abasis.at(20, 6)

    // Distance between them
    const dist = pa.getDistanceTo(pb)
    t.equal(dist.dist, 10)

    // Vector between them
    const vec = pa.getVectorTo(pb)
    t.deepEqual(vec.vec, { x: 10, y: 0, z: 0 })

    t.end()
  })
}
