const tapspace = require('../../index')
const template = require('./template.ejs')

module.exports = function (test) {
  const container = document.getElementById('container')

  test('Point:getDistanceTo', (t) => {
    // Setup
    container.innerHTML = template()
    const aview = tapspace.viewport('.affine-viewport')
    const aelem = tapspace('.affine-element')
    aelem.translateBy({ x: 10, y: 6 })
    // Two points dx:40, dy:30
    const pointAOnElem = aelem.at(0, 0)
    const pointBOnView = aview.at(-30, -24)
    // Distance between them
    const dist = pointAOnElem.getDistanceTo(pointBOnView)

    t.equal(dist.basis, aelem.el)
    t.equal(dist.dist, 50)

    t.end()
  })
}
