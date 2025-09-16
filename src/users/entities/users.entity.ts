import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany} from 'typeorm'
import { RoleEntity } from '../../user_role/user_role.entity/role.entity';
import { ServiceUserEntity } from 'src/service_user/service_user.entity/service_user.entity';
import { DepartamentEntity } from '../../departament/deportament_entity/deportament.entity';
import { ServiceEntity } from 'src/service/service_entity/service.entity';
import { ClientEntity } from '../../client/client.entity/client.entity';
import { ReferalEntity } from 'src/referal/referal.entity';
import { VisitReferalEntity } from 'src/visit_referal/visit_referal.entity';
import { VisitRoomEntity } from 'src/visit_room/visit_room.entity';



@Entity('users')

export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 255, nullable: false, })
    user_name: string;

    @Column({ type: 'varchar', length: 500, nullable: false, select: false })
    password: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    phone: string

    @Column({ type: 'varchar', length: 255, nullable: true, select: false })
    refresh_token: string;

    @ManyToOne(() => RoleEntity, role => role.users, { eager: true })
    @JoinColumn({ name: 'role_id' })
    role: RoleEntity;

    @Column({ type: 'int', default: 1 })
    status: number;


    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', precision: 6, default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)'})
    updatedAt: Date;


    @Column({ type: 'int', nullable: true })
    chat_id: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    photo: string;

    //service_user
    @OneToMany(() => ServiceUserEntity, su => su.user)
    services: ServiceUserEntity[];

    @OneToMany(() => ServiceUserEntity, (su) => su.modify)
    modifiedServiceUsers: ServiceUserEntity[];

    @OneToMany(() => ServiceUserEntity, (su) => su.register)
    registeredServiceUsers: ServiceUserEntity[];

    //departament
    @OneToMany(() => DepartamentEntity, (departament) => departament.owner)
    ownedDepartaments: DepartamentEntity[];

    @OneToMany(() => DepartamentEntity, (departament) => departament.modify)
    modifiedDepartaments: DepartamentEntity[];

    @OneToMany(() => DepartamentEntity, (departament) => departament.register)
    registeredDepartaments: DepartamentEntity[];

    //service
    @OneToMany(() => ServiceEntity, (s) => s.modify)
    modifiedServices: ServiceEntity[];

    @OneToMany(() => ServiceEntity, (s) => s.register)
    registeredServices: ServiceEntity[];

    //client
    @OneToMany(() => ClientEntity, (c) => c.register)
    registeredClients: ClientEntity[];

    @OneToMany(() => ClientEntity, (c) => c.modify)
    modifiedClients: ClientEntity[];

    @OneToMany(() => ReferalEntity, (c) => c.register)
    registeredReferals: ClientEntity[];

    @OneToMany(() => ReferalEntity, (c) => c.modify)
    modifiedReferals: ClientEntity[];

    @OneToMany(() => VisitReferalEntity, (vr) => vr.register)
    registeredVisitReferals: VisitReferalEntity[];

    @OneToMany(() => VisitReferalEntity, (vr) => vr.modify)
    modifiedVisitReferals: VisitReferalEntity[];

    @OneToMany(() => VisitRoomEntity, (visitRoom) => visitRoom.register)
    registeredVisitRooms: VisitRoomEntity[];

    @OneToMany(() => VisitRoomEntity, (visitRoom) => visitRoom.modify)
  modifiedVisitRooms: VisitRoomEntity[];

  @OneToMany(() => VisitRoomEntity, (visitRoom) => visitRoom.doctor)
  doctorVisitRooms: VisitRoomEntity[];
}

