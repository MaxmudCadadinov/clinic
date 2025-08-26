import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from './client.entity/client.entity';
import { User } from 'src/users/entities/users.entity';
import { loc_districtEntitiy } from 'src/loc_district/loc_district.entity/loc_district.entity';
import { loc_regionEntitiy } from 'src/loc_region/loc_region.entity/loc_region.entity';
import { ClientGroupEntity } from 'src/client_group/client_group.entity/client_group.entity';
import { SourceEntity } from '../source/source.entity/source.entity'


@Module({
  controllers: [ClientController],
  providers: [ClientService],
  imports: [
    TypeOrmModule.forFeature([ClientEntity, User, loc_districtEntitiy, loc_regionEntitiy, ClientGroupEntity, SourceEntity]),
  ],
})
export class ClientModule {}
