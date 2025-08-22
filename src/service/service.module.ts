import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceEntity } from './service_entity/service.entity';


@Module({
  controllers: [ServiceController],
  providers: [ServiceService],
   imports: [
      TypeOrmModule.forFeature([ServiceEntity]),
    ],
})
export class ServiceModule {}
