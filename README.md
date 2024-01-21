# Mock YAML Secrets Action

[![GitHub Release][releases-shield]][releases]
[![GitHub Repo stars][stars-shield]][stars]
[![License][license-shield]](LICENSE)
[![GitHub Activity][commits-shield]][commits]
[![Code coverage][codecov-shield]][codecov]
[![Project Maintenance][maintenance-shield]][maintainer]
[![BuyMeCoffee][buymecoffeebadge]][buymecoffee]

This action will scan all your `YAML` files for secrets and makes a
`secrets.yaml` that can be used by other actions.

We don't want our `secrets.yaml` file to be checked in and this can cause some
challenges when want to verify or built a project. Having a separate
`secrets.yaml` for CI/CD is a nice solution, but requires manual updates and
usually you find out after a failed workflow that you forgot to update.

With this action you can generate a `secrets.yaml` file with some rules that are
applicable to your project. And your CI/CD will be happy again.

This action is designed to work well with:

- [esphome/build-action](https://github.com/esphome/build-action)
- [frenck/action-home-assistant](https://github.com/frenck/action-home-assistant)

## Usage

You can use this action in your workflow as desired, see the following example.

```yaml
name: CI

on:
  push:
    branches:
      - main
  pull_request:

jobs:
  build:
    name: Build
    runs-on: ubuntu-latest
    steps:
      - name: Checkout source code
        uses: actions/checkout@v3

      - name: Mock secrets
        uses: golles/mock-yaml-secrets-action@v1
        with:
          configFile: '.github/workflows/mock-secrets-config.json'

      - name: Build software
        run: echo done # Your build that requires a secret file.
```

## Configuration

Configuration is provided in a `JSON` file, the file is required but can contain
an empty object `{}` for defaults. In the example above the file is located at
`.github/workflows/mock-secrets-config.json`.

| Configuration | Default value    | Explaination                                             |
| ------------- | ---------------- | -------------------------------------------------------- |
| directory     | `'./'`           | The directory to scan recursively for `YAML` files       |
| excludePaths  | `[]`             | Paths you want to exclude, eg. `[".github", ".vscode"]`  |
| secretFile    | `'secrets.yaml'` | Output secret file name                                  |
| defaultValue  | `'value0123'`    | The default value for secrets that don't match any rules |
| rules         | `{}`             | See below                                                |

### Rules

Rules are applied in the order they are provided, after a successful match no
other rules are attempted. A regular expression should be used as the key, the
value will be used as a secret.

```json
{
  "directory": "./",
  "excludePaths": [".github", ".vscode"],
  "secretFile": "secrets.yaml",
  "defaultValue": "secret",
  "rules": {
    ".*_ip": "10.0.0.12",
    ".*_mac": "00:00:00:00:00:00",
    ".*_url": "https://foo.bar",
    "network_subnet": "10.0.0.0/8",
    "encryption_key": "12345678901234567890123456789012"
  }
}
```

Technical note: the regular expression is tested with `new RegExp(rule).test()`
[More info on mozilla.org](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test)

[buymecoffee]: https://www.buymeacoffee.com/golles
[buymecoffeebadge]:
  https://img.shields.io/badge/buy%20me%20a%20coffee-donate-yellow.svg?style=for-the-badge
[commits-shield]:
  https://img.shields.io/github/commit-activity/y/golles/mock-yaml-secrets-action.svg?style=for-the-badge
[codecov]: https://app.codecov.io/gh/golles/mock-yaml-secrets-action
[codecov-shield]:
  https://img.shields.io/codecov/c/github/golles/mock-yaml-secrets-action?style=for-the-badge
[commits]: https://github.com/golles/mock-yaml-secrets-action/commits/main
[hacs]: https://github.com/hacs/integration
[license-shield]:
  https://img.shields.io/github/license/golles/mock-yaml-secrets-action.svg?style=for-the-badge
[maintainer]: https://github.com/golles
[maintenance-shield]:
  https://img.shields.io/badge/maintainer-golles-blue.svg?style=for-the-badge
[releases-shield]:
  https://img.shields.io/github/release/golles/mock-yaml-secrets-action.svg?style=for-the-badge
[releases]: https://github.com/golles/mock-yaml-secrets-action/releases
[stars-shield]:
  https://img.shields.io/github/stars/golles/mock-yaml-secrets-action?style=for-the-badge
[stars]: https://github.com/golles/mock-yaml-secrets-action/stargazers
