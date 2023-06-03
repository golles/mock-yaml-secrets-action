import * as core from '@actions/core'
import {
  appendSecret,
  getFilesWithExtension,
  findSecretsInFile
} from './utils/files'
import {readConfig} from './utils/config'
import {applyRules} from './utils/rules'

async function run(): Promise<void> {
  try {
    const configFile: string = core.getInput('configFile')

    const config = readConfig(configFile)

    const files = getFilesWithExtension(
      config.directory,
      ['.yaml', '.yml'],
      config.excludePaths
    )

    core.debug(`Found ${files.length} yaml files`)

    const secrets: string[] = []
    for (const file of files) {
      secrets.push(...findSecretsInFile(file))
    }

    core.debug(`Found ${secrets.length} secrets`)

    for (const secret of secrets) {
      const value = applyRules(secret, config.rules, config.defaultValue)
      core.debug(`Giving ${secret} value ${value}`)
      appendSecret(config.secretFile, secret, value)
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
