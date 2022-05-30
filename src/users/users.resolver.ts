import { GqlAuthGuard } from './../auth/gaurds/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetUserArgs } from './dataTransferObject/args/get-user-args.dto';
import { CreateUserInput } from './dataTransferObject/input/create-user-input.dto';
import { User } from './models/user.model';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor( private readonly usersService: UsersService) {}

  @Mutation(() => User)
  async createUser(@Args('createUserData') createUserData: CreateUserInput) {
    return this.usersService.createUser(createUserData);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User, { name: 'user'})
  async getUser(@Args() getUserArgs: GetUserArgs) {
    return this.usersService.getUser(getUserArgs);
  }
}
