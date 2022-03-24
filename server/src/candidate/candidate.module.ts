import { Module } from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { CandidateController } from './candidate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Candidate } from '../entities/candidate';
import { SubmitProgram } from 'src/entities/submit-program.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Candidate, SubmitProgram])],
  controllers: [CandidateController],
  providers: [CandidateService],
})
export class CandidateModule { }
