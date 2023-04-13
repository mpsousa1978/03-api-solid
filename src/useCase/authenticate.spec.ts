import { inMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: inMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new inMemoryUsersRepository
    sut = new AuthenticateUseCase(usersRepository)
  })


  it('should be able to Authenticate', async () => {

    await usersRepository.create({
      name: 'joe dfd',
      email: 'joedfd@gmail.com',
      password_hash: await hash('123456', 6)
    })

    const { user } = await sut.execute({
      email: 'joedfd@gmail.com',
      password: '123456'
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to Authenticate with wrong email', async () => {
    await expect(() => sut.execute({
      email: 'joedfd@gmail.com',
      password: '123456'
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to Authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'joe dfd',
      email: 'joedfd@gmail.com',
      password_hash: await hash('123456', 6)
    })

    await expect(() => sut.execute({
      email: 'joedfd@gmail.com',
      password: '12345e6'
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

})