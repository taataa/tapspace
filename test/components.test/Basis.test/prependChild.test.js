const template = require('./template.ejs')
const hierarchy = require('./hierarchy.ejs')

module.exports = (test, container, tapspace) => {
  //
  const Basis = tapspace.components.Basis

  test('case: prependChild', (t) => {
    // Setup
    container.innerHTML = template()
    const space = tapspace.createSpace('#testspace')
    const basis = space.addBasis()

    // Construct a hierarchy of nodes
    basis.element.innerHTML = hierarchy()
    // eslint-disable-next-line
    const na = new Basis(basis.element.querySelector('#affine-a'))
    const naa = new Basis(basis.element.querySelector('#affine-aa'))
    const naaa = new Basis(basis.element.querySelector('#affine-aaa'))
    const naab = new Basis(basis.element.querySelector('#affine-aab'))
    // const naac = document.querySelector('#nonaffine-aac')
    // naac is not affine

    t.equal(
      naa.getElement().firstElementChild,
      naaa.getElement(),
      'should be first'
    )

    // Move naab to first
    naa.prependChild(naab)

    t.equal(
      naa.getElement().firstElementChild,
      naab.getElement(),
      'should have moved first'
    )

    t.end()
  })
}
