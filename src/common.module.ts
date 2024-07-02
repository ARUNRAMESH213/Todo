import { Global, Module } from '@nestjs/common';
import { PrismaModule } from './Prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';

@Global()
@Module({
  imports: [PrismaModule],
  exports: [PrismaModule],
  providers: [PrismaService],
})
export class CommonModule {}
