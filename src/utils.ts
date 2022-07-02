import { type PathLike } from 'node:fs'
import { access } from 'node:fs/promises'

export const exists = async (path: PathLike) => {
  try {
    await access(path)
    return true
  } catch {
    return false
  }
}
