import { Module } from '@nestjs/common';
import { ClientGroupService } from './client_group.service';
import { ClientGroupController } from './client_group.controller';
import { ClientGroupEntitiy } from './client_group.entity/client_group.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  controllers: [ClientGroupController],
  providers: [ClientGroupService],
  imports: [
      TypeOrmModule.forFeature([ClientGroupEntitiy]),
    ],

})
export class ClientGroupModule {}
