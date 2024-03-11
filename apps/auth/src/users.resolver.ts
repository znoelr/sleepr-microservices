import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserDocument } from './users/models/user.schema';
import { UsersService } from './users/users.service';
import { CreateUserDto } from './users/dtos/create-user.dto';

@Resolver(() => UserDocument)
export class UserResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => UserDocument)
  createUser(@Args('createUserInput') createUserInput: CreateUserDto) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [UserDocument], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }
}
