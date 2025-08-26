import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceEntity } from './service_entity/service.entity';
import { User } from '../users/entities/users.entity'
import { DepartamentEntity } from 'src/departament/deportament_entity/deportament.entity';


@Module({
  controllers: [ServiceController],
  providers: [ServiceService],
   imports: [
      TypeOrmModule.forFeature([ServiceEntity, DepartamentEntity, User]),
    ],
})
export class ServiceModule {}
