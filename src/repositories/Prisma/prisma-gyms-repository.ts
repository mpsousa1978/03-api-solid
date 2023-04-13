import { Gym, Prisma } from "@prisma/client";
import { FindManyNearByParams, IGymsRepository } from "../IGyms-repository";
import { prismaBD } from "@/lib/prisma";


export class PrismaGymsRepository implements IGymsRepository {
  async findId(id: string): Promise<Gym | null> {
    const gym = await prismaBD.gym.findUnique({
      where: {
        id
      }
    })
    return gym
  }

  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = await prismaBD.gym.create({
      data
    })
    return gym
  }

  async searchMany(query: string, page: number): Promise<Gym[]> {
    const gym = await prismaBD.gym.findMany({
      where: {
        title: {
          contains: query
        }
      }, take: 20,
      skip: (page - 1) * 20
    })

    return gym
  }

  async findManyNearBy({ latitude, longitude }: FindManyNearByParams): Promise<Gym[]> {
    const gyms = await prismaBD.$queryRaw<Gym[]>`SELECT * from gyms
    WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `

    return gyms

  }


}