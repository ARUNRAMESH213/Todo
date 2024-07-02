import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
import { IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @IsNotEmpty()
  @IsBoolean()
  @IsOptional()
  completed: boolean;
}
