import { Injectable, OnModuleInit} from '@nestjs/common';
import { DTOlocRegion } from './loc_region.dto/loc_region.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { loc_regionEntitiy } from './loc_region.entity/loc_region.entity';

@Injectable()
export class LocRegionService implements OnModuleInit {
    constructor(
        @InjectRepository(loc_regionEntitiy)
        private readonly locRegionEntity: Repository<loc_regionEntitiy>,){}

        async onModuleInit() {
            const currentCount=await this.locRegionEntity.count();
            if(currentCount==0){
                for(let i=0; i<5; i++){
                let defaultRole = await this.locRegionEntity.findOne({ where: { name: 'user' } });
        if (!defaultRole) {
            defaultRole = this.locRegionEntity.create({ name: 'user' });
            await this.locRegionEntity.save(defaultRole);
        }
        const defaultUser = this.addLocRegion({
            name: `Region ${i + 1}`
           
        }); 
                }
            }
        }
    async addLocRegion(dto: DTOlocRegion) {
        const existingLocRegion = await this.locRegionEntity.findOne({ where: { name: dto.name } });
        if (existingLocRegion) {
            return { message: 'Location Region already exists' };
        } else {
            const newLocRegion = this.locRegionEntity.create({
                name: dto.name
            });
            await this.locRegionEntity.save(newLocRegion);
            return { message: 'Location Region added successfully' };
        }
    }

    async getAllLocRegions() {
        return await this.locRegionEntity.find();
    }

    async deleteLocRegion(id: string) {
        const locRegion = await this.locRegionEntity.findOne({ where: { id: Number(id) } });
        if (!locRegion) {
            return { message: 'Location Region not found' };
        }
        await this.locRegionEntity.remove(locRegion);
        return { message: 'Location Region deleted successfully' };
    }
}
