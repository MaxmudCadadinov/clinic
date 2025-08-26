import { Module } from '@nestjs/common';
import { ClientGroupService } from './client_group.service';
import { ClientGroupController } from './client_group.controller';
import { ClientGroupEntity } from './client_group.entity/client_group.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/users.entity'


@Module({
  controllers: [ClientGroupController],
  providers: [ClientGroupService],
  imports: [
      TypeOrmModule.forFeature([ClientGroupEntity, User]),
    ],

})
export class ClientGroupModule {}
