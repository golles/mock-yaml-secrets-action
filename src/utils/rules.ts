/**
 * Apply rules on a given secret.
 *
 * @param secret The secret.
 * @param rules The list of rules, the first rule that macthes will be applied.
 * @param defaultValue a default value, in case no rule is applicable.
 * @returns a value for the given secret.
 */
export const applyRules = (
  secret: string,
  rules: Object,
  defaultValue: string
): string => {
  for (const [rule, value] of Object.entries(rules)) {
    const regex = new RegExp(rule)
    if (regex.test(secret)) {
      return value
    }
  }

  return defaultValue
}
