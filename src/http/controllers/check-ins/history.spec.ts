import { CreateAndAuthenticateUser } from "@/Utils/test/create-and-authenticate-user"
import { app } from "@/app"
import { prismaBD } from "@/lib/prisma"
import request from "supertest"
import { afterAll, beforeAll, describe, expect, it } from "vitest"

describe('Check-in history (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list the history of check-in', async () => {

    const { token } = await CreateAndAuthenticateUser(app, true)
    const user = await prismaBD.user.findFirstOrThrow()
    const gym = await prismaBD.gym.create({
      data: {
        title: 'JavaScript Gym',
        description: 'Test',
        phone: '154654654',
        latitude: -27.2092052,
        longitude: -49.6410092
      }
    })

    const checkIns = await prismaBD.checkIn.createMany({
      data: [
        {
          gym_id: gym.id,
          user_id: user.id
        },
        {
          gym_id: gym.id,
          user_id: user.id
        }
      ]
    })

    const response = await request(app.server)
      .get('/check-ins/history')
      .set('authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
  })

})
