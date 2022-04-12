const affinedom = require('../../index')
const template = require('./template.ejs')

module.exports = function (test) {
  const container = document.getElementById('container')

  test('Point:distanceTo', (t) => {
    // Setup
    container.innerHTML = template()
    const aview = affinedom.viewport('.affine-viewport')
    const aelem = affinedom('.affine-element')
    aelem.translateBy({ x: 10, y: 6 })
    // Two points dx:40, dy:30
    const pointAOnElem = aelem.at(0, 0)
    const pointBOnView = aview.at(-30, -24)
    // Distance between them
    const dist = pointAOnElem.distanceTo(pointBOnView)

    t.equal(dist.basis, aelem.el)
    t.equal(dist.d, 50)

    t.end()
  })
}
