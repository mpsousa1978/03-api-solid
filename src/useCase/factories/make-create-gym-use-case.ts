import { PrismaGymsRepository } from "@/repositories/Prisma/Prisma-gyms-repository"
import { CreateGymUseCase } from "../create-gym"

export function makeCreateGymUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new CreateGymUseCase(gymsRepository)

  return useCase
}