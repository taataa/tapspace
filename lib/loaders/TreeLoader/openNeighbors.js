// const findBacktier = require('./utils/findBacktier')
const findFrontier = require('./utils/findFrontier')

module.exports = function (id, maxDepth, callback) {
  // Open parents and children until max depth.
  //
  // Parameters:
  //   id
  //     a string
  //   maxDepth
  //     a number, the maximum depth.
  //   callback
  //     a function (err), called once all opened or at error.
  //
  if (!callback) {
    callback = () => {}
  }

  // Stop recursion.
  if (maxDepth <= 0) {
    setTimeout(() => {
      callback(null)
    }, 0)
  }

  // Space may not exist, yet.
  const space = this.spaces[id]
  if (!space) {
    setTimeout(() => {
      callback(null)
    }, 0)

    return
  }

  let errored = false
  let numCallbacks = 0
  let expectedNumCallbacks = 0
  const requestCallback = (err) => {
    if (errored || numCallbacks >= expectedNumCallbacks) {
      return
    }

    if (err) {
      errored = true
      return callback(err)
    }

    numCallbacks += 1

    if (numCallbacks === expectedNumCallbacks) {
      callback(null)
    }
  }

  // Find neighbors that have unopened children or parents.
  const frontier = findFrontier(this.spaces, this.tracker, id, maxDepth - 1)
  // const backtier = findBacktier(this.spaces, this.backer, this.tracker, id, depth)

  expectedNumCallbacks += frontier.length

  frontier.forEach((finding) => {
    this.openChildren(finding.id, (err, openedIds) => {
      if (err) {
        return requestCallback(err)
      }

      if (finding.depth + 1 < maxDepth) {
        // Recursion
        expectedNumCallbacks += openedIds.length

        openedIds.forEach((openedId) => {
          const subDepth = maxDepth - finding.depth - 1
          this.openNeighbors(openedId, subDepth, requestCallback)
        })
      }

      return requestCallback(null)
    })
  })
}
