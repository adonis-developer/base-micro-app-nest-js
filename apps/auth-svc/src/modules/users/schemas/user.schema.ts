import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IUserModel } from '../interfaces/users.interface';
import { genUUID } from '@app/commons';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User implements IUserModel {
  @Prop({
    default: genUUID(),
  })
  id: string;

  @Prop()
  name: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
