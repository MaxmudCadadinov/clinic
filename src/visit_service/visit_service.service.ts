import { Injectable, NotFoundException } from '@nestjs/common';
import { VisitServiceEntity } from './visit_service.entity';
import { CreateVisitServiceDto } from './visit_serviceDto.ts/createVisitService';
import { UpdateVisitServiceDto } from './visit_serviceDto.ts/updateVisitService';
import { FilterVisitServiceDto } from './visit_serviceDto.ts/filterVisitService';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/users.entity'
import { ServiceEntity } from 'src/service/service_entity/service.entity';
import { Visit } from 'src/visit/visit.entity';
import { DepartamentEntity } from 'src/departament/deportament_entity/deportament.entity';





@Injectable()
export class VisitServiceService {
    constructor(
        @InjectRepository(VisitServiceEntity)
        private readonly visitServiceEntity: Repository<VisitServiceEntity>,
        @InjectRepository(ServiceEntity)
        private readonly serviceEntity: Repository<ServiceEntity>,
        @InjectRepository(Visit)
        private readonly visitEntity: Repository<Visit>,
        @InjectRepository(DepartamentEntity)
        private readonly departamentEntity: Repository<DepartamentEntity>,
        @InjectRepository(User)
        private readonly userEntity: Repository<User>
    ){}

    async add_v_s(dto: CreateVisitServiceDto, req){

        if(dto.doctor_id){
            const doctor = await this.userEntity.findOne({where: {id: dto.doctor_id}})
            if(!doctor){throw new NotFoundException("doctor not found")}
        }

        if(dto.service_id){
            const service = await this.serviceEntity.findOne({where: {id: dto.service_id}})
            if(!service){throw new NotFoundException("service not found")}
        }

        if(dto.visit_id){
            const visit = await this.visitEntity.findOne({where:{id: dto.visit_id}})
            if(!visit){throw new NotFoundException("visit not found")}
        }
        if(dto.departament_id){
            const departament = await this.departamentEntity.findOne({where: {id: dto.departament_id}})
            if(!departament){throw new NotFoundException("departament not found")}
        }
        const new_visitSer = await this.visitServiceEntity.create({
            doctor: dto.doctor_id? {id: dto.doctor_id} : undefined,
            service: dto.service_id? {id: dto.service_id}: undefined,
            visit: dto.visit_id? {id: dto.visit_id}: undefined,
            departament: dto.departament_id? {id: dto.departament_id}: undefined
        })
        return await this.visitServiceEntity.save(new_visitSer)
    }

    async get_v_s(dto: FilterVisitServiceDto){
        const where: any = {}
        if(dto.doctor_id){where.doctor = {id: dto.doctor_id}}
        if(dto.service_id){where.service = {id: dto.service_id}}
        if(dto.visit_id){where.visit = {id: dto.visit_id}}
        if(dto.departament_id){where.departament = {id: dto.departament_id}}

        const page = dto.page && dto.page > 0 ? dto.page : 1;
        const limit = dto.limit && dto.limit > 0 ? dto.limit : 10;

        const [all_visit_service, total] = await this.visitServiceEntity.findAndCount({
            where,
            relations: ['doctor', 'service', 'visit', 'departament'],
            skip: (page - 1) * limit, take: limit, order: {id: 'DESC'}})

        const map  = all_visit_service.map(
            item =>({
                doctor_id: item.doctor?.id ?? null,
                service_id: item.service?.id ?? null,
                visit_id: item.visit?.id ?? null,
                departament: item.departament?.id ?? null
            })
        )
        return {total, map}
    }

    async update_v_ss(id, dto: UpdateVisitServiceDto, user){
        const v_s = await this.visitServiceEntity.findOne({where: {id: Number(id)}})
        if(!v_s){throw new NotFoundException("visit service not found")}

        if(dto.doctor_id){
            const doctor = await this.userEntity.findOne({where: {id: dto.doctor_id}})
            if(!doctor){throw new NotFoundException("Doctor not found")}
            v_s.doctor = doctor
        }

        if(dto.service_id){
            const service = await this.serviceEntity.findOne({where:{id: dto.service_id}})
            if(!service){throw new NotFoundException("service not found")}
            v_s.service = service
        }

        if(dto.visit_id){
            const visit = await this.visitEntity.findOne({where: {id: dto.visit_id}})
            if(!visit){throw new NotFoundException('visit not found')}
            v_s.visit = visit
        }

        if(dto.departament_id){
            const departament = await this.departamentEntity.findOne({where: {id: dto.departament_id}})
            if(!departament){throw new NotFoundException("departament not found")}
            v_s.departament = departament
        }
    
        return await this.visitServiceEntity.save (v_s)
    }

    async delete_v_s(id){
        // const v_s = await this.visitServiceEntity.findOne({where: {id: Number(id)}})
        // if(!v_s){throw new NotFoundException("visit service not found")}
        // await this.visitServiceEntity.update(v_s.id,)
    }
}
