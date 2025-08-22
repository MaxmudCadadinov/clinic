import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceEntity } from './service_entity/service.entity';
import { DTODepartament } from './serviсe.dto/serviceDTO';

@Injectable()
export class ServiceService {
    constructor(
        @InjectRepository(ServiceEntity)
        private readonly serviceEntity: Repository<ServiceEntity>,
    ){}

    async add_departament(dto: DTODepartament) {
        const existingService = await this.serviceEntity.findOne({ where: { name: dto.name } });
        if (existingService) {
            return { message: 'Service already exists' };
        } else {
            const newService = this.serviceEntity.create({
                name: dto.name,
                price: dto.price,
                departament: {id: dto.departament_id},
                register: {id: dto.register_id} 
            });
            await this.serviceEntity.save(newService);
            return { message: 'Service added successfully', service: newService };
        }
    }

    async get_all_user() {
        return await this.serviceEntity.find();
    }

    async delete_user(id: string) {
        const user = await this.serviceEntity.findOne({ where: { id: Number(id) } });
        if (!user) {
            return { message: 'User not found' };
        }
        await this.serviceEntity.remove(user);
        return { message: 'User deleted successfully' };
    }
}
