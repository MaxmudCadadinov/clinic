import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { User } from '../../users/entities/users.entity'
import { ClientEntity } from '../../client/client.entity/client.entity';


@Entity('client_group')
export class ClientGroupEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'int', default: 1 })
    status: number;

    @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP(6)' })
    created: Date;

    @UpdateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
    updated: Date;

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: 'register_id' })
    register: User;

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: 'modify_id' })
    modify: User

    @OneToMany(() => ClientEntity, client => client.group)
    client: ClientEntity[];

}