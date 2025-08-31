import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ClientEntity } from '../../client/client.entity/client.entity'; // Adjust the import path as necessary
import { User } from '../../users/entities/users.entity'; // Adjust the import path as necessary

@Entity('source')
export class SourceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'int', default: 1, nullable: true  })
  status: number;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP(6)' })
  created: Date;

  @UpdateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updated: Date;

  @OneToMany(() => ClientEntity, client => client.source)
  clients: ClientEntity[]; // Assuming ClientEntity is imported from the correct path


}
