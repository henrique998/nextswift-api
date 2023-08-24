import { prisma } from '@infra/database/prisma'
import { hash } from 'bcryptjs'
import { randomUUID } from 'node:crypto'

async function seed() {
  const role = await prisma.role.create({
    data: {
      id: randomUUID(),
      name: 'admin',
    },
  })

  const hashedPassword = await hash('123456', 8)

  await prisma.employee.create({
    data: {
      id: randomUUID(),
      name: 'jhon doe',
      email: 'jhondoe@gmail.com',
      password: hashedPassword,
      ddd: 82,
      phone: 999999999,
      cpf: '333.444.555-00',
      role: {
        connect: {
          id: role.id,
        },
      },
    },
  })
}

seed()
