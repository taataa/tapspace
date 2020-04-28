var tapspace = require('../index')
var pjson = require('../package.json')
var semver = require('semver')

module.exports = function (test) {
  test('correctly formatted', function (t) {
    t.ok(semver.valid(tapspace.version), 'valid semantic version')
    t.end()
  })

  test('match package.json', function (t) {
    t.equal(tapspace.version, pjson.version, 'version match')
    t.end()
  })
}
