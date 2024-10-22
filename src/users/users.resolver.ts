import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('createUser') createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Query(() => [User])
  findAllUser() {
    return this.usersService.findAll();
  }

  @Query(() => User)
  findOneUser(@Args('id', {type:()=>ID}) id: number) {
    return this.usersService.findOne(+id);
  }

  @Mutation(() => User)
  updateUser(@Args('id') id: number, @Args('updateUser') updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Mutation(() => ID)
  remove(@Args('id' , {type:()=>ID}) id: string) {
    return this.usersService.remove(+id);
  }
}