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
