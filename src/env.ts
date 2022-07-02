import '@lolpants/env/register.js'
import { defineEnvironment, t } from '@lolpants/env'

export const env = defineEnvironment({
  token: t.string('TOKEN').required(),
})
