const affinedom = require('../../index')
const template = require('./template.ejs')

module.exports = function (test) {
  test('template is working', function (t) {
    // Setup
    const container = document.getElementById('container')
    container.innerHTML = template()

    const elem = document.querySelector('.affine-element')
    t.notEqual(elem, null, 'element exists')

    t.end()
  })
}
