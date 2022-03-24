import { Module } from '@nestjs/common';
import { SubmitMcqModule } from './mcqs/submit-mcq.module';
import { SubmitProgramModule } from './program/submit.module';
@Module({
    imports: [SubmitProgramModule, SubmitMcqModule],
    providers: [],
})
export class SubmitModule { }