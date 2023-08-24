import { describe, expect, it } from 'vitest'
import { Cep } from './Cep'

describe('Cep value-object', () => {
  it('should not be able to create a new cep with invalid format', () => {
    expect(() => new Cep('hh_jjj')).toThrowError('cep is invalid!')
  })

  it('should be able to create a new cep with valid format', () => {
    const cep = new Cep('57300-000')

    expect(cep.value).toEqual('57300-000')
  })
})
