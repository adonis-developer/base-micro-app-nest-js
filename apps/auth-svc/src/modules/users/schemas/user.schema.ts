import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IUserModel } from '../interfaces/users.interface';
import { genUUID } from '@app/commons';

export type UserDocument = HydratedDocument<User>;

@Schema({
  versionKey: false,
  toJSON: {
    getters: true,
  },
})
export class User implements IUserModel {
  @Prop({
    default: genUUID(),
  })
  id: string;

  @Prop({
    set: (name: string) => {
      return name.trim();
    },
  })
  name: string;

  @Prop({
    default: new Date().toISOString(),
  })
  createdAt: Date;

  @Prop({
    default: new Date().toISOString(),
  })
  updatedAt: Date;

  @Prop({
    default: null,
  })
  deletedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

export const UserSchemaFactory = () => {
  const userSchema = UserSchema;

  userSchema.pre('updateOne', async function (next: any) {
    this.set({
      updatedAt: new Date().toISOString(),
    });
    return next();
  });
  return userSchema;
};
