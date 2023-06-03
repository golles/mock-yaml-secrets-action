import fs from 'fs'

interface Config {
  directory: string
  excludePaths: string[]
  secretFile: string
  defaultValue: string
  rules: Object
}

export const defaultConfig: Config = {
  directory: './',
  excludePaths: [],
  secretFile: 'secrets.yaml',
  defaultValue: 'value0123',
  rules: {}
}

export const readConfig = (file: string): Config => {
  const jsonString = fs.readFileSync(file, {encoding: 'utf8', flag: 'r'})
  const jsonObject = JSON.parse(jsonString)
  return {...defaultConfig, ...jsonObject}
}
