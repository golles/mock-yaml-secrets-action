interface Config {
    directory: string;
    excludePaths: string[];
    secretFile: string;
    defaultValue: string;
    rules: object;
}
/**
 * Default config object.
 */
export declare const defaultConfig: Config;
/**
 * Read config from a JSON file.
 *
 * @param file the json file, holding the config.
 * @returns config object
 */
export declare const readConfig: (file: string) => Config;
export {};
