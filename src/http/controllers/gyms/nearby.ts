import { z } from "zod"

import { FastifyRequest, FastifyReply } from "fastify"
import { makeSearchGymsUseCase } from "@/useCase/factories/make-search-gyms-use-case"
import { makeFetchNearbyGymUseCase } from "@/useCase/factories/make-fetch-nearby-gym-use-case"

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearByGymsQuerySchema = z.object({
    latitude: z.coerce.number().refine(value => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine(value => {
      return Math.abs(value) <= 100
    })
  })

  const { latitude, longitude } = nearByGymsQuerySchema.parse(request.query)

  const FetchNearbyGymUseCase = makeFetchNearbyGymUseCase()

  const nearByGim = await FetchNearbyGymUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude
  })

  return reply.status(200).send(nearByGim)
}

