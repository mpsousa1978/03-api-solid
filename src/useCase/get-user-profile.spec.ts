import { inMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let usersRepository: inMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get Use profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new inMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it('should be able to Get Use profile', async () => {

    const createdUser = await usersRepository.create({
      name: 'joe dfd',
      email: 'joedfd@gmail.com',
      password_hash: await hash('123456', 6)
    })

    const { user } = await sut.execute({
      userId: createdUser.id
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual('joe dfd')
  })

  it('should not be able to Get Use profile with wrong id', async () => {
    await expect(() => sut.execute({
      userId: 'no-exits',
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})