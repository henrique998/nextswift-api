import { describe, expect, it } from 'vitest'
import { Email } from './Email'

describe('Email value-object', () => {
  it('should not be able to create a new email with invalid format', () => {
    expect(() => new Email('jhondoe123')).toThrowError(
      'E-mail address is not valid!',
    )
  })

  it('should be able to create a new Email with valid format', () => {
    const email = new Email('jhondoe123@gmail.com')

    expect(email.value).toEqual('jhondoe123@gmail.com')
  })
})
