import { Module } from '@nestjs/common';
import { VisitServiceService } from './visit_service.service';
import { VisitServiceController } from './visit_service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisitServiceEntity } from './visit_service.entity';
import { ServiceEntity } from 'src/service/service_entity/service.entity';
import { Visit } from 'src/visit/visit.entity';
import { DepartamentEntity } from 'src/departament/deportament_entity/deportament.entity';
import { User } from 'src/users/entities/users.entity';


@Module({
  imports: [TypeOrmModule.forFeature([VisitServiceEntity, ServiceEntity, Visit, DepartamentEntity, User])],
  controllers: [VisitServiceController],
  providers: [VisitServiceService],
})
export class VisitServiceModule {}
