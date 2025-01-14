export default function (test) {
  const namespace = 'Basis'
  const methods = [
    'at',
    'changeBasis',
    'createDirection',
    'createVector',
    'getMatchedOuter',
    'getTransformTo',
    'offsets',
    'rotateBy',
    'rotateByDegrees',
    'scaleBy',
    'transformBy',
    'transitRaw',
    'transitRawOuter',
    'translateBy'
  ]

  let i, m
  for (i = 0; i < methods.length; i += 1) {
    m = methods[i]
    test(namespace + ':' + m, import.meta.dirname, m + '.html')
  }
}
