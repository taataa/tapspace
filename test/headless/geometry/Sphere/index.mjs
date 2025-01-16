export default function (test) {
  const namespace = 'Sphere'
  const methods = [
    'boundaries',
    'collisions',
    'construction',
    'dimensions',
    // 'equality',
    'measures',
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
