import { Module } from '@nestjs/common';
import { SubmitProgramService } from './submit.service';
import { SubmitProgramController } from './submit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubmitProgram } from 'src/entities/submit-program.entity';
import { Program } from 'src/entities/programs';
import { TestCase } from 'src/entities/testCases';

@Module({
  controllers: [SubmitProgramController],
  providers: [SubmitProgramService],
  imports: [TypeOrmModule.forFeature([SubmitProgram])] //, Program, TestCase])],
})
export class SubmitProgramModule { }
