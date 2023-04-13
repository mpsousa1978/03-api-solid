import { Gym, Prisma } from "@prisma/client";
export interface FindManyNearByParams {
  latitude: number;
  longitude: number;
}


export interface IGymsRepository {
  findId(id: string): Promise<Gym | null>
  create(date: Prisma.GymCreateInput): Promise<Gym>
  searchMany(query: string, page: number): Promise<Gym[]>
  findManyNearBy({ latitude, longitude }: FindManyNearByParams): Promise<Gym[]>


}