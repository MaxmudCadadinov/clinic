import { Injectable, OnModuleInit} from '@nestjs/common';
import { DTOlocDistrict } from './loc_district.dto/loc_district.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { loc_districtEntitiy } from './loc_district.entity/loc_district.entity';
import { loc_regionEntitiy } from 'src/loc_region/loc_region.entity/loc_region.entity';


@Injectable()
export class LocDistrictService implements OnModuleInit{
    constructor(
        @InjectRepository(loc_districtEntitiy)
        private readonly locDistrictEntity: Repository<loc_districtEntitiy>,@InjectRepository(loc_regionEntitiy)
        private readonly locRegionEntity: Repository<loc_regionEntitiy>){}
    
        async onModuleInit() {
            const currentCount=await this.locDistrictEntity.count();
            if(currentCount==0){
                for(let i=0; i<5; i++){
                    const region=await this.locRegionEntity.findOne({ where: { } });
                    if(!region) return
        const defaultUser = this.addLocDistrict({
            name: `Region ${i + 1}`,
            region_id: region.id
        }); 
                }
            }
        }


    async addLocDistrict(dto: DTOlocDistrict) {
        const existingLocDistrict = await this.locDistrictEntity.findOne({ where: { name: dto.name } });
        if (existingLocDistrict) {
            return { message: 'Location District already exists' };
        } else {
            const newLocDistrict = this.locDistrictEntity.create({
                name: dto.name,
                region:{id: dto.region_id}
            });
            await this.locDistrictEntity.save(newLocDistrict);
            return { message: 'Location District added successfully' };
        }
}

async getAllLocDistricts() {
    return await this.locDistrictEntity.find({ relations: ['region'] });        
}

async deleteLocDistrict(id: string) {
    const locDistrict = await this.locDistrictEntity.findOne({ where: { id: Number(id) } });
    if (!locDistrict) {
        return { message: 'Location District not found' };
    }
    await this.locDistrictEntity.remove(locDistrict);
    return { message: 'Location District deleted successfully' };
}
}