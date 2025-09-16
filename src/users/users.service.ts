import { Injectable,  NotFoundException } from '@nestjs/common';
import { AddUser } from './dto/add_user.dto';
import { LoginUser } from './dto/login_user.dto';
import { User } from './entities/users.entity';
import { Repository, Like, Between, MoreThanOrEqual, LessThanOrEqual, Not } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { RoleEntity } from '../user_role/user_role.entity/role.entity';
import { UpdateUserDto } from './dto/update_user.dto';
import { FileService } from './uploadPhoto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common'
import * as jwt from 'jsonwebtoken';
import { RefreshDto } from './dto/refresh.dto';
import { UserFilterDto } from './dto/userFilterDTO'
import { UnauthorizedException } from '@nestjs/common';



@Injectable()
export class UsersService  {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(RoleEntity)
        private readonly roleEntity: Repository<RoleEntity>,
        private readonly jwtService: JwtService,
        private readonly fileService: FileService){}



    async add_user(dto: AddUser) {
        const user = await this.userRepository.findOne({ where: { user_name: dto.username } })
        //console.log(user)
        if (user){throw new BadRequestException('Username already exists')}
        const role = await this.roleEntity.findOne({ where: { id: dto.role_id } });
        if (!role) {throw new BadRequestException('Role not found');}
    const newUser = this.userRepository.create({name: dto.name, user_name: dto.username, role: role, chat_id: dto.chat_id});
    if(!dto.password || dto.password.trim()===''){throw new NotFoundException('Пароль пустой')}else{newUser.password = dto.password}
    if(dto.photo){
        newUser.photo = dto.photo;
    }
    await this.userRepository.save(newUser);
            const body = {id: newUser.id, name: newUser.name, username: newUser.user_name, phone: newUser.phone,
                role_id: newUser.role.id, status: newUser.status, created: newUser.createdAt, photo: `http://192.168.3.124:3000/${newUser.photo}`,
                service: newUser.services, role: newUser.role}
            return   body
        }


async get_all_user(dto: UserFilterDto) {

    const where: any = {}
    
    if(dto.name){where.name = Like(`%${dto.name}%`)}
    if(dto.user_name){where.user_name = Like(`%${dto.user_name}%`)}
    if(dto.phone){where.phone = Like(`%${dto.phone}%`)}
    if(dto.role_id){where.role = {id: Number(dto.role_id)}}
    if(dto.status!==undefined){where.status = Number(dto.status)
    }else {where.status = Not(0)}

    if(dto.created_from && dto.created_to){
        
        const toDate = new Date(dto.created_to);
        const fromDate = new Date(dto.created_from)
        toDate.setHours(23, 59, 59, 999)
        fromDate.setHours(0, 0, 0, 0)
        
        where.createdAt = Between(fromDate, toDate )
    }else if(!dto.created_from && dto.created_to){
        
        const toDate = new Date(dto.created_to);
        toDate.setHours(23, 59, 59, 999)

        where.createdAt = LessThanOrEqual(toDate)
    }else if(dto.created_from && !dto.created_to){
        
        const fromDate = new Date(dto.created_from)
        fromDate.setHours(0, 0, 0, 0)
        where.createdAt = MoreThanOrEqual(fromDate)}

    const page = dto.page && dto.page > 0 ? dto.page : 1;
    const limit = dto.limit && dto.limit > 0 ? dto.limit : 999;

    const [users, total] = await this.userRepository.findAndCount({where,
        select: ["id", "name", "user_name", "phone", "role", "status", "photo", "createdAt", "updatedAt", "services", "ownedDepartaments", "registeredClients" ],
        skip: (page - 1) * limit, take: limit, order: { createdAt: 'ASC' }});
    const map = users.map(user => ({...user, role_id: user.role?.id ?? null, photoUrl: user.photo ? `http://192.168.3.124:3000/${user.photo}` : null,
    }));

    return {map, total}
    
}

async update_user(id: string, dto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id: Number(id) } })
   if (!user) {throw new NotFoundException(`User with id=${id} not found`)}
    if(dto.name!==undefined){user.name = dto.name}
    if(dto.user_name!==undefined){
        const find_username = await this.userRepository.findOne({where: {name: dto.user_name}})
        if (find_username){throw new NotFoundException('User with this username founded')}
        user.user_name = dto.user_name}
    if(dto.password!==undefined){user.password = dto.password}
    if(dto.phone!==undefined){user.phone = dto.phone}
    if(dto.photo!==undefined){user.photo = dto.photo}
    if(dto.status!==undefined){user.status = dto.status}
    if(dto.role_id){
        const role = await this.roleEntity.findOne({where: {id: Number(dto.role_id)}})
        if(!role){throw new NotFoundException('Role not found')}
        user.role = role
    }
    
    await this.userRepository.save(user)
    const body = {id: user.id, name: user.name, username: user.user_name, phone: user.phone, photo: user.photo, status: user.status, role_id: user.role.id, role: user.role}
    return body
}


async delete_user(id: string) {
    const user = await this.userRepository.findOne({ where: { id: Number(id) } });
    if (!user) {throw new HttpException('user with this id not found', HttpStatus.CONFLICT)}
    
    await this.userRepository.update(user.id, {status: 0});
    return { message: 'User deleted successfully' };
   
}


async login_user(dto: LoginUser) {
    const user = await this.userRepository.findOne({ where: { user_name: dto.userName, password: dto.password, }, relations: ['role'] });
    if (!user) {throw new NotFoundException('user not found')}
        
    const accessToken = this.jwtService.sign({ userId: user.id, role_name: user.role.name }, { secret: process.env.ACCESS_TOKEN, expiresIn: '60m' });
    const refreshToken = this.jwtService.sign({ userId: user.id, role_name: user.role.name }, { secret: process.env.REFRESH_TOKEN,  expiresIn: '7d' });
    user.refresh_token = refreshToken
    await this.userRepository.save(user)
        return  {accessToken: accessToken, refreshToken: refreshToken}
   
}

async refresh_token(dto: RefreshDto ) { 
    try{
        const decoded: any = jwt.verify(dto.refresh, process.env.REFRESH_TOKEN as string);
        
        const new_access_token = this.jwtService.sign({ userId: decoded.userId, role_name: decoded.role_name }, { secret: process.env.ACCESS_TOKEN, expiresIn: '60m' });
        return {accessToken: new_access_token}
    }catch(error){
        if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Refresh token expired');
    }
    throw new UnauthorizedException('Invalid refresh token');
    }
}
}