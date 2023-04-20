import { CreateAndAuthenticateUser } from "@/Utils/test/create-and-authenticate-user"
import { app } from "@/app"
import request from "supertest"
import { afterAll, beforeAll, describe, expect, it } from "vitest"

describe('Create Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a gym', async () => {

    const { token } = await CreateAndAuthenticateUser(app, true)

    const response = await request(app.server)
      .post('/gyms')
      .set('authorization', `Bearer ${token}`)
      .send({
        title: 'JavaScript Gym',
        description: 'Test',
        phone: '154654654',
        latitude: -27.2092052,
        longitude: -49.6410092,
      })

    expect(response.statusCode).toEqual(201)

  })

})
