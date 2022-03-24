import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminProviders } from './admin.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from '../entities/admin';
import { SubmitProgram } from 'src/entities/submit-program.entity';
import { SubmitMcq } from 'src/entities/submit-mcqs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Admin, SubmitProgram, SubmitMcq])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule { }
