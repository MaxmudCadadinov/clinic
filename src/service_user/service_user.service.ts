import { Injectable, NotFoundException } from '@nestjs/common';
import { DTOServiceUSer } from './serviceUser.dto/serviceUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceUserEntity } from './service_user.entity/service_user.entity';
import { Repository, Between, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';
import { UpdateUserServiceDto } from './serviceUser.dto/update_service_user.dto';
import { User } from '../users/entities/users.entity'
import { ServiceEntity } from '../service/service_entity/service.entity'
import { ServiceUserFilterDto } from './serviceUser.dto/filter_serviceUser.dto'
import { PaginationDto } from '../paginationDTO'

@Injectable()
export class ServiceUserService {
constructor(
    @InjectRepository(ServiceUserEntity)
    private readonly serviceUserRepository: Repository<ServiceUserEntity>,
    @InjectRepository(User)
    private readonly userEntity: Repository<User>,
    @InjectRepository(ServiceEntity)
    private readonly serviceEntity: Repository<ServiceEntity>){}
    
    
    async addServiceUser(dto: DTOServiceUSer, registered_user) {
        const user = await this.userEntity.findOne({where: {id: Number(dto.user_id)}})
        const service = await this.serviceEntity.findOne({where:{id: dto.service_id}})
        const regis_user = await this.userEntity.findOne({where:{id: Number(registered_user)}})
        if(!user){throw new NotFoundException('user not found') }
        if(!service){throw new NotFoundException('service not found')}
        if (!regis_user){throw new NotFoundException('registered_user not found')}
        const newServiceUser = this.serviceUserRepository.create({
            user:user, service:service, register:regis_user, type: dto.type, value: dto.value});
            await this.serviceUserRepository.save(newServiceUser);
            return { message: 'Service User added successfully', serviceUser: newServiceUser };
        }


    async getAllServiceUsers(dto: ServiceUserFilterDto ) {
        const where: any = {};
        if(dto.user_id){where.user = {id: Number(dto.user_id)}}
        if(dto.service_id){where.service = {id: Number(dto.service_id)}}
        if(dto.register_id){where.register = {id: Number(dto.register_id)}}
        if(dto.modify_id){where.modify = {id: Number(dto.modify_id)}}
        if(dto.status!==undefined){where.status = Number(dto.status)}
        if(dto.type){where.type = dto.type}
        if(dto.value!==undefined){where.value = dto.value}
        
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
       
       const [all_service_users, total] = await this.serviceUserRepository.findAndCount({where, 
        relations: ['user', 'service', 'register', 'modify'], 
        skip: (page - 1) * limit, take: limit, order: { created: 'DESC' }});

        const mapped = all_service_users.map(su => ({
        ...su,
        user_id: su.user?.id ?? null,
        service_id: su.service?.id ?? null,
        register_id: su.register?.id ?? null,
        modify_id: su.modify?.id ?? null,
}));

        return {service_users: mapped, total}
    }

    async updateServiceUser(id: string, dto: UpdateUserServiceDto, updated_id) {
        const serviceUser = await this.serviceUserRepository.findOne({ where: { id: Number(id) } });
        if (!serviceUser) {throw new NotFoundException(`User with id=${id} user not found`)}
        const modified_user = await this.userEntity.findOne({where: {id: Number(updated_id)}})
        if(!modified_user){throw new NotFoundException(`modified user not found`)}
        if(dto.user_id!==undefined){
            const user = await this.userEntity.findOne({where:{id: Number(dto.user_id)}})
            if (!user){throw new NotFoundException(`user not found`)}
            serviceUser.user = user}
        if(dto.service_id!==undefined){
            const service = await this.serviceEntity.findOne({where: {id: dto.service_id}})
            if(!service){throw new NotFoundException(`service not found`)}
            serviceUser.service = service}
        if(dto.status!==undefined){serviceUser.status = dto.status}
        if(dto.type!==undefined){serviceUser.type = dto.type}
        if(dto.value!==undefined){serviceUser.value = dto.value} 
        serviceUser.modify = modified_user

        return await this.serviceUserRepository.save(serviceUser)
    }

    async deleteServiceUser(id: string) {
        const serviceUser = await this.serviceUserRepository.findOne({ where: { id: Number(id) } });
        if (!serviceUser) {
            return { message: 'Service User not found' };
        }
        await this.serviceUserRepository.update(serviceUser.id, {status: 0});
        return { message: 'Service User deleted successfully' };
    }
}
