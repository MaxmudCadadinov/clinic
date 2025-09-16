import { Module } from '@nestjs/common';
import { VisitRoomEntity } from './visit_room.entity';
import { Room } from 'src/room/room.entity';
import { Visit } from 'src/visit/visit.entity';
import { ClientEntity } from 'src/client/client.entity/client.entity';
import { User } from 'src/users/entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisitRoomService } from './visit_room.service';
import { VisitRoomController } from './visit_room.controller';


@Module({
    imports: [TypeOrmModule.forFeature([VisitRoomEntity, Room, Visit, ClientEntity, User])],
    providers: [VisitRoomService],
    controllers: [VisitRoomController],
    exports: [VisitRoomService]
})
export class VisitRoomModule {}
