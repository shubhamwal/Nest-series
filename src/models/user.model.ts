import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator';
import { Document } from 'mongoose';


export type UserDocument = User & Document;

@Schema()
export class User {
  
  @Prop()
  firstName: string;
  
  
  @Prop()
  lastName: string;
  
  
  @Prop()
  age: number;
  
  
  @Prop()
  address: string;

  
  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
