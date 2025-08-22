import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm'
import { DepartamentEntity } from '../../departament/deportament_entity/deportament.entity';
import { User } from 'src/users/entities/users.entity';
import { ServiceUserEntity } from 'src/service_user/service_user.entity/service_user.entity';



@Entity('service')

export class ServiceEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'double' })
    price: number;

    @ManyToOne (() => DepartamentEntity, (departament) => departament.services)
    @JoinColumn({ name: 'departament_id' })
    departament: DepartamentEntity;

    @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    created: Date;

    @UpdateDateColumn({ type: 'timestamp', precision: 6, default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
    updated: Date;

    @Column({ type: 'int', default: 1 })
    status: number;

    @ManyToOne(() => User, (u) => u.modifiedServices)
    @JoinColumn({ name: 'modify_id' })
    modify: User;

    @ManyToOne(() => User, (u) => u.registeredServices)
    @JoinColumn({ name: 'register_id' })
    register: User;

    @OneToMany(() => ServiceUserEntity, (su) => su.service)
    serviceUsers: ServiceUserEntity[];



}

