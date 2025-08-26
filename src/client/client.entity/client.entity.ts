import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn} from 'typeorm';
import { SourceEntity } from '../../source/source.entity/source.entity';
import { User } from '../../users/entities/users.entity';
import { ClientGroupEntity } from '../../client_group/client_group.entity/client_group.entity'; // Adjust the import path as necessary
import { loc_regionEntitiy } from '../../loc_region/loc_region.entity/loc_region.entity';
import { loc_districtEntitiy } from 'src/loc_district/loc_district.entity/loc_district.entity';

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
  description: string | null

  @Column({ type: 'int', default: 1 })
  status: number;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @UpdateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated: Date;

  @ManyToOne(() => SourceEntity, { nullable: true })
  @JoinColumn({ name: 'source_id' })
  source: SourceEntity;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'register_id' })
  register: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'modify_id' })
  modify: User;

  @ManyToOne(() => ClientGroupEntity)
  @JoinColumn({ name: 'group_id' })
  group: ClientGroupEntity;

  @ManyToOne(() => loc_regionEntitiy, { nullable: true })
  @JoinColumn({ name: 'region_id' })
  region: loc_regionEntitiy;

  @ManyToOne(() => loc_districtEntitiy, { nullable: true })
  @JoinColumn({ name: 'district_id' })
  district: loc_districtEntitiy;

}