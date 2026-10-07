import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { PostsFilterInput } from './dto/posts-filter.input';
import { PaginationInput } from '../common/pagination.input';

@Injectable()
export class PostsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  async create(input: CreatePostInput) {
    await this.usersService.findOne(input.userId);
    return this.prisma.post.create({ data: input });
  }

  async findAll(filter?: PostsFilterInput, pagination?: PaginationInput) {
    const page = pagination?.page ?? 1;
    const limit = pagination?.limit ?? 10;
    const where = {
      ...(filter?.userId != null && { userId: filter.userId }),
      ...(filter?.search && {
        OR: [
          { title: { contains: filter.search, mode: 'insensitive' as const } },
          { description: { contains: filter.search, mode: 'insensitive' as const } },
        ],
      }),
    };
    const [items, total] = await Promise.all([
      this.prisma.post.findMany({
        where,
        orderBy: { id: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.post.count({ where }),
    ]);
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findOne(id: number) {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  async update(input: UpdatePostInput) {
    const { id, ...data } = input;
    await this.findOne(id);
    return this.prisma.post.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.post.delete({ where: { id } });
  }
}
