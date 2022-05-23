import { Injectable } from '@nestjs/common';
import { GetUserArgs } from './dataTransferObject/args/get-user-args.dto';
import { CreateUserInput } from './dataTransferObject/input/create-user-input.dto';

@Injectable()
export class UsersService {

  createUser(createUserData: CreateUserInput) {}

  getUser(getUserArgs: GetUserArgs) {}
}
