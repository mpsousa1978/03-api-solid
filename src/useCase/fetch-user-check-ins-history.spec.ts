import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import { inMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-checkIn-repository'
import { FetchUserCheckInHistoryUseCase } from './fetch-user-check-ins-history'

let checkInsRepository: inMemoryCheckInRepository
let sut: FetchUserCheckInHistoryUseCase

describe('Fetch User check-in history use case', () => {
  beforeEach(async () => {
    checkInsRepository = new inMemoryCheckInRepository()
    sut = new FetchUserCheckInHistoryUseCase(checkInsRepository)
  })

  it('should be able to fetch check-in history', async () => {

    await checkInsRepository.create({
      gym_id: 'gyn-01',
      user_id: 'user-01'
    })

    await checkInsRepository.create({
      gym_id: 'gyn-02',
      user_id: 'user-01'
    })

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 1
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gyn-01' }),
      expect.objectContaining({ gym_id: 'gyn-02' }),
    ])
  })

  it('should be able to fetch paginated check-in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        gym_id: `gyn-${i}`,
        user_id: 'user-01'
      })

    }

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 2
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gyn-21' }),
      expect.objectContaining({ gym_id: 'gyn-22' }),
    ])
  })

})