import {Entity,PrimaryGeneratedColumn,Column,ManyToOne,JoinColumn,CreateDateColumn,UpdateDateColumn, OneToMany} from 'typeorm';
import { ClientEntity } from '../client/client.entity/client.entity';
import { User } from '../users/entities/users.entity';
import { DepartamentEntity } from 'src/departament/deportament_entity/deportament.entity';
import { VisitReferalEntity } from '../visit_referal/visit_referal.entity'
import { VisitRoomEntity } from '../visit_room/visit_room.entity'

export enum VisitState {
  NEW = 'NEW',
  RUNNING = 'RUNNING',
  DONE = 'DONE',
  CANCALLED = 'CANCALLED',
}

@Entity('visit', { schema: 'clinic' })
export class Visit {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ClientEntity,  { nullable: true })
  @JoinColumn({ name: 'client_id' })
  client: ClientEntity;

  @ManyToOne(() => DepartamentEntity, (departament) => departament.visits, { nullable: true })
  @JoinColumn({ name: "departament_id" })
  departament?: DepartamentEntity;

  // @ManyToOne(() => User, { nullable: true })
  // @JoinColumn({ name: 'doctor_id' })
  // doctor: User;

  @Column({ type: 'datetime', name: 'visit_date_time', nullable: true })
  visitDateTime: Date;

  @Column({ type: 'decimal', precision: 19, scale: 2, default: 0 })
  price: number;

  @Column({
    type: 'enum',
    enum: VisitState,
    default: VisitState.NEW,
  })
  state: VisitState;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'int', default: 1 })
  status: number;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP(6)' })
  created: Date;

  @UpdateDateColumn({ type: 'timestamp', precision: 6, default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updated: Date;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'register_id' })
  register: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'modify_id' })
  modify: User;

  @Column({ type: 'int', default: 0 })
  is_emergency: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  emergency_car?: string;

  @OneToMany(() => VisitReferalEntity, (vr) => vr.visit)
  visitReferals: VisitReferalEntity[];

   @OneToMany(() => VisitRoomEntity, (visitRoom) => visitRoom.visit)
  visitRooms: VisitRoomEntity[];
}
