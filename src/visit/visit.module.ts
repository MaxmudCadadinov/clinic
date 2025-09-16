import { Module } from '@nestjs/common';
import { VisitController } from './visit.controller';
import { VisitService } from './visit.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/users.entity';
import { Visit } from './visit.entity';
import { ClientEntity } from 'src/client/client.entity/client.entity';
import { DepartamentEntity } from 'src/departament/deportament_entity/deportament.entity';


@Module({
  imports:[TypeOrmModule.forFeature([User, Visit, ClientEntity, DepartamentEntity]),],
  controllers: [VisitController],
  providers: [VisitService]
})
export class VisitModule {}
