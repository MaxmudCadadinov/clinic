import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { JwtModule } from '@nestjs/jwt';
import { RoleEntity } from '../user_role/user_role.entity/role.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/guard/jwt.strategy';
import { FileService } from './uploadPhoto';


@Module({
  imports: [TypeOrmModule.forFeature([User, RoleEntity]),
  PassportModule.register({ defaultStrategy: 'jwt' }),
JwtModule.register({
      secret: process.env.ACCESS_TOKEN, // лучше вынести в env
      signOptions: { expiresIn: '15m' },
    }),],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy, FileService],
  exports: [PassportModule, JwtModule],
})
export class UsersModule {}
