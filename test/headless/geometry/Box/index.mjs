export default function (test) {
  const namespace = 'Box'
  const methods = [
    // 'almostEqual', TODO
    'at',
    'atNorm',
    'changeBasis',
    'detectCollision',
    // 'equal', TODO
    'fromBoxes',
    'fromPoints',
    'getArea',
    'getBoundingBox',
    'getBoundingCircle',
    'getBoundingSphere',
    'getInnerSquare',
    'getVolume',
    'normAt',
    'projectTo',
    'resizeTo',
    'rotateBy',
    'scaleBy',
    'transitRaw',
    'translateBy'
  ]

  let i, m
  for (i = 0; i < methods.length; i += 1) {
    m = methods[i]
    test(namespace + ':' + m, import.meta.dirname, m + '.html')
  }
}
