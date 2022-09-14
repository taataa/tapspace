const yamdog = require('yamdog')
const path = require('path')
const version = require('../../package.json').version
const deco = yamdog.decorators

yamdog.generate({
  // Where to start collecting comment blocks
  entry: path.resolve(__dirname, '../../'),
  // Where to generate
  output: path.resolve(__dirname, 'index.md'),
  // Earmark; include blocks that begin with this name.
  earmark: 'tapspace',
  // Main title of the document
  title: 'Tapspace API Documentation v' + version,
  // Introduction; the initial paragraph
  intro: 'Build your zoomable application with the following tools.',
  // Styling; decorate the docs
  decorators: [
    deco.alphabetical(),
    deco.aliases(),
    deco.italicSingles(),
    deco.linkNames(),
    deco.replace([
      {
        // Normalize parameters title
        pattern: /^param(?:eter)?s?:?/i,
        replacement: '**Parameters:**'
      },
      {
        // Normalize return title
        pattern: /^returns?:?/i,
        replacement: '**Returns:**'
      },
      {
        // Normalize throws title
        pattern: /^throws?:?/i,
        replacement: '**Throws:**'
      },
      {
        // Normalize usage title
        pattern: /^usage:?/i,
        replacement: '**Usage:**'
      },
    ]),
    deco.toc(),
    deco.sourceLinks({
      basePath: path.resolve(__dirname, '..', '..'),
      baseUrl: 'https://github.com/taataa/tapspace/blob/main/'
    }),
    deco.backTopLinks()
  ]
})
