import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ClientEntity } from '../../client/client.entity/client.entity'; // Adjust the import path as necessary
import { User } from '../../users/entities/users.entity'; // Adjust the import path as necessary

@Entity('source')
export class SourceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'int', nullable: true })
  status: number;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @UpdateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated: Date;

  @OneToMany(() => ClientEntity, client => client.source)
  clients: ClientEntity[]; // Assuming ClientEntity is imported from the correct path


}
