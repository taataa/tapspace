//
// Start a static file server and output the root URL as a QR code.
//
// Resources:
//   Print QR code in terminal
//     https://www.npmjs.com/package/qrcode-terminal
//   Get your IP address
//     https://www.npmjs.com/package/ip
//   Serve directory index
//     https://github.com/expressjs/serve-index
//   Static File Server
//     https://stackoverflow.com/a/24575241/638546

var PORT = 8000

var path = require('path')
var http = require('http')
var finalhandler = require('finalhandler')
var serveIndex = require('serve-index')
var serveStatic = require('serve-static')

var ip = require('ip')
var qrcode = require('qrcode-terminal')

var index = serveIndex(__dirname, {
  icons: true,
  filter: function (fname) {
    return fname !== 'server.js' && fname !== 'assets'
  }
})
var serveExamples = serveStatic(__dirname)
var serveBundle = serveStatic(path.resolve(__dirname, '../dist'))

var server = http.createServer(function (req, res) {
  var done = finalhandler(req, res)

  serveExamples(req, res, function (err) {
    if (err) return done(err)

    serveBundle(req, res, function (errb) {
      if (errb) return done(errb)

      index(req, res, done)
    })
  })
})

// Output a URL to the server
var url = 'http://' + ip.address() + ':' + PORT
qrcode.generate(url)
console.log(url)

server.listen(PORT)
