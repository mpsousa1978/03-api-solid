import { PrismaGymsRepository } from "@/repositories/Prisma/Prisma-gyms-repository"
import { SearchGymsUseCase } from "../search-gym"

export function makeSearchGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new SearchGymsUseCase(gymsRepository)

  return useCase
}