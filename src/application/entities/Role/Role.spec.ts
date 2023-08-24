import { describe, expect, it } from 'vitest'
import { Role } from '.'
import { Name } from './Name'

describe('Role entity', () => {
  it('should be able to create a new role!', () => {
    const role = new Role({
      name: new Name('admin'),
    })

    expect(role.id).toBeDefined()
  })
})
