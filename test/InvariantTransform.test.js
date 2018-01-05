var taaspace = require('../index')

module.exports = function (test) {
  // Test cases

  test('#inverse', function (t) {
    var tr = new taaspace.Transform(2, -1, 16, 0)
    var iv = new taaspace.InvariantTransform()
    var iiv = iv.inverse().inverse()

    t.ok(iiv.equals(iv), 'should be same')
    t.end()
  })
}
