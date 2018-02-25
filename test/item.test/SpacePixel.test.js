var tapspace = require('../../index')
var Space = tapspace.Space
var SpacePixel = tapspace.SpacePixel

module.exports = function (test) {
  test('#copy', function (t, ctx) {
    var space = new Space()
    var px = new SpacePixel('red', space)

    var c = px.copy()

    t.equal(c.color, 'red', 'same color')
    t.ok(c.isRoot(), 'is root')

    t.end()
  })
}
