import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Contest } from './contest';

@Entity()
export class Mcq {
    @Column({ type: 'varchar', nullable: false })
    @PrimaryColumn()
    mcq_id: string;

    @Column({ type: 'varchar', nullable: false })
    question_number: number;

    @Column({ type: 'varchar', nullable: false })
    question: string;

    @Column({ type: 'varchar', nullable: false })
    a: string;

    @Column({ type: 'varchar', nullable: false })
    b: string;

    @Column({ type: 'varchar', nullable: false })
    c: string;

    @Column({ type: 'varchar', nullable: false })
    d: string;

    @Column({ type: 'varchar', nullable: false })
    answer: string;

    @Column({ type: 'int', nullable: false })
    points: number;

    @ManyToOne(() => Contest, { onDelete: "CASCADE" })
    @JoinColumn({ name: 'contest_id' })
    contest_id: string;
}
