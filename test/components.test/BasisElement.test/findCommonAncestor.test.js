const template = require('./template.ejs')
const hierarchy = require('./hierarchy.ejs')

module.exports = (test, container, tapspace) => {
  //
  const BasisElement = tapspace.components.BasisElement

  test('BasisElement.findCommonAncestor', (t) => {
    // Setup
    container.innerHTML = template()
    const view = tapspace.createView('#testspace')
    const basis = tapspace.createSpace()
    view.addChild(basis)

    // Construct a hierarchy of nodes
    basis.element.innerHTML = hierarchy()
    const na = new BasisElement(basis.element.querySelector('#affine-a'))
    const naa = new BasisElement(basis.element.querySelector('#affine-aa'))
    const naaa = new BasisElement(basis.element.querySelector('#affine-aaa'))
    const naab = new BasisElement(basis.element.querySelector('#affine-aab'))
    const naac = document.querySelector('#nonaffine-aac')
    // naac is not affine

    // Common with self
    t.equal(
      na.findCommonAncestor(na),
      na,
      'closest common with self'
    )

    // Common ancestor of non-affine
    t.equal(
      na.findCommonAncestor(naac),
      null,
      'non-affine cannot have common'
    )

    // Parent-child
    t.equal(
      na.findCommonAncestor(naa),
      na,
      'parent itself is the closest common'
    )

    // Ancestor
    t.equal(
      na.findCommonAncestor(naaa),
      na,
      'ancestor is the closest common'
    )

    // Common parent
    t.equal(
      naaa.findCommonAncestor(naab),
      naa,
      'common parent is the closest common'
    )

    t.end()
  })
}
