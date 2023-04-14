import { PrismaGymsRepository } from "@/repositories/Prisma/Prisma-gyms-repository"
import { CheckInUseCase } from "../check-in"
import { PrismaCheckInsRepository } from "@/repositories/Prisma/prisma-check-in-repository"

export function makeCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new CheckInUseCase(checkInsRepository, gymsRepository)

  return useCase
}