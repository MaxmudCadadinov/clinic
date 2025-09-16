import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { Room } from './room.entity';
import { DepartamentEntity } from 'src/departament/deportament_entity/deportament.entity';
import { User } from 'src/users/entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([Room, DepartamentEntity, User])],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
