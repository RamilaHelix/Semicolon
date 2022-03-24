import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Admin } from "./admin";
import { Contest } from "./contest";

@Entity()
export class Candidate {
    @Column({ type: 'varchar', nullable: false })
    @PrimaryColumn()
    candidate_id: string;

    @Column({ type: 'varchar', nullable: false })
    name: string;

    @Column({ type: 'varchar', nullable: false, unique: true })
    email: string;

    @Column({ type: 'varchar', nullable: false })
    contact: string;

    @Column({ type: 'int', nullable: true })
    pin: number;

    @Column({ type: 'boolean', default: false })
    attempted: boolean;

    @ManyToOne(() => Contest, { eager: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'contest_id' })
    contest_id: string;

    @ManyToOne(() => Admin, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'admin_id' })
    admin_id: string;
}