import { Employee } from '@app/entities/Employee'
import { env } from '@infra/env'

export class EmployeeViewModel {
  static toHttp(employee: Employee, role: string) {
    return {
      id: employee.id,
      name: employee.name,
      email: employee.email.value,
      cpf: employee.cpf,
      ddd: employee.ddd,
      phone: employee.phone,
      avatar: `${env.STORAGE_BASE_URL}/avatar/${employee.avatar}`,
      role: role.charAt(0).toUpperCase() + role.slice(1),
      createdAt: employee.createdAt,
      updatedAt: employee.updatedAt,
    }
  }
}
