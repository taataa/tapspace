// An example of a node template

exports.create = () => {
  return {
    id: 'template-id' // or name
    constructor: (root, payload) => {
      // root is a SpaceElement
      const content = adom('<div>Hello</div>')
      root.append(content)

      const branch = adom.fractal.createBranch('template-id', {
        z: payload.z + 1
      })
      branch.move({ dx: 10, dy: 10})
      root.append(branch)
    },
    destructor: () => {},
    backtracker: (payload) => {
      return {
        z: payload.z - 1
      }
    }
  }
}
