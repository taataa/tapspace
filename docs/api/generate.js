const yamdog = require('yamdog')
const path = require('path')
const version = require('../../package.json').version

yamdog.generate({
  // Where to start collecting comment blocks
  entry: path.resolve(__dirname, '../../'),
  // Where to generate
  output: path.resolve(__dirname, 'API.md'),
  // Earmark; include blocks that begin with this name.
  earmark: 'tapspace',
  // Main title of the document
  title: 'Tapspace API Documentation v' + version,
  // Introduction; the initial paragraph
  intro: 'Build your zoomable application with the following tools.',
  // Styling; decorate the docs
  decorators: [
    yamdog.decorators.linkNames()
  ]
})
