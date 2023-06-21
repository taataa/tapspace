const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('FrameComponent:resizeTo', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space)

    const air = tapspace.createItem('<h1>Air</h1>')
    air.setSize(100, 100)
    air.setAnchor(50, 50)
    air.setParent(space, space.at(0, 0))

    const balloon = tapspace.createItem('<h1>Balloon</h1>')
    balloon.setSize(200, 400)
    balloon.setAnchor(100, 200)
    balloon.setParent(space, space.at(400, 400)) // zero at (300, 200)

    // Operation
    air.transformToFit(balloon)

    t.almostEqualPoint(
      air.atNorm(0, 0).changeBasis(view).getRaw(),
      balloon.at(0, 100).changeBasis(view).getRaw(),
      'should match balloon left'
    )

    t.almostEqualPoint(
      air.atNorm(1, 1).changeBasis(view).getRaw(),
      balloon.at(200, 300).changeBasis(view).getRaw(),
      'should match balloon right'
    )

    t.end()
  })
}
