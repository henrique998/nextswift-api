import { Employee } from '@app/entities/Employee'
import { Email } from '@app/entities/Employee/Email'
import { EmployeeNotFoundError } from '@app/errors/EmployeeNotFound'
import { IStorageProvider } from '@app/providers/IStorageProvider'
import { IEmployeesRepository } from '@app/repositories/IEmployeesRepository'

interface Request {
  employeeId: string
  name?: string
  email?: string
  phone?: number
  avatar?: string
}

interface Response {
  employee: Employee
}

export class UpdateEmployeeInfoUseCase {
  constructor(
    private employeesRepo: IEmployeesRepository,
    private storageProvider: IStorageProvider,
  ) {}

  async execute({ employeeId, ...data }: Request): Promise<Response> {
    const employee = await this.employeesRepo.findById(employeeId)

    if (!employee) {
      throw new EmployeeNotFoundError()
    }

    if (employee.avatar && data.avatar) {
      await this.storageProvider.delete(employee.avatar, 'avatar')

      await this.storageProvider.save(data.avatar, 'avatar')
    } else if (!employee.avatar && data.avatar) {
      await this.storageProvider.save(data.avatar, 'avatar')
    }

    employee.name = data.name ?? employee.name
    employee.email = new Email(data.email ?? employee.email.value)
    employee.phone = data.phone ?? employee.phone
    employee.avatar = data.avatar ?? employee.avatar
    employee.update()

    await this.employeesRepo.save(employee)

    return {
      employee,
    }
  }
}
