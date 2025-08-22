import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { JwtModule } from '@nestjs/jwt';
import { RoleEntity } from './entities/role.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/guard/jwt.strategy';


@Module({
  imports: [TypeOrmModule.forFeature([User, RoleEntity]),
  PassportModule.register({ defaultStrategy: 'jwt' }),
JwtModule.register({
      secret: process.env.ACCESS_TOKEN, // лучше вынести в env
      signOptions: { expiresIn: '15m' },
    }),],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy],
  exports: [PassportModule, JwtModule],
})
export class UsersModule {}
