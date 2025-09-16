import { Module } from '@nestjs/common';
import { VisitReferalController } from './visit_referal.controller';
import { VisitReferalService } from './visit_referal.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisitReferalEntity } from './visit_referal.entity';
import { User } from '../users/entities/users.entity'
import { Visit } from 'src/visit/visit.entity';
import { ReferalEntity } from 'src/referal/referal.entity';
import { ServiceEntity } from 'src/service/service_entity/service.entity';



@Module({
  imports: [TypeOrmModule.forFeature([VisitReferalEntity, User, Visit, ReferalEntity, ServiceEntity])],
  controllers: [VisitReferalController],
  providers: [VisitReferalService]
})
export class VisitReferalModule {}
