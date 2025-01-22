/**
 * Unit tests for the action's main functionality, src/main.ts
 *
 * To mock dependencies in ESM, you can create fixtures that export mock
 * functions and objects. For example, the core module is mocked in this test,
 * so that the actual '@actions/core' module is not imported.
 */
import { jest } from '@jest/globals'
import * as core from '../__fixtures__/core.js'
import * as fs from 'fs'

// Mocks should be declared before the module being tested is imported.
jest.unstable_mockModule('@actions/core', () => core)

// The module being tested should be imported dynamically. This ensures that the
// mocks are used in place of any actual dependencies.
const { run } = await import('../src/main.js')

describe('main.ts', () => {
  beforeEach(() => {
    // Remove any previously generated secrets.yaml file.
    if (fs.existsSync('secrets.yaml')) {
      fs.unlinkSync('secrets.yaml')
    }

    // Set the action's inputs as return values from core.getInput().
    core.getInput.mockImplementation(() => '__tests__/data/config/all.json')
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('sets the configFile output', async () => {
    await run()

    // Verify that all of the core library functions were called correctly
    expect(core.debug).toHaveBeenNthCalledWith(
      1,
      expect.stringMatching(/Starting mock-yaml-secrets-action version *./)
    )
    expect(core.debug).toHaveBeenNthCalledWith(
      2,
      'Attempting to read config file: __tests__/data/config/all.json'
    )
    expect(core.debug).toHaveBeenNthCalledWith(3, 'Found 56 yaml files')
    expect(core.debug).toHaveBeenNthCalledWith(4, 'Found 7 secrets')
    expect(core.debug).toHaveBeenNthCalledWith(
      5,
      'Giving encryption_key value value0123'
    )
    expect(core.debug).toHaveBeenNthCalledWith(
      6,
      'Giving host1_ip value value0123'
    )
    expect(core.debug).toHaveBeenNthCalledWith(
      7,
      'Giving host1_user value value0123'
    )
    expect(core.debug).toHaveBeenNthCalledWith(
      8,
      'Giving host1_password value value0123'
    )
    expect(core.debug).toHaveBeenNthCalledWith(
      9,
      'Giving host2_ip value value0123'
    )
    expect(core.debug).toHaveBeenNthCalledWith(
      10,
      'Giving host2_user value value0123'
    )
    expect(core.debug).toHaveBeenNthCalledWith(
      11,
      'Giving host2_password value value0123'
    )

    expect(core.error).not.toHaveBeenCalled()
  })
})
