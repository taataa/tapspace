const yadog = require('yadog')
const path = require('path')
yadog.generate({
  // Where to start collecting comment blocks
  entry: path.resolve(__dirname, '../../'),
  // Where to generate
  output: path.resolve(__dirname, 'API.md'),
  // Module name; include blocks that begin with this name.
  name: 'tapspace',
  // Main title of the document
  title: 'Tapspace API Documentation',
  // Introduction; the initial paragraph
  intro: 'Build your zoomable application with the following tools.',
})
