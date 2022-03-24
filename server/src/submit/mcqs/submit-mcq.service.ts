import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Mcq } from "src/entities/mcqs";
import { SubmitMcq } from "src/entities/submit-mcqs.entity";
import { Repository } from "typeorm";
import { McqSubmitDto } from "./mcq_submit.dto";
import * as uuid from 'uuid';
import { McqsSubmitDto } from "./mcqs_submit.dto";

@Injectable()
export class SubmitMcqService {

    constructor(
        @InjectRepository(SubmitMcq)
        private submitMcqRepository: Repository<SubmitMcq>,
        @InjectRepository(Mcq)
        private mcqRepository: Repository<Mcq>) { }


    async submit(createSubmitDto: McqSubmitDto) {
        try {
            const ans = await this.mcqRepository.findOne({ mcq_id: createSubmitDto.mcq_id });
            let is_right = (ans.answer === createSubmitDto.answer);

            const mcq = await this.submitMcqRepository.findOne({ mcq_id: createSubmitDto.mcq_id, candidate_id: createSubmitDto.candidate_id })
            if (mcq) {
                return await this.submitMcqRepository.update({ sub_id: mcq.sub_id }, { is_right })
            }
            else {
                return await this.submitMcqRepository.save({
                    sub_id: uuid.v4(),
                    is_right, mcq_id: createSubmitDto.mcq_id,
                    candidate_id: createSubmitDto.candidate_id,
                    contest_id: createSubmitDto.contest_id
                });
            }

        } catch (error) {
            return error;
        }

    }
    async submitMcqs(mcqsSubmitDto: McqsSubmitDto) {
        const MCQs = mcqsSubmitDto.Mcqs.map(mcq => this.submit(mcq))
        return Promise.all(MCQs)
    }
}
/*
    cacheMcqs = new Map<string, { mcq: SubmitMcq, ans: string }>()

    async submit(createSubmitDto: McqSubmitDto) {
        try {
            if (this.cacheMcqs.has(createSubmitDto.mcq_id)) {
                console.log(this.cacheMcqs)
                const mcq = this.cacheMcqs.get(createSubmitDto.mcq_id)
                let right = (mcq.ans === createSubmitDto.answer);
                if (mcq.mcq.candidate_id === createSubmitDto.candidate_id) {
                    const updateMcq = await this.submitMcqRepository.update({ mcq_id: mcq.mcq.mcq_id, candidate_id: createSubmitDto.candidate_id }, { right })
                    return { message: 'not hit database' }
                }
                else {
                    const savedMcq = await this.submitMcqRepository.save({
                        sub_id: uuid.v4(),
                        right, mcq_id: createSubmitDto.mcq_id,
                        candidate_id: createSubmitDto.candidate_id,
                        contest_id: createSubmitDto.contest_id
                    });

                    return { message: 'hit database to create candidate' }
                }
            }
            else {
                const ans = await this.mcqRepository.findOne({ mcq_id: createSubmitDto.mcq_id });
                let right = (ans.answer === createSubmitDto.answer);
                const savedMcq = await this.submitMcqRepository.save({
                    sub_id: uuid.v4(),
                    right, mcq_id: createSubmitDto.mcq_id,
                    candidate_id: createSubmitDto.candidate_id,
                    contest_id: createSubmitDto.contest_id
                });
                this.cacheMcqs.set(ans.mcq_id, { mcq: savedMcq, ans: ans.answer });
                return { message: 'hit database' }
            }

        } catch (error) {
            return error;
        }
    }
    async submitMcqs(mcqsSubmitDto: McqsSubmitDto) {

        const MCQs = mcqsSubmitDto.Mcqs.map(async tempmcq => {
            try {
                if (this.cacheMcqs.has(tempmcq.mcq_id)) {

                    const mcq = this.cacheMcqs.get(tempmcq.mcq_id)
                    let right = (mcq.ans === tempmcq.answer);
                    const updateMcq = await this.submitMcqRepository.update({ mcq_id: mcq.mcq.mcq_id, candidate_id: tempmcq.candidate_id }, { right })
                    return { message: 'not hit database' }
                }

                else {
                    const res = await this.mcqRepository.findOne({ mcq_id: tempmcq.mcq_id });
                    let right = (res.answer === tempmcq.answer);
                    const savedMcq = await this.submitMcqRepository.save({
                        sub_id: uuid.v4(),
                        right, mcq_id: tempmcq.mcq_id,
                        candidate_id: tempmcq.candidate_id,
                        contest_id: tempmcq.contest_id
                    });
                    return { message: 'hit database' }
                    return savedMcq
                }

            } catch (error) {
                return error;
            }
        })
        return Promise.all(MCQs)
    }
}*/
