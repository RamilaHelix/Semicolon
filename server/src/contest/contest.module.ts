import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/entities/admin';
import { Contest } from 'src/entities/contest';
import { SubmitProgram } from 'src/entities/submit-program.entity';
import { ContestController } from './Contest.controller';
import { ContestService } from './Contest.service';

@Module({
    imports: [TypeOrmModule.forFeature([Contest, Admin])],
    controllers: [ContestController],
    providers: [ContestService],
})
export class ContestModule { }