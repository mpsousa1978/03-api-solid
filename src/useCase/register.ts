import { IUsersRepository } from "@/repositories/IUsers-repository"
import { User } from "@prisma/client"
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"


interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}
interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: IUsersRepository) { }

  async execute({ name, email, password }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {

    const password_hash = await hash(password, 6)

    const userSameEmail = await this.usersRepository.findEmail(email)

    if (userSameEmail) {
      throw new UserAlreadyExistsError() ///apresenta msg de erro
    }

    const user = await this.usersRepository.create({ name, email, password_hash })
    return { user }
  }

}

