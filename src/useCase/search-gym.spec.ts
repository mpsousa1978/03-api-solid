import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import { inMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from './search-gym'

let gymsRepository: inMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms use case', () => {
  beforeEach(async () => {
    gymsRepository = new inMemoryGymsRepository
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {

    await gymsRepository.create({
      title: 'academia 1',
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091
    })

    await gymsRepository.create({
      title: 'academia 2',
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091
    })

    const { gyms } = await sut.execute({
      query: 'academia 1',
      page: 1
    })
    //console.log(gyms)
    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'academia 1' })])
  })

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `academia gyn-${i}`,
        description: null,
        phone: null,
        latitude: -27.2092052,
        longitude: -49.6401091
      })

    }

    const { gyms } = await sut.execute({
      query: 'academia',
      page: 2
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'academia gyn-21' }),
      expect.objectContaining({ title: 'academia gyn-22' }),
    ])
  })

})