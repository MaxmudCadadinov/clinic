import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm'
import { DepartamentEntity } from '../../departament/deportament_entity/deportament.entity';
import { User } from 'src/users/entities/users.entity';
import { ServiceEntity } from 'src/service/service_entity/service.entity';

export enum ServiceType {
  FIXED = 'FIXED',
  PERCENT = 'PERCENT',
}

@Entity('service_user')

export class ServiceUserEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int', default: 1 })
    status: number;

    @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    created: Date;
    
    @UpdateDateColumn({ type: 'timestamp', precision: 6, default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
    updated: Date;

    @Column({type: 'enum', enum: ServiceType, default: ServiceType.FIXED })
    type: ServiceType

    @Column({type: 'double', default: 0 })
    value: number;

    @ManyToOne(() => User, user => user.services)
    @JoinColumn({ name: 'user_id' })
    user: User

    @ManyToOne(() => User, (u) => u.modifiedServiceUsers)
    @JoinColumn({ name: 'modify_id' })
    modify: User;

    @ManyToOne(() => User, (u) => u.registeredServiceUsers)
    @JoinColumn({ name: 'register_id' })
    register: User;

    @ManyToOne(() => ServiceEntity, (s) => s.serviceUsers)
    @JoinColumn({ name: 'service_id' })
    service: ServiceEntity;

}


