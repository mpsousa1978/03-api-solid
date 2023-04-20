import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { inMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

let usersRepository: inMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new inMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })


  it('should be able to register', async () => {

    const { user } = await sut.execute({
      name: 'joe ddd',
      email: 'joedfd@gmail.com',
      password: '123456'
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registrations', async () => {

    const { user } = await sut.execute({
      name: 'joe ddd',
      email: 'joedfd@gmail.com',
      password: '123456'
    })

    const isPasswordCorrectly = await compare('123456', user.password_hash)

    expect(isPasswordCorrectly).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {

    const email = 'tete@tete.com'
    await sut.execute({
      name: 'joe ddd',
      email: email,
      password: '123456'
    })

    expect(() =>
      sut.execute({
        name: 'joe ddd',
        email: email,
        password: '123456'
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)

  })

})