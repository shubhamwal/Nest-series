import { IsNotEmpty, IsNumberString, IsString } from "class-validator";



export class CreateUserDto{
  @IsString()
  @IsNotEmpty()
  firstName: string;
  
  @IsString()
  @IsNotEmpty()
  lastName: string;
  
  @IsNumberString()
  @IsNotEmpty()
  age: number;
  
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  password: string;
}