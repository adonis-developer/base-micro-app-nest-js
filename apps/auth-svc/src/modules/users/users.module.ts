import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import UserRepository from './repositories/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
// import UserMongoRepository from './repositories/users-mongo.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchemaFactory } from './schemas/user.schema';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: UserSchemaFactory,
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
})
export class UsersModule {}
