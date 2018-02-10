var tapspace = require('../../index')

module.exports = function (test) {
  // Test cases

  test('#inverse', function (t) {
    // Avoid floating point errors by these parameters.
    var tr = new tapspace.geom.Transform(2, -2, 4, 4)
    var iv = new tapspace.geom.ITransform(tr)
    var iiv = iv.inverse().inverse()

    t.ok(iiv.equals(iv), 'should be same')
    t.end()
  })
}
