// Static web server for hosting examples locally.
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

const PORT = 8000

const path = require('path')
const http = require('http')
const finalhandler = require('finalhandler')
const serveIndex = require('serve-index')
const serveStatic = require('serve-static')

const ip = require('ip')
const qrcode = require('qrcode-terminal')

const index = serveIndex(__dirname, {
  icons: true,
  filter: function (fname) {
    return fname !== 'server.js' && fname !== 'assets'
  }
})
const serveExamples = serveStatic(__dirname)
const serveBundle = serveStatic(path.resolve(__dirname, '../../dist'))

const server = http.createServer(function (req, res) {
  const done = finalhandler(req, res)

  serveExamples(req, res, function (err) {
    if (err) return done(err)

    serveBundle(req, res, function (errb) {
      if (errb) return done(errb)

      index(req, res, done)
    })
  })
})

// Output a URL to the server
const url = 'http://' + ip.address() + ':' + PORT
qrcode.generate(url)
console.log(url)

server.listen(PORT)
