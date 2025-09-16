import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm';
import { User } from '../users/entities/users.entity';
import { DepartamentEntity } from '../departament/deportament_entity/deportament.entity';
import { VisitRoomEntity } from 'src/visit_room/visit_room.entity';

@Entity('room')
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name?: string;

  @ManyToOne(() => DepartamentEntity, { nullable: true })
  @JoinColumn({ name: 'departament_id' })
  departament?: DepartamentEntity;

  @Column({ type: 'int', default: 0 })
  capacity: number;

  @Column({ type: 'int', default: 0 })
  count_patient: number;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @Column({ type: 'decimal', precision: 19, scale: 2, default: 0 })
  price: number;

  @Column({ type: 'decimal', precision: 19, scale: 2, default: 0 })
  price_food: number;

  @Column({
    type: 'enum',
    enum: ['WORKING', 'CLOSED', 'FULL'],
    nullable: true,
  })
  state?: 'WORKING' | 'CLOSED' | 'FULL';

  @Column({ type: 'int', nullable: true })
  status?: number;

  @CreateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created: Date;

  @UpdateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated: Date;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'register_id' })
  register?: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'modify_id' })
  modify?: User;

  @OneToMany(() => VisitRoomEntity, (visitRoom) => visitRoom.room)
  visitRooms: VisitRoomEntity[];
}
