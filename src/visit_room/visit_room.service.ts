import { Injectable, NotFoundException } from '@nestjs/common';
import { VisitRoomEntity } from './visit_room.entity';
import { CreateVisitRoomDto } from './visit_roomDto/createVisit_room';
import { FilterVisitRoomDto } from './visit_roomDto/filter_visit_room';
import { UpdateVisitRoomDto } from './visit_roomDto/updateVisit_room';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';
import { Room } from 'src/room/room.entity';
import { Visit } from '../visit/visit.entity'
import { ClientEntity } from 'src/client/client.entity/client.entity';
import { User } from 'src/users/entities/users.entity';




@Injectable()
export class VisitRoomService {
    constructor(
        @InjectRepository(VisitRoomEntity)
        private readonly visitRoomEntity: Repository<VisitRoomEntity>,
        @InjectRepository(Room)
        private readonly roomEntity: Repository<Room>,
        @InjectRepository(Visit)
        private readonly visitEntity: Repository<Visit>,
        @InjectRepository(ClientEntity)
        private readonly clientEntity: Repository<ClientEntity>,
        @InjectRepository(User)
        private readonly userEntity: Repository<User>,){}

    async addVisit_room(dto: CreateVisitRoomDto, user){
        const room = await this.roomEntity.findOne({where: {id: dto.roomId}})
        if(!room){throw new NotFoundException("room not found")}

        const visit = await this.visitEntity.findOne({where:{id: dto.visitId}})
        if(!visit){throw new NotFoundException("visit not found")}

        const client = await this.clientEntity.findOne({where: {id: dto.clientId}})
        if(!client){throw new NotFoundException('client not found')}

        const register = await this.userEntity.findOne({where: {id: Number(user)}})
        if(!register){throw new NotFoundException}

        if(dto.doctorId){
            const doctor = await this.userEntity.findOne({where: {id: Number(dto.doctorId)}})
            if(!doctor){throw new NotFoundException("Doctor not found")}
        }

        const new_visit_room = await this.visitRoomEntity.create({
            room: dto.roomId? {id: Number(dto.roomId)} : undefined,
            visit: dto.visitId? {id: Number(dto.visitId)} : undefined,
            client: dto.clientId? {id: Number(dto.clientId)} : undefined,
            card_number: dto.card_number? dto.card_number : undefined,
            card_id: dto.card_id? Number(dto.card_id) : undefined,
            date_start: dto.date_start? new Date(dto.date_start) : undefined,
            date_end: dto.date_end? new Date(dto.date_end) : undefined,
            state: dto.state? dto.state : undefined,
            status: dto.status ?? undefined,
            register: register,
            doctor: dto.doctorId? {id: Number(dto.doctorId)} : undefined,
            is_food_connected: dto.is_food_connected ?? undefined,
            price: dto.price ?? undefined,
            price_count: dto.price_count ?? undefined

        })

        return await this.visitRoomEntity.save(new_visit_room)

    }

    async all_VisitRooms(dto: FilterVisitRoomDto){
        const where: any = {}

        if(dto.roomId){where.room = {id: Number(dto.roomId)}}
        if(dto.visitId){where.visit = {id: Number(dto.visitId)}}
        if(dto.clientId){where.client = {id: Number(dto.clientId)}}
        if(dto.card_number){ where.card_number = dto.card_number}
        if(dto.card_id){where.card_id = dto.card_id}
        if(dto.state){where.state = dto.state}
        if(dto.status){where.status = dto.status}
        if(dto.doctorId){where.doctor = {id: dto.doctorId}}

        if (dto.minPrice && dto.maxPrice) {
            where.price = Between(Number(dto.minPrice), Number(dto.maxPrice));
        } else if (dto.minPrice && !dto.maxPrice) {
            where.price = MoreThanOrEqual(Number(dto.minPrice));
        } else if (!dto.minPrice &&  dto.maxPrice) {
            where.price = LessThanOrEqual(Number(dto.maxPrice));
        }

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

    const [all_visit_rooms, total] =  await this.visitRoomEntity.findAndCount({where,
            relations: ['room', 'visit', 'client', 'doctor', 'register'],
            skip: (page - 1) * limit, take: limit, order: { created: 'DESC' }});

    const map = all_visit_rooms.map(
        v_r => ({
            room_id: v_r.room?.id ?? null,
            visit_id: v_r.visit?.id ?? null,
            client_id: v_r.client?.id ?? null,
            doctor_id: v_r.doctor?.id ?? null,
            register_id: v_r.register?.id ?? null,
            ...v_r
        }))
        return {total, map}
    }

    async update_VisitRoom(id, dto: UpdateVisitRoomDto, user ){
        
        const visit_room = await this.visitRoomEntity.findOne({where:{id: Number(id)}})
        if(!visit_room){throw new NotFoundException("visit room not found")}

        const modify = await this.userEntity.findOne({where: {id: Number(user)}})
        if(!modify){throw new NotFoundException}

        if(dto.roomId){
        const room = await this.roomEntity.findOne({where:{id: dto.roomId}})
        if(!room){ throw new NotFoundException("room_id not found")}
        visit_room.room = room
        }
        if(dto.visitId){
            const visit = await this.visitEntity.findOne({where: {id: dto.visitId}})
            if(!visit){throw new NotFoundException("visit not found")}
            visit_room.visit = visit
        }
        if(dto.clientId){
            const client = await this.clientEntity.findOne({where:{id: dto.clientId}})
            if(!client){throw new NotFoundException("client not found")}
            visit_room.client = client
        }
        if(dto.card_number){visit_room.card_number = dto.card_number}
        if(dto.card_id){visit_room.card_id = dto.card_id}
        if(dto.status){visit_room.status = dto.status}
        if(dto.state){visit_room.state = dto.state}
        if(dto.is_food_connected){visit_room.is_food_connected = dto.is_food_connected}
        if(dto.date_start){visit_room.date_start = new Date(dto.date_start)}
        if(dto.date_end){visit_room.date_end = new Date(dto.date_end)}
        if(dto.price){ visit_room.price = dto.price}
        if(dto.price_count){ visit_room.price_count = dto.price_count}
        if(dto.doctorId){
            const doctor = await this.userEntity.findOne({where: {id: dto.doctorId}})
            if(!doctor){ throw new NotFoundException("doctor not found")}
            visit_room.doctor = doctor
        }
        visit_room.modify = modify
        visit_room.updated = new Date()
        return await this.visitRoomEntity.save(visit_room)
        
    }

    async delete_VisitRoom(id){
        const visit_room = await this.visitRoomEntity.findOne({where:{id: Number(id)}})
        if(!visit_room){throw new NotFoundException('visit room not found')}
        await this.visitRoomEntity.update(visit_room.id, {status: 0})
        return {message: 'visit room deleted successfully'}
    }
}
