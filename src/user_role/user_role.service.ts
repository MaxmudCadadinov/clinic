import { Injectable, NotFoundException } from '@nestjs/common';
import { RoleEntity } from './user_role.entity/role.entity'
import { RoleUser } from './user_roleDto/role.dto'
import { UpdateRoleDto } from './user_roleDto/update_role.dto'
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository, Like, Between, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UserRoleFilterDto } from './user_roleDto/UserRoleFilterDTO'



@Injectable()
export class UserRoleService {
constructor(
    @InjectRepository(RoleEntity)
    private readonly roleEntity: Repository<RoleEntity>
){}


async add_role(dto: RoleUser) {
    const role = await this.roleEntity.findOne({ where: { name: dto.name } });
    if (role) {
        throw new NotFoundException("role with this name faunded");
    } else {
        const newRole = this.roleEntity.create({ name: dto.name });
        await this.roleEntity.save(newRole)
        return newRole 
}
}


async update_role(id: string, dto: UpdateRoleDto) {
    const role = await this.roleEntity.findOne({ where: { id: Number(id) } });
   if (!role) {throw new NotFoundException(`Role with id=${id} not found`);}
   if (dto.name){
    const ex = await this.roleEntity.findOne({where: {name: dto.name}})
    if(ex){throw new NotFoundException("role with this name founded")}
    role.name = dto.name}
   if (dto.status !==undefined ){role.status = Number(dto.status)}

   await this.roleEntity.save(role)
    
   return role

}


async get_roles(dto: UserRoleFilterDto) {

    const where: any = {}
    if(dto.name){where.name = Like(`${dto.name}%`)}
    if(dto.status!==undefined){where.status = Number(dto.status)}

    if(dto.created_from && dto.created_to){
        where.createdAt = Between(new Date(dto.created_from), new Date(dto.created_to))
    }else if(!dto.created_from && dto.created_to){
        where.createdAt = LessThanOrEqual(new Date(dto.created_to))
    }else if(dto.created_from && !dto.created_to){
        where.createdAt = MoreThanOrEqual(new Date(dto.created_from))}

    const page = dto.page && dto.page > 0 ? dto.page : 1;
    const limit = dto.limit && dto.limit > 0 ? dto.limit : 10;

    const [all_userRole, total] =  await this.roleEntity.findAndCount({where,
        skip: (page - 1) * limit, take: limit, order: { createdAt: 'DESC' }})
    return {all_userRole, total}
}


async delete_role(id: string) {
    const role = await this.roleEntity.findOne({ where: { id: Number(id) } });
    if (!role) {throw new NotFoundException("role with this id not founded")}
    await this.roleEntity.update(role.id, {status: 0});
    return {message: "role deleted successfully"}
       
}
}
