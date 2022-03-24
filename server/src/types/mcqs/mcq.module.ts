import { Module } from '@nestjs/common';
import { McqService } from './mcq.service';
import { McqController } from './mcq.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mcq } from '../../entities/mcqs';

@Module({
  imports: [TypeOrmModule.forFeature([Mcq])],
  controllers: [McqController],
  providers: [McqService],
})
export class McqModule { }
