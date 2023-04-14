import { app } from "@/app"
import request from "supertest"
import { afterAll, beforeAll, describe, expect, it } from "vitest"

describe('Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get user profiler', async () => {
    await request(app.server).post('/users').send({
      name: 'John One',
      email: 'johnone@example.com',
      password: '123546'
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'johnone@example.com',
      password: '123546'
    })

    const { token } = authResponse.body

    const profileResponse = await request(app.server)
      .get('/me')
      .set('authorization', `Bearer ${token}`)
      .send()

    expect(profileResponse.statusCode).toEqual(200)

  })

})
