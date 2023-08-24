/* eslint-disable no-useless-constructor */
import { AppError } from '@app/errors/AppError'
import { IEmployeesRepository } from '@app/repositories/IEmployeesRepository'
import { compare } from 'bcryptjs'

interface Request {
  adminId: string
  adminPassword: string
  employeeId: string
}

type Response = void

export class DismissEmployeeUseCase {
  constructor(private employeesRepo: IEmployeesRepository) {}

  async execute({
    adminId,
    adminPassword,
    employeeId,
  }: Request): Promise<Response> {
    const admin = await this.employeesRepo.findById(adminId)

    if (!admin) {
      throw new AppError('Admin not found!')
    }

    const passwordMatch = compare(adminPassword, admin.password.value)

    if (!passwordMatch) {
      throw new AppError('Incorrect password!')
    }

    const employee = await this.employeesRepo.findById(employeeId)

    if (!employee) {
      throw new AppError('Employee not found!')
    }

    if (employeeId === adminId) {
      throw new AppError('Action Unauthorized!')
    }

    employee.dismiss()

    await this.employeesRepo.save(employee)
  }
}
