import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { DepartamentModule } from './departament/departament.module';
import { ServiceModule } from './service/service.module';
import { ServiceUserModule } from './service_user/service_user.module';
import { ClientGroupModule } from './client_group/client_group.module';
import { LocRegionModule } from './loc_region/loc_region.module';
import { LocDistrictModule } from './loc_district/loc_district.module';
import { SourceModule } from './source/source.module';
import { ClientModule } from './client/client.module';
import { UserRoleModule } from './user_role/user_role.module';
import { VisitModule } from './visit/visit.module';
import { ReferalModule } from './referal/referal.module';
import { VisitReferalModule } from './visit_referal/visit_referal.module';
import { VisitRoomService } from './visit_room/visit_room.service';
import { VisitRoomController } from './visit_room/visit_room.controller';
import { VisitRoomModule } from './visit_room/visit_room.module';
import { RoomModule } from './room/room.module';
import { VisitServiceModule } from './visit_service/visit_service.module';


@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '5588',
    database: 'clinic',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  }),
    UsersModule,
    DepartamentModule,
    ServiceModule,
    ServiceUserModule,
    ClientGroupModule,
    LocRegionModule,
    LocDistrictModule,
    SourceModule,
    ClientModule,
    UserRoleModule,
    VisitModule,
    VisitReferalModule,
    VisitRoomModule,
    RoomModule,
    VisitServiceModule,
    ReferalModule
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
