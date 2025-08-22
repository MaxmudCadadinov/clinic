import { Injectable } from '@nestjs/common';
import { DTODepartament } from './departament_dto/departament.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DepartamentEntity } from './deportament_entity/deportament.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DepartamentService {
    constructor(
        @InjectRepository(DepartamentEntity)
        private readonly departamentRepository: Repository<DepartamentEntity>,
    ){}
    async add_departament(dto: DTODepartament) {
        const existingDepartament = await this.departamentRepository.findOne({ where: { name: dto.name } });
        if (existingDepartament) {
            return { message: 'Departament already exists' };
        } else {
            const newDepartament = this.departamentRepository.create({
                name: dto.name,
                owner: {id: dto.owner_id},
                register: {id: dto.register_id}
            });
            await this.departamentRepository.save(newDepartament);
            return { message: 'Departament added successfully', departament: newDepartament };
        }
}

    async get_all_departaments() {
        return await this.departamentRepository.find();
    }

    async delete_departament(id: string) {
        const departament = await this.departamentRepository.findOne({ where: { id: Number(id) } });
        if (!departament) {
            return { message: 'Departament not found' };
        }
        await this.departamentRepository.remove(departament);
        return { message: 'Departament deleted successfully' };
    }
   
}