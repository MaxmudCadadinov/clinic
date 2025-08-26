import { Injectable, NotFoundException } from '@nestjs/common';
import { ClientDto } from './client.dto/client.dto';
import { UpdateClientDto } from './client.dto/update_client.dto';
import { ClientEntity } from './client.entity/client.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SourceEntity } from '../source/source.entity/source.entity'
import { User } from '../users/entities/users.entity'
import { ClientGroupEntity } from '../client_group/client_group.entity/client_group.entity'
import { loc_regionEntitiy } from '../loc_region/loc_region.entity/loc_region.entity'
import { loc_districtEntitiy } from '../loc_district/loc_district.entity/loc_district.entity'



@Injectable()
export class ClientService {
    constructor(
        @InjectRepository(ClientEntity)
        private readonly clientRepository: Repository<ClientEntity>,
        @InjectRepository(SourceEntity)
        private readonly sourceEntity: Repository<SourceEntity>,
        @InjectRepository(User)
        private readonly userEntity: Repository<User>,
        @InjectRepository(ClientGroupEntity)
        private readonly client_groupEntity: Repository<ClientGroupEntity>,
        @InjectRepository(loc_regionEntitiy)
        private readonly regionEntity: Repository<loc_regionEntitiy>,
        @InjectRepository(loc_districtEntitiy)
        private readonly districtEntity: Repository<loc_districtEntitiy>
    ){}

    
async add_client(dto: ClientDto, registered_user) {

    
    const client = await this.clientRepository.findOne({ where: { name: dto.name, phone: dto.phone } })
    if (client){throw new NotFoundException(`Client with name=${dto.name} and phone=${dto.phone}  founded`);}
    const reg_user = await this.userEntity.findOne({where: {id: Number(registered_user)}})
    if(!reg_user){throw new NotFoundException("updated_user not faund")}
    
    const clientData: Partial<ClientEntity> = {
    name: dto.name,
    phone: dto.phone,
    gender: dto.gender,
    birthday: dto.birthday ? new Date(dto.birthday) : null,
    address: dto.address,
    description: dto.description,
    register: reg_user,
    }
    if (dto.source_id) {
    const source = await this.sourceEntity.findOne({ where: { id: dto.source_id } });
    if (!source) throw new NotFoundException(`Source with id=${dto.source_id} not found`);
    clientData.source = source;
}

if (dto.group_id) {
    const group = await this.client_groupEntity.findOne({ where: { id: dto.group_id } });
    if (!group) throw new NotFoundException(`Group with id=${dto.group_id} not found`);
    clientData.group = group;
}

if (dto.region_id) {
    const region = await this.regionEntity.findOne({ where: { id: dto.region_id } });
    if (!region) throw new NotFoundException(`Region with id=${dto.region_id} not found`);
    clientData.region = region;
}

if (dto.district_id) {
    const district = await this.districtEntity.findOne({ where: { id: dto.district_id } });
    if (!district) throw new NotFoundException(`District with id=${dto.district_id} not found`);
    clientData.district = district;
}


    const new_client = this.clientRepository.create(clientData);
    return await this.clientRepository.save(new_client)
}

    async get_all_clients() {
        return await this.clientRepository.find();
    }

    async update_client(id: string, updateClientDto: UpdateClientDto) {
        const client = await this.clientRepository.findOne({ where: { id: Number(id) } });
        if (!client) {
            throw new NotFoundException(`Client with id=${id} not found`);
        }
        Object.assign(client, updateClientDto);
        return this.clientRepository.save(client);

    }

    async delete_client(id: string) {
        const client = await this.clientRepository.findOne({ where: { id: Number(id) } });
        if (!client) {
            return { message: 'Client not found' };
        }
        await this.clientRepository.remove(client);
        return { message: 'Client deleted successfully' };
    }
}
