import { Injectable } from '@nestjs/common';
import { DTOSource } from './source.dto/source.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SourceEntity } from './source.entity/source.entity';

@Injectable()
export class SourceService {

    constructor(
        @InjectRepository(SourceEntity)
        private readonly sourceEntity: Repository<SourceEntity>,
    ) {}
    
    async addSource(dto: DTOSource) {
        const existingSource = await this.sourceEntity.findOne({ where: { name: dto.name } });
        if (existingSource) {
        return { message: 'Source already exists' };
        } else {
        const newSource = this.sourceEntity.create({
            name: dto.name,
        });
        await this.sourceEntity.save(newSource);
        return { message: 'Source added successfully' };
        }
    }
    
}
