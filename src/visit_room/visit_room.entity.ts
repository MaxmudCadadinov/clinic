import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn,} from 'typeorm';
import { Room } from '../room/room.entity';
import { Visit } from '../visit/visit.entity';
import { ClientEntity } from '../client/client.entity/client.entity';
import { User } from '../users/entities/users.entity';

@Entity('visit_room')
export class VisitRoomEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Room, (room) => room.visitRooms, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  @JoinColumn({ name: 'room_id' })
  room: Room;

  @ManyToOne(() => Visit, (visit) => visit.visitRooms, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  @JoinColumn({ name: 'visit_id' })
  visit: Visit;

  @ManyToOne(() => ClientEntity, (client) => client.visitRooms, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  @JoinColumn({ name: 'client_id' })
  client: ClientEntity;

  @Column({ type: 'varchar', length: 255, nullable: true })
  card_number?: string;

  @Column({ type: 'int', nullable: true })
  card_id?: number;

  @Column({ type: 'date', nullable: true })
  date_start?: Date;

  @Column({ type: 'date', nullable: true })
  date_end?: Date;

  @Column({
    type: 'enum',
    enum: ['TREAT', 'GONE'],
    default: 'TREAT',
  })
  state: 'TREAT' | 'GONE';

  @Column({ type: 'int', default: 1 })
  status: number;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP(6)' })
  created: Date;

  @UpdateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updated: Date;

  @ManyToOne(() => User, (user) => user.registeredVisitRooms, { nullable: true })
  @JoinColumn({ name: 'register_id' })
  register?: User;

  @ManyToOne(() => User, (user) => user.modifiedVisitRooms, { nullable: true })
  @JoinColumn({ name: 'modify_id' })
  modify?: User;

  @ManyToOne(() => User, (user) => user.doctorVisitRooms, { nullable: true })
  @JoinColumn({ name: 'doctor_id' })
  doctor?: User;

  @Column({ type: 'int', default: 0 })
  is_food_connected: number;

  @Column({ type: 'decimal', precision: 19, scale: 2, default: 0 })
  price: number;

  @Column({ type: 'decimal', precision: 19, scale: 2, default: 0 })
  price_count: number;
}
