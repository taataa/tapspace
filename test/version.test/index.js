const tapspace = require('../../index')
const pjson = require('../../package.json')
const semver = require('semver')

module.exports = (test) => {
  test('tapspace.version: correctly formatted', (t) => {
    t.ok(semver.valid(tapspace.version), 'valid semantic version')
    t.end()
  })

  test('tapspace.version: match package.json', (t) => {
    t.equal(tapspace.version, pjson.version, 'version match')
    t.end()
  })
}
