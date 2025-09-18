import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VisitReferalEntity } from './visit_referal.entity'
import { Repository, Between, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';
import { CreateVisitReferalDto } from './visit_referalDto/create_visit_referal'
import { FilterVisitReferalDto } from './visit_referalDto/filterVisit_referal';
import { UpdateVisitReferalDto } from './visit_referalDto/updateVisit_referal.dto';
import { User } from 'src/users/entities/users.entity';
import { Visit } from '../visit/visit.entity'
import { ReferalEntity } from '../referal/referal.entity'
import { ServiceEntity } from '../service/service_entity/service.entity'


@Injectable()
export class VisitReferalService {

    constructor(
        @InjectRepository(VisitReferalEntity)
        private readonly visitReferalEntity: Repository<VisitReferalEntity>,
        @InjectRepository(User)
        private readonly userEntity: Repository<User>,
        @InjectRepository(Visit)
        private readonly visitEntity: Repository<Visit>,
        @InjectRepository(ReferalEntity)
        private readonly referalEntity: Repository<ReferalEntity>,
        @InjectRepository(ServiceEntity)
        private readonly serviceEntity: Repository<ServiceEntity>,
        
    ){}

    async addVisit_referal(dto: CreateVisitReferalDto, user){
        const register = await this.userEntity.findOne({where: {id: Number(user)}})
        if(!register){throw new NotFoundException}
        const visit = await this.visitEntity.findOne({where: {id: dto.visitId}})
        if(!visit){throw new NotFoundException("visit not found")}
        const referal = await this.referalEntity.findOne({where: {id: dto.referalId}})
        if(!referal){throw new NotFoundException("referal not found")}
        const service = await this.serviceEntity.findOne({where:{id: dto.serviceId}})
        if(!service){throw new NotFoundException("service not found")}
        const new_visit_referal = await this.visitReferalEntity.create({
            visit: visit,
            referal: referal,
            service: service,
            price: dto.price ?? undefined,
            price_referal: dto.price_referal ?? undefined,
            status: dto.status ?? undefined,
            register: register
        })
        return await this.visitReferalEntity.save(new_visit_referal)
    }

    async all_VisitReferals(dto:FilterVisitReferalDto){
        const where: any = {}
        if(dto.visitId){where.visit = {id: Number(dto.visitId)}}
        if(dto.referalId){where.referal = {id: Number(dto.referalId)}}
        if(dto.serviceId){where.service = {id: Number(dto.serviceId)}}
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


            if (dto.minPrice && dto.maxPrice) {
                where.price = Between(Number(dto.minPrice), Number(dto.maxPrice));
            } else if (dto.minPrice && !dto.maxPrice) {
                where.price = MoreThanOrEqual(Number(dto.minPrice));
            } else if (!dto.minPrice &&  dto.maxPrice) {
                 where.price = LessThanOrEqual(Number(dto.maxPrice));
}

    const page = dto.page && dto.page > 0 ? dto.page : 1;
    const limit = dto.limit && dto.limit > 0 ? dto.limit : 10;

     const [all_service_referal, total] =  await this.visitReferalEntity.findAndCount({where,
            relations: ['visit', 'referal', 'service', 'register'],
            skip: (page - 1) * limit, take: limit, order: { created: 'DESC' }});
        
        const map = all_service_referal.map(
    service_referal => ({...service_referal, 
        visit_id: service_referal.visit?.id ?? null, 
        register_id: service_referal.register?.id ?? null, 
        service_id: service_referal.service?.id ?? null,
        referal_id: service_referal.referal?.id ?? null}))
        return {total, map}
    }

    async update_VisitReferals(id, dto: UpdateVisitReferalDto, user){
        const modify = await this.userEntity.findOne({where:{id: Number(user)}})
        if(!modify){throw new NotFoundException}
        const visit_referal = await this.visitReferalEntity.findOne({where: {id: Number(id)}})
        if(!visit_referal){throw new NotFoundException("visit referal not found")}
        if(dto.visitId){
            const visit = await this.visitEntity.findOne({where: {id:Number(dto.visitId)}})
            if(!visit){throw new NotFoundException("visit not found")}
            visit_referal.visit = visit
        }
        if(dto.referalId){
            const referal = await this.referalEntity.findOne({where:{id: Number(dto.referalId)}})
            if(!referal){throw new NotFoundException("referal not found")}
            visit_referal.referal = referal
        }
        if(dto.serviceId){
            const service = await this.serviceEntity.findOne({where:{id: dto.serviceId}})
            if(!service){throw new NotFoundException("service not found")}
            visit_referal.service = service
        }

        if(dto.price){visit_referal.price = Number(dto.price)}
        if(dto.price_referal){visit_referal.price_referal = Number(dto.price_referal)}
        visit_referal.updated = new Date()
        visit_referal.modify = modify

        return await this.visitReferalEntity.save(visit_referal)
    
    }

    async delete_VisitReferal(id){
        const visit_referal = await this.visitReferalEntity.findOne({where: {id: Number(id)}})
        if(!visit_referal){throw new NotFoundException("referal not found")}
        await this.visitReferalEntity.update(visit_referal.id, {status: 0})
        return {message: 'VisitReferal is deleted successfully'}
    }
}
