export default function (test) {
  const namespace = 'Scale'
  const methods = [
    'changeBasis'
  ]

  let i, m
  for (i = 0; i < methods.length; i += 1) {
    m = methods[i]
    test(namespace + ':' + m, import.meta.dirname, m + '.html')
  }
}
