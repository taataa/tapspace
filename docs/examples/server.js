// Static web server for hosting examples locally.
//
// Start a static file server and output the root URL as a QR code.
//
// Resources:
//   Print QR code in terminal
//     https://www.npmjs.com/package/qrcode-terminal
//   Serve directory index
//     https://github.com/expressjs/serve-index
//   Static File Server
//     https://stackoverflow.com/a/24575241/638546

const PORT = 8000

const path = require('path')
const http = require('http')
const os = require('os')
const finalhandler = require('finalhandler')
const serveIndex = require('serve-index')
const serveStatic = require('serve-static')

const qrcode = require('qrcode-terminal')

const getIpAddress = () => {
  // Return current IP address as a string.
  // See: https://stackoverflow.com/a/8440736/638546
  const nets = os.networkInterfaces()
  const results = Object.keys(nets).reduce((acc, netName) => {
    nets[netName].forEach((entry) => {
      const isPreNode18 = typeof entry.family === 'string'
      const familyV4 = isPreNode18 ? 'IPv4' : 4
      const isExternal = !entry.internal

      if (entry.family === familyV4 && isExternal) {
        acc.push(entry.address)
      }
    })
    return acc
  }, [])
  // Pick first
  return results[0]
}

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
const url = 'http://' + getIpAddress() + ':' + PORT
qrcode.generate(url)
console.log(url)

server.listen(PORT)
