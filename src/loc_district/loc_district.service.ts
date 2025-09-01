import { Injectable, OnModuleInit, NotFoundException} from '@nestjs/common';
import { DTOlocDistrict } from './loc_district.dto/loc_district.dto';
import { Repository, Like, Between, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { loc_districtEntitiy } from './loc_district.entity/loc_district.entity';
import { loc_regionEntitiy } from 'src/loc_region/loc_region.entity/loc_region.entity';
import { Updateloc_districtDto } from './loc_district.dto/update_loc_district.dto';
import { LocDistrictFilterDto } from './loc_district.dto/loc_districtFilter.dto'


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
        if (existingLocDistrict) {throw new NotFoundException('loc_region with this name founded')}
        if (!loc_region){throw new NotFoundException("loc_region not found")}
        const newLocDistrict = await this.locDistrictEntity.create({name: dto.name, region:loc_region });
            await this.locDistrictEntity.save(newLocDistrict);
            return newLocDistrict 
        }


async getAllLocDistricts(dto: LocDistrictFilterDto) {
    
    const where: any = {}

    if(dto.name){where.name = Like(`%${dto.name}%`)}
    if(dto.status!==undefined){where.status = Number(dto.status)}
    if(dto.region_id){where.region = {id: Number(dto.region_id)}}
    
    if(dto.created_from && dto.created_to){
        
        const toDate = new Date(dto.created_to);
        const fromDate = new Date(dto.created_from)
        toDate.setHours(23, 59, 59, 999)
        fromDate.setHours(0, 0, 0, 0)
        
        where.created = Between(fromDate, toDate )
    }else if(!dto.created_from && dto.created_to){
        
        const toDate = new Date(dto.created_to);
        toDate.setHours(23, 59, 59, 999)

        where.created = LessThanOrEqual(toDate)
    }else if(dto.created_from && !dto.created_to){
        
        const fromDate = new Date(dto.created_from)
        fromDate.setHours(0, 0, 0, 0)
        where.created = MoreThanOrEqual(fromDate)}
    
    const page = dto.page && dto.page > 0 ? dto.page : 1;
    const limit = dto.limit && dto.limit > 0 ? dto.limit : 10;

    const [all_districts, total] = await this.locDistrictEntity.findAndCount({where,
         relations: ['region'],
         skip: (page - 1) * limit, take: limit, order: { created: 'DESC' }});
    
    
    const map = all_districts.map(
    district => ({
        region_id: district.region?.id ?? null,
        ...district
        })
    )
    return {total, map}        
}

async updateLocDistrict(id: string, dto: Updateloc_districtDto) {
    const locDistrict = await this.locDistrictEntity.findOne({ where: { id: Number(id) } });
    if (!locDistrict) {throw new NotFoundException('Location District not found');}
    
    if(dto.name!==undefined){
        const ex = await this.locDistrictEntity.findOne({where:{name: dto.name}})
        if(ex){throw new NotFoundException('district with this name founded')}
        locDistrict.name = dto.name}
    if(dto.region_id!==undefined){
        const region = await this.locRegionEntity.findOne({where:{id: dto.region_id}})
        if (!region){throw new NotFoundException("region not found")}
        locDistrict.region = region}
    if(dto.status !== undefined){locDistrict.status = dto.status}

    return await this.locDistrictEntity.save(locDistrict)
}

async deleteLocDistrict(id: string) {
    const locDistrict = await this.locDistrictEntity.findOne({ where: { id: Number(id) } });
    if (!locDistrict) {
        throw new NotFoundException("District not found")
    }
    await this.locDistrictEntity.update(locDistrict.id, {status: 0});
    return { message: 'Location District deleted successfully' };
}
}