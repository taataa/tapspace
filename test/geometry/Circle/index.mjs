export default function (test) {
  const namespace = 'Circle'
  const methods = [
    'boundaries',
    'collisions',
    'construction',
    'dimensions',
    'equality',
    'points',
    'transformations',
    'transitions',
    'translations'
  ]

  let i, m
  for (i = 0; i < methods.length; i += 1) {
    m = methods[i]
    test(namespace + ':' + m, import.meta.dirname, m + '.html')
  }
}
