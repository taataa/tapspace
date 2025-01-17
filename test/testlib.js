// These tools attempt to replicate tape test API to be used
// in unit tests within a headless browser.
// The test report can be serialized so that it can be read
// in the test runner outside the headless instances.
//
// Usage:
// - Install with a script tag on a unit-test HTML page.
// - Access via window.test object.
// - Use test.plan(n) to start the test section and test.end() to stop.
// - Assert with test.equal(), test.almostEqual() and test.ok()
// - Access results via test.report() or test.print()
//
// Developer note:
// - Keep everything in this single file to avoid need
//   to deal with module import statements and
//   browsers' CORS requirements for modules or any
//   bundle build setup.
//
// Licence: MIT
// Copyright: Akseli Palén, 2025
//

if (!window) {
  throw new Error('Browser environment is required.')
}

// Usage instructions for manual testing via browser.
const instructions = 'Call test.print() to see TAP formatted report ' +
  'or test.report() for unformatted report.'
console.log(instructions)

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

  if (val === null) {
    return null
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

  if (val === null) {
    return null
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

const deepEqual = (x, y) => {
  if (x === y) {
    return true
  }
  // Not strictly equal.
  if (!x || !y) {
    return false
  }
  // Values not nullish.
  if (typeof x !== 'object' || typeof y !== 'object') {
    return false
  }
  // Values are objects. Arrays?
  if (Array.isArray(x) && Array.isArray(y)) {
    if (x.length !== y.length) {
      return false
    }
    // Arrays equal length.
    let every = true
    for (let i = 0; every && i < x.length; i += 1) {
      every = every && deepEqual(x[i], y[i])
    }
    // Array elements deeply equal.
    return every
  }
  // Not both arrays, maybe separately?
  if (Array.isArray(x) || Array.isArray(y)) {
    return false
  }
  // Not nullish, not arrays, are objects.
  // Note that key order must not matter.
  const xkeys = Object.keys(x)
  const ykeys = Object.keys(y)
  if (xkeys.length !== ykeys.length) {
    return false
  }
  let every = true
  for (let i = 0; every && i < xkeys.length; i += 1) {
    const key = xkeys[i]
    const xval = x[key]
    const yval = y[key]
    every = every && deepEqual(xval, yval)
  }
  // Every property deeply equal.
  return every
}

// Global simpleton test class.
window.test = {
  planned: -1,
  results: [],
  finished: false,
  planChecked: false,

  assert: function (assertion) {
    this.results.push(assertion)

    if (this.results.length >= this.planned) {
      this.finished = true
    }
  },

  plan: function (num) {
    if (typeof num !== 'number' || isNaN(num) || num < 0) {
      throw new Error('Invalid number of planned tests: ' + num)
    }
    this.planned = num
  },

  report: function () {
    // Export results in a serializable format.
    // Convert complex objects into strings if necessary.
    //

    // Check that correct number of tests were performed.
    // If not, add a failed test result.
    // Do this only once to prevent duplicate assertions upon additional calls.
    if (!this.planChecked) {
      this.planChecked = true
      const actual = this.results.length
      const expected = this.planned
      if (expected >= 0) {
        if (actual !== expected) {
          this.assert({
            result: false,
            operator: 'plan',
            message: `Unexpected number of tests: ${actual}, should be ${expected}`,
            actual,
            expected
          })
        }
      }
    }

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

  print: function () {
    // Print results in TAP format.
    // See https://testanything.org/tap-version-14-specification.html
    //
    const report = this.report()
    const version = 'TAP version 14'
    const plan = '1..' + report.length
    const lines = report.map((point, i) => {
      const num = i + 1
      if (point.result) {
        return 'ok ' + num + ' - ' + point.message
      }
      const fail = 'not ok ' + num + ' - ' + point.message
      const diagnostics = '  ---\n' +
        '    operator: ' + point.operator + '\n' +
        '    expected: ' + point.expected + '\n' +
        '    actual:   ' + point.actual + '\n' +
        '  ...'
      return fail + '\n' + diagnostics
    })
    const body = lines.join('\n')
    const numPassed = report.filter(r => r.result).length
    const numFailed = report.length - numPassed
    const stats = '\n' +
      '# tests ' + report.length + '\n' +
      '# pass  ' + numPassed + '\n' +
      '# fail  ' + numFailed + '\n'
    const tap = version + '\n' + plan + '\n' + body + '\n' + stats
    console.log(tap)
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

    this.assert({
      result,
      operator: 'almostEqual',
      message: message || 'values should be equal or almost equal',
      actual,
      expected
    })
  },

  deepEqual: function (actual, expected, message) {
    const isDeepEqual = deepEqual(actual, expected)
    this.assert({
      result: isDeepEqual,
      operator: 'deepEqual',
      message: message || 'values should be deeply equal',
      actual,
      expected
    })
  },

  equal: function (actual, expected, message) {
    const isEqual = actual === expected
    this.assert({
      result: isEqual,
      operator: 'equal',
      message: message || 'values should be strictly equal',
      actual,
      expected
    })
  },

  false: function (actual, message) {
    // Alias for notOk
    this.notOk(actual, message)
  },

  notEqual: function (actual, expected, message) {
    const isNotEqual = actual !== expected
    this.assert({
      result: isNotEqual,
      operator: 'notEqual',
      message: message || 'values should not be strictly equal',
      actual,
      expected
    })
  },

  ok: function (actual, message) {
    if (typeof actual !== 'boolean') {
      actual = false
    }
    this.assert({
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
    this.assert({
      result,
      operator: 'notOk',
      message: message || 'proposition should be false',
      actual,
      expected: false
    })
  },

  throws: function (fn, message) {
    let result = false
    // let exception = null
    try {
      fn()
    } catch (e) {
      result = true
      // exception = e
    }
    this.assert({
      result,
      operator: 'throws',
      message: message || 'function should throw an exception',
      actual: result,
      expected: true
    })
  },

  true: function (actual, message) {
    // Alias for ok.
    this.ok(actual, message)
  }
}
