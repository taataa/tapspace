var tapspace = require('../index')

module.exports = function (test) {
  // test('window size/resize test', function (t) {
  //   // To resize window there is two options:
  //   //   1) electron.remote
  //   //     var electron = window.require('electron')
  //   //     electron.remote.getCurrentWindow().setSize(1024, 768)
  //   //   2) window.resizeTo(width, height)
  //   // Both options require at least 20 ms to take effect. To avoid
  //   // arbitrary timeouts, listen for 'resize' event instead. Note
  //   // that 'resize' is not triggered if dimensions remain same.
  //   var W = 1024, H = 768
  //   t.equal(window.innerWidth, DEFAULT_WINDOW_WIDTH, 'correct default width')
  //   t.equal(window.outerHeight, DEFAULT_WINDOW_HEIGHT, 'correct default height')
  //   window.addEventListener('resize', function self() {
  //     t.equal(window.innerWidth, W, 'width match')
  //     t.equal(window.outerHeight, H, 'height match')  // note outer
  //     t.end()
  //     window.removeEventListener('resize', self)
  //   })
  //   window.resizeTo(W, H)
  // })
  //
  // test('meta: DOM state resets between tests', function (t) {
  //   t.equal(window.innerWidth, DEFAULT_WINDOW_WIDTH, 'default width restored')
  //   t.equal(window.outerHeight, DEFAULT_WINDOW_HEIGHT, 'default height restored')
  //   t.end()
  // })

  test('elementFromPoint gives correct results', function (t, ctx) {
    t.equal(
      document.elementFromPoint(0, 0),
      ctx.container,
      'container at 0,0'
    )
    t.equal(
      document.elementFromPoint(1, 1),
      ctx.container,
      'container at 1,1'
    )
    t.equal(
      document.elementFromPoint(100, 100),
      ctx.container,
      'container at 100,100'
    )
    t.end()
  })

  // test('load a static asset', function (t) {
  //   window.fetch('image.png').then(function (response) {
  //     t.ok(response.ok)
  //     console.log(response.status, Array.from(response.headers.entries()))
  //     console.log(response.url)
  //     console.log(response.body)
  //     t.end()
  //     //if (response.ok) {
  //     //  return t.end()
  //     //}
  //     //t.end('Fetch not successful')
  //   }).catch(function (err) {
  //     console.log(err)
  //     t.end(err)
  //   })
  // })

  test('tapspace API should be visible', function (t) {
    t.ok('version' in tapspace &&
         typeof tapspace.version === 'string', 'has .version string')
    t.ok('preload' in tapspace &&
         typeof tapspace.preload === 'function', 'has .preload function')
    t.ok('Space' in tapspace &&
         typeof tapspace.Space === 'function', 'has .Space class')
    t.end()
  })
}
