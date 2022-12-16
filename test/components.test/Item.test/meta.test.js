const template = require('./template.ejs')

module.exports = function (test, container, tapspace) {
  //
  test('Item meta: template is working', function (t) {
    // Setup
    container.innerHTML = template()

    const elem = document.querySelector('#testspace')
    t.notEqual(elem, null, 'element exists')

    t.end()
  })
}
