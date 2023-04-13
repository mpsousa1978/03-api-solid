import { Gym } from "@prisma/client"
import { IGymsRepository } from "@/repositories/IGyms-repository"


interface FetchNearByGymsCaseRequest {
  userLatitude: number
  userLongitude: number
}
interface FetchNearByGymsCaseResponse {
  gym: Gym[]
}

export class FetchNearByGymsUseCase {
  constructor(private gymRepository: IGymsRepository) { }

  async execute({ userLatitude, userLongitude }: FetchNearByGymsCaseRequest) {

    const gyms = await this.gymRepository.findManyNearBy({ latitude: userLatitude, longitude: userLongitude })
    return { gyms }
  }

}

