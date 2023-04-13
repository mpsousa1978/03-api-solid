import { CheckIn, User } from "@prisma/client";
import { ICheckInRepository } from "@/repositories/ICheckIn-repository";

interface GetUserMetricsUseCaseRequest {
  userId: string
}
interface GetUserMetricsResponse {
  checkInsCount: number
}

export class GetUserMetricsUseCase {
  constructor(private checkInRepository: ICheckInRepository) { }

  async execute({ userId }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsResponse> {
    const checkInsCount = await this.checkInRepository.countByUserId(userId)
    return {
      checkInsCount
    }
  }
}