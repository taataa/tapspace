var tape = require('tape')
var taaspace = require('../index')
var asyn = require('async')
var $ = require('jquery')

// Problems with tape-run static file serving
// => import images as data urls by webpack url-loader
var black256png = require('./assets/black256.png')
var style = require('./assets/style.css')

DEFAULT_WINDOW_WIDTH = window.innerWidth
DEFAULT_WINDOW_HEIGHT = window.outerHeight

// add setUp routine to test call
var test = function (msg, testCase) {
  tape(msg, function (t) {

    // Context is passed to each test case:
    //   test(function (t, ctx) { ... })
    var caseContext = {
      container: null,
      images: {
        black256: null
      }
    }

    asyn.parallel([

      function preloadTestImage (done) {
        if (caseContext.images.black256) {
          done()
        } else {
          taaspace.preload(black256png, function (err, img) {
            if (err) {
              return done(err)
            }
            caseContext.images.black256 = img
            done()
          })
        }
      },

      // function revertToDefaultWindowSize (done) {
      //   // Note: resizeTo triggers 'resize' only if dimensions are changed
      //   var isOriginalSize = (
      //     window.innerWidth === DEFAULT_WINDOW_WIDTH &&
      //     window.outerHeight === DEFAULT_WINDOW_HEIGHT
      //   )
      //
      //   if (isOriginalSize) {
      //     done()
      //   } else {
      //     window.addEventListener('resize', function self() {
      //       window.removeEventListener('resize', self)
      //       done()
      //     })
      //     window.resizeTo(DEFAULT_WINDOW_WIDTH, DEFAULT_WINDOW_HEIGHT)
      //   }
      // },

      function resetBody (done) {
        var container = document.getElementById('taaspace-sandbox')
        if (container) {
          container.innerHTML = ''
        } else {
          $(document.body).prepend('<div id="taaspace-sandbox" "taaspace-container"></div>')
          container = document.getElementById('taaspace-sandbox')
        }
        caseContext.container = container;
        done()
      },

    ], function afterSetUp(err) {
      if (err) {
        return t.end(err)
      }
      return testCase(t, caseContext)
    })
  });
}


// test('meta: window size/resize test', function (t) {
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

test('meta: elementFromPoint gives correct results', function (t, ctx) {
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
  t.end()
})

// test('meta: load a static asset', function (t) {
//   window.fetch('taa.png').then(function (response) {
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

test('taaspace API should be visible', function (t) {
  t.ok('version' in taaspace &&
       typeof taaspace.version === 'string', 'has .version string')
  t.ok('preload' in taaspace &&
       typeof taaspace.preload === 'function', 'has .preload function')
  t.ok('Space' in taaspace &&
       typeof taaspace.Space === 'function', 'has .Space class')
  t.end()
})

test('HTMLSpaceView: create img element immediately', function (t, ctx) {
  // Without need to wait for the image to load

  var space = new taaspace.Space()
  var view = new taaspace.HTMLSpaceView(space, ctx.container)

  var img = new Image()
  img.src = black256png
  var spaceimg = new taaspace.SpaceImage(space, img)
  var el = $('img.taaspace-image')

  t.equal(el.length, 1, 'img element found')

  var st2 = view.getSpaceNodeByElementId(el.attr('id'))
  t.equal(st2, spaceimg, 'img element matches space image')

  t.end()
})


test('HTMLSpaceView: should position the image correctly', function (t, ctx) {

  var space = new taaspace.Space()
  var view = new taaspace.HTMLSpaceView(space, ctx.container)
  var si = new taaspace.SpaceImage(space, ctx.images.black256)

  t.deepEqual(si.at([0, 0]).to(view).xy, [0, 0])
  t.deepEqual(si.atNorm([0.5, 0.5]).to(view).xy, [128, 128])
  t.deepEqual(si.atNorm([1, 1]).xy, [256, 256])

  si.translate(si.at([0, 0]), view.at([256, 256]))
  // Allow time for translation to take place
  setTimeout(function () {
    t.deepEqual(si.atNorm([1, 1]).to(view).xy, [512, 512])
    t.end()
  }, 200)
})

test('HTMLSpaceView: should be able to translate', function (t, ctx) {

  var space = new taaspace.Space()
  var view = new taaspace.HTMLSpaceView(space, ctx.container)
  var si = new taaspace.SpaceImage(space, ctx.images.black256)

  si.translate(si.atNorm([0, 0]), si.atNorm([1, 1]))

  var el1 = document.elementFromPoint(300, 300) // null if outside window
  var el2 = $('img.taaspace-image')[0]
  var el3 = view.getElementBySpaceNode(si)

  t.equal(el1, el2)
  t.equal(el2, el3)
  t.end()
})
