import { describe, expect, it } from 'vitest'
import { Customer } from '.'
import { Address } from './Address'
import { Cep } from './Cep'
import { Cpf } from './Cpf'

describe('Customer entity', () => {
  it('should be able to create a new customer', () => {
    const customer = new Customer({
      name: 'jhon doe',
      email: 'jhondoe@gmail.com',
      ddd: 82,
      phone: 999999999,
      cpf: new Cpf('931.147.680-32'),
      cnpj: null,
      address: new Address({
        cep: new Cep('57300-000'),
        street: 'brasil',
        number: 31,
        uf: 'al',
      }),
    })

    expect(customer.id).toBeDefined()
  })
})
