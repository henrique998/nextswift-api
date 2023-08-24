import { describe, expect, it } from 'vitest'
import { Name } from './Name'

describe('Name Entity', () => {
  it('should not be able to create a name with value less than 3 characters', () => {
    expect(() => new Name('aa')).toThrow()
  })
})
