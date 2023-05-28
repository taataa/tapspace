module.exports = function (components, k) {
  // @Viewport:measureNearest(components, k)
  //
  // Measure K nearest of the given components.
  //
  // Parameters:
  //   components
  //     array of Component
  //   k
  //     a number
  //
  // Return
  //   array of Component
  //     min length is components.length
  //     max length is k
  //
  const metrics = this.measureMany(components)

  const topMetrics = metrics.reduce((acc, metric) => {
    // Acc carries the best metrics this far.

    // Find if better than any.
    const betterThan = acc.findIndex((rival) => {
      return metric.visualDistance < rival.visualDistance
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
