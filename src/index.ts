import { argv } from 'node:process'
import { resolveIDs } from './resolver.js'

const main = async () => {
  const input = argv[2]
  if (!input) {
    throw new Error('missing input')
  }

  const ids = await resolveIDs(input)
  console.log(ids.length)
}

void main().catch(console.error)
