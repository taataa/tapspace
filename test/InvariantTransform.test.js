var taaspace = require('../index')

module.exports = function (test) {
  // Test cases

  test('#inverse', function (t) {
    // Avoid floating point errors by these parameters.
    var tr = new taaspace.Transform(2, -2, 4, 4)
    var iv = new taaspace.InvariantTransform(tr)
    var iiv = iv.inverse().inverse()

    t.ok(iiv.equals(iv), 'should be same')
    t.end()
  })
}
