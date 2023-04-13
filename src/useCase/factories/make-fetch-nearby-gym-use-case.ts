import { PrismaGymsRepository } from "@/repositories/Prisma/Prisma-gyms-repository"
import { CreateGymUseCase } from "../create-gym"
import { FetchNearByGymsUseCase } from "../fetch-near-by-gyms"

export function makeFetchNearbyGymUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new FetchNearByGymsUseCase(gymsRepository)

  return useCase
}