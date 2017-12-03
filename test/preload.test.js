var taaspace = require('../index')

module.exports = function (test) {

  test('should result in error if file not found', function (t) {
    taaspace.preload('imnotreal.png', function (err, img) {
      t.notEqual(err, null)
      t.equal(img, null)
      t.end()
    })
  })
}
