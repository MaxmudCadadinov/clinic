import { Injectable, NotFoundException } from '@nestjs/common';
import { ClientDto } from './client.dto/client.dto';
import { UpdateClientDto } from './client.dto/update_client.dto';
import { ClientEntity } from './client.entity/client.entity';
import { Repository, Like, Between, MoreThanOrEqual, LessThanOrEqual, Not } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SourceEntity } from '../source/source.entity/source.entity'
import { User } from '../users/entities/users.entity'
import { ClientGroupEntity } from '../client_group/client_group.entity/client_group.entity'
import { loc_regionEntitiy } from '../loc_region/loc_region.entity/loc_region.entity'
import { loc_districtEntitiy } from '../loc_district/loc_district.entity/loc_district.entity'
import { ClientFilterDto } from './client.dto/filter_client.dto';


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


    async get_all_clients(dto: ClientFilterDto ) {
        const where: any = {}
        if(dto.name){where.name = Like(`%${dto.name}%`) }
        if(dto.phone){where.phone = dto.phone}
        if(dto.group_id){where.group = {id: Number(dto.group_id)}}
        if(dto.gender){where.gender = dto.gender}
        
        if(!dto.birthday_from && dto.birthday_to){
            where.birthday = LessThanOrEqual(new Date(dto.birthday_to))
        }else if(dto.birthday_from && !dto.birthday_to){
            where.birthday = MoreThanOrEqual(new Date(dto.birthday_from))
        }else if(dto.birthday_from && dto.birthday_to){
            where.birthday = Between(new Date(dto.birthday_from), new Date(dto.birthday_to))}
        
        if(dto.region_id){where.region = {id: Number(dto.region_id)}}
        
    
        if(dto.balance_min === undefined && dto.balance_max !== undefined){
            where.balance = LessThanOrEqual(dto.balance_max)
        }else if(dto.balance_min !== undefined && dto.balance_max === undefined){
            where.balance = MoreThanOrEqual(dto.balance_min) 
        }else if(dto.balance_min !== undefined && dto.balance_max !== undefined){
            where.balance = Between(Number(dto.balance_min), Number(dto.balance_max))
        }

        if(dto.source_id){where.source = {id:Number(dto.source_id)}}
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
            
        const [all_clients, total] =  await this.clientRepository.findAndCount({where,
            relations:['source', 'register', 'modify', 'group', 'region', 'district'],
            skip: (page - 1) * limit, take: limit, order: { created: 'DESC' }})
    
        
        const map = all_clients.map(
            client => ({
                source_id: client.source?.id ?? null, 
                register_id: client.register?.id ?? null,
                modify_id: client.modify?.id ?? null,
                group_id: client.group?.id ?? null,
                region_id: client.region?.id ?? null,
                district_id: client.district?.id ?? null,
                ...client,
        })
        )
        return {map,  total}
    }
       
    

    async update_client(id: string, dto: UpdateClientDto, modifyed_user) {
        const modified = await this.userEntity.findOne({where:{id:Number(modifyed_user)}})
        if(!modified) {throw new NotFoundException('modified_id not faund')}
        const client = await this.clientRepository.findOne({ where: { id: Number(id) } });
        if (!client) {throw new NotFoundException(`Client with id=${id} not found`)}
        
        if(dto.name){client.name = dto.name}
        if(dto.phone){client.phone = dto.phone}
        if(dto.gender){client.gender = dto.gender}
        if(dto.status!==undefined){client.status = dto.status}
        if(dto.group_id){
            const ex = await this.client_groupEntity.findOne({where:{id:Number(dto.group_id)}})
            if(!ex){throw new NotFoundException("group_id not found")}
            client.group = ex
        }
        if(dto.birthday){client.birthday = new Date(dto.birthday)}
        if(dto.address){client.address = dto.address}
        if(dto.description!==undefined){client.description = dto.description}
        if(dto.source_id){
            const ex = await this.sourceEntity.findOne({where: {id: Number(dto.source_id)}})
            if(!ex){throw new NotFoundException("source_id not found")}
            client.source = ex
        }
        if(dto.group_id){
            const ex = await this.client_groupEntity.findOne({where: {id: Number(dto.group_id)}})
            if(!ex){throw new NotFoundException("group_id not found")}
            client.group = ex
        }
        if(dto.region_id){
            const ex = await this.regionEntity.findOne({where:{id: Number(dto.region_id)}})
            if(!ex){throw new NotFoundException("region_id not found")}
            client.region = ex
        }
        if(dto.district_id){
            const ex = await this.districtEntity.findOne({where:{id:Number(dto.district_id)}})
            if (!ex){throw new NotFoundException("district_id not found")}
            client.district = ex
        }
        client.updated = new Date()
        client.modify = modified
        return await this.clientRepository.save(client)

    }

    async delete_client(id: string) {
        const client = await this.clientRepository.findOne({ where: { id: Number(id) } });
        if (!client) {
            return { message: 'Client not found' };
        }
        await this.clientRepository.update(client.id, {status: 0});
        return { message: 'Client deleted successfully' };
    }
}
