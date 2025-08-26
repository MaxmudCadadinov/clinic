import { Injectable, NotFoundException } from '@nestjs/common';
import { DTOSource } from './source.dto/source.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SourceEntity } from './source.entity/source.entity';
import { UpdateSourceDto } from './source.dto/update_source.dto';


@Injectable()
export class SourceService {

    constructor(
        @InjectRepository(SourceEntity)
        private readonly sourceEntity: Repository<SourceEntity>,
    ) {}
    
    async addSource(dto: DTOSource) {
        const existingSource = await this.sourceEntity.findOne({ where: { name: dto.name } });
        if (!existingSource) {throw new NotFoundException('Source already exists')};
        const newSource = this.sourceEntity.create({name: dto.name,});
        await this.sourceEntity.save(newSource);
        return { message: 'Source added successfully' };
        }


    async getAllSources() {
        return await this.sourceEntity.find();
    }

    async updateSource(id: string, dto: UpdateSourceDto) {
        const source = await this.sourceEntity.findOne({ where: { id: Number(id) } });
        if (!source) {throw new NotFoundException(`Source with id=${id} not found`);}
        
        if(dto.name){source.name = dto.name}
        if(dto.status !== undefined){source.status = dto.status}
        return this.sourceEntity.save(source);
    }

    async deleteSource(id: string) {
        const source = await this.sourceEntity.findOne({ where: { id: Number(id) } });
        if (!source) {
            throw new NotFoundException(`Source with id=${id} not found`);
        }
        await this.sourceEntity.remove(source);
        return { message: 'Source deleted successfully' };
    }
    
}
