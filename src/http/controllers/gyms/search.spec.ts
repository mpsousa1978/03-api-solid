import { CreateAndAuthenticateUser } from "@/Utils/test/create-and-authenticate-user"
import { app } from "@/app"
import request from "supertest"
import { afterAll, beforeAll, describe, expect, it } from "vitest"

describe('Search Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search gym by title', async () => {
    const { token } = await CreateAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('authorization', `Bearer ${token}`)
      .send({
        title: 'JavaScript Gym',
        description: 'Test',
        phone: '154654654',
        latitude: -27.2092052,
        longitude: -49.6410092,
      })

    await request(app.server)
      .post('/gyms')
      .set('authorization', `Bearer ${token}`)
      .send({
        title: 'typeorm Gym2',
        description: 'Test',
        phone: '154654654',
        latitude: -27.2092052,
        longitude: -49.6410092,
      })

    const response = await request(app.server)
      .get('/gyms/search')
      .query({
        query: 'JavaScript Gym'
      })
      .set('authorization', `Bearer ${token}`)
      .send()
    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: "JavaScript Gym"
      })
    ])

  })

})
