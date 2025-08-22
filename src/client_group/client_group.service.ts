import { Injectable } from '@nestjs/common';
import { DTOClientGroup } from './client_group.dto/client_group.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientGroupEntitiy } from './client_group.entity/client_group.entity';


@Injectable()
export class ClientGroupService {
    constructor(
    @InjectRepository(ClientGroupEntitiy)
    private readonly clientGroupRepository: Repository<ClientGroupEntitiy> ){}
   
    async addClientGroup(dto: DTOClientGroup) {
        const existingClientGroup = await this.clientGroupRepository.findOne({ where: { name: dto.name } });
        if (existingClientGroup) {
            return { message: 'Client Group already exists' };
        } else {
            const newClientGroup = this.clientGroupRepository.create({
                name: dto.name,
                register: {id: dto.register_id}
            });
            await this.clientGroupRepository.save(newClientGroup);
            return { message: 'Client Group added successfully' };
        }
    }

    async getAllClientGroups() {
        return await this.clientGroupRepository.find();
    }

    async deleteClientGroup(id: string) {
        const clientGroup = await this.clientGroupRepository.findOne({ where: { id: Number(id) } });
        if (!clientGroup) {
            return { message: 'Client Group not found' };
        }
        await this.clientGroupRepository.remove(clientGroup);
        return { message: 'Client Group deleted successfully' };
    }
}


