import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { errorMessage } from 'src/error';
import { Repository } from 'typeorm';
import { CreateMcqsDto } from './dto/create_mcqs.dto';
import { Mcq } from '../../entities/mcqs';
import * as uuid from 'uuid';

@Injectable()
export class McqService {
  constructor(
    @InjectRepository(Mcq)
    private mcqRepository: Repository<Mcq>,
  ) { }

  create(createMcqDto: any) {
    if (
      !createMcqDto.answer &&
      !createMcqDto.a &&
      !createMcqDto.b &&
      !createMcqDto.c &&
      !createMcqDto.d &&
      !createMcqDto.question &&
      !createMcqDto.question_number &&
      !createMcqDto.points
    ) {
      return errorMessage('BAD_REQUEST', 'Some fields are missing.');
    }
    return this.mcqRepository
      .save(createMcqDto)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }

  findOne(contest_id: string, mcq_id: string) {
    if ((!contest_id || contest_id === '') && (!mcq_id || mcq_id === ''))
      return errorMessage('BAD_REQUEST', 'contest_id and mcq_id required!');
    return this.mcqRepository
      .findOne({ where: { contest_id: contest_id, mcq_id: mcq_id } })

  }

  async bulkCreate(createMcqsDto: CreateMcqsDto) {
    const MCQs = createMcqsDto.mcqs.map(mcq => {
      return this.mcqRepository.save({
        ...mcq, mcq_id: uuid.v4()
      })
    })
    return Promise.all(MCQs)
  }
  delete(mcq_id: string) {
    if (!mcq_id || mcq_id === '')
      return errorMessage('BAD_REQUEST', 'mcq_id is required!');
    return this.mcqRepository.delete({ mcq_id })
      .then((res) => {
        if (res.affected > 0)
          return "MCQ deleted from database";
        else
          errorMessage('NOT_FOUND', 'Id not found  in database!')
      })
      .catch((err) => {
        errorMessage('NOT__FOUND', err)
      });
  }

  getByContest(contest_id: string) {
    if (!contest_id || contest_id === '')
      return errorMessage('BAD_REQUEST', 'contest_id is required!');
    return this.mcqRepository.find({ where: { contest_id: contest_id } })

  }
}
