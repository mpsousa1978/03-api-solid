import { Gym } from "@prisma/client"
import { IGymsRepository } from "@/repositories/IGyms-repository"


interface CreateGymCaseRequest {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}
interface CreateGymCaseResponse {
  gym: Gym
}

export class CreateGymUseCase {
  constructor(private gymRepository: IGymsRepository) { }

  async execute({ title, description, phone, latitude, longitude }: CreateGymCaseRequest) {

    const gym = await this.gymRepository.create({ title, description, phone, latitude, longitude })
    return { gym }
  }

}

