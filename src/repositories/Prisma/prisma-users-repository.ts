import { prismaBD } from "@/lib/prisma";
import { Prisma, User } from "@prisma/client";
import { IUsersRepository } from "../IUsers-repository";

export class PrismaUsersRepository implements IUsersRepository {
  async findId(id: string) {
    const user = await prismaBD.user.findUnique({
      where: {
        id
      }
    })
    return user
  }

  async findEmail(email: string) {
    const user = await prismaBD.user.findUnique({
      where: {
        email
      }
    })
    return user
  }


  async create(data: Prisma.UserCreateInput) {
    const user = await prismaBD.user.create({
      data  //o data ja tem todos os campos que serão inseridos no banco
    })
    return user
  }




}