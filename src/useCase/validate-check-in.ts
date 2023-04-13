import { CheckIn, User } from "@prisma/client";
import { ICheckInRepository } from "@/repositories/ICheckIn-repository";
import { IGymsRepository } from "@/repositories/IGyms-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { getDistanceBetweenCoordinates } from "@/Utils/GetDistanceBetweenCoordinates";
import { MaxDistanceError } from "./errors/max-distance-error";
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins-error";

interface ValidateUseCaseRequest {
  checkInId: string
}
interface ValidateUseCaseResponse {
  checkIn: CheckIn
}

export class ValidateCheckInUseCase {
  constructor(
    private checkInRepository: ICheckInRepository
  ) { }

  async execute({ checkInId }: ValidateUseCaseRequest): Promise<ValidateUseCaseResponse> {

    const checkIn = await this.checkInRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    checkIn.validated_at = new Date()

    await this.checkInRepository.save(checkIn)

    return { checkIn }
  }
}