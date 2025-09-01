import { Injectable, NotFoundException } from '@nestjs/common';
import { DTOClientGroup } from './client_group.dto/client_group.dto';
import { Repository, Between, LessThanOrEqual, MoreThanOrEqual, Like} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientGroupEntity } from './client_group.entity/client_group.entity';
import { UpdateClientGroupDto } from './client_group.dto/updateClient_group.dto';
import { User } from '../users/entities/users.entity'
import { ClientGroupFilterDto } from './client_group.dto/clientDroupFilterDto'

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
        if (existingClientGroup) { throw new NotFoundException('Client group with this name founded')}
        if(!creat_user){throw new NotFoundException('created user not founded')}
        const newClientGroup = this.clientGroupRepository.create({name: dto.name, register: creat_user });
        await this.clientGroupRepository.save(newClientGroup);
        return newClientGroup
        }
    

    async getAllClientGroups(dto: ClientGroupFilterDto) {
        const where: any = {}
        if(dto.name){where.name = Like(`%${dto.name}%`)}
        if(dto.status!==undefined){where.status = Number(dto.status)}
        
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
        
        
        const [all_clientGroups, total] =  await this.clientGroupRepository.findAndCount({where, 
            relations: ['register', 'modify'],
            skip: (page - 1) * limit, take: limit, order: { created: 'DESC' }});
        
            const map = all_clientGroups.map(
            clientgroup => ({
                register_id: clientgroup.register?.id ?? null,
                modify_id: clientgroup.modify?.id ?? null,
                ...clientgroup,
        })
        )
        return {total, map}
    }
    
    async updateClientGroup(id: string, dto: UpdateClientGroupDto, updated_user) {
        const updateclient_group = await this.clientGroupRepository.findOne({ where: { id: Number(id) } });
        const update_user = await this.userEntity.findOne({where: {id: Number(updated_user)}})
        if(!update_user){throw new NotFoundException("created user not found")}
        if (!updateclient_group) {throw new Error(`Client Group with id=${id} not found`);}
        
        if(dto.name!==undefined){updateclient_group.name = dto.name}
        if(dto.status !== undefined ){updateclient_group.status}
        updateclient_group.modify = update_user
        return this.clientGroupRepository.save(updateclient_group);
    }


    async deleteClientGroup(id: string) {
        const clientGroup = await this.clientGroupRepository.findOne({ where: { id: Number(id) } });
        if (!clientGroup) {
            throw new NotFoundException("created user not found")
        }
        await this.clientGroupRepository.update(clientGroup.id, {status: 0});
        return { message: 'Client Group deleted successfully' };
    }
}


