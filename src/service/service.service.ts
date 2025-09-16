import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Between, MoreThanOrEqual, LessThanOrEqual, Not } from 'typeorm';
import { ServiceEntity } from './service_entity/service.entity';
import { DTOService } from './serviсe.dto/serviceDTO';
import { UpdateServiceDto } from './serviсe.dto/update_service.dto';
import { User } from '../users/entities/users.entity'
import { BadRequestException } from '@nestjs/common'
import { DepartamentEntity } from '../departament/deportament_entity/deportament.entity'
import { FilterServiceDTO } from './serviсe.dto/serviceFilter.dto'

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
        if (existingService) {throw new BadRequestException('Service already exists' )}
        
        const registered_user = await this.userEntity.findOne({ where: {id: Number(registered_id)} })
        if(!registered_user){throw new NotFoundException("registerid_user not found")}
        const departament = await this.departamentEntity.findOne({where: {id:dto.departament_id }})
        if (!departament ){throw new NotFoundException('departament id not found') }
            const newService = this.serviceEntity.create({
                name: dto.name,
                price: dto.price,
                departament: departament,
                register: registered_user 
            });
            await this.serviceEntity.save(newService);
            return newService 
        }
    

    async get_all_services(dto: FilterServiceDTO) {
        
        const where: any = {}

        if(dto.name){where.name = Like(`%${dto.name}%`)}

        if(dto.price_min !== undefined && Number(dto.price_max) !== undefined){
            where.price = Between(Number(dto.price_min), Number(dto.price_max))
        }else if(dto.price_min !==undefined && dto.price_max === undefined){
            where.price = MoreThanOrEqual(Number(dto.price_min))
        }else if(dto.price_min === undefined && dto.price_max !==undefined){
            where.price = LessThanOrEqual(Number(dto.price_max))}

        if(dto.departament_id){where.departament = {id: Number(dto.departament_id)}}        
        if(dto.status!==undefined){where.status = Number(dto.status)
        }else {where.status = Not(0)}
        
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

        const [all_services, total] = await this.serviceEntity.findAndCount({where, 
            relations: ['departament', 'modify', 'register'],
            skip: (page - 1) * limit, take: limit, order: { created: 'DESC' }});

        const map = all_services.map(service =>({...service, 
            departament_id: service.departament?.id ?? null,
            modify_id: service.modify?.id ?? null,
            register_id: service.register?.id ?? null}))
        
        return {map, total}
    }

    async update_service(id: string, dto: UpdateServiceDto, updated_user_id) {

        const service = await this.serviceEntity.findOne({where: {id: Number(id)}})
        if (!service ){throw new NotFoundException(`service not found`)}
        const updated_user = await this.userEntity.findOne({where:{id: Number(updated_user_id)}})
        if (!updated_user ){throw new NotFoundException(`updated user not found`)}
        //console.log(service, updated_user)
        if(dto.name){
            const ex = await this.serviceEntity.findOne({where:{name: dto.name}})
            if(ex){throw new NotFoundException('service with this name founded')}
            service.name = dto.name}
        if(dto.price !==undefined){service.price = dto.price}
        if(dto.status !==undefined){service.status = dto.status}
        if(dto.departament_id){
            const departament = await this.departamentEntity.findOne({where:{id: dto.departament_id}})
            if (!departament){throw new NotFoundException(`departament not found`)}
            service.departament = departament
        }
        service.modify = updated_user

        
        return await this.serviceEntity.save(service)
    
        
    }

    async delete_service(id: string) {
        const user = await this.serviceEntity.findOne({ where: { id: Number(id) } });
        if (!user) {
            throw new NotFoundException(`service not found`)
        }
        await this.serviceEntity.update(user.id, {status: 0});
        return { message: 'User deleted successfully' };
    }
}
