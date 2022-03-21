import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mcq } from './entities/mcqs';
import { Program } from './entities/programs';
import { TestCase } from './entities/testCases';
import { errorMessage } from './error';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Program)
    private progRepository: Repository<Program>,
    @InjectRepository(Mcq)
    private mcqRepository: Repository<Mcq>,
    @InjectRepository(TestCase)
    private testRepository: Repository<TestCase>
  ) { }

  async getAllQuestions(contest_id: string) {
    const MCQs = await this.mcqRepository.find({ contest_id })
      .then(res => res)
    const progs = await this.progRepository.find({ contest_id })

    //MCQs.map(mcq=>delete mcq.answer)

    const prj = progs.map(async (prog) => {
      try {
        const res = await this.testRepository.find({ where: { program: prog } });
        return { ...prog, testCases: res };
      } catch (err) {
        return errorMessage('NOT_FOUND', err);
      }
    })
    return Promise.all(prj).then(progs => { return { progs, MCQs } })
  }

}
