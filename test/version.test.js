var taaspace = require('../index')
var semver = require('semver')

module.exports = function (test) {

  test('correctly formatted', function (t) {
    t.ok(semver.valid(taaspace.version), 'valid semantic version')
    t.end()
  })
}
