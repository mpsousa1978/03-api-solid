import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import { inMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-checkIn-repository'
import { CheckInUseCase } from './check-in'
import { inMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'
import { MaxDistanceError } from './errors/max-distance-error'

let checkInRepository: inMemoryCheckInRepository
let gymsRepository: inMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new inMemoryCheckInRepository()
    gymsRepository = new inMemoryGymsRepository()
    sut = new CheckInUseCase(checkInRepository, gymsRepository)
    vi.useFakeTimers()

    await gymsRepository.create({
      id: 'gim id',
      title: 'Test javascript gyn',
      description: '',
      phone: '',
      latitude: -27.2092052,
      longitude: -49.6401091
    })

  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gim id',
      userId: 'user id',
      userLatitude: -27.2092052,
      userLongitude: -49.6401091
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gim id',
      userId: 'user id',
      userLatitude: -27.2092052,
      userLongitude: -49.6401091
    })

    await expect(() =>
      sut.execute({
        gymId: 'gim id',
        userId: 'user id',
        userLatitude: -27.2092052,
        userLongitude: -49.6401091
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should not be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gim id',
      userId: 'user id',
      userLatitude: -27.2092052,
      userLongitude: -49.6401091
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gim id',
      userId: 'user id',
      userLatitude: -27.2092052,
      userLongitude: -49.6401091
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should be able to check in on distance gyn', async () => {
    gymsRepository.items.push({
      id: 'gim id2',
      title: 'Test javascript gyn',
      description: '',
      phone: '',
      latitude: new Decimal(-27.07427279),
      longitude: new Decimal(-49.4889672)
    })

    await expect(() => sut.execute({
      gymId: 'gim id2',
      userId: 'user id',
      userLatitude: -27.2092052,
      userLongitude: -49.6401091
    })).rejects.toBeInstanceOf(MaxDistanceError)
  })

})