module.exports = function (components, k, options) {
  // @Viewport:measureNearest(components, k[, options])
  //
  // Measure K nearest of the given components.
  //
  // Parameters:
  //   components
  //     array of Component
  //   k
  //     a number
  //   options
  //     optional object with properties:
  //       optimalAreaRatio
  //         optional number, default is 0.1. This guides the search by
  //         .. defining which content size is the most useful for the user.
  //         .. The ratio is relative to the viewport area.
  //
  // Return
  //   array of Component
  //     min length is components.length
  //     max length is k
  //
  if (!options) {
    options = {}
  }
  if (!options.optimalAreaRatio) {
    options.optimalAreaRatio = 0.1
  }

  const metrics = this.measureMany(components)

  // Upgrade visual distance
  metrics.forEach(m => {
    m.heurDist = m.getVisualDistance(options.optimalAreaRatio)
  })

  const topMetrics = metrics.reduce((acc, metric) => {
    // Acc carries the best metrics this far.

    // Find if better than any.
    const betterThan = acc.findIndex((rival) => {
      return metric.heurDist < rival.heurDist
    })

    if (betterThan < 0) {
      // Not found. Worse than what we have.
      // Is there room?
      if (acc.length < k) {
        // Add as the last.
        acc.push(metric)
      }
      return acc
    }

    // Metric better. Insert.
    acc.splice(betterThan, 0, metric)
    // Make room.
    if (acc.length > k) {
      acc.pop()
    }
    return acc
  }, [])

  return topMetrics
}
