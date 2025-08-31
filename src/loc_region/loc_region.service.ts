import { Injectable, NotFoundException, OnModuleInit} from '@nestjs/common';
import { DTOlocRegion } from './loc_region.dto/loc_region.dto';
import { Repository, Like, Between, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { loc_regionEntitiy } from './loc_region.entity/loc_region.entity';
import { UpdateRegionDto } from './loc_region.dto/update_loc_region.dto';
import { LocRegionFilterDto } from './loc_region.dto/RegionFilterDto'


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
        if (existingLocRegion) {throw new NotFoundException("Region name faunded")} 
        const new_region = await this.locRegionEntity.create({name: dto.name})
        await this.locRegionEntity.save(new_region)
        return new_region
    }

    async getAllLocRegions(dto: LocRegionFilterDto) {
        
        const where: any = {}
        if(dto.name){where.name = Like(`${dto.name}%`)}
        if(dto.status !== 0){where.status = Number(dto.status)}
        
        if(dto.created_from && dto.created_to){
            where.created = Between(new Date(dto.created_from), new Date(dto.created_to))
        }else if(!dto.created_from && dto.created_to){
            where.created = LessThanOrEqual(new Date(dto.created_to))
        }else if(dto.created_from && !dto.created_to){
            where.created = MoreThanOrEqual(new Date(dto.created_from))}
            
        const page = dto.page && dto.page > 0 ? dto.page : 1;
        const limit = dto.limit && dto.limit > 0 ? dto.limit : 10;

        const [all_region, total] = await this.locRegionEntity.findAndCount({where,
        skip: (page - 1) * limit, take: limit, order: { created: 'DESC' } });
        
        return {total, all_region}
        
    }

    async updateLocRegion(id: string, dto: UpdateRegionDto) {
        const locRegion = await this.locRegionEntity.findOne({ where: { id: Number(id) } });
        if (!locRegion) {throw new NotFoundException("Loc_region not faund")}
        
        if(dto.name){
            const ex = await this.locRegionEntity.findOne({where: {name: dto.name}})
            if(ex){throw new NotFoundException("region name with this name faunded")}
            locRegion.name = dto.name}
        if(dto.status !== undefined ){locRegion.status = dto.status}
        await this.locRegionEntity.save(locRegion);
        return locRegion 
    }

    async deleteLocRegion(id: string) {
        const locRegion = await this.locRegionEntity.findOne({ where: { id: Number(id) } });
        if (!locRegion) {throw new NotFoundException("region not found")}
        await this.locRegionEntity.update(locRegion.id, {status: 0});
        return { message: 'Location Region deleted successfully' };
    }
}
