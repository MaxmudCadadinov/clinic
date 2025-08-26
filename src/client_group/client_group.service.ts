import { Injectable, NotFoundException } from '@nestjs/common';
import { DTOClientGroup } from './client_group.dto/client_group.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientGroupEntity } from './client_group.entity/client_group.entity';
import { UpdateClientGroupDto } from './client_group.dto/updateClient_group.dto';
import { User } from '../users/entities/users.entity'


@Injectable()
export class ClientGroupService {
    constructor(
    @InjectRepository(ClientGroupEntity)
    private readonly clientGroupRepository: Repository<ClientGroupEntity>,
    @InjectRepository(User)
    private readonly userEntity: Repository<User>){}
   
    async addClientGroup( dto: DTOClientGroup, created_user) {
        const existingClientGroup = await this.clientGroupRepository.findOne({ where: { name: dto.name } });
        const creat_user = await this.userEntity.findOne({where:{id:Number(created_user)}})
        if (!existingClientGroup) { throw new NotFoundException('Client group with this name founded')}
        if(!creat_user){throw new NotFoundException('created user not founded')}
        const newClientGroup = this.clientGroupRepository.create({name: dto.name, register: creat_user });
        await this.clientGroupRepository.save(newClientGroup);
        return { message: 'Client Group added successfully' };
        }
    

    async getAllClientGroups() {
        return await this.clientGroupRepository.find();
    }
    
    async updateClientGroup(id: string, dto: UpdateClientGroupDto, updated_user) {
        const updateclient_group = await this.clientGroupRepository.findOne({ where: { id: Number(id) } });
        const update_user = await this.userEntity.findOne({where: {id: Number(updated_user)}})
        if(!update_user){throw new NotFoundException("created user not found")}
        if (!updateclient_group) {throw new Error(`Client Group with id=${id} not found`);}
        
        if(dto.name){updateclient_group.name = dto.name}
        if(dto.status !== undefined ){updateclient_group.status}
        updateclient_group.modify = update_user
        return this.clientGroupRepository.save(updateclient_group);
    }


    async deleteClientGroup(id: string) {
        const clientGroup = await this.clientGroupRepository.findOne({ where: { id: Number(id) } });
        if (!clientGroup) {
            throw new NotFoundException("created user not found")
        }
        await this.clientGroupRepository.remove(clientGroup);
        return { message: 'Client Group deleted successfully' };
    }
}


