export default function (test) {
  test('Component: findCommonAncestor', import.meta.dirname, 'findCommonAncestor.html')
  test('Component: geometry creation', import.meta.dirname, 'geometryCreation.html')
  test('Component: prependChild', import.meta.dirname, 'prependChild.html')
  test('Component: removeChild', import.meta.dirname, 'removeChild.html')
  test('Component: replaceChild', import.meta.dirname, 'replaceChild.html')
  test('Component: replaceParent', import.meta.dirname, 'replaceParent.html')
}
