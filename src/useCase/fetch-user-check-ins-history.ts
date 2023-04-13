import { CheckIn, User } from "@prisma/client";
import { ICheckInRepository } from "@/repositories/ICheckIn-repository";

interface FetchUserCheckInHistoryUseCaseRequest {
  userId: string
  page: number
}
interface FetchUserCheckInHistoryResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckInHistoryUseCase {
  constructor(private checkInRepository: ICheckInRepository) { }

  async execute({ userId, page }: FetchUserCheckInHistoryUseCaseRequest): Promise<FetchUserCheckInHistoryResponse> {
    const checkIns = await this.checkInRepository.findManyByUserId(userId, page)
    return {
      checkIns
    }
  }
}