const template = require('./template.ejs')
const hierarchy = require('./hierarchy.ejs')

module.exports = (test, container, tapspace) => {
  //
  const BasisComponent = tapspace.components.BasisComponent

  test('BasisComponent:prependChild', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const basis = tapspace.createSpace()
    view.addChild(basis)

    // Construct a hierarchy of nodes
    basis.element.innerHTML = hierarchy()
    // eslint-disable-next-line
    const na = new BasisComponent(basis.element.querySelector('#affine-a'))
    const naa = new BasisComponent(basis.element.querySelector('#affine-aa'))
    const naaa = new BasisComponent(basis.element.querySelector('#affine-aaa'))
    const naab = new BasisComponent(basis.element.querySelector('#affine-aab'))
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
