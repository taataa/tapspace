var test = require('tape')
var taaspace = require('../index')
var $ = require('jquery')


test('window size/resize test', function (t) {
  // To resize window there is two options:
  //   1) electron.remote
  //     var electron = window.require('electron')
  //     electron.remote.getCurrentWindow().setSize(1024, 768)
  //   2) window.resizeTo(width, height)
  // Both options require at least 20 ms to take effect.
  var W = 1024, H = 768
  t.equal(window.innerWidth, 800, 'default width 800')
  t.equal(window.outerHeight, 600, 'default height 600')
  window.resizeTo(W, H)
  window.addEventListener('resize', function () {
    t.equal(window.innerWidth, W, 'width match')
    t.equal(window.outerHeight, H, 'height match')  // note outer
    t.end()
  }, { once: true })
  //setTimeout(function () {
  //}, 200)
})

test('taaspace API should be visible', function (t) {
  t.ok('version' in taaspace &&
       typeof taaspace.version === 'string', 'has .version string')
  t.ok('preload' in taaspace &&
       typeof taaspace.preload === 'function', 'has .preload function')
  t.ok('Space' in taaspace &&
       typeof taaspace.Space === 'function', 'has .Space class')
  t.end()
})

test('HTMLSpaceView should create img element immediately', function (t) {
  // Without need to wait for the image to load

  $(document.body).prepend('<div id="taaspace-sandbox"></div>')
  var cont = document.getElementById('taaspace-sandbox')
  var space = new taaspace.Space()
  var view = new taaspace.HTMLSpaceView(space, cont)

  var img = new Image()
  img.src = 'assets/taa.png'
  var spaceimg = new taaspace.SpaceImage(space, img)
  var el = $('img.taaspace-image')

  t.equal(el.length, 1, 'img element found')

  var st2 = view.getSpaceNodeByElementId(el.attr('id'))
  t.equal(st2, spaceimg, 'img element matches space image')

  t.end()
})
