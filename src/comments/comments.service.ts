import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PostsService } from '../posts/posts.service';
import { UsersService } from '../users/users.service';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';

@Injectable()
export class CommentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly postsService: PostsService,
    private readonly usersService: UsersService,
  ) {}

  async create(input: CreateCommentInput) {
    await this.postsService.findOne(input.postId);
    if (input.userId != null) await this.usersService.findOne(input.userId);
    return this.prisma.comment.create({ data: input });
  }

  findAll() {
    return this.prisma.comment.findMany({ orderBy: { id: 'desc' } });
  }

  async findOne(id: number) {
    const comment = await this.prisma.comment.findUnique({ where: { id } });
    if (!comment) throw new NotFoundException('Comment not found');
    return comment;
  }

  async update(input: UpdateCommentInput) {
    const { id, ...data } = input;
    await this.findOne(id);
    return this.prisma.comment.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.comment.delete({ where: { id } });
  }
}
