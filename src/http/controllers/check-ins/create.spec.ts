import { CreateAndAuthenticateUser } from "@/Utils/test/create-and-authenticate-user"
import { app } from "@/app"
import { prismaBD } from "@/lib/prisma"
import request from "supertest"
import { afterAll, beforeAll, describe, expect, it } from "vitest"

describe('Create Check-in (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a check-in', async () => {

    const { token } = await CreateAndAuthenticateUser(app, true)

    const gym = await prismaBD.gym.create({
      data: {
        title: 'JavaScript Gym',
        description: 'Test',
        phone: '154654654',
        latitude: -27.2092052,
        longitude: -49.6410092
      }
    })

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set('authorization', `Bearer ${token}`)
      .send({
        latitude: -27.2092052,
        longitude: -49.6410092,
      })

    expect(response.statusCode).toEqual(201)

  })

})
