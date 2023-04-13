import { Prisma, User } from "@prisma/client";

export interface IUsersRepository {
  create(data: Prisma.UserCreateInput): Promise<User>
  findEmail(email: string): Promise<User | null>
  findId(id: string): Promise<User | null>
}