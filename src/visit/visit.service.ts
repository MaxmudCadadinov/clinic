import { Injectable, NotFoundException } from '@nestjs/common';
import { Visit } from './visit.entity'
import { CreateVisitDto } from './visitDto/createVisit.dto'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Between, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { ClientEntity } from '../client/client.entity/client.entity'
import { User } from '../users/entities/users.entity'
import { VisitState } from './visit.entity'
import { FilterVisitDto } from './visitDto/filter_visit.dto'
import { UpdateVisitDto } from './visitDto/updateVisit.dto';
import { DepartamentEntity } from 'src/departament/deportament_entity/deportament.entity';


@Injectable()
export class VisitService {
    constructor(
    @InjectRepository(Visit)
    private readonly visitEntity: Repository<Visit>,
    @InjectRepository(ClientEntity)
    private readonly clientEntity: Repository<ClientEntity>,
    @InjectRepository(User)
    private readonly userEntity: Repository<User>,
    @InjectRepository(DepartamentEntity)
    private readonly departamentEntity: Repository<DepartamentEntity>){}


    async addVisit(dto: CreateVisitDto, register){
    
    const reg_id = await this.userEntity.findOne({where:{id:Number(register)}})
    if(!reg_id){throw new NotFoundException("registering user not found")}
   
    if(dto.clientId){
        const client = await this.clientEntity.findOne({where:{id: dto.clientId}})
        if(!client){throw new NotFoundException("client not founded")}
    }
   
    if(dto.departament_id){
       const departament = await this.departamentEntity.findOne({where:{id:Number(dto.departament_id)}})
       if (!departament){throw new NotFoundException("Departament not found")}
   }
    const new_visit = await this.visitEntity.create(
       {client: dto.clientId? {id: dto.clientId} : undefined,
        departament: dto.departament_id? {id: dto.clientId} : undefined,
        price: dto.price ?? 0, 
        state: dto.state ?? VisitState.NEW,
        register: reg_id,
        visitDateTime: dto.visitDateTime? new Date(dto.visitDateTime):undefined,
        description:dto.description,
        is_emergency: dto.is_emergency ?? undefined,
        emergency_car: dto.emergency_car ?? undefined
        }
    )
    const saved_visit = await this.visitEntity.save(new_visit)
    return saved_visit
    }


    async all_visits(dto: FilterVisitDto){
        const where: any = {}
        if(dto.clientId){where.client = Like(`%${dto.clientId}%`)}
        if(dto.description){where.description = Like(`%${dto.description}%`)}
        if(dto.state){where.state = dto.state}
        if(dto.status!==undefined){where.status = Number(dto.status)}
        if(dto.departament_id){where.departament = {id: Number(dto.departament_id)}}
        if(dto.is_emergency){where.is_emergency = dto.is_emergency}
        if(dto.emergency_car){where.emergency_car = dto.emergency_car}
        if(dto.fromDate && dto.toDate){
            const fromData = new Date(dto.fromDate)
            const toDate = new Date(dto.toDate)

            toDate.setHours(23, 59, 59, 999)
            fromData.setHours(0, 0, 0, 0)
            where.visitDateTime = Between(fromData, toDate)
        }else if(!dto.fromDate && dto.toDate){
            const toDate = new Date(dto.toDate)
            toDate.setHours(23, 59, 59, 999)

            where.visitDateTime = LessThanOrEqual(toDate)

        }else if(dto.fromDate && !dto.toDate){
            const fromData = new Date(dto.fromDate)
            fromData.setHours(0, 0, 0, 0)
            where.visitDateTime = MoreThanOrEqual(fromData)}

        if(dto.minPrice && dto.maxPrice){
            where.price = Between(Number(dto.minPrice), Number(dto.maxPrice))
        }else if(!dto.minPrice && dto.maxPrice){
            where.price = LessThanOrEqual(Number(dto.maxPrice))
        }else if(dto.minPrice && !dto.maxPrice){
            where.price = MoreThanOrEqual(Number(dto.minPrice))}

        
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

    const [all_visits, total] = await this.visitEntity.findAndCount({where,
        relations:['client'
            , 'modify', 'departament'],
        skip: (page - 1) * limit, take: limit, order: { created: 'DESC' }})

    const map = all_visits.map(visit => ({
        ...visit,
        client_id: visit.client?.id ?? null,
        
        modify_id: visit.modify?.id ?? null
    }))
    return {total, map}
}

async update_visit(id: string, dto: UpdateVisitDto,  user ){
    const visit = await this.visitEntity.findOne({where: {id: Number(id)}})
    if(!visit){throw new NotFoundException("Visit not found")}
    const modified_id = await this.userEntity.findOne({where:{id: Number(user)}})
    if(!modified_id){throw new NotFoundException("modified user not found")}
    if(dto.clientId){
        const client = await this.clientEntity.findOne({where:{id: Number(dto.clientId)}})
        if(!client){throw new NotFoundException("client not found")}
        visit.client = client}
    if(dto.visitDateTime){
        visit.visitDateTime = new Date(dto.visitDateTime)}
    if(dto.price){visit.price = Number(dto.price)}
    if(dto.state){visit.state = dto.state}
    if(dto.description){visit.description = dto.description}
    if(dto.departament_id){
        const departament = await this.departamentEntity.findOne({where: {id:Number(dto.departament_id)}})
        if(!departament){throw new NotFoundException("departament not found")}
        visit.departament = departament
    }
    if(dto.status){visit.status = Number(dto.status) }
    if(dto.is_emergency){visit.is_emergency = dto.is_emergency}
    if(dto.emergency_car){visit.emergency_car = dto.emergency_car}
    visit.updated = new Date()
    visit.modify = modified_id
    await this.visitEntity.save(visit)
    return visit
}

async delete_visit(id: string){
    const visit = await this.visitEntity.findOne({where: {id: Number(id)}})
    if(!visit){throw new NotFoundException("visit not found")}
    await this.visitEntity.update(visit.id, {status: 0})
    return {message: 'visit deleted successfully'}
}
}