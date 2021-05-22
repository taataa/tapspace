// Fractal generates an infinite sequence of spaces
// according to its template. Fractal creates a Space
// for each iteration of its template.
// The Space created this way is given as the root DOM element for the constructor.

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

const proto = Fractal.prototype

// TODO move fractal in space or iterate deeper in place?
// The latter would resemble a view inside a view. Good thing?
// proto.manipulate =
proto.movable =
proto.touchable = function () {
}


module.exports = Fractal
