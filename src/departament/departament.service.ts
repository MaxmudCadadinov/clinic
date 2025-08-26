import { Injectable, NotFoundException, } from '@nestjs/common';
import { DTODepartament } from './departament_dto/departament.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DepartamentEntity } from './deportament_entity/deportament.entity';
import { Repository } from 'typeorm';
import { UpdateDeportamentDto } from './departament_dto/update_departament.dto';
import { User } from '../users/entities/users.entity'
import { BadRequestException } from '@nestjs/common'


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
        if (existingDepartament) {
            throw new BadRequestException('Departament already exists');
        } else {
            const owner = await this.userEntity.findOne({where: {id: dto.owner_id}})
            const register = await this.userEntity.findOne({where: {id: Number(user)}})


            if (!owner ) {throw new NotFoundException('Owner user not found');}
            if (!register ) {throw new NotFoundException('Register user not found');}
            const newDepartament = await this.departamentRepository.create({
                name: dto.name,
                owner: owner,
                register: register
            });
            await this.departamentRepository.save(newDepartament);
            const body = {id: newDepartament.id, name: newDepartament.name, owner: {owner_id: newDepartament.owner.id, owner_name: newDepartament.owner.name, owner_userName: newDepartament.owner.user_name,
            owner_photo: newDepartament.owner.phone, owner_phone: newDepartament.owner.phone}, status: newDepartament.status,
        created: newDepartament.created, register:{id: newDepartament.register.id, name: newDepartament.register.name, username: newDepartament.register.user_name,
            phone: newDepartament.register.phone, role: newDepartament.register.role, 
        },
    }
            return { message: 'Departament added successfully', departament: newDepartament };
        }
}

    async get_all_departaments() {
        return await this.departamentRepository.find({relations: ['owner', 'register', 'modify']});
        
    }

    async update_departament(id: string, dto: UpdateDeportamentDto, user) {
        const departament = await this.departamentRepository.findOne({ where: { id: Number(id) } });
        const modified_user = await this.userEntity.findOne({where: {id: Number(user)}})
        
        if (!departament) {throw new NotFoundException(`User with id=${id} not found`);}
        if (!modified_user){throw new NotFoundException(`modified not found`);}
        
        if (dto.name){departament.name = dto.name}
        if (dto.owner_id){
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
        await this.departamentRepository.remove(departament);
        return { message: 'Departament deleted successfully' };
    }
   
}