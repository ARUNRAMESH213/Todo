import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class TodoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTodoDto: CreateTodoDto) {
    console.log('Testing inside Servide>>>>>>>>>>>>');
    return this.prisma.todo.create({
      data: createTodoDto,
    });
  }

  async findAll() {
    return this.prisma.todo.findMany();
  }

  async findOne(id: number) {
    const d = await this.prisma.todo.findUnique({
      where: { id },
    });
    console.log('>>>>>', d);
    return d;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const todo = await this.prisma.todo.findUnique({
      where: { id },
    });
    const data: Prisma.TodoUpdateInput = {
      title: updateTodoDto.title,
      completed: updateTodoDto.completed,
    };
    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }

    return this.prisma.todo.update({
      where: { id },
      data: data,
    });
  }

  async remove(id: number) {
    const todo = await this.prisma.todo.findUnique({
      where: { id },
    });

    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }

    return this.prisma.todo.delete({
      where: { id },
    });
  }
}
