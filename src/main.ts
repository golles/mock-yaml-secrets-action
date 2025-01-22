import * as core from '@actions/core'
import {
  appendSecret,
  getFilesWithExtension,
  findSecretsInFile
} from './utils/files.js'
import { readConfig } from './utils/config.js'
import { applyRules } from './utils/rules.js'

/**
 * Action run function.
 */
export async function run(): Promise<void> {
  try {
    core.debug(
      `Starting ${process.env.npm_package_name} version ${process.env.npm_package_version}`
    )

    const configFile: string = core.getInput('configFile')
    core.debug(`Attempting to read config file: ${configFile}`)
    const config = readConfig(configFile)

    const files = getFilesWithExtension(
      config.directory,
      ['.yaml', '.yml'],
      config.excludePaths
    )

    core.debug(`Found ${files.length} yaml files`)

    let secrets: Set<string> = new Set()
    for (const file of files) {
      secrets = new Set([...secrets, ...findSecretsInFile(file)])
    }

    core.debug(`Found ${secrets.size} secrets`)

    for (const secret of secrets) {
      const value = applyRules(secret, config.rules, config.defaultValue)
      core.debug(`Giving ${secret} value ${value}`)
      appendSecret(config.secretFile, secret, value)
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}
