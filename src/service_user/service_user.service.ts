import { Injectable, NotFoundException } from '@nestjs/common';
import { DTOServiceUSer } from './serviceUser.dto/serviceUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceUserEntity } from './service_user.entity/service_user.entity';
import { Repository } from 'typeorm';
import { UpdateUserServiceDto } from './serviceUser.dto/update_service_user.dto';
import { User } from '../users/entities/users.entity'
import { ServiceEntity } from '../service/service_entity/service.entity'


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


    async getAllServiceUsers() {
        return await this.serviceUserRepository.find({relations: ['user', 'service', 'register']});
        
    }

    async updateServiceUser(id: string, dto: UpdateUserServiceDto, updated_id) {
        const serviceUser = await this.serviceUserRepository.findOne({ where: { id: Number(id) } });
        const modified_user = await this.userEntity.findOne({where: {id: Number(updated_id)}})
        if (!serviceUser) {throw new NotFoundException(`User with id=${id} user not found`)}
        if(!modified_user){throw new NotFoundException(`modified user not found`)}
        if(dto.user_id){
            const user = await this.userEntity.findOne({where:{id: Number(dto.user_id)}})
            if (!user){throw new NotFoundException(`user not found`)}
            serviceUser.user = user}
        if(dto.service_id){
            const service = await this.serviceEntity.findOne({where: {id: dto.service_id}})
            if(!service){throw new NotFoundException(`service not found`)}
            serviceUser.service = service}
        if(dto.status){serviceUser.status = dto.status}
        if(dto.type){serviceUser.type = dto.type}
        if(dto.value){serviceUser.value = dto.value} 
        serviceUser.modify = modified_user

        return await this.serviceUserRepository.save(serviceUser)
    }

    async deleteServiceUser(id: string) {
        const serviceUser = await this.serviceUserRepository.findOne({ where: { id: Number(id) } });
        if (!serviceUser) {
            return { message: 'Service User not found' };
        }
        await this.serviceUserRepository.remove(serviceUser);
        return { message: 'Service User deleted successfully' };
    }
}
