import axios from 'axios'
import { Buffer } from 'node:buffer'
import { readFile } from 'node:fs/promises'
import { stdin } from 'node:process'
import { exists } from './utils.js'

type IDList = readonly string[]
type ResolveFn = (input: string) => IDList | Promise<IDList>

export const resolveIDs: ResolveFn = async input => {
  const ids = await resolveTypes(input)
  const mapped = ids.map(line => line.trim()).filter(line => line !== '')

  return mapped
}

const resolveTypes: ResolveFn = async input => {
  if (input === '-') return resolveStdin(input)

  const isHttp = input.startsWith('http://') || input.startsWith('https://')
  if (isHttp) return resolveRemote(input)

  const pathExists = await exists(input)
  if (pathExists) return resolveLocal(input)

  throw new Error('failed to resolve ID list')
}

const resolveStdin: ResolveFn = async () => {
  const chunks = []
  for await (const chunk of stdin) chunks.push(chunk)

  const body = Buffer.concat(chunks).toString('utf8')
  const ids = body.split('\n')

  return ids
}

const resolveLocal: ResolveFn = async input => {
  const body = await readFile(input, 'utf8')
  const ids = body.split('\n')

  return ids
}

const resolveRemote: ResolveFn = async input => {
  const resp = await axios.get<Buffer>(input, { responseType: 'arraybuffer' })

  const contentType = resp.headers['content-type']
  const isPlaintext = contentType.startsWith('text/plain')
  if (!isPlaintext) throw new Error('remote ID list is not plain text')

  const body = resp.data.toString('utf8')
  const ids = body.split('\n')

  return ids
}
