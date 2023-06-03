import fs from 'fs'

interface Config {
  directory: string
  excludePaths: string[]
  secretFile: string
  defaultValue: string
  rules: Object
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
 * Read condig from a JSON file.
 *
 * @param file the json file, holding the config.
 * @returns config object
 */
export const readConfig = (file: string): Config => {
  const jsonString = fs.readFileSync(file, {encoding: 'utf8', flag: 'r'})
  const jsonObject = JSON.parse(jsonString)
  return {...defaultConfig, ...jsonObject}
}
