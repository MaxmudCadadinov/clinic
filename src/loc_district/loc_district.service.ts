import { Injectable, OnModuleInit, NotFoundException} from '@nestjs/common';
import { DTOlocDistrict } from './loc_district.dto/loc_district.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { loc_districtEntitiy } from './loc_district.entity/loc_district.entity';
import { loc_regionEntitiy } from 'src/loc_region/loc_region.entity/loc_region.entity';
import { Updateloc_districtDto } from './loc_district.dto/update_loc_district.dto';



@Injectable()
export class LocDistrictService implements OnModuleInit{
    constructor(
        @InjectRepository(loc_districtEntitiy)
        private readonly locDistrictEntity: Repository<loc_districtEntitiy>,
        @InjectRepository(loc_regionEntitiy)
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
        const loc_region = await this.locRegionEntity.findOne({where:{id:Number(dto.region_id)}})
        if (!existingLocDistrict) {throw new NotFoundException('loc_region with this name founded')}
        if (!loc_region){throw new NotFoundException("loc_region not found")}
        const newLocDistrict = await this.locDistrictEntity.create({name: dto.name, region:loc_region });
            await this.locDistrictEntity.save(newLocDistrict);
            return { message: 'Location District added successfully', newLocDistrict };
        }


async getAllLocDistricts() {
    return await this.locDistrictEntity.find({ relations: ['region'] });        
}

async updateLocDistrict(id: string, dto: Updateloc_districtDto) {
    const locDistrict = await this.locDistrictEntity.findOne({ where: { id: Number(id) } });
    const region = await this.locRegionEntity.findOne({where:{id: dto.region_id}})
    if (!region){throw new NotFoundException("region not found")}
    if (!locDistrict) {throw new NotFoundException('Location District not found');}
    
    if(dto.name){locDistrict.name = dto.name}
    if(dto.region_id){locDistrict.region = region}
    if(dto.status !== undefined){locDistrict.status = dto.status}

    return await this.locDistrictEntity.save(locDistrict)
}

async deleteLocDistrict(id: string) {
    const locDistrict = await this.locDistrictEntity.findOne({ where: { id: Number(id) } });
    if (!locDistrict) {
        throw new NotFoundException("District not found")
    }
    await this.locDistrictEntity.remove(locDistrict);
    return { message: 'Location District deleted successfully' };
}
}