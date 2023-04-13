import { Gym } from "@prisma/client"
import { IGymsRepository } from "@/repositories/IGyms-repository"


interface SearchGymCaseRequest {
  query: string
  page: number
}
interface SearchGymCaseResponse {
  gym: Gym[]
}

export class SearchGymsUseCase {
  constructor(private gymRepository: IGymsRepository) { }

  async execute({ query, page }: SearchGymCaseRequest) {

    const gyms = await this.gymRepository.searchMany(query, page)
    return { gyms }
  }

}

