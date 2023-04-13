import { CheckIn, User } from "@prisma/client";
import { ICheckInRepository } from "@/repositories/ICheckIn-repository";
import { IGymsRepository } from "@/repositories/IGyms-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { getDistanceBetweenCoordinates } from "@/Utils/GetDistanceBetweenCoordinates";
import { MaxDistanceError } from "./errors/max-distance-error";
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins-error";
import dayjs from "dayjs";
import { LateCheckInValidationError } from "./errors/late-check-in-validation-erro";

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

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at, 'minutes'
    )

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidationError()
    }

    checkIn.validated_at = new Date()

    await this.checkInRepository.save(checkIn)

    return { checkIn }
  }
}