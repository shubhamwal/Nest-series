import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {User, UserSchema} from 'src/models/user.model'
import { ErrorMessageService } from 'src/shared/errorMessage.service';

@Module({
  imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}])],
  controllers: [UsersController],
  providers: [UsersService,ErrorMessageService]
})
export class UsersModule {}
