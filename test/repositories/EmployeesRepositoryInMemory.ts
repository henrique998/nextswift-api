import { Employee } from '@app/entities/Employee'
import {
  EmployeePaginateParams,
  IEmployeesRepository,
} from '@app/repositories/IEmployeesRepository'

export class EmployeesRepositoryInMemory implements IEmployeesRepository {
  employees: Employee[] = []

  async findAll(): Promise<Employee[]> {
    return this.employees
  }

  async findById(customerId: string): Promise<Employee | null> {
    const customer = this.employees.find(
      (customer) => customer.id === customerId,
    )

    if (!customer) {
      return null
    }

    return customer
  }

  async findByEmail(email: string): Promise<Employee | null> {
    const employee = this.employees.find(
      (employee) => employee.email.value === email,
    )

    if (!employee) {
      return null
    }

    return employee
  }

  async paginate({
    page,
    limit = 10,
  }: EmployeePaginateParams): Promise<Employee[] | null> {
    const filteredemployees = this.employees.filter(
      (customer) => customer.dismissedAt === null,
    )

    const paginatedemployees = this.paginateArr(filteredemployees, page, limit)

    if (paginatedemployees.length === 0) {
      return null
    }

    return paginatedemployees
  }

  private paginateArr(employeesArr: Employee[], page: number, limit: number) {
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit

    const paginatedItems = employeesArr.slice(startIndex, endIndex)

    return paginatedItems
  }

  async create(employee: Employee, roleId: string): Promise<void> {
    this.employees.push(employee)
  }

  async save(employee: Employee): Promise<void> {
    const employeeIndex = this.employees.findIndex(
      (employeeData) => employeeData.id === employee.id,
    )

    if (employeeIndex !== -1) {
      this.employees[employeeIndex] = employee
    }
  }

  async delete(employeeId: string): Promise<void> {
    const employeeIndex = this.employees.findIndex(
      (employee) => employee.id === employeeId,
    )

    this.employees.splice(employeeIndex, 1)
  }

  async count(): Promise<number> {
    return this.employees.length
  }
}
