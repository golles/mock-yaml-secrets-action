import fs from 'fs'

interface Config {
  directory: string
  excludePaths: string[]
  secretFile: string
  defaultValue: string
  rules: object
}

/**
 * Default config object.
 */
export const defaultConfig: Config = {
  directory: './',
  excludePaths: [],
  secretFile: 'secrets.yaml',
  defaultValue: 'value0123',
  rules: {}
}

/**
 * Read config from a JSON file.
 *
 * @param file the json file, holding the config.
 * @returns config object
 */
export const readConfig = (file: string): Config => {
  if (!fs.existsSync(file)) {
    throw new Error(`Config file ${file} does not exist`)
  }

  const jsonString = fs.readFileSync(file, { encoding: 'utf8', flag: 'r' })
  const jsonObject = JSON.parse(jsonString)
  return { ...defaultConfig, ...jsonObject }
}
