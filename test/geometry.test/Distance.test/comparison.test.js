const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Distance :isAlmostEqual :isGreaterThan :isLessThan :min :max', (t) => {
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

    t.almostEqualDistance(da, da, 'test utility should work')

    t.equal(da.max(da), da, 'should equal self')
    t.equal(da.min(da), da, 'should equal self')
    t.equal(da.max(db), db, 'should be same max distance')
    t.equal(da.min(db), da, 'should be same min distance')

    t.end()
  })
}
