const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Distance:getRaw', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const space = tapspace.createSpace()
    view.addChild(space)
    // Create two Points
    const pa = space.at(10, 6)
    const pb = space.at(14, 9)
    // Get a Distance between them
    const d = pa.getDistanceTo(pb)

    t.equal(
      d.getRaw(),
      5,
      'should convert to dist3 number'
    )

    t.end()
  })

  test('Distance :isAlmostEqual :isGreaterThan :isLessThan', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const ba = tapspace.createSpace().setParent(view)
    const bb = tapspace.createSpace().setParent(view)
    bb.scaleBy(2)

    const da = new tapspace.geometry.Distance(ba, 10)
    const db = new tapspace.geometry.Distance(bb, 10)

    t.true(da.isLessThan(db), 'non-scaled should be less')
    t.true(db.isGreaterThan(da), 'non-scaled should be less')

    t.true(da.isAlmostEqual(da), 'is equal with self')
    t.false(da.isAlmostEqual(db), 'not almost equal')
    t.true(da.isAlmostEqual(db, 11), 'equal within tolerance')

    t.end()
  })
}
