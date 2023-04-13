import { Prisma, User } from "@prisma/client";
import { IUsersRepository } from "../IUsers-repository"
import { randomUUID } from "node:crypto";

export class inMemoryUsersRepository implements IUsersRepository {
  public items: User[] = []

  async findId(id: string) {
    const user = this.items.find(item => item.id === id)
    if (!user) {
      return null
    }

    return user
  }

  async findEmail(email: string) {
    const user = this.items.find(item => item.email === email)
    if (!user) {
      return null
    }

    return user
  }


  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(0)
    }
    this.items.push(user)
    return user
  }
}  