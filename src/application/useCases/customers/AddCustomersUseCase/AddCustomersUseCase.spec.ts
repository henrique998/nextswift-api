import { beforeEach, describe, expect, it } from 'vitest'

import { AppError } from '@app/errors/AppError'
import { CustomersRepositoryInMemory } from '@test/repositories/CustomersRepositoryInMemory'
import { AddCustomerUseCase } from '.'

let customersRepoInMemory: CustomersRepositoryInMemory
let addCustomerUseCase: AddCustomerUseCase

describe('AddCustomerUseCase', () => {
  beforeEach(() => {
    customersRepoInMemory = new CustomersRepositoryInMemory()
    addCustomerUseCase = new AddCustomerUseCase(customersRepoInMemory)
  })

  it('should not be able to add a customer with an existing email', async () => {
    await addCustomerUseCase.execute({
      name: 'jhon doe',
      email: 'jhondoe@gmail.com',
      ddd: 82,
      phone: 999999999,
      cpf: '931.147.680-32',
      cep: '57300-000',
      street: 'brasil',
      number: 31,
      uf: 'al',
    })

    await expect(
      addCustomerUseCase.execute({
        name: 'jhon doe',
        email: 'jhondoe@gmail.com',
        ddd: 82,
        phone: 999999999,
        cpf: '931.147.680-32',
        cep: '57300-000',
        street: 'brasil',
        number: 31,
        uf: 'al',
      }),
    ).rejects.toEqual(new AppError('Customer Already Exists!'))
  })

  it('should be able to persist an customer in database', async () => {
    await addCustomerUseCase.execute({
      name: 'jhon doe',
      email: 'jhondoe@gmail.com',
      ddd: 82,
      phone: 999999999,
      cpf: '931.147.680-32',
      cep: '57300-000',
      street: 'brasil',
      number: 31,
      uf: 'al',
    })

    expect(customersRepoInMemory.customers[0].email).toBe('jhondoe@gmail.com')
  })
})
