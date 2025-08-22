import { Injectable, OnModuleInit } from '@nestjs/common';
import { AddUser } from './dto/add_user.dto';
import { LoginUser } from './dto/login_user.dto';
import { User } from './entities/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import { RoleUser } from './dto/role.dto';
import { RoleEntity } from './entities/role.entity';



@Injectable()
export class UsersService  {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(RoleEntity)
        private readonly roleEntity: Repository<RoleEntity>,
        private readonly jwtService: JwtService,){}



    async add_user(dto: AddUser) {
        const user = await this.userRepository.findOne({ where: { name: dto.name, user_name: dto.username } })
        if (user){
            return { message: 'User already exists' }
        }else{
            const role = await this.roleEntity.findOne({ where: { id: dto.role_id } });
            if (!role) {
                throw new Error('Role not found');
}
            const newUser = this.userRepository.create({name: dto.name, user_name: dto.username, password: dto.password, role_id: role, phone: dto.phone, chat_id: dto.chat_id});
            await this.userRepository.save(newUser);
            return { message: 'User added successfully', user: newUser };
        }
}

async login_user(dto: LoginUser) {
    const user = await this.userRepository.findOne({ where: { name: dto.userName, password: dto.password } });
    if (user) {
        const jwt_token = await this.validateUser(user.id, user.role_id.id);
        return jwt_token
    } else {
        return { message: 'Invalid credentials' };
    }
}

async validateUser(id: number, role_id: number) {
        
    const accessToken = this.jwtService.sign({ id, role_id }, { secret: process.env.ACCESS_TOKEN, expiresIn: '15m' });

    const refreshToken = this.jwtService.sign({ id, role_id }, { secret: process.env.REFRESH_TOKEN,  expiresIn: '7d' });

    return {
      message: 'Login successful',
      accessToken,
      refreshToken,
    };
      
    }


async add_role(dto: RoleUser) {
    const role = await this.roleEntity.findOne({ where: { name: dto.name } });
    if (role) {
        return { message: 'Role already exists' };
    } else {
        const newRole = this.roleEntity.create({ name: dto.name });
        await this.roleEntity.save(newRole);
        return { message: 'Role added successfully', role: newRole };
}
}

async get_all_user() {
    return await this.userRepository.find();
    
}

async delete_user(id: string) {
    const user = await this.userRepository.findOne({ where: { id: Number(id) } });
    if (user) {
        await this.userRepository.remove(user);
        return { message: 'User deleted successfully' };
    } else {
        return { message: 'User not found' };
    }
}

async get_roles() {
    return await this.roleEntity.find();
}

async delete_role(id: string) {
    const role = await this.roleEntity.findOne({ where: { id: Number(id) } });
    if (role) {
        await this.roleEntity.remove(role);
        return { message: 'Role deleted successfully' };
    } else {
        return { message: 'Role not found' };
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