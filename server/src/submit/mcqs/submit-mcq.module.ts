import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mcq } from 'src/entities/mcqs';
import { SubmitMcq } from 'src/entities/submit-mcqs.entity';
import { SubmitMcqController } from './submit-mcq.controller';
import { SubmitMcqService } from './submit-mcq.service';

@Module({
    controllers: [SubmitMcqController],
    providers: [SubmitMcqService],
    imports: [TypeOrmModule.forFeature([SubmitMcq, Mcq])],
})
export class SubmitMcqModule { }
