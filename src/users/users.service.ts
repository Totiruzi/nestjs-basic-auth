import { UserDocument } from './models/user.schema';
import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { GetUserArgs } from './dataTransferObject/args/get-user-args.dto';
import { CreateUserInput } from './dataTransferObject/input/create-user-input.dto';
import { UsersRepository } from './users.repository';
import { User } from './models/user.model';

@Injectable()
export class UsersService {

  constructor(protected readonly usersRepository: UsersRepository) { }

  async createUser(createUserData: CreateUserInput) {
    await this.validateCreateUserData(createUserData)
    const userDocument = await this.usersRepository.create({
      ...createUserData,
      password: await bcrypt.hash(createUserData.password, 10),
    })
    return this.toModel(userDocument)
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
  async getUser(getUserArgs: GetUserArgs) {
    const userDocument = await this.usersRepository.findOne(getUserArgs)
    return this.toModel(userDocument)
  }

  async validateUser(email: string, password: string) {
    const userDocument = await this.usersRepository.findOne({email})
    const passwordIsValid = await bcrypt.compare(password, userDocument.password)

    if(!passwordIsValid) {
      throw new UnauthorizedException('Credentials are not valid')
    }
    
    return this.toModel(userDocument)
  }

  // returns the expected user model from the database
  private toModel(userDocument: UserDocument): User {
    return {
      _id: userDocument._id.toHexString(), // convert to string
      email: userDocument.email,
    } as User
  }
}
