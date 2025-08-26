import { Module } from '@nestjs/common';
import { UserRoleService } from './user_role.service';
import { UserRoleController } from './user_role.controller';
import { RoleEntity } from './user_role.entity/role.entity'
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],
  controllers: [UserRoleController],
  providers: [UserRoleService],
})
export class UserRoleModule {}
