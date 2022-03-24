import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'src/entities/admin';
import { Contest } from 'src/entities/contest';
import { Repository } from 'typeorm';
import { CreateContest, CreateTestDto } from './create-test.dto';
import * as uuid from 'uuid';
import { errorMessage } from 'src/error';

@Injectable()
export class ContestService {

    constructor(
        @InjectRepository(Admin)
        private adminRepository: Repository<Admin>,
        @InjectRepository(Contest)
        private contestRepository: Repository<Contest>,

    ) { }

    create(createTest: CreateTestDto) {
        return this.contestRepository
            .save({ ...createTest, contest_id: uuid.v4() })
            .then((res) => { return { contest: res.contest_id } })
            .catch((err) => err);
    }

    getByContestId(contest_id: string) {
        if (!contest_id || contest_id === '')
            return errorMessage('BAD_REQUEST', 'contest_id is required!');
        return this.contestRepository.find({ where: { contest_id: contest_id } })
    }

    delete(contest_id: string) {
        if (!contest_id || contest_id === '')
            return errorMessage('BAD_REQUEST', 'contest_id is required!');
        return this.contestRepository.delete({ contest_id })
            .then((res) => {
                if (res.affected > 0)
                    return "Contest deleted from database";
                else
                    errorMessage('NOT_FOUND', 'Id not found  in database!')
            })
            .catch((err) => {
                errorMessage('NOT__FOUND', err)
            });
    }

    async createContest(createContest: CreateContest) {
        const constest = await this.contestRepository.save({ ...createContest, contest_id: uuid.v4() })
        return constest
    }

}