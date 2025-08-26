import { Injectable,  NotFoundException } from '@nestjs/common';
import { AddUser } from './dto/add_user.dto';
import { LoginUser } from './dto/login_user.dto';
import { User } from './entities/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { RoleEntity } from '../user_role/user_role.entity/role.entity';
import { UpdateUserDto } from './dto/update_user.dto';
import { FileService } from './uploadPhoto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common'




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
        if (user){
             throw new BadRequestException('Username already exists');
        }else{
            const role = await this.roleEntity.findOne({ where: { id: dto.role_id } });
            if (!role) {
                throw new BadRequestException('Role not found');
}
    const newUser = this.userRepository.create({name: dto.name, user_name: dto.username, password: dto.password, role: role, 
    phone: dto.phone, chat_id: dto.chat_id});
    if(dto.photo){
        const name_photo = await this.fileService.downloadAndSavePhoto(dto.photo)
        newUser.photo = name_photo;
    }
    await this.userRepository.save(newUser);
            const body = {id: newUser.id, name: newUser.name, username: newUser.user_name, phone: newUser.phone,
                role_id: newUser.role.id, role: newUser.role, status: newUser.status, created: newUser.createdAt, photo: newUser.photo,
                service: newUser.services}
            return   body
        }
}

async login_user(dto: LoginUser) {
    const user = await this.userRepository.findOne({ where: { user_name: dto.userName, password: dto.password, }, relations: ['role'] });

    if (user) {
        const jwt_token = await this.validateUser(user.id, user.role?.id);
        return jwt_token
    } else {
        throw new HttpException('Invalid credentials', HttpStatus.CONFLICT);
    }
}

async validateUser(id: number, role_id?: number) {
        
    const accessToken = this.jwtService.sign({ id, role_id }, { secret: process.env.ACCESS_TOKEN, expiresIn: '15m' });

    const refreshToken = this.jwtService.sign({ id, role_id }, { secret: process.env.REFRESH_TOKEN,  expiresIn: '7d' });
    
    return {
      message: 'Login successful',
      accessToken,
      refreshToken,
    };
      
    }




async get_all_user() {
    const users = await this.userRepository.find({select: ["id", "name", "user_name", "phone", "role", "status", "photo", "createdAt", "updatedAt", "services", "ownedDepartaments", "registeredClients" ]});
    console.log(users)
    const map = users.map(user => ({...user, role_id: user.role?.id ?? null, photoUrl: user.photo ? `http://localhost:3000/${user.photo}` : null,
    }));

    return map
    
}

async update_user(id: string, dto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id: Number(id) } });
   if (!user) {throw new NotFoundException(`User with id=${id} not found`)}
    if(dto.name){user.name = dto.name}
    if(dto.user_name){user.user_name = dto.user_name}
    if(dto.password){user.password = dto.password}
    if(dto.phone){user.phone = dto.phone}
    if(dto.photo){user.photo = await this.fileService.downloadAndSavePhoto(dto.photo)}
    if(dto.status){user.status = dto.status}
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
    if (user) {
        await this.userRepository.remove(user);
        return { message: 'User deleted successfully' };
    } else {
        throw new HttpException('Invalid credentials', HttpStatus.CONFLICT);
    }
}

// async refresh_token(refreshToken ) { 
//         const decoded: any = jwt.verify(refreshToken, process.env.REFRESH_TOKEN as string);
//         if (!decoded) {
//             return { message: 'Invalid refresh token' };
//         }
//         const new_access_token = this.jwtService.sign({ id: decoded.id, role_id: decoded.role_id }, { secret: process.env.ACCESS_TOKEN, expiresIn: '15m' });
//         return {
//             message: 'Token refreshed successfully',
//             accessToken: new_access_token
//         };
// }
}