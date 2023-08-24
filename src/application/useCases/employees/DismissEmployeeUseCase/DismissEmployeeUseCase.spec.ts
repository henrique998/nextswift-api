import { Employee } from '@app/entities/Employee'
import { Email } from '@app/entities/Employee/Email'
import { Password } from '@app/entities/Employee/Password'
import { EmployeesRepositoryInMemory } from '@test/repositories/EmployeesRepositoryInMemory'
import { beforeEach, describe, expect, it } from 'vitest'
import { DismissEmployeeUseCase } from '.'

let employeesRepoInMemory: EmployeesRepositoryInMemory
let dismissEmployeeUseCase: DismissEmployeeUseCase

describe('DismissEmployeeUseCase', () => {
  beforeEach(() => {
    employeesRepoInMemory = new EmployeesRepositoryInMemory()
    dismissEmployeeUseCase = new DismissEmployeeUseCase(employeesRepoInMemory)
  })

  it('should not be able to dismiss an employee if adminPassword or employeeId not be provided', async () => {
    await expect(() =>
      dismissEmployeeUseCase.execute({
        adminId: 'adminId',
        adminPassword: '',
        employeeId: '',
      }),
    ).rejects.toThrowError(
      'missing data! admin password and employee id must be provided!',
    )
  })

  it('should not be able to dismiss an employee if admin not exists', async () => {
    await expect(() =>
      dismissEmployeeUseCase.execute({
        adminId: 'adminId',
        adminPassword: 'adminPassword',
        employeeId: 'employeeId',
      }),
    ).rejects.toThrowError('Admin not found!')
  })

  it('should be able to dismiss an employee', async () => {
    const admin = new Employee({
      name: 'Admin',
      email: new Email('admin98@gmail.com'),
      password: new Password('Herozero10@#'),
      phone: 99999999,
      avatar: 'avatar.png',
      gender: 'M',
      updatedAt: null,
      roles: null,
    })

    const editor = new Employee({
      name: 'Editor',
      email: new Email('editor@gmail.com'),
      password: new Password('Herozero10@#'),
      phone: 888888888,
      avatar: 'avatar.png',
      gender: 'M',
      updatedAt: null,
      roles: null,
    })

    await employeesRepoInMemory.create(admin, 'admin')

    await employeesRepoInMemory.create(editor, 'editor')

    await dismissEmployeeUseCase.execute({
      adminId: admin.id,
      adminPassword: admin.password.value,
      employeeId: editor.id,
    })

    const employee = await employeesRepoInMemory.findById(editor.id)

    expect(employee?.dismissedAt).toBeDefined()
  })
})
