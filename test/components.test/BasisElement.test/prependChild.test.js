const template = require('./template.ejs')
const hierarchy = require('./hierarchy.ejs')

module.exports = (test, container, tapspace) => {
  //
  const BasisElement = tapspace.components.BasisElement

  test('BasisElement:prependChild', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const basis = tapspace.createSpace()
    view.addChild(basis)

    // Construct a hierarchy of nodes
    basis.element.innerHTML = hierarchy()
    // eslint-disable-next-line
    const na = new BasisElement(basis.element.querySelector('#affine-a'))
    const naa = new BasisElement(basis.element.querySelector('#affine-aa'))
    const naaa = new BasisElement(basis.element.querySelector('#affine-aaa'))
    const naab = new BasisElement(basis.element.querySelector('#affine-aab'))
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