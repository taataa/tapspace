const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Box:getBoundingBox', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = view.createSpace()
    const item = tapspace.createCircle(10, 'black')
    space.addChild(item, space.at(10, 10, 30))

    // Get a box
    const box = item.getBoundingBox()
    const deg45 = Math.PI / 4
    const rotatedBox = box.rotateBy(deg45, box.atNorm(0.5, 0.5))

    // Get boundary
    const bounds = rotatedBox.getBoundingBox()

    t.almostEqual(
      bounds.getWidth().getNumber(),
      20 * Math.sqrt(2),
      'box size grown'
    )

    t.almostEqualPoint(
      bounds.atNorm(0.5, 0.5),
      box.atNorm(0.5, 0.5),
      'box still at same origin'
    )

    t.end()
  })
}
