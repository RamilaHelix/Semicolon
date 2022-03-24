import { Injectable } from '@nestjs/common';
import { Program } from '../../entities/programs';
import * as uuid from 'uuid';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBulkProgram } from './dto/bulk_create_program.dto';
import { errorMessage } from 'src/error';
import { ProgramResponseDto } from './dto/create_program.dto';
import { TestCase } from 'src/entities/testCases';

@Injectable()
export class ProgramService {

  constructor(
    @InjectRepository(Program)
    private progRepository: Repository<Program>,
    @InjectRepository(TestCase)
    private testRepository: Repository<TestCase>
  ) { }

  createProg(prog) {
    prog = { prog_id: uuid.v4(), ...prog };
    const testcases: TestCase[] = prog.testcases;
    return this.progRepository.save(prog).then(async saved => {
      for (let tc of testcases) {
        tc.program = saved.prog_id;
        tc.testcase_id = uuid.v4();
        return this.testRepository.save(tc)
      }
      return saved
    }).catch(err => err)

  }

  bulkCreate(createBulkProgram: CreateBulkProgram) {

    const programs = createBulkProgram.programs.map((prog: any) => {
      let id = uuid.v4()
      let testcases = prog.testCases;

      return this.progRepository.save({ ...prog, prog_id: id })
        .then(async saved => {
          for (let tc of testcases) {
            tc.program = saved;
            tc.testcase_id = uuid.v4();
            const res = await this.testRepository.save(tc)
            delete res.program
          }
          return saved

        }).catch(err => errorMessage('NOT__FOUND', err))
    })

    return Promise.all(programs)
  }

  async getByContest(contest_id: string): Promise<ProgramResponseDto[]> {

    if (!contest_id || contest_id === '')
      return errorMessage('BAD_REQUEST', 'contest_id is required!');

    const programs = await this.progRepository.find({ where: { contest_id: contest_id } })

    const prj = programs.map((prog) => {
      return this.testRepository.find({ where: { program: prog } })
        .then(res => { return { ...prog, testCases: res } })
        .catch(err => errorMessage('NOT_FOUND', err))
    })
    return Promise.all(prj)
  }

  async deleteById(prog_id: string) {
    if (!prog_id || prog_id === '')
      return errorMessage('BAD_REQUEST', 'prog_id is required!');
    return this.progRepository.delete({ prog_id })
      .then((res) => {
        if (res.affected > 0)
          return "Programming Question deleted from database";
        else
          errorMessage('NOT_FOUND', 'Id not found  in database!')
      })
      .catch((err) => {
        errorMessage('NOT__FOUND', err)
      });
  }
}
