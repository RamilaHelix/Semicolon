import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Admin } from './admin';

@Entity('contest')
export class Contest {
    @Column({ type: 'varchar' })
    @PrimaryColumn()
    contest_id: string;

    @Column({ type: 'varchar', nullable: false })
    name: string;

    @Column({ type: 'int', nullable: false })
    duration: number;

    @ManyToOne(() => Admin, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'admin_id' })
    admin_id: string;
}
