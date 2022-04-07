const findCommon = require('../../lib/Element/lib/findCommon')
const template = require('./template.ejs')

module.exports = (test) => {
  const container = document.getElementById('container')

  test('findCommon', (t) => {
    // Setup
    container.innerHTML = template()
    const ela = document.querySelector('#affine-a')
    const elaa = document.querySelector('#affine-aa')
    const elaaa = document.querySelector('#affine-aaa')
    const elaab = document.querySelector('#affine-aab')
    const elaac = document.querySelector('#nonaffine-aac')
    // Mock to be affine
    ela.affine = {}
    elaa.affine = {}
    elaaa.affine = {}
    elaab.affine = {}
    // elaac is not affine

    // Common with self
    const cela = findCommon(ela, ela)
    t.equal(cela, ela, 'closest common with self')

    // Container is not affine
    t.equal(findCommon(container, ela), null,
      'non-affine element cannot be closest common')

    // Parent-child
    t.equal(findCommon(ela, elaa), ela,
      'parent itself is the closest common')

    // Ancestor
    t.equal(findCommon(ela, elaaa), ela,
      'ancestor is the closest common')

    // Common parent
    t.equal(findCommon(elaaa, elaab), elaa,
      'common parent is the closest common')

    // Non-affine leaf cannot have closest common
    t.equal(findCommon(elaac, elaab), null,
      'non-affine element have closest common ancestor')

    t.end()
  })
}
