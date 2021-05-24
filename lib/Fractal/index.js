// Fractal generates an infinite sequence of spaces
// according to its template. Fractal creates a Space
// for each iteration of its template.
// The Space created this way is given as the root DOM element
// for the constructor.

// TODO Is Fractal a View? Would we like to have multiple fractals on space?
// Multiple networks on frameless space to interact.
// SpaceFractal, the name should be.

const Fractal = function (params) {
  // Construct a fractal
  //
  // Parameters:
  //   params, an object with props
  //     template
  //       The fractal generator template.
  //       It is an object with props:
  //         constructor
  //         destructor
  //     visibleDepth
  //       integer
  //   
}
// TODO const SpaceFractal = Fractal
const proto = Fractal.prototype

proto.addTemplate = function (template) {
  // Registers a template
}

proto.removeTemplate = function (templateName) {

}

// TODO move fractal in space or iterate deeper in place?
// The latter would resemble a view inside a view. Good thing?
// proto.manipulate =
proto.movable =
proto.touchable = function () {
}


exports.create = () => {
  return new Fractal()
}
