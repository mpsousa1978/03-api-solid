import { z } from "zod"

import { FastifyRequest, FastifyReply } from "fastify"
import { makeCreateGymUseCase } from "@/useCase/factories/make-create-gym-use-case"

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine(value => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine(value => {
      return Math.abs(value) <= 100
    })
  })

  const { title, description, phone, latitude, longitude } = createBodySchema.parse(request.body)

  const gymUseCase = makeCreateGymUseCase()

  await gymUseCase.execute({ title, description, phone, latitude, longitude })

  return reply.status(201).send()
}

