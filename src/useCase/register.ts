import { prismaBD } from "@/lib/prisma"
import { PrismaUsersRepository } from "@/repositories/prisma-users-respositories"
import { hash } from "bcryptjs"

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export async function registerUseCase({ name, email, password }: RegisterUseCaseRequest) {

  const password_hash = await hash(password, 6)
  const userWithSameEmail = await prismaBD.user.findUnique({
    where: {
      email
    }
  })

  if (userWithSameEmail) {
    throw new Error('E-mail already exists.')
  }

  const prismaUsersRepository = new PrismaUsersRepository()

  await prismaUsersRepository.create({ name, email, password_hash })

}
