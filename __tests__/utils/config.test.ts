import { defaultConfig, readConfig } from '../../src/utils/config'
import { describe, expect, test } from '@jest/globals'

describe('Config tests', () => {
  test('minimal config', () => {
    expect(readConfig('__tests__/data/config/minimal.json')).toEqual(
      defaultConfig
    )
  })

  test('config', () => {
    const config = {
      directory: './',
      excludePaths: ['.git', '.github', '.vscode'],
      secretFile: 'secrets.yaml',
      defaultValue: 'value0123',
      rules: {
        foo: 'bar'
      }
    }
    expect(readConfig('__tests__/data/config/all.json')).toEqual(config)
  })
})
