import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { GetUserArgs } from './dataTransferObject/args/get-user-args.dto';
import { CreateUserInput } from './dataTransferObject/input/create-user-input.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {

  constructor(protected readonly usersRepository: UsersRepository) { }

  async createUser(createUserData: CreateUserInput) {
    await this.validateCreateUserData(createUserData)
  }

  private async validateCreateUserData(createUserData: CreateUserInput) {
    let foundUserInExitense = true
    try {
      await this.usersRepository.findOne({ email: createUserData.email })
      throw new UnprocessableEntityException('User with this email already exists!')
    } catch (error) {
      foundUserInExitense = false
    }
  }
  async getUser(getUserArgs: GetUserArgs) {}
}
