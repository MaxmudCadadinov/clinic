import { Injectable, NotFoundException } from '@nestjs/common';
import { DTOSource } from './source.dto/source.dto';
import { Repository, Like, Between, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SourceEntity } from './source.entity/source.entity';
import { UpdateSourceDto } from './source.dto/update_source.dto';
import { SourceFilterDto } from './source.dto/sourceFilterDto'

@Injectable()
export class SourceService {

    constructor(
        @InjectRepository(SourceEntity)
        private readonly sourceEntity: Repository<SourceEntity>,
    ) {}
    
    async addSource(dto: DTOSource) {
        const existingSource = await this.sourceEntity.findOne({ where: { name: dto.name } });
        if (existingSource) {throw new NotFoundException('Source already exists')};
        const newSource = this.sourceEntity.create({name: dto.name,});
        await this.sourceEntity.save(newSource);
        return newSource
        }


    async getAllSources(dto: SourceFilterDto) {

        const where: any = {}
        if(dto.name){where.name = Like(`${dto.name}%`)}
        if(dto.status!==undefined){where.status = Number(dto.status)}
        
        if(dto.created_from && dto.created_to){
            where.created = Between(new Date(dto.created_from), new Date(dto.created_to))
        }else if(!dto.created_from && dto.created_to){
            where.created = LessThanOrEqual(new Date(dto.created_to))
        }else if(dto.created_from && !dto.created_to){
            where.created = MoreThanOrEqual(new Date(dto.created_from))}

        const page = dto.page && dto.page > 0 ? dto.page : 1;
        const limit = dto.limit && dto.limit > 0 ? dto.limit : 10;

        const [all_sources, total] =  await this.sourceEntity.findAndCount({where,
           skip: (page - 1) * limit, take: limit, order: { created: 'DESC' }});
        return {total, all_sources}
    
    }

    async updateSource(id: string, dto: UpdateSourceDto) {
        const source = await this.sourceEntity.findOne({ where: { id: Number(id) } });
        if (!source) {throw new NotFoundException(`Source with id=${id} not found`);}
        
        if(dto.name!==undefined){
            const ex = await this.sourceEntity.findOne({where:{name: dto.name}})
            if(ex){throw new NotFoundException("source with this name founded")}
            source.name = dto.name}
        if(dto.status !== undefined){source.status = dto.status}
        return this.sourceEntity.save(source);
    }

    async deleteSource(id: string) {
        const source = await this.sourceEntity.findOne({ where: { id: Number(id) } });
        if (!source) {
            throw new NotFoundException(`Source with id=${id} not found`);
        }
        await this.sourceEntity.update(source.id, {status: 0});
        return { message: 'Source deleted successfully' };
    }
    
}
