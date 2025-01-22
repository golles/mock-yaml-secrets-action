/**
 * Apply rules on a given secret.
 *
 * @param secret The secret.
 * @param rules The list of rules, the first rule that macthes will be applied.
 * @param defaultValue a default value, in case no rule is applicable.
 * @returns a value for the given secret.
 */
export declare const applyRules: (secret: string, rules: object, defaultValue: string) => string;
