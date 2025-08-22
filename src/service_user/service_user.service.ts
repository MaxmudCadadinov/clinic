import { Injectable } from '@nestjs/common';
import { DTOServiceUSer } from './serviceUser.dto/serviceUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceUserEntity } from './service_user.entity/service_user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ServiceUserService {
constructor(
    @InjectRepository(ServiceUserEntity)
    private readonly serviceUserRepository: Repository<ServiceUserEntity>){}
    async addServiceUser(dto: DTOServiceUSer) {
            const newServiceUser = this.serviceUserRepository.create({
                user:{id: dto.user_id} as any,
                service:{id: dto.service_id} as any,
                register:{id: dto.register_id} as any,
                type: dto.type,
                value: dto.value
            });
            await this.serviceUserRepository.save(newServiceUser);
            return { message: 'Service User added successfully', serviceUser: newServiceUser };
        }

    async getAllServiceUsers() {
        return await this.serviceUserRepository.find({relations: ['user', 'service', 'register']});
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
