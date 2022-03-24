import { Candidate } from './candidate';
import { Program } from './programs';
import { Contest } from './contest';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class SubmitProgram {
    @Column({ type: 'varchar', nullable: false })
    @PrimaryColumn()
    sub_id: string;

    @Column({ type: 'text', nullable: false })
    script: string;

    @Column({ type: 'int', nullable: false })
    points: number;

    @ManyToOne(() => Contest)
    @JoinColumn({ name: 'contest_id' })
    contest_id: string;

    @ManyToOne(() => Program)
    @JoinColumn({ name: 'prog_id' })
    prog_id: string;

    @ManyToOne(() => Candidate, candidate => candidate.candidate_id)
    @JoinColumn({ name: 'candidate_id' })
    candidate_id: string;
}
