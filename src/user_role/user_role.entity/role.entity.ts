import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm'
import { User } from '../../users/entities/users.entity';


@Entity('user_role')

export class RoleEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;

    @Column({ type: 'int', default: 1 })
    status: number;

    @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP(6)' })
    createdAt: Date;

    @UpdateDateColumn({type: 'datetime', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)',})
    updatedAt: Date;

    @OneToMany(() => User, user => user.role)
    users: User[];

    

}

