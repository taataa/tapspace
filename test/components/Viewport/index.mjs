export default function (test) {
  test('Viewport:getAspectRatio', import.meta.dirname, 'getAspectRatio.html')
  test('Viewport:hasControl', import.meta.dirname, 'hasControl.html')
  test('Viewport:measureGroup', import.meta.dirname, 'measureGroup.html')
  test('Viewport:removeControl', import.meta.dirname, 'removeControl.html')
}
