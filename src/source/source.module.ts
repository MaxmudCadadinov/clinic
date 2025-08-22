import { Module } from '@nestjs/common';
import { SourceService } from './source.service';
import { SourceController } from './source.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SourceEntity } from './source.entity/source.entity';
@Module({
  controllers: [SourceController],
  providers: [SourceService],
  imports: [
    TypeOrmModule.forFeature([SourceEntity]),
  ],
})
export class SourceModule {}
