"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_model_1 = require("../models/user.model");
const mongoose_2 = require("mongoose");
const errorMessage_service_1 = require("../shared/errorMessage.service");
let UsersService = class UsersService {
    constructor(UserModel, errorMessageService) {
        this.UserModel = UserModel;
        this.errorMessageService = errorMessageService;
    }
    async create(createUserDto) {
        const data = await new this.UserModel(createUserDto).save();
        const result = [];
        if (!data) {
            this.errorMessageService.addErrorMessage({ message: "something went wrong" });
            return result;
        }
        data.password = undefined;
        return data;
    }
    async findAll() {
        const data = await this.UserModel.find({}, { password: 0 });
        return data;
    }
    async findOne(id) {
        const data = await this.UserModel.findById(new mongoose_2.default.Types.ObjectId(id), { password: 0 });
        return data;
    }
    async update(id, updateUserDto) {
        const data = await this.UserModel.findOneAndUpdate({ _id: new mongoose_2.default.Types.ObjectId(id) }, updateUserDto);
        data.password = undefined;
        return data;
    }
    async remove(id) {
        const data = await this.UserModel.findByIdAndDelete(new mongoose_2.default.Types.ObjectId(id));
        return { message: "successfully deleted" };
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_model_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        errorMessage_service_1.ErrorMessageService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map