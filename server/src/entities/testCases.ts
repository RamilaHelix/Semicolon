import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Program } from './programs';

@Entity('testcases')
export class TestCase {
    @Column({ type: 'varchar', nullable: false })
    @PrimaryColumn()
    testcase_id: string;

    @Column({ type: 'varchar', nullable: false })
    input: string;

    @Column({ type: 'varchar', nullable: false })
    output: string;

    @Column({ type: 'int', nullable: false })
    points: number;

    @Column({ type: 'boolean', nullable: false })
    hidden: boolean;

    @ManyToOne(() => Program, { onDelete: "CASCADE" })
    @JoinColumn({ name: 'prog_id' })
    program: string;
}
