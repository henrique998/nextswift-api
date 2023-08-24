import { Employee } from '@app/entities/Employee'
import { EmployeeNotFoundError } from '@app/errors/EmployeeNotFound'
import { IEmployeesRepository } from '@app/repositories/IEmployeesRepository'
import { Generate } from '@helpers/generate'
import { redis } from '@infra/database/redis'

interface Response {
  employee: Employee
}

export class GetProfileInfoUseCase {
  constructor(private employeesRepo: IEmployeesRepository) {}

  async execute(employeeId: string): Promise<Response> {
    const cachedProfileInfo = await redis.get('employees:profile')

    if (cachedProfileInfo) {
      const parsedProfileInfo = JSON.parse(cachedProfileInfo)
      return {
        employee: Generate.employee(parsedProfileInfo),
      }
    }

    const employee = await this.employeesRepo.findById(employeeId)

    if (!employee) {
      throw new EmployeeNotFoundError()
    }

    await redis.set(
      'employees:profile',
      JSON.stringify(Generate.redisEmployee(employee)),
      'EX',
      '30',
    )

    return {
      employee,
    }
  }
}
