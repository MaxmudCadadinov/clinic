import { Injectable, NotFoundException } from '@nestjs/common';
import { RoleEntity } from './user_role.entity/role.entity'
import { RoleUser } from './user_roleDto/role.dto'
import { UpdateRoleDto } from './user_roleDto/update_role.dto'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';


@Injectable()
export class UserRoleService {
constructor(
    @InjectRepository(RoleEntity)
    private readonly roleEntity: Repository<RoleEntity>
){}


async add_role(dto: RoleUser) {
    const role = await this.roleEntity.findOne({ where: { name: dto.name } });
    if (role) {
        throw new HttpException('Invalid credentials', HttpStatus.CONFLICT);
    } else {
        const newRole = this.roleEntity.create({ name: dto.name });
        await this.roleEntity.save(newRole)
        return   { message: 'Role added successfully', role: newRole };
}
}


async update_role(id: string, dto: UpdateRoleDto) {
    const role = await this.roleEntity.findOne({ where: { id: Number(id) } });
   if (!role) {throw new NotFoundException(`Role with id=${id} not found`);}
   if (dto.name){role.name = dto.name}
   if (dto.status !==undefined ){role.status = Number(dto.status)}

   await this.roleEntity.save(role)
    
   return {message: "Role updated successfully"};

}


async get_roles() {
    return await this.roleEntity.find()
}


async delete_role(id: string) {
    const role = await this.roleEntity.findOne({ where: { id: Number(id) } });
    if (role) {
        await this.roleEntity.remove(role);
        return { message: 'Role deleted successfully' };
    } else {
        throw new HttpException('Invalid credentials', HttpStatus.CONFLICT);
    }
}
}
