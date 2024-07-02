import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { PrismaModule } from './Prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { CommonModule } from './common.module';

@Module({
  imports: [PrismaModule, TodoModule],
  controllers: [AppController],
  providers: [AppService, PrismaModule],
})
export class AppModule {}
