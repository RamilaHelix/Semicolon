import { Injectable } from '@nestjs/common';
import { Admin } from '../entities/admin';
import * as uuid from 'uuid';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { errorMessage } from 'src/error';
import { SubmitProgram } from 'src/entities/submit-program.entity';
import { SubmitMcq } from 'src/entities/submit-mcqs.entity';
import { Candidate } from 'src/entities/candidate';

@Injectable()
export class AdminService {

  constructor(
    @InjectRepository(Admin)
    private usersRepository: Repository<Admin>,
    @InjectRepository(SubmitProgram)
    private submitProgramRepository: Repository<SubmitProgram>,
    @InjectRepository(SubmitMcq)
    private submitMcqRepository: Repository<SubmitMcq>

  ) { }

  findAll(): Promise<Admin[]> {
    return this.usersRepository
      .find()
      .then((res) => res)
      .catch((error) => error);
  }

  createUser(user) {
    if (user.email && user.password) {
      user = { admin_id: uuid.v4(), ...user };
      return this.usersRepository.save(user);
    } else {
      return errorMessage('BAD_REQUEST', 'Email and password are required.');
    }
  }
  findUser(user): Promise<Admin> {
    if (!user.email && !user.password) {
      return errorMessage('BAD_REQUEST', 'Email and password are required.');
    }
    return this.usersRepository
      .find({ where: { email: user.email, password: user.password } })
      .then((res) => res)
      .catch((error) => { error.message = "NOT FOUND"; return error })
  }

  async getAttemptedTestCandidate(contest_id: string) {
    const data = await this.submitProgramRepository.find({ where: { contest_id }, relations: ['candidate_id'] })
    const data2 = await this.submitMcqRepository.find({ where: { contest_id }, relations: ['candidate_id'] })

    const progs = await Promise.resolve(data);

    const mcqs = await Promise.resolve(data2);

    // const saved = prog.map(p => p.candidate_id)

    return Promise.all([{ progs, mcqs }])
  }

}
