import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn} from 'typeorm';
import { SourceEntity } from '../../source/source.entity/source.entity';
import { User } from '../../users/entities/users.entity';


export enum clientType {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}

@Entity('client')
export class ClientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  phone: string;

  @Column({ type: 'enum', enum: clientType })
  gender: clientType

  @Column({ type: 'date', nullable: true })
  birthday: Date | null;
  
  @Column({ type: 'varchar', length: 255, nullable: true })
  address: string | null;

  @Column({ type: 'double', default: 0 })
  balance: number;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'int', nullable: true })
  status: number;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @UpdateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated: Date;

  @ManyToOne(() => SourceEntity)
  @JoinColumn({ name: 'source_id' })
  source: SourceEntity;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'register_id' })
  register: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'modify_id' })
  modify: User;




}