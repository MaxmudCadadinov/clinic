import { Module } from '@nestjs/common';
import { ReferalController } from './referal.controller';
import { ReferalService } from './referal.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/users.entity'
import { ReferalEntity } from './referal.entity';



@Module({
  imports: [TypeOrmModule.forFeature([User, ReferalEntity])],
  controllers: [ReferalController],
  providers: [ReferalService]
})
export class ReferalModule {}
