import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { loc_regionEntitiy } from 'src/loc_region/loc_region.entity/loc_region.entity';


@Entity('loc_district')
export class loc_districtEntitiy {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'int', default: 1 })
    status: number;

    @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    created: Date;

    @UpdateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
    updated: Date;

    @ManyToOne(() => loc_regionEntitiy, (loc_region) => loc_region.region_loc_districts)
    @JoinColumn({ name: 'region_id' })
    region: loc_regionEntitiy;
}