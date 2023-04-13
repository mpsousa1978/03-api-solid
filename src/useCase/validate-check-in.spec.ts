import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import { inMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-checkIn-repository'
import { inMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { ValidateCheckInUseCase } from './validate-check-in'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let checkInRepository: inMemoryCheckInRepository
let gymsRepository: inMemoryGymsRepository
let sut: ValidateCheckInUseCase

describe('Validate Check-in Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new inMemoryCheckInRepository
    sut = new ValidateCheckInUseCase(checkInRepository)
    //vi.useFakeTimers()

  })

  afterEach(() => {
    //vi.useRealTimers()
  })

  it('should be able to validate  check-in', async () => {
    const createdCheckIn = await checkInRepository.create({
      gym_id: 'academia 01',
      user_id: 'user 01'
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))

  })

  it('should not be able to validate inexistent check-in', async () => {

    await expect(sut.execute({
      checkInId: 'test id inexistent '
    })).rejects.toBeInstanceOf(ResourceNotFoundError)

  })

})