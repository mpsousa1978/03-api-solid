import { IUsersRepository } from "@/repositories/IUsers-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { compare, hash } from "bcryptjs";
import { User } from "@prisma/client";

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}
interface AuthenticateUseCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(
    private usersRepository: IUsersRepository
  ) { }

  async execute({ email, password }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    //const password_hash = await hash(password, 6)
    const doesPasswordMatches = await compare(password, user.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      user
    }
  }
}