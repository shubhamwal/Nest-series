import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {User, UserSchema} from 'src/models/user.model'
import { ErrorMessageService } from 'src/shared/errorMessage.service';
import { ValidateUserMiddleware } from './middlewares/validate-user.middleware';


@Module({
  imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}])],
  controllers: [UsersController],
  providers: [UsersService,ErrorMessageService]
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidateUserMiddleware)
    // exclude means we do not want to run authentication on this particular route
    .exclude({
      path: 'api/Users/create',
      method: RequestMethod.POST
    })
    // for routes used for apply middleware for specific routes
    .forRoutes(UsersController
      //{
      // for single route
      //path:'users/search/:id',
      //method: RequestMethod.GET,
    //}
    )
  }
}
