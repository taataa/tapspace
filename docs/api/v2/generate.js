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
  earmark: '@',
  // Names; include these names
  names: {
    'tapspace': 'tapspace',
    // Capturers
    'Capturer': 'tapspace.capturers.Capturer',
    'CameraCapturer': 'tapspace.capturers.CameraCapturer',
    'GestureCapturer': 'tapspace.capturers.GestureCapturer',
    'KeyboardCapturer': 'tapspace.capturers.KeyboardCapturer',
    'ResizeCapturer': 'tapspace.capturers.ResizeCapturer',
    'WheelCapturer': 'tapspace.capturers.WheelCapturer',
    // Components
    'Arc': 'tapspace.components.Arc',
    'BasisElement': 'tapspace.components.BasisElement',
    'Block': 'tapspace.components.Block',
    'CircleElement': 'tapspace.components.CircleElement',
    'Control': 'tapspace.components.Control',
    'CustomControl': 'tapspace.components.CustomControl',
    'Edge': 'tapspace.components.Edge',
    'Frame': 'tapspace.components.Frame',
    'Group': 'tapspace.components.Group',
    'Hyperspace': 'tapspace.components.Hyperspace',
    'Interactive': 'tapspace.components.Interactive',
    'Item': 'tapspace.components.Item',
    'Pixel': 'tapspace.components.Pixel',
    'Plane': 'tapspace.components.Plane',
    'Space': 'tapspace.components.Space',
    'Transformer': 'tapspace.components.Transformer',
    'Viewport': 'tapspace.components.Viewport',
    'ZoomControl': 'tapspace.components.ZoomControl',
    // Geometry
    'Area': 'tapspace.geometry.Area',
    'Basis': 'tapspace.geometry.Basis',
    'Box': 'tapspace.geometry.Box',
    'Direction': 'tapspace.geometry.Direction',
    'Distance': 'tapspace.geometry.Distance',
    'Orientation': 'tapspace.geometry.Orientation',
    'Path': 'tapspace.geometry.Path',
    'Point': 'tapspace.geometry.Point',
    'Scale': 'tapspace.geometry.Scale',
    'Size': 'tapspace.geometry.Size',
    'Transform': 'tapspace.geometry.Transform',
    'Vector': 'tapspace.geometry.Vector',
    'Volume': 'tapspace.geometry.Volume'
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
      'ResizeObserverEntry': mdnDocs + 'ResizeObserverEntry',
      // Terminology
      'Complexity': 'https://en.wikipedia.org/wiki/Computational_complexity',
      // Affineplane geometries
      'box2': affineplaneDocs + '#affineplanebox2',
      'box3': affineplaneDocs + '#affineplanebox3',
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
      'scalar1': affineplaneDocs + '#affineplanescalar1',
      'scalar2': affineplaneDocs + '#affineplanescalar2',
      'scalar3': affineplaneDocs + '#affineplanescalar3',
      'size2': affineplaneDocs + '#affineplanesize2',
      'size3': affineplaneDocs + '#affineplanesize3',
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
      {
        // Normalize example title
        pattern: /^examples?:?/i,
        replacement: '**Example:**'
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
