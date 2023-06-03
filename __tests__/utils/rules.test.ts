import {applyRules} from '../../src/utils/rules'
import {describe, expect, test} from '@jest/globals'

describe('Rules tests', () => {
  test('test for all IPs', () => {
    const rules = {'.*_ip': '192.168.0.100'}
    expect(applyRules('my_ip', rules, 'default')).toEqual('192.168.0.100')
  })

  test('test for all token', () => {
    const rules = {'token_.*': 'hgfdsjk'}
    expect(applyRules('token_for_something_secrets', rules, 'default')).toEqual(
      'hgfdsjk'
    )
  })

  test('test for all tokens', () => {
    const rules = {'service.*_token': 'y4783huiefqwnj'}
    expect(applyRules('service_foo_token', rules, 'default')).toEqual(
      'y4783huiefqwnj'
    )
  })

  test('test for multiple token rules', () => {
    const rules = {
      'service.*_token': '1',
      'service.*': '2'
    }
    expect(applyRules('service_other_token', rules, 'default')).toEqual('1')
  })

  test('test for exact match', () => {
    const rules = {encryption_key: '8w74nx'}
    expect(applyRules('encryption_key', rules, 'default')).toEqual('8w74nx')
  })

  test('test for default value', () => {
    expect(applyRules('some_value', [], 'default')).toEqual('default')
  })
})
