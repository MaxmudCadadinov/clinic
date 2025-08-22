import { Module } from '@nestjs/common';
import { DepartamentService } from './departament.service';
import { DepartamentController } from './departament.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartamentEntity } from './deportament_entity/deportament.entity';


@Module({
  controllers: [DepartamentController],
  providers: [DepartamentService],
  imports: [
    TypeOrmModule.forFeature([DepartamentEntity]),
  ],
})
export class DepartamentModule {}
