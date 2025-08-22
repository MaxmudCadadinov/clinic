import { Module } from '@nestjs/common';
import { ServiceUserService } from './service_user.service';
import { ServiceUserController } from './service_user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceUserEntity } from './service_user.entity/service_user.entity';

@Module({
  controllers: [ServiceUserController],
  providers: [ServiceUserService],
  imports: [
      TypeOrmModule.forFeature([ServiceUserEntity]),
    ],
})
export class ServiceUserModule {}
