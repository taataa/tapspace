var tapspace = require('../index')
var pjson = require('../package.json')
var plock = require('../package-lock.json')
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

  test('match package-lock.json', function (t) {
    t.equal(tapspace.version, plock.version, 'lock version match')
    t.end()
  })
}
