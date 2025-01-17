export default function (test) {
  const namespace = 'Item'
  const methods = [
    'at',
    'boundaries',
    'createVector',
    'getDistanceTo',
    'getVectorTo',
    'matchBasis',
    'rotateBy',
    'setBasis',
    'setOrientation',
    'setScale',
    'transformBy'
  ]

  let i, m
  for (i = 0; i < methods.length; i += 1) {
    m = methods[i]
    test(namespace + ':' + m, import.meta.dirname, m + '.html')
  }
}
