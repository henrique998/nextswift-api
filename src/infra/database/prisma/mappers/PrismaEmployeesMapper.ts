import { Employee } from '@app/entities/Employee'
import { Email } from '@app/entities/Employee/Email'
import { Password } from '@app/entities/Employee/Password'
import { Employee as RawEmployee } from '@prisma/client'

export class PrismaEmployeesMapper {
  static toPrisma(employee: Employee, roleId?: string): RawEmployee {
    return {
      id: employee.id,
      name: employee.name,
      email: employee.email.value,
      password: employee.password.value,
      ddd: employee.ddd,
      phone: employee.phone,
      cpf: employee.cpf,
      avatar: employee.avatar,
      roleId: roleId ?? null,
      dismissedAt: employee.dismissedAt ?? null,
      createdAt: employee.createdAt,
      updatedAt: employee.updatedAt ?? null,
    }
  }

  static toDomain(employee: RawEmployee, role?: string): Employee {
    return new Employee(
      {
        name: employee.name,
        email: new Email(employee.email),
        password: new Password(employee.password),
        ddd: employee.ddd,
        phone: employee.phone,
        cpf: employee.cpf!!,
        avatar: employee.avatar ?? null,
        role: role ?? null,
        dismissedAt: employee.dismissedAt,
        createdAt: employee.createdAt,
        updatedAt: employee.updatedAt,
      },
      employee.id,
    )
  }
}
