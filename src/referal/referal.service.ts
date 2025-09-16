import { Injectable, NotFoundException } from '@nestjs/common';
import { ReferalEntity } from './referal.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Between, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';
import { CreateReferalDto } from './referalDto/createReferalDto'
import { FilterReferalDto } from './referalDto/filerReferalDto'
import { UpdateReferalDto } from './referalDto/updateReferalDto'
import { User } from 'src/users/entities/users.entity';


@Injectable()
export class ReferalService {
    constructor(
        @InjectRepository(ReferalEntity)
        private readonly referalEntity: Repository<ReferalEntity>){}
        @InjectRepository(User)
        private readonly userEntity: Repository<User>

    async add_referal(dto: CreateReferalDto, user){
        const register = await this.userEntity.findOne({where:{id: Number(user)}})
        if(!register){throw new NotFoundException("")}
        const ex_name =  await this.referalEntity.findOne({where:{name: dto.name}})
        if(ex_name){throw new NotFoundException("referal with this name founded")}
        const new_referal = await this.referalEntity.create({name: dto.name,
            phone:dto.phone,
            description: dto.description,
            percent: dto.percent,
            status: dto.status,
            register: register
        })
        return await this.referalEntity.save(new_referal)
    }


    async get_all_referals(dto: FilterReferalDto){

        const where: any = {}
        if(dto.name){where.name = Like(`%${dto.name}%`)}
        if(dto.phone){where.phone = Like(`%${dto.phone}%`)}
        if(dto.description){where.description = Like(`%${dto.description}%`)}
        if(dto.percent){where.percent = dto.percent}
        if(dto.status){where.status = Number(dto.status)}
        if(dto.createdFrom && dto.createdTo){
            const toDate = new Date(dto.createdTo)
            const fromDate = new Date(dto.createdFrom)
            toDate.setHours(23, 59, 59, 999)
            fromDate.setHours(0, 0, 0, 0)
            
            where.created = Between(fromDate, toDate)
        
        }else if(!dto.createdFrom && dto.createdTo){
            const toDate = new Date(dto.createdTo)
            toDate.setHours(23, 59, 59, 999)

            where.created = LessThanOrEqual(toDate)

        }else if(dto.createdFrom && !dto.createdTo){
            const fromDate = new Date(dto.createdFrom)
            fromDate.setHours(0, 0, 0, 0)

            where.created = MoreThanOrEqual(fromDate)  
        }

        const page = dto.page && dto.page > 0 ? dto.page : 1;
        const limit = dto.limit && dto.limit > 0 ? dto.limit : 10;

        const [all_referals, total] = await this.referalEntity.findAndCount({where, 
            skip: (page - 1) * limit, take: limit, order: { created: 'DESC' }})

            return {total: total, all_referals: all_referals}
    }


    async update_referal(id, dto: UpdateReferalDto, user){
        const referal  = await this.referalEntity.findOne({where: {id: Number(id)}})
        if(!referal){throw new NotFoundException('Referal not found')}
        const modified_user = await this.userEntity.findOne({where: {id: Number(user)}})
        if(!modified_user){throw new NotFoundException("modified User Not found")}

        if(dto.name){
             const ex_name = await this.referalEntity.findOne({where: {name: dto.name}})
             if(ex_name){throw new NotFoundException("referal with this name founded")}
             referal.name = dto.name
        }
        if(dto.name){referal.name = dto.name}
        if(dto.phone){referal.phone = dto.phone}
        if(dto.description){referal.description = dto.description}
        if(dto.percent){referal.percent = dto.percent}
        if(dto.status){referal.status = dto.status}
        referal.updated = new Date()
        referal.modify = modified_user

        return await this.referalEntity.save(referal)
    }

    async delete_referal(id){
        const referal = await this.referalEntity.findOne({where:{id: Number(id)}})
        if(!referal){throw new NotFoundException("referal not found")}
        await this.referalEntity.update(referal.id, {status: 0})
        return {message: 'Deleted successfully'}
    }
}
