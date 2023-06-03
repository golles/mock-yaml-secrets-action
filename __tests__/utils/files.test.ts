import {
  findSecretsInFile,
  getFileExtension,
  getFilesWithExtension,
  shouldExclude
} from '../../src/utils/files'
import {describe, expect, test} from '@jest/globals'

describe('Files tests', () => {
  test('test getFilesWithExtension with txt file', () => {
    expect(
      getFilesWithExtension('__tests__/data/files', ['.txt'], []).length
    ).toBe(1)
  })

  test('test getFilesWithExtension with yaml files', () => {
    expect(
      getFilesWithExtension('__tests__/data/files', ['.yaml'], []).length
    ).toBe(2)
  })

  test('test getFilesWithExtension with yaml/yml files', () => {
    expect(
      getFilesWithExtension('__tests__/data/files', ['.yaml', '.yml'], [])
        .length
    ).toBe(3)
  })

  test('test getFilesWithExtension with yaml/yml files, without b.yaml', () => {
    expect(
      getFilesWithExtension(
        '__tests__/data/files',
        ['.yaml', '.yml'],
        ['b.yaml']
      ).length
    ).toBe(2)
  })

  test('test shouldExclude', () => {
    expect(shouldExclude('/a/b/c/file.txt', [])).toBeFalsy()
    expect(shouldExclude('/a/b/c/file.txt', ['a/b/c/file.txt'])).toBeTruthy()
    expect(shouldExclude('/a/b/c/file.txt', ['b/c/file.txt'])).toBeTruthy()
    expect(shouldExclude('/a/b/c/file.txt', ['c/file.txt'])).toBeTruthy()
    expect(shouldExclude('/a/b/c/file.txt', ['file.txt'])).toBeTruthy()
  })

  test('test findSecretsInFile', () => {
    const secrets = [
      'encryption_key',
      'host1_ip',
      'host1_user',
      'host1_password',
      'host2_ip',
      'host2_user',
      'host2_password'
    ]
    expect(findSecretsInFile('__tests__/data/files/b.yaml')).toEqual(secrets)
  })

  test('test getFileExtension', () => {
    expect(getFileExtension('a/b/c.txt')).toBe('.txt')
    expect(getFileExtension('a/file.ts')).toBe('.ts')
    expect(getFileExtension('a/b/file.test.ts')).toBe('.ts')
  })
})
