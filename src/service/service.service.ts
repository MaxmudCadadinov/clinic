import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceEntity } from './service_entity/service.entity';
import { DTOService } from './serviсe.dto/serviceDTO';
import { UpdateServiceDto } from './serviсe.dto/update_service.dto';
import { User } from '../users/entities/users.entity'
import { BadRequestException } from '@nestjs/common'
import { DepartamentEntity } from '../departament/deportament_entity/deportament.entity'


@Injectable()
export class ServiceService {
    constructor(
        @InjectRepository(ServiceEntity)
        private readonly serviceEntity: Repository<ServiceEntity>,
        @InjectRepository(User)
        private readonly userEntity: Repository<User>,
        @InjectRepository(DepartamentEntity)
        private readonly departamentEntity: Repository<DepartamentEntity>
    ){}

    async add_service(dto: DTOService, registered_id) {
        const existingService = await this.serviceEntity.findOne({ where: { name: dto.name } });
        if (existingService) {
            throw new BadRequestException('Service already exists' );
        } else {
            const registered_user = await this.userEntity.findOne({ where: {id: Number(registered_id)} })
            const departament = await this.departamentEntity.findOne({where: {id:dto.departament_id }})
            
            if (!departament || !registered_user){throw new NotFoundException('departament or Register user not found') }
            const newService = this.serviceEntity.create({
                name: dto.name,
                price: dto.price,
                departament: departament,
                register: registered_user 
            });
            await this.serviceEntity.save(newService);
            return { message: 'Service added successfully', service: newService };
        }
    }

    async get_all_services() {
        return await this.serviceEntity.find({relations: ['departament', 'modify', 'register']});
    }

    async update_service(id: string, dto: UpdateServiceDto, updated_user_id) {

        const service = await this.serviceEntity.findOne({where: {id: Number(id)}})
        const updated_user = await this.userEntity.findOne({where:{id: Number(updated_user_id)}})
        console.log(service, updated_user)
        if (!service || !updated_user){throw new NotFoundException(`service or updated_user not found`)}
        if(dto.name){service.name = dto.name}
        if(dto.price !==undefined){service.price = dto.price}
        if(dto.status !==undefined){service.status = dto.status}
        if(dto.departament_id){
            const departament = await this.departamentEntity.findOne({where:{id: dto.departament_id}})
            if (!departament){throw new NotFoundException(`departament not found`)}
            service.departament = departament
        }
        service.modify = updated_user

        await this.serviceEntity.save(service)
        return {message: 'service updated'}
        
    }

    async delete_service(id: string) {
        const user = await this.serviceEntity.findOne({ where: { id: Number(id) } });
        if (!user) {
            throw new NotFoundException(`service not found`)
        }
        await this.serviceEntity.remove(user);
        return { message: 'User deleted successfully' };
    }
}
