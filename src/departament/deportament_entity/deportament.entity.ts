import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm'
import { ServiceEntity } from 'src/service/service_entity/service.entity';
import { User } from 'src/users/entities/users.entity';




@Entity('departament')

export class DepartamentEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @ManyToOne(() => User, (user) => user.ownedDepartaments)
    @JoinColumn({ name: 'owner_id' })
    owner: User;

    @Column({ type: 'int', default: 1 })
    status: number;

    @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP(6)' })
    created: Date;

    @UpdateDateColumn({ type: 'timestamp', precision: 6, default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
    updated: Date;

    @ManyToOne(() => User, (user) => user.registeredDepartaments)
    @JoinColumn({ name: 'register_id' })
    register: User;

    @OneToMany(() => ServiceEntity, (service) => service.departament)
    services: ServiceEntity[];

    @ManyToOne(() => User, (user) => user.modifiedDepartaments)
    @JoinColumn({ name: 'modify_id' })
    modify: User;

}

