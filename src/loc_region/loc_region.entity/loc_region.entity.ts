import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { loc_districtEntitiy } from 'src/loc_district/loc_district.entity/loc_district.entity';
import { ClientEntity } from '../../client/client.entity/client.entity';

@Entity('loc_region')
export class loc_regionEntitiy {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'int', default: 1 })
    status: number;

    @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP(6)' })
    created: Date;

    @UpdateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
    updated: Date;

    @OneToMany(() => loc_districtEntitiy, (loc_district) => loc_district.region)
    region_loc_districts: loc_districtEntitiy[];

    @OneToMany(() => ClientEntity, (cliententity) => cliententity.region)
    client: ClientEntity[];

}