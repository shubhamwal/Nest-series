import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ErrorMessageService } from '../errorMessage.service';
export interface Response<T> {
    message: string;
    statusCode: number;
    data: T;
    err: string[];
}
export declare class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
    private errorMessageService;
    constructor(errorMessageService: ErrorMessageService);
    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>>;
}
