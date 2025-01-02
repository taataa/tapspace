import { run as runComponents } from './components/index.mjs'

export const run = (test, browser) => {
  runComponents(test, browser)
}
