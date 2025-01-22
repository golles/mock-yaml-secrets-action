/**
 * Get all the files recursicly with a given extensions.
 *
 * @param directory the root directory to start the search from.
 * @param extension the extension the files should have.
 * @param excludePaths paths that should be excluded.
 * @returns list of file names that match all criteria.
 */
export declare const getFilesWithExtension: (directory: string, extension: string[], excludePaths: string[]) => string[];
/**
 * Check if a file should be excluded based on the exclude rules.
 *
 * @param file the filename.
 * @param excludes list with exclude rules.
 * @returns true/false based if the file should be excluded or not.
 */
export declare const shouldExclude: (file: string, excludes: string[]) => boolean;
/**
 * Find all secrets in a given file.
 *
 * @param file the file to search for secrets.
 * @returns a list of secrets.
 */
export declare const findSecretsInFile: (file: string) => string[];
/**
 * Append a secret and it's value to a given file.
 *
 * @param file the file for secrets.
 * @param key the key, the name of the secret.
 * @param value the value of the secret.
 */
export declare const appendSecret: (file: string, key: string, value: string) => void;
/**
 * Get the file extension from a given filename/path.
 *
 * @param file the file.
 * @returns the extension including a leading period.
 */
export declare const getFileExtension: (file: string) => string;
