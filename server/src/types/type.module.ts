import { Module } from '@nestjs/common';
import { McqModule } from './mcqs/mcq.module';
import { ProgramModule } from './programs/program.module';
@Module({
    imports: [ProgramModule, McqModule],
    providers: [],
})
export class TypeModule { }