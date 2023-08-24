import { Employee } from '@app/entities/Employee'

export type EmployeePaginateParams = {
  page: number
  limit: number
}

export interface IEmployeesRepository {
  findById(id: string): Promise<Employee | null>
  findByEmail(email: string): Promise<Employee | null>
  paginate(params: EmployeePaginateParams): Promise<Employee[] | null>
  create(employee: Employee, roleId: string): Promise<void>
  save(employee: Employee): Promise<void>
  delete(employeeId: string): Promise<void>
  count(): Promise<number>
}
