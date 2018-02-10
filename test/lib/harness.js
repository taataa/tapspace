/*

Test harness for browser tape tests.
- reset browser environment
- preload images
- add test unit name to test case message

Usage:

  var test = require('./lib/harness')('myUnitName')
  test('foo is best bar', function (t) { ... normal tapejs test ... })
*/

var loadimages = require('loadimages')
var tape = require('tape')
var asyn = require('async')
var $ = require('jquery')

// Problems with tape-run static file serving
// => import images as data urls by webpack url-loader
// Note: static file serving fixed in tape-run 3.0.1
var black256png = require('./black256.png')

// Import styles. WebpackTapeRun has its internal index.html
// and also static file serving is problematic so therefore
// this is the cleanest way to import the styles.
require('./style.css')

// var DEFAULT_WINDOW_WIDTH = window.innerWidth
// var DEFAULT_WINDOW_HEIGHT = window.outerHeight

var test = function (msg, testCase) {
  // add setUp routine to test call
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
          loadimages(black256png, function (err, img) {
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
        var container = document.getElementById('tapspace-sandbox')
        if (container) {
          container.innerHTML = ''
        } else {
          $(document.body).prepend('<div id="tapspace-sandbox"></div>')
          container = document.getElementById('tapspace-sandbox')
        }
        caseContext.container = container
        done()
      }

    ], function afterSetUp (err) {
      if (err) {
        return t.end(err)
      }
      return testCase(t, caseContext)
    })
  })
}

// Curry the test function with test unit name for readability
module.exports = function (unitName) {
  return function (msg, testCase) {
    return test(unitName + ': ' + msg, testCase)
  }
}
