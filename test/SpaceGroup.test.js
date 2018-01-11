var taaspace = require('../index')
var SpaceGroup = taaspace.SpaceGroup

module.exports = function (test) {
  test('constructor', function (t) {
    t.throws(function () {
      var v = new SpaceGroup() // eslint-disable-line
    }, /newParent/, 'A parent is required')
    t.end()
  })
}
