import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseProviders } from './database/database.provider';
import { AdminModule } from './admin/admin.module';
import { ContestModule } from './contest/contest.module';
import { CandidateModule } from './candidate/candidate.module';
import { ProgramModule } from './types/programs/program.module';
import { McqModule } from './types/mcqs/mcq.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './entities';
import { routesConfig } from './config/routes';
import { TypeModule } from './types/type.module';
import { mailerConfig } from './config/mailer';
import { SubmitProgramModule } from './submit/program/submit.module';
import { SubmitModule } from './submit/submit.module';
import { envConfig } from './config/environment';

@Module({
  imports: [databaseProviders,
    AdminModule,
    envConfig,
    mailerConfig,
    routesConfig,
    ContestModule,
    CandidateModule,
    ProgramModule,
    TypeModule,
    SubmitModule,
    McqModule,
    TypeOrmModule.forFeature(entities),
    SubmitProgramModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
