export default function (test) {
  const namespace = 'Size'
  const methods = [
    'getRaw',
    'scaleBy'
  ]

  let i, m
  for (i = 0; i < methods.length; i += 1) {
    m = methods[i]
    test(namespace + ':' + m, import.meta.dirname, m + '.html')
  }
}
