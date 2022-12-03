const yamdog = require('yamdog')
const path = require('path')
const version = require('../../../package.json').version
const introText = require('./intro')
const deco = yamdog.decorators
const mdnDocs = 'https://developer.mozilla.org/en-US/docs/Web/API/'
const affineplaneDocs = 'https://axelpale.github.io/affineplane/docs/API.html'

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
    deco.linkKeywords({
      // Web APIs
      'HTMLElement': mdnDocs + 'HTMLElement',
      'Emitter': 'https://www.npmjs.com/package/component-emitter',
      // Affineplane geometries
      'dir2': affineplaneDocs + '#affineplanedir2',
      'dir3': affineplaneDocs + '#affineplanedir3',
      'dist2': affineplaneDocs + '#affineplanedist2',
      'dist3': affineplaneDocs + '#affineplanedist3',
      'helm2': affineplaneDocs + '#affineplanehelm2',
      'helm3': affineplaneDocs + '#affineplanehelm3',
      'path2': affineplaneDocs + '#affineplanepath2',
      'path3': affineplaneDocs + '#affineplanepath3',
      'plane2': affineplaneDocs + '#affineplaneplane2',
      'plane3': affineplaneDocs + '#affineplaneplane3',
      'point2': affineplaneDocs + '#affineplanepoint2',
      'point3': affineplaneDocs + '#affineplanepoint3',
      'size2': affineplaneDocs + '#affineplanesize2',
      'vec2': affineplaneDocs + '#affineplanevec2',
      'vec3': affineplaneDocs + '#affineplanevec3'
    }),
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
