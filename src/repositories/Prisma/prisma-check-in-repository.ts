import { Prisma, CheckIn } from "@prisma/client";
import { ICheckInRepository } from "../ICheckIn-repository";
import { prismaBD } from "@/lib/prisma";
import dayjs from "dayjs";

export class PrismaCheckInsRepository implements ICheckInRepository {
  async findById(id: string): Promise<CheckIn | null> {
    const checkIn = await prismaBD.checkIn.findUnique({
      where: {
        id
      }
    })
    return checkIn
  }

  async findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null> {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkIn = await prismaBD.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate()
        }
      }
    })
    return checkIn
  }

  async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
    const checkIns = await prismaBD.checkIn.findMany({
      where: {
        user_id: userId
      }, take: 20,
      skip: (page - 1) * 20
    })

    return checkIns
  }

  async countByUserId(userId: string): Promise<number> {
    const count = await prismaBD.checkIn.count({
      where: {
        user_id: userId
      }
    })
    return count
  }

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = await prismaBD.checkIn.create({
      data
    })
    return checkIn
  }

  async save(data: CheckIn): Promise<CheckIn> {
    const checkIn = await prismaBD.checkIn.update({
      where: {
        id: data.id
      }, data: data
    })
    return checkIn
  }

}
