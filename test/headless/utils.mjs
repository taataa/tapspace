import { join } from 'path'

export const getFileUrl = (dirname, filename) => {
  return 'file:' + join(dirname, filename)
}
