const Viewport = require('./index')

module.exports = (element, options) => {
  // Make element a viewport.
  // Parameters
  //   element
  //     HTMLElement or query string
  //   options
  //     an optional object with properties:
  //       size
  //         a { width, height }
  //       interaction
  //         pannable
  //           boolean, default true
  //         scalable
  //           boolean, default true
  //         rotatable
  //           boolean, default false
  //         wheelable
  //           boolean, default true
  //       projection
  //         optional string. Projection method.
  //         ..One of '2d', 'orthographic', '3d', 'perspective'.
  //
  return new Viewport(element, opts)
}
