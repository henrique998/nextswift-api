import { describe, expect, it } from 'vitest'
import { Employee } from '.'
import { Email } from './Email'
import { Password } from './Password'

describe('Employee Entity', () => {
  it('should be able to create a new employee', () => {
    const employee = new Employee({
      name: 'Henrique',
      email: new Email('henriquemonteiro037@gmail.com'),
      password: new Password('Herozero10@#'),
      phone: 99999999,
      avatar: 'https://github.com/henrique998.png',
      updatedAt: null,
      roles: null,
    })

    expect(employee.id).toBeDefined()
  })
})
