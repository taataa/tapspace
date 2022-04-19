
const fr = ad.createFractal()

// fr.addGenerator // too generic?
// fr.addTemplate // too similar to html templates?
// fr.addModule // too similar to node modules?
fr.addTemplate({
  name: 'tunnel',
  constructor: (branch, payload) => {
    // Parameters
    //   origin
    //     SpacePoint / SpacePlane / SpaceElement
    //

    const br = fr.createBranch('tunnel', {
      z: payload.z + 1
    })
    branch.appendChild(br)
  },
  invertPayload: (payload) => {

  },
  destructor: () => {
    // Optional
  }
})

// fr.goto
// fr.init
// fr.seed
// fr.reset
fr.init('tunnel', { z: 0 })
