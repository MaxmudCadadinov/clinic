import { Module } from '@nestjs/common';
import { ServiceUserService } from './service_user.service';
import { ServiceUserController } from './service_user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceUserEntity } from './service_user.entity/service_user.entity';
import { User } from '../users/entities/users.entity'
import { ServiceEntity } from '../service/service_entity/service.entity'

@Module({
  controllers: [ServiceUserController],
  providers: [ServiceUserService],
  imports: [
      TypeOrmModule.forFeature([ServiceUserEntity, User, ServiceEntity]),
    ],
})
export class ServiceUserModule {}
