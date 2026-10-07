import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(input: CreateUserInput) {
    const exist = await this.prisma.user.findUnique({ where: { username: input.username } });
    if (exist) throw new ConflictException('Username already exists');
    return this.prisma.user.create({ data: input });
  }

  findAll() {
    return this.prisma.user.findMany({ orderBy: { id: 'asc' } });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(input: UpdateUserInput) {
    const { id, ...data } = input;
    await this.findOne(id);
    if (data.username) {
      const exist = await this.prisma.user.findUnique({ where: { username: data.username } });
      if (exist && exist.id !== id) throw new ConflictException('Username already exists');
    }
    return this.prisma.user.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.user.delete({ where: { id } });
  }
}
