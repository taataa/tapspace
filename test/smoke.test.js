var test = require('tape')
var taaspace = require('../index')
var $ = require('jquery')

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
