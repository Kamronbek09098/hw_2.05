import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { PrismaService } from '../prisma/prisma.service';
import { Post } from '../posts/entities/post.entity';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly prisma: PrismaService,
  ) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') input: CreateUserInput) {
    return this.usersService.create(input);
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') input: UpdateUserInput) {
    return this.usersService.update(input);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }

  @ResolveField(() => [Post])
  posts(@Parent() user: User) {
    return this.prisma.post.findMany({ where: { userId: user.id }, orderBy: { id: 'asc' } });
  }
}
