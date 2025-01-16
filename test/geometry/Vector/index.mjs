export default function (test) {
  const namespace = 'Vector'
  const methods = [
    'fromPolar',
    'fromSpherical',
    'getRaw'
  ]

  let i, m
  for (i = 0; i < methods.length; i += 1) {
    m = methods[i]
    test(namespace + ':' + m, import.meta.dirname, m + '.html')
  }
}
