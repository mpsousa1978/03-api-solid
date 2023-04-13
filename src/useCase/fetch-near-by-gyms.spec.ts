import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import { inMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearByGymsUseCase } from './fetch-near-by-gyms'

let gymsRepository: inMemoryGymsRepository
let sut: FetchNearByGymsUseCase

describe('fetch near by Gyms use case', () => {
  beforeEach(async () => {
    gymsRepository = new inMemoryGymsRepository
    sut = new FetchNearByGymsUseCase(gymsRepository)
  })

  it('should be able to fetch near by gyms', async () => {

    await gymsRepository.create({
      title: 'academia 1',
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091
    })

    await gymsRepository.create({
      title: 'academia 2 far',
      description: null,
      phone: null,
      latitude: -27.0610928,
      longitude: -49.5229501
    })

    const { gyms } = await sut.execute({
      userLatitude: -27.2092052,
      userLongitude: -49.6401091
    })
    console.log(gyms)
    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'academia 1' })])
  })



})