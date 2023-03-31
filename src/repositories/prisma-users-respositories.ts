import { prismaBD } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export class PrismaUsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prismaBD.user.create({
      data  //o data ja tem todos os campos que serão inseridos no banco
    })
    return user
  }




}