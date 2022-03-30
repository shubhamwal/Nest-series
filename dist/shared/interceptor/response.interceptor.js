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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const errorMessage_service_1 = require("../errorMessage.service");
let ResponseInterceptor = class ResponseInterceptor {
    constructor(errorMessageService) {
        this.errorMessageService = errorMessageService;
    }
    intercept(context, next) {
        const response = context.switchToHttp().getResponse();
        const errors = this.errorMessageService.getErrorMessages();
        this.errorMessageService.clearErrorMessages();
        return next.handle().pipe((0, operators_1.map)(result => {
            if ((result && (result.length !== 0) && errors.length === 0)) {
                return response.status(200).json({
                    message: 'Success',
                    statusCode: 1,
                    data: result,
                    err: []
                });
            }
            else if ((result && (result.length === 0) && errors.length === 0)) {
                return response.status(200).json({
                    message: 'No Data Found',
                    statusCode: 1,
                    data: [],
                    err: []
                });
            }
            else if ((result.length === 0 && errors.length !== 0) || (!result[0] && errors.length !== 0)) {
                return response.status(400).json({
                    message: 'Bad Request',
                    statusCode: 2,
                    data: [],
                    err: [{
                            errorCode: 400,
                            errorMessage: errors
                        }]
                });
            }
            else {
                return response.status(200).json({
                    message: 'Partial Success',
                    statusCode: 3,
                    data: result,
                    err: [{
                            errorCode: 400,
                            errorMessage: errors
                        }]
                });
            }
        }));
    }
};
ResponseInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [errorMessage_service_1.ErrorMessageService])
], ResponseInterceptor);
exports.ResponseInterceptor = ResponseInterceptor;
//# sourceMappingURL=response.interceptor.js.map