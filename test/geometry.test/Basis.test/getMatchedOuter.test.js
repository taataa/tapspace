const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Basis:getMatchedOuter', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space)

    // A target in space
    const target = tapspace.createItem('Hello')
    space.addChild(target)
    target.translateBy({ x: 100, y: 50 }).scaleBy(0.5, space.at(50, 50))

    // An item not in space.
    const loose = tapspace.createItem('World')
    const looseBasis = loose.getBasis()
      .translateBy({ x: 100, y: 50 })
      .scaleBy(0.5, loose.at(50, 50))

    // Find basis for the loose item
    const outerBasis = looseBasis.getMatchedOuter(target.getBasis())

    t.deepEqual(
      outerBasis.changeBasis(space).getRaw(),
      space.getBasis().getRaw(),
      'should match space basis'
    )

    t.end()
  })
}
