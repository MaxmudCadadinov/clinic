import { Injectable, NotFoundException, } from '@nestjs/common';
import { DTODepartament } from './departament_dto/departament.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DepartamentEntity } from './deportament_entity/deportament.entity';
import { Repository, Like, Between, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';
import { UpdateDeportamentDto } from './departament_dto/update_departament.dto';
import { User } from '../users/entities/users.entity'
import { BadRequestException } from '@nestjs/common'
import { FilterDepartamentDto } from './departament_dto/FilterDepartament.dto'


@Injectable()
export class DepartamentService {
    constructor(
        @InjectRepository(DepartamentEntity)
        private readonly departamentRepository: Repository<DepartamentEntity>,
        @InjectRepository(User)
        private readonly userEntity: Repository<User>
    ){}
    async add_departament(dto: DTODepartament, user) {
        const existingDepartament = await this.departamentRepository.findOne({ where: { name: dto.name } });
        if (existingDepartament) {throw new BadRequestException('Departament already exists')}
        const owner = await this.userEntity.findOne({where: {id: Number(dto.owner_id)}})
        if (!owner ) {throw new NotFoundException('Owner user not found');}
        const register = await this.userEntity.findOne({where: {id: Number(user)}})
        if (!register ) {throw new NotFoundException('Register user not found');}
    
     
        const newDepartament = await this.departamentRepository.create({
                name: dto.name,
                owner: owner,
                register: register
            })
            await this.departamentRepository.save(newDepartament);
            const body = {id: newDepartament.id, 
                name: newDepartament.name, 
                status: newDepartament.status,
                created: newDepartament.created, 
                owner_id: newDepartament.owner.id,
                register_id: newDepartament.register.id,
                owner: {owner_id: newDepartament.owner.id, owner_name: newDepartament.owner.name, owner_userName: newDepartament.owner.user_name,
                        owner_photo: newDepartament.owner.phone, owner_phone: newDepartament.owner.phone, owner_roleId: newDepartament.owner.role.id, owner_role: newDepartament.owner}, 
                register:{id: newDepartament.register.id, name: newDepartament.register.name, username: newDepartament.register.user_name,
                        phone: newDepartament.register.phone, role: newDepartament.register.role},
    }
            return body;
}


    async get_all_departaments(dto: FilterDepartamentDto) {
        
    const where: any = {}  
    if(dto.name){where.name = Like(`${dto.name}%`)}
    if(dto.owner_id){where.owner = {id: Number(dto.owner_id)}}
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

    const [all_departament, total] =  await this.departamentRepository.findAndCount({where,
            relations: ['owner', 'register', 'modify'],
            skip: (page - 1) * limit, take: limit, order: { created: 'DESC' }});
        
    const map = all_departament.map(
    depart => ({...depart, 
        owner_id: depart.owner?.id ?? null, 
        register_id: depart.register?.id ?? null, 
        modify_id: depart.modify?.id ?? null}))
        return {total, map}
    }



    async update_departament(id: string, dto: UpdateDeportamentDto, user) {
        const departament = await this.departamentRepository.findOne({ where: { id: Number(id) } });
        const modified_user = await this.userEntity.findOne({where: {id: Number(user)}})
        
        if (!departament) {throw new NotFoundException(`User with id=${id} not found`);}
        if (!modified_user){throw new NotFoundException(`modified not found`);}
        
        if (dto.name!==undefined){
            const find_name = await this.departamentRepository.findOne({where: {name: dto.name}})
            if (find_name){throw new NotFoundException("departament with this name founded")}
            departament.name = dto.name}
        if (dto.owner_id!==undefined){
            const owner_id = await this.userEntity.findOne({where:{id: Number(dto.owner_id)}})
            if (!owner_id){throw new NotFoundException(`owner not found`);}
            departament.owner = owner_id
        }
        if (dto.status !== undefined ){departament.status = dto.status}
        departament.modify = modified_user

        return await this.departamentRepository.save(departament)
    }


    
    async delete_departament(id: string) {
        const departament = await this.departamentRepository.findOne({ where: { id: Number(id) } });
        if (!departament) {
            return { message: 'Departament not found' };
        }
        await this.departamentRepository.update(departament.id, {status: 0});
        return { message: 'Departament deleted successfully' };
    }
   
}