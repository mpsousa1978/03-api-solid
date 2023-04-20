import { CreateAndAuthenticateUser } from "@/Utils/test/create-and-authenticate-user"
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

    const { token } = await CreateAndAuthenticateUser(app)

    const profileResponse = await request(app.server)
      .get('/me')
      .set('authorization', `Bearer ${token}`)
      .send()

    expect(profileResponse.statusCode).toEqual(200)

  })

})
