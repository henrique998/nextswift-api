import { describe, expect, it } from 'vitest'
import { Password } from './Password'

describe('Employee Entity', () => {
  it('should be able to create a new password with valid content', () => {
    const password = new Password('Herozero10@#')

    expect(password.value).toBeDefined()
  })

  it('should not be able to create a new password with invalid content', () => {
    expect(() => new Password('hh')).toThrow()
  })
})
