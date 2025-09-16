import { Injectable, NotFoundException } from '@nestjs/common';
import { Room } from './room.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository, Between, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { CreateRoomDto } from './roomDto.ts/createRoom'
import { UpdateRoomDto } from './roomDto.ts/updateRoom';
import { FilterRoomDto } from './roomDto.ts/filterRoom';
import { DepartamentEntity } from 'src/departament/deportament_entity/deportament.entity';
import { User } from '../users/entities/users.entity'

@Injectable()
export class RoomService {
   constructor(
    @InjectRepository(Room)
    private readonly roomEntity: Repository<Room>,
    @InjectRepository(DepartamentEntity)
    private readonly departamentEntity: Repository<DepartamentEntity>,
    @InjectRepository(User)
    private readonly userEntity: Repository<User>){}


async add_room(dto: CreateRoomDto, user){

        
        if(dto.departament_id){
            const departament = await this.departamentEntity.findOne({where:{id: dto.departament_id}})
            if(!departament){throw new NotFoundException('departament not found')}
        }
        if(dto.user_id){
            const user = await this.userEntity.findOne({where: {id: dto.user_id}})
            if(!user){throw new NotFoundException("user not found")}
        }

        if(dto.name){
            const room = await this.roomEntity.findOne({where:{name: dto.name}})
            if(room){throw new NotFoundException("room with this name found")}
        }
        
        const register = await this.userEntity.findOne({where: {id: Number(user)}})
        if(!register){throw new NotFoundException}
    
        const new_room =  await this.roomEntity.create({
    name: dto.name ?? undefined,
    departament:dto.departament_id ?  {id: dto.departament_id} : undefined,
    capacity: dto.capacity ?? undefined,
    count_patient: dto.count_patient ?? undefined,
    user: dto.user_id ? {id: dto.user_id} :  undefined,
    price: dto.price ?? undefined,
    price_food: dto.price_food ?? undefined,
    state: dto.state ?? undefined,
    status: dto.status ?? undefined,
    register: register
    }) 
    return await this.roomEntity.save(new_room)
}

async get_all_rooms(dto: FilterRoomDto){
    const where: any = {}
    if(dto.name){where.name = Like(`%${dto.name}%`)}
    if(dto.departament_id){where.departament = {id: Number(dto.departament_id)}}
    if(dto.capacity){where.capacity = Number(dto.capacity)}
    if(dto.user_id){where.user = {id: Number(dto.capacity)}}
    if(dto.status){where.status = Number(dto.status)}
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

    const [all_rooms, total] =  await this.roomEntity.findAndCount({where,
            relations: ['departament', 'user', 'register', 'modify'],
            skip: (page - 1) * limit, take: limit, order: { created: 'DESC' }});
        
         const map = all_rooms.map(
    room => ({...room, 
        departament: room.departament?.id ?? null, 
        register_id: room.register?.id ?? null, 
        user_id: room.user?.id ?? null,
        modify_id: room.modify?.id ?? null}))
        return {total, map}
}

async update_room(id, dto: UpdateRoomDto, user){
    const room = await this.roomEntity.findOne({where: {id: Number(id)}})
    if(!room){throw new NotFoundException("departament not found")}
    const modify = await this.userEntity.findOne({where:{id: user}})
    if(!modify){throw new NotFoundException}

    if(dto.name){
        const name = await this.roomEntity.findOne({where: {name: dto.name}})
        if(name){throw new NotFoundException("room with this name founded")}
        room.name = dto.name}
    if(dto.departament_id){
        const departament = await this.departamentEntity.findOne({where: {id: dto.departament_id}})
        if(!departament){throw new NotFoundException("departament not found")}
        room.departament = departament
    }
    if(dto.user_id){
        const user = await this.userEntity.findOne({where:{id: Number(dto.user_id)}}) 
        if(!user){throw new NotFoundException("user not found")}
        room.user = user
    }
    if(dto.capacity){room.capacity = Number(dto.capacity)}
    if(dto.count_patient){room.count_patient = Number(dto.count_patient)}
    if(dto.state){room.state = dto.state}
    if(dto.status){room.status = Number(dto.status)}
    if(dto.price){room.price = Number(dto.price)}
    if(dto.price_food){room.price_food = Number(dto.price_food)}

    room.modify = modify
    room.created = new Date()

    return await this.roomEntity.save(room)
}

async delete_room(id){

    const room = await this.roomEntity.findOne({where: {id: Number(id)}})
    if(!room){return {message: 'room not found'}}
    await this.roomEntity.update(room.id, {status: 0})
    return {message: 'Room deleted successfully'}
}
}
