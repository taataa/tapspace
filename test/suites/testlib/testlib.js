// These tools attempt to replicate tape test API to be used
// in unit tests within a headless browser.
// The test report can be serialized so that it can be read
// in the test runner outside the headless instances.
//
// Usage:
// - Install with a script tag on a unit-test HTML page.
// - Access via window.test object.
// - Use test.plan(n) to start the test section and test.end() to stop.
// - Assert with test.equal(), .almostEqual() and test.ok()
// - Access results via test.report()
//
// Licence: MIT
// Copyright: Akseli Palén, 2025
//

if (!window) {
  throw new Error('Browser environment is required.')
}

// Tolerance for almost equality.
const TOLERANCE = 1e-10

const toPlain = (val) => {
  // Forcefully simplify value to a string, number or boolean.
  //
  if (typeof val === 'undefined') {
    return 'undefined'
  }

  if (typeof val !== 'object') {
    return val
  }

  if (Array.isArray(val)) {
    return '[Array]'
  }

  return '[Object]'
}

const toSerializable = (val) => {
  // Simplify value to a serializable. Objects and arrays are preserved
  // on top level but converted to strings below that.
  //
  if (typeof val === 'undefined') {
    return 'undefined'
  }

  if (typeof val !== 'object') {
    return val
  }

  // Convert array elements to plain values.
  if (Array.isArray(val)) {
    return val.map(elem => toPlain(elem))
  }

  // Convert first level of properties to plain values.
  const keys = Object.keys(val)
  const obj = {}
  for (let i = 0; i < keys.length; i += 1) {
    const k = keys[i]
    const v = val[k]
    obj[k] = toPlain(v)
  }
  return obj
}

// Global simpleton test class.
window.test = {
  planned: -1,
  results: [],

  plan: function (num) {
    if (typeof num !== 'number' || isNaN(num) || num < 0) {
      throw new Error('Invalid number of planned tests: ' + num)
    }
    this.planned = num
  },

  end: function () {
    // Check that correct number of tests were performed.
    // If not, add a failed test result.
    const actual = this.results.length
    const expected = this.planned

    if (expected >= 0) {
      if (actual !== expected) {
        this.results.push({
          result: false,
          operator: 'plan',
          message: `Unexpected number of tests: ${actual}, should be ${expected}`,
          actual,
          expected
        })
      }
    }
  },

  report: function () {
    // Export results in a serializable format.
    // Convert complex objects into strings if necessary.
    //
    return this.results.map(r => {
      return {
        result: r.result,
        operator: r.operator,
        message: r.message,
        actual: toSerializable(r.actual),
        expected: toSerializable(r.expected)
      }
    })
  },

  almostEqual: function (actual, expected, message) {
    let result = false

    if (actual === expected) {
      result = true
    } else {
      if (typeof actual === 'number' && typeof expected === 'number') {
        if (!isNaN(actual) && !isNaN(expected)) {
          if (Math.abs(actual - expected) < TOLERANCE) {
            result = true
          }
        }
      }
    }

    this.results.push({
      result,
      operator: 'almostEqual',
      message: message || 'values should be equal or almost equal',
      actual,
      expected
    })
  },

  equal: function (actual, expected, message) {
    const isEqual = actual === expected
    this.results.push({
      result: isEqual,
      operator: 'equal',
      message: message || 'values should be strictly equal',
      actual,
      expected
    })
  },

  ok: function (actual, message) {
    if (typeof actual !== 'boolean') {
      actual = false
    }
    this.results.push({
      result: actual,
      operator: 'ok',
      message: message || 'proposition should be true',
      actual,
      expected: true
    })
  },

  notOk: function (actual, message) {
    let result = false
    if (typeof actual === 'boolean') {
      result = !actual
    }
    this.results.push({
      result,
      operator: 'notOk',
      message: message || 'proposition should be false',
      actual,
      expected: false
    })
  }
}
