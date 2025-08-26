import { Injectable, NotFoundException, OnModuleInit} from '@nestjs/common';
import { DTOlocRegion } from './loc_region.dto/loc_region.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { loc_regionEntitiy } from './loc_region.entity/loc_region.entity';
import { UpdateRegionDto } from './loc_region.dto/update_loc_region.dto';



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
        if (!existingLocRegion) {throw new NotFoundException("Region name faunded")} 
        const new_region = await this.locRegionEntity.create({name: dto.name})
        await this.locRegionEntity.save(new_region)
        return {message: "new region saved", region: new_region}
    }

    async getAllLocRegions() {
        return await this.locRegionEntity.find();
    }

    async updateLocRegion(id: string, dto: UpdateRegionDto) {
        const locRegion = await this.locRegionEntity.findOne({ where: { id: Number(id) } });
        if (!locRegion) {throw new NotFoundException("Loc_region not faund")}
        
        if(dto.name){locRegion.name = dto.name}
        if(dto.status !== undefined ){locRegion.status = dto.status}
        await this.locRegionEntity.save(locRegion);
        return { message: 'Location Region updated successfully', locRegion };
    }

    async deleteLocRegion(id: string) {
        const locRegion = await this.locRegionEntity.findOne({ where: { id: Number(id) } });
        if (!locRegion) {throw new NotFoundException("region not found")}
        await this.locRegionEntity.remove(locRegion);
        return { message: 'Location Region deleted successfully' };
    }
}
