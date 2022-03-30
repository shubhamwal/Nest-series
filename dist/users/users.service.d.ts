import { User, UserDocument } from 'src/models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import mongoose, { Model } from 'mongoose';
import { ErrorMessageService } from 'src/shared/errorMessage.service';
export declare class UsersService {
    private UserModel;
    private errorMessageService;
    constructor(UserModel: Model<UserDocument>, errorMessageService: ErrorMessageService);
    create(createUserDto: CreateUserDto): Promise<any[] | (User & mongoose.Document<any, any, any> & {
        _id: any;
    })>;
    findAll(): Promise<(User & mongoose.Document<any, any, any> & {
        _id: any;
    })[]>;
    findOne(id: string): Promise<User & mongoose.Document<any, any, any> & {
        _id: any;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User & mongoose.Document<any, any, any> & {
        _id: any;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
