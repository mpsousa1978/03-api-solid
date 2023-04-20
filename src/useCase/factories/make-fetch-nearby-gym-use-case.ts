import { PrismaGymsRepository } from "@/repositories/Prisma/prisma-gyms-repository"
import { FetchNearByGymsUseCase } from "../fetch-near-by-gyms"

export function makeFetchNearbyGymUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new FetchNearByGymsUseCase(gymsRepository)

  return useCase
}