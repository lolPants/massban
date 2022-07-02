import { Client, Intents } from 'discord.js'
import process, { argv } from 'node:process'
import { setTimeout } from 'node:timers/promises'
import { env } from './env.js'
import { resolveIDs } from './resolver.js'

const main = async () => {
  env.validate()

  const input = argv[2]
  if (!input) throw new Error('missing input')

  const ids = await resolveIDs(input)
  const client = new Client({
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_BANS,
      Intents.FLAGS.GUILD_MEMBERS,
    ],
  })

  client.on('ready', async () => {
    const guild = await client.guilds.fetch(env.GUILD_ID)

    /* eslint-disable no-await-in-loop */
    for (const id of ids) {
      // FIXME
      // await guild.members.ban(id, { reason: 'Automatic mass ban' })

      console.log(`Banned ${id}`)
      await setTimeout(500)
    }
    /* eslint-enable no-await-in-loop */

    process.exit(0)
  })

  await client.login(env.TOKEN)
}

void main().catch(console.error)
