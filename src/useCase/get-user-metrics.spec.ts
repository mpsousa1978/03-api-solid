import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import { inMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-checkIn-repository'
import { GetUserMetricsUseCase } from './get-user-metrics'

let checkInsRepository: inMemoryCheckInRepository
let sut: GetUserMetricsUseCase

describe('Get User Metrics use case', () => {
  beforeEach(async () => {
    checkInsRepository = new inMemoryCheckInRepository
    sut = new GetUserMetricsUseCase(checkInsRepository)
  })

  it('should be able to get check ins count from metrics', async () => {

    await checkInsRepository.create({
      gym_id: 'gyn-01',
      user_id: 'user-01'
    })

    await checkInsRepository.create({
      gym_id: 'gyn-02',
      user_id: 'user-01'
    })

    const { checkInsCount } = await sut.execute({
      userId: 'user-01'
    })

    expect(checkInsCount).toEqual(2)
  })

})