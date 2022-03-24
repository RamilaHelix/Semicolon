import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramController } from './program.controller';
import { Program } from '../../entities/programs';
import { ProgramService } from './program.service';
import { TestCase } from 'src/entities/testCases';

@Module({
  imports: [TypeOrmModule.forFeature([Program, TestCase])],
  controllers: [ProgramController],
  providers: [ProgramService],
})
export class ProgramModule { }
