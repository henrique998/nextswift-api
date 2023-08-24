import { AppError } from '@app/errors/AppError'
import { MailtrapMailProvider } from '@infra/providers/email/MailtrapMailProvider'
import { EmployeesRepositoryInMemory } from '@test/repositories/EmployeesRepositoryInMemory'
import { beforeEach, describe, expect, it } from 'vitest'
import { HireEmployeeUseCase } from '.'

let employeesRepoInMemory: EmployeesRepositoryInMemory
let mailProvider: MailtrapMailProvider
let hireEmployeeUseCase: HireEmployeeUseCase

describe('Sum numbers', () => {
  beforeEach(() => {
    employeesRepoInMemory = new EmployeesRepositoryInMemory()
    mailProvider = new MailtrapMailProvider()
    hireEmployeeUseCase = new HireEmployeeUseCase(
      employeesRepoInMemory,
      mailProvider,
    )
  })

  it('should not be able to hire a employee with an existing email', async () => {
    await hireEmployeeUseCase.execute({
      name: 'jhon doe',
      email: 'jhondoe@gmail.com',
      avatar: 'avatar.png',
      gender: 'M',
      phone: 999999999,
      roleId: 'adminId',
    })

    await expect(
      hireEmployeeUseCase.execute({
        name: 'another-user',
        email: 'jhondoe@gmail.com',
        avatar: 'anotheravatar.png',
        gender: 'M',
        phone: 888888888,
        roleId: 'adminId',
      }),
    ).rejects.toEqual(new AppError('Employee already exists!'))
  })

  it('should be able to hire a employee', async () => {
    await hireEmployeeUseCase.execute({
      name: 'jhon doe',
      email: 'jhondoe@gmail.com',
      avatar: 'avatar.png',
      gender: 'M',
      phone: 999999999,
      roleId: 'adminId',
    })

    expect(employeesRepoInMemory.employees[0].email.value).toEqual(
      'jhondoe@gmail.com',
    )
  })
})
