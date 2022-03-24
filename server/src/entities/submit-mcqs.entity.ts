import { Candidate } from './candidate';
import { Contest } from './contest';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';
import { Mcq } from './mcqs';

@Entity()
export class SubmitMcq {
    @PrimaryColumn()
    sub_id: string;

    @Column({ type: 'boolean', nullable: false })
    is_right: boolean;

    @ManyToOne(() => Candidate)
    @JoinColumn({ name: 'candidate_id' })
    candidate_id: string;

    @ManyToOne(() => Contest)
    @JoinColumn({ name: 'contest_id' })
    contest_id: string;

    @ManyToOne(() => Mcq, mcq => mcq.mcq_id)
    @JoinColumn({ name: 'mcq_id' })
    mcq_id: string;

}