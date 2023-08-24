import { Employee } from '@app/entities/Employee'
import { IEmployeesRepository } from '@app/repositories/IEmployeesRepository'
import { Generate } from '@helpers/generate'
import { redis } from '@infra/database/redis'

interface Request {
  page?: number
  limit?: number
  employeeId: string
}

interface Response {
  employees: Employee[]
}

export class GetManyEmployeesUseCase {
  constructor(private employeesRepo: IEmployeesRepository) {}

  async execute({
    page = 0,
    limit = 10,
    employeeId,
  }: Request): Promise<Response> {
    const cachedEmployees = await redis.get('employees:many')

    if (cachedEmployees) {
      const parsedEmployees = JSON.parse(cachedEmployees)

      return {
        employees: parsedEmployees.map(Generate.employee),
      }
    }

    const employeesData = await this.employeesRepo.paginate({
      page,
      limit,
    })

    if (!employeesData) {
      return {
        employees: [],
      }
    }

    const employees = employeesData.filter(
      (employee) => employee.id !== employeeId,
    )

    await redis.set(
      'employees:many',
      JSON.stringify(employees.map(Generate.redisEmployee)),
      'EX',
      20,
    )

    return {
      employees,
    }
  }
}
