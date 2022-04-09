const affinedom = require('../../index')
const template = require('./template.ejs')
require('./zeroedge.css')
require('../../affinedom.css')

module.exports = function (test) {
  const container = document.getElementById('container')

  test('template is working', function (t) {
    // Setup
    container.innerHTML = template()

    const elem = document.querySelector('.affine-element')
    t.notEqual(elem, null, 'element exists')

    t.end()
  })

  test('Element:at', (t) => {
    // Setup
    container.innerHTML = template()
    const aview = affinedom.viewport('.affine-viewport')
    const aelem = affinedom('.affine-element')
    aelem.translateBy({ x: 10, y: 6 })

    const xyOnElem = aelem.at(0, 0)
    const xyOnView = xyOnElem.projectTo(aview.el)

    t.equal(xyOnElem.basis, aelem.el)
    t.equal(xyOnElem.x, 0)
    t.equal(xyOnElem.y, 0)
    t.equal(xyOnView.basis, aview.el)
    t.equal(xyOnView.x, 10)
    t.equal(xyOnView.y, 6)

    t.end()
  })

  test('Element:transformBy', (t) => {
    // Setting
    container.innerHTML = template()
    const aview = affinedom.viewport('.affine-viewport')
    const aelem = affinedom('.affine-element')
    const tr = affinedom.createTransform(aview, {
      rotate: Math.PI / 6 // rotate 30 degrees clockwise
    })
    // Test and allow browser a moment to render
    setTimeout(() => {
      t.equal(document.elementFromPoint(300, 20),
        aelem.el, 'element at 300,20')
      aelem.transformBy(tr)
      t.notEqual(document.elementFromPoint(300, 20),
        aelem.el, 'element not at 300,20')

      t.end()
    }, 0)
  })
}
