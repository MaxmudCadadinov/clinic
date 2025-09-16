import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Visit } from '../visit/visit.entity';
import { ReferalEntity } from '../referal/referal.entity';
import { ServiceEntity } from '../service/service_entity/service.entity';
import { User } from '../users/entities/users.entity';

@Entity('visit_referal')
export class VisitReferalEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Visit, (visit) => visit.visitReferals, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  @JoinColumn({ name: 'visit_id' })
  visit: Visit;

  @ManyToOne(() => ReferalEntity, (referal) => referal.visitReferals, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  @JoinColumn({ name: 'referal_id' })
  referal: ReferalEntity;

  @ManyToOne(() => ServiceEntity, (service) => service.visitReferals, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  @JoinColumn({ name: 'service_id' })
  service: ServiceEntity;

  @Column({ type: 'decimal', precision: 19, scale: 2, default: 0 })
  price: number;

  @Column({ type: 'decimal', precision: 19, scale: 2, default: 0 })
  price_referal: number;

  @Column({ type: 'int', default: 1 })
  status: number;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP(6)' })
  created: Date;

  @UpdateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updated: Date;

  @ManyToOne(() => User, (user) => user.registeredVisitReferals, { nullable: true })
  @JoinColumn({ name: 'register_id' })
  register?: User;

  @ManyToOne(() => User, (user) => user.modifiedVisitReferals, { nullable: true })
  @JoinColumn({ name: 'modify_id' })
  modify?: User;
}
