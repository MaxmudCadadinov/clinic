import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersService } from './users/users.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const usersService = app.get(UsersService);

  const users = await usersService['userRepository'].find({
    relations: ['role_id'],
  });

  console.log(users);

  await app.close();
}

bootstrap();
