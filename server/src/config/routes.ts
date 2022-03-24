import { RouterModule } from '@nestjs/core';
import { AdminModule } from 'src/admin/admin.module';
import { CandidateModule } from 'src/candidate/candidate.module';
import { McqModule } from 'src/types/mcqs/mcq.module';
import { ProgramModule } from 'src/types/programs/program.module';
import { ContestModule } from 'src/contest/contest.module';

export const routesConfig = RouterModule.register([
  { path: 'auth', module: AdminModule },
  { path: 'program', module: ProgramModule },
  { path: 'mcqs', module: McqModule },
  { path: 'candidate', module: CandidateModule },
  { path: 'contest', module: ContestModule },
  // {
  //   path: 'compiler', module: CompilerModule, children: [
  //     { path: 'node', module: NodeModule },
  //     { path: 'java', module: JavaModule },
  //     { path: 'python', module: PythonModule },
  //     { path: 'gcc', module: GccModule },
  //     { path: 'gpp', module: GppModule },
  //   ]
  // }
]);
