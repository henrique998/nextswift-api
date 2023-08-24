import { describe, expect, it } from 'vitest'
import { Cpf } from './Cpf'

describe('Cpf value-object', () => {
  it('should not be able to create a new Cpf with invalid format', () => {
    expect(() => new Cpf('000')).toThrowError('Cpf is invalid!')
  })

  it('should be able to create a new Cpf with valid format', () => {
    const cpf = new Cpf('931.147.680-32')

    expect(cpf.value).toEqual('931.147.680-32')
  })
})
