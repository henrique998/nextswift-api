import { Employee } from '@app/entities/Employee'
import { Email } from '@app/entities/Employee/Email'
import { Password } from '@app/entities/Employee/Password'
import { EmployeeNotFoundError } from '@app/errors/EmployeeNotFound'
import { EmployeesRepositoryInMemory } from '@test/repositories/EmployeesRepositoryInMemory'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetProfileInfoUseCase } from '.'

let employeesRepoInMemory: EmployeesRepositoryInMemory
let getProfileInfoUseCase: GetProfileInfoUseCase

describe('GetProfileInfoUseCase', () => {
  beforeEach(() => {
    employeesRepoInMemory = new EmployeesRepositoryInMemory()
    getProfileInfoUseCase = new GetProfileInfoUseCase(employeesRepoInMemory)
  })

  it('should not be able to get employee info that not exists', async () => {
    await expect(
      getProfileInfoUseCase.execute('fake-employeeId'),
    ).rejects.toBeInstanceOf(EmployeeNotFoundError)
  })

  it('should be able to get employee info', async () => {
    const employee = new Employee({
      name: 'jhon doe',
      email: new Email('jhondoe@gmail.com'),
      password: new Password('Herozero10@#'),
      ddd: 82,
      phone: 99999999,
      avatar: 'https://github.com/jhondoe.png',
      role: '',
      cpf: '777.777.777-05',
      updatedAt: null,
    })

    await employeesRepoInMemory.create(employee, 'adminId')
    const result = await getProfileInfoUseCase.execute(employee.id)

    expect(result.employee.email.value).toEqual(employee.email.value)
  })
})
