// An example of a node template

{
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

// Another example with slightly different approach
{
  type: 'template-id' // or id, name. Unique.
  constructor: (fractalNode) => {
    const content = fractalNode.createElement('<div>Hello</div>')

    const nextZ = fractalNode.payload.z + 1
    const layer = view.getLayer({ z: nextZ })

    layer.append(content)

    const branch = adom.fractal.createBranch({
      type: 'template-id',
      payload: {
        z: payload.z + 1
      }
    })
    branch.move({ dx: 10, dy: 10})
    layer.append(branch)
  },
  destructor: () => {},
  backtracker: (payload) => {
    return {
      z: payload.z - 1
    }
  }
}
