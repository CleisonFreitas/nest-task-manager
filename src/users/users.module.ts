import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { usersProviders } from 'src/auth/users.providers';

@Module({
  providers: [
    UsersService,
    ...usersProviders,
  ],
  exports: [
    ...usersProviders,
    UsersService
  ]
})
export class UsersModule {}
