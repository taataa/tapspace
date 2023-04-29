const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Viewport:getCameraBasis', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const basis = tapspace.createSpace()
    view.addChild(basis)

    const cbasis = view.getCameraBasis()
    const cdist = view.getCameraDistance().getRaw()
    t.ok(cbasis.isBasis, 'should be virtual basis')
    t.almostEqualPoint(
      cbasis.at(0, 0, cdist),
      view.atAnchor(),
      'should be at anchor'
    )

    t.end()
  })
}
