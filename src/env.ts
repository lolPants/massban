import '@lolpants/env/register.js'
import { defineEnvironment, t } from '@lolpants/env'

export const env = defineEnvironment({
  TOKEN: t.string().required(),
  GUILD_ID: t.string().required(),
  REASON: t.string().default('Automatic Mass Ban'),
})
