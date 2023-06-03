import fs from 'fs'
import path from 'path'

export const getFilesWithExtension = (
  directory: string,
  extension: string[],
  excludePaths: string[]
): string[] => {
  const files: string[] = []
  const getFiles = (dir: string, ext: string[]): void => {
    const filesInDirectory = fs.readdirSync(dir)

    for (const file of filesInDirectory) {
      const absolute = path.join(dir, file)

      if (shouldExclude(absolute, excludePaths)) {
        continue
      }

      if (fs.statSync(absolute).isDirectory()) {
        getFiles(absolute, ext)
      } else {
        if (ext.includes(getFileExtension(absolute))) {
          files.push(absolute)
        }
      }
    }
  }

  getFiles(directory, extension)

  return files
}

export const shouldExclude = (file: string, excludes: string[]): boolean => {
  for (const exclude of excludes) {
    if (file.endsWith(exclude)) {
      return true
    }
  }
  return false
}

export const findSecretsInFile = (file: string): string[] => {
  const content = fs.readFileSync(file, {encoding: 'utf8', flag: 'r'})
  const secrets: string[] = []

  for (const match of content.matchAll(/!secret (\w*)/gm)) {
    secrets.push(match[1])
  }

  return secrets
}

export const appendSecret = (
  file: string,
  key: string,
  value: string
): void => {
  fs.appendFileSync(file, `${key}: '${value}'\n`, 'utf-8')
}

export const getFileExtension = (file: string): string => {
  return path.extname(file)
}
