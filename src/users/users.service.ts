import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/models/user.model';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import mongoose, { Model } from 'mongoose';
import { ErrorMessageService } from 'src/shared/errorMessage.service';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>,
  private errorMessageService: ErrorMessageService) {}
  async create(createUserDto: CreateUserDto) {
    const data = await new this.UserModel(createUserDto).save();
    const result = [];
    if(!data){
      this.errorMessageService.addErrorMessage({message: "something went wrong"})
      return result;
    }

    data.password = undefined;
    return data;
  }

  async findAll() {
    // use projection if we do not want that thing into are response
    const data = await this.UserModel.find({}, { password: 0 });
    return data;
  }

  async findOne(id: string) {
    const data = await this.UserModel.findById(
      new mongoose.Types.ObjectId(id),
      { password: 0 },
    );
    return data;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const data = await this.UserModel.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      updateUserDto,
    );
    data.password = undefined;
    return data;
  }

  async remove(id: string) {
    const data = await this.UserModel.findByIdAndDelete(
      new mongoose.Types.ObjectId(id),
    );
    return {message:"successfully deleted"};
  }
}
