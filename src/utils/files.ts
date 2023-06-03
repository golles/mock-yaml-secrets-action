import fs from 'fs'
import path from 'path'

/**
 * Get all the files recursicly with a given extensions.
 *
 * @param directory the root directory to start the search from.
 * @param extension the extension the files should have.
 * @param excludePaths paths that should be excluded.
 * @returns list of file names that match all criteria.
 */
export const getFilesWithExtension = (
  directory: string,
  extension: string[],
  excludePaths: string[]
): string[] => {
  const files: string[] = []
  /**
   * Inner function to do the actual file scanning.
   *
   * @param dir the root directory to start the search from.
   * @param ext the extension the files should have.
   */
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

/**
 * Check if a file should be excluded based on the exclude rules.
 *
 * @param file the filename.
 * @param excludes list with exclude rules.
 * @returns true/false based if the file should be excluded or not.
 */
export const shouldExclude = (file: string, excludes: string[]): boolean => {
  for (const exclude of excludes) {
    if (file.endsWith(exclude)) {
      return true
    }
  }
  return false
}

/**
 * Find all secrets in a given file.
 *
 * @param file the file to search for secrets.
 * @returns a list of secrets.
 */
export const findSecretsInFile = (file: string): string[] => {
  const content = fs.readFileSync(file, {encoding: 'utf8', flag: 'r'})
  const secrets: string[] = []

  for (const match of content.matchAll(/!secret (\w*)/gm)) {
    secrets.push(match[1])
  }

  return secrets
}

/**
 * Append a secret and it's value to a given file.
 *
 * @param file the file for secrets.
 * @param key the key, the name of the secret.
 * @param value the value of the secret.
 */
export const appendSecret = (
  file: string,
  key: string,
  value: string
): void => {
  fs.appendFileSync(file, `${key}: '${value}'\n`, 'utf-8')
}

/**
 * Get the file extension from a given filename/path.
 *
 * @param file the file.
 * @returns the extension including a leading period.
 */
export const getFileExtension = (file: string): string => {
  return path.extname(file)
}
