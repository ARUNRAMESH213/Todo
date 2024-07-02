import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { NotFoundException } from '@nestjs/common';
import { validate } from 'class-validator';
import { PrismaService } from '../prisma/prisma.service';

describe('TodoController', () => {
  let controller: TodoController;
  let service: TodoService;
  let prismaService: PrismaService;

  const mockTodoService = {
    create: jest.fn((dto) => {
      return {
        id: Date.now(),
        ...dto,
      };
    }),
    findAll: jest.fn(() => []),
    findOne: jest.fn((id) => {
      return { id: '1', title: 'completed', completed: false };
    }),
    update: jest.fn((id, dto) => {
      return { id: '1', title: 'completed', completed: true };
    }),
    remove: jest.fn((id) => null),
  };

  const mockPrismaService = {
    onModuleInit: jest.fn(() => null),
    onModuleDestroy: jest.fn(() => null),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        {
          provide: TodoService,
          useValue: mockTodoService,
        },
        // TodoService,
        PrismaService,
      ],
    }).compile();

    controller = module.get<TodoController>(TodoController);
    service = module.get<TodoService>(TodoService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // describe('create', () => {
  //   it('should create a new todo', async () => {
  //     const dto: CreateTodoDto = { title: 'Test todo' };
  //     const result = await controller.create(dto);
  //     expect(result).toEqual({
  //       id: expect.any(Number),
  //       ...dto,
  //     });
  //     expect(mockTodoService.create).toHaveBeenCalledWith(dto);
  //   });

  //   it('should validate CreateTodoDto', async () => {
  //     const dto: any = { title: 123 };
  //     const errors = await validate(Object.assign(new CreateTodoDto(), dto));
  //     expect(errors.length).toBeGreaterThan(0);
  //   });
  // });

  // describe('findAll', () => {
  //   it('should return an array of todos', async () => {
  //     const result = await controller.findAll();
  //     expect(result).toEqual([]);
  //     expect(mockTodoService.findAll).toHaveBeenCalled();
  //   });
  // });

  // describe('findOne', () => {
  //   it('should return a todo', async () => {
  //     const result = await controller.findOne('1');
  //     console.log('>>>>result>>>', result);
  //     expect(result).toMatchObject({
  //       id: '1',
  //       title: 'completed',
  //       completed: false,
  //     });
  //     expect(mockTodoService.findOne).toHaveBeenCalledWith(1);
  //   });

  //   it('should throw NotFoundException if todo is not found', async () => {
  //     mockTodoService.findOne.mockImplementationOnce(() => null);
  //     await expect(controller.findOne('2')).rejects.toThrow(NotFoundException);
  //   });
  // });

  // describe('update', () => {
  //   it('should update a todo', async () => {
  //     const dto: UpdateTodoDto = { completed: true };
  //     const result = await controller.update('1', dto);
  //     expect(result).toMatchObject({
  //       id: '1',
  //       title: 'completed',
  //       completed: true,
  //     });
  //     expect(mockTodoService.update).toHaveBeenCalledWith(1, dto);
  //   });

  //   it('should validate UpdateTodoDto', async () => {
  //     const dto: any = { completed: 'true' };
  //     const errors = await validate(Object.assign(new UpdateTodoDto(), dto));
  //     expect(errors.length).toBeGreaterThan(0);
  //   });

  //   it('should throw NotFoundException if todo is not found', async () => {
  //     mockTodoService.update.mockImplementationOnce(() => null);
  //     await expect(controller.update('3', { completed: true })).rejects.toThrow(
  //       NotFoundException,
  //     );
  //   });
  // });

  // describe('remove', () => {
  //   it('should remove a todo', async () => {
  //     const result = await controller.remove('1');
  //     expect(result).toBeNull();
  //     expect(mockTodoService.remove).toHaveBeenCalledWith(1);
  //   });

  //   it('should throw NotFoundException if todo is not found', async () => {
  //     mockTodoService.remove.mockImplementationOnce(() => null);
  //     await expect(controller.remove('1')).rejects.toThrow(NotFoundException);
  //   });
  // });
});
