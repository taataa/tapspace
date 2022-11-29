const yamdog = require('yamdog')
const path = require('path')
const version = require('../../../package.json').version
const introText = require('./intro')
const deco = yamdog.decorators

yamdog.generate({
  // Where to start collecting comment blocks
  entry: path.resolve(__dirname, '../../../'),
  // Where to generate
  output: path.resolve(__dirname, 'index.md'),
  // Earmark; include blocks that begin with this name.
  earmark: {
    'tapspace': 'tapspace',
    // Components
    'Basis': 'tapspace.components.Basis',
    'Block': 'tapspace.components.Block',
    'Circle': 'tapspace.components.Circle',
    'Control': 'tapspace.components.Control',
    'Edge': 'tapspace.components.Edge',
    'Frame': 'tapspace.components.Frame',
    'Group': 'tapspace.components.Group',
    'Interactive': 'tapspace.components.Interactive',
    'Item': 'tapspace.components.Item',
    'Pixel': 'tapspace.components.Pixel',
    'Plane': 'tapspace.components.Plane',
    'Space': 'tapspace.components.Space',
    'Viewport': 'tapspace.components.Viewport',
    'ZoomControl': 'tapspace.components.ZoomControl',
    // Geometry
    'Direction': 'tapspace.geometry.Direction',
    'Distance': 'tapspace.geometry.Distance',
    'Path': 'tapspace.geometry.Path',
    'Point': 'tapspace.geometry.Point',
    'Scale': 'tapspace.geometry.Scale',
    'Size': 'tapspace.geometry.Size',
    'Transform': 'tapspace.geometry.Transform',
    'Vector': 'tapspace.geometry.Vector'
  },
  // Main title of the document
  title: 'Tapspace API Documentation v' + version,
  // Introduction; the initial paragraph
  intro: introText,
  // Styling; decorate the docs
  decorators: [
    deco.alphabetical({
      groupCase: true
    }),
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
    deco.toc({
      title: '**Contents:**'
    }),
    deco.sourceLinks({
      basePath: path.resolve(__dirname, '..', '..', '..'),
      baseUrl: 'https://github.com/taataa/tapspace/blob/2.0-dev/'
    }),
    deco.backTopLinks()
  ]
})
