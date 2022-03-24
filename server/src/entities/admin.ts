import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Admin {
    @Column({ type: 'varchar', nullable: false })
    @PrimaryColumn()
    admin_id: string;

    @Column({ type: 'varchar', nullable: false })
    first_name: string;

    @Column({ type: 'varchar', nullable: false })
    last_name: string;

    @Column({ type: 'varchar', nullable: false })
    email: string;

    @Column({ type: 'varchar', nullable: false })
    password: string;
}