import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, } from 'typeorm';
import { Contest } from './contest';
import { TestCase } from './testCases';

@Entity()
export class Program {
    @Column({ type: 'varchar', nullable: false })
    @PrimaryColumn()
    prog_id: string;

    @Column({ type: 'varchar', nullable: false })
    question: string;

    @Column({ type: 'varchar', nullable: false })
    title: string;

    @Column({ type: 'int', nullable: false })
    time: number;

    @Column({ type: 'text', nullable: true, name: 'javascript' })
    boilerplateCodeJS: string;

    @ManyToOne(() => Contest, { onDelete: "CASCADE" })
    @JoinColumn({ name: 'contest_id' })
    contest_id: string;

    // @OneToMany(() => TestCase, testcase => testcase.program, { cascade: ['insert', 'update', 'remove'] })
    // Testcases: TestCase[]

}
