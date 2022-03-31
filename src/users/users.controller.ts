import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/create')
  @UsePipes(ValidationPipe)
  create(@Body() createUserDto: CreateUserDto) {
    const data = this.usersService.create(createUserDto);
    if (data) {
      return data;
    } else
      throw new HttpException('Something went wrong', HttpStatus.BAD_REQUEST);
  }

  @Get()
  findAll() {
    const data = this.usersService.findAll();
    if (data) {
      return data;
    } else
      throw new HttpException('Something went wrong', HttpStatus.BAD_REQUEST);
  }

  @Get('/search/:id')
  findOne(@Param('id') id: string) {
    const data = this.usersService.findOne(id);

    if (data) {
      return data;
    } else
      throw new HttpException('Something went wrong', HttpStatus.BAD_REQUEST);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const data = this.usersService.update(id, updateUserDto);

    if (data) {
      return data;
    } else
      throw new HttpException('Something went wrong', HttpStatus.BAD_REQUEST);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const data = this.usersService.remove(id);
    if (data) {
      return data;
    } else
      throw new HttpException('Something went wrong', HttpStatus.BAD_REQUEST);
  }
}
