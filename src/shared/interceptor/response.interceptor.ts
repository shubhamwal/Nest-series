import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Response } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ExceptionFilter, ArgumentsHost } from "@nestjs/common";
//import { ValidationException } from '../error-handler/filters/validation.exception';
import { ErrorMessageService } from '../errorMessage.service';

export interface Response<T> {
  message: string;
  statusCode: number;
  data: T;
  err: string[];
}



@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  constructor(private errorMessageService: ErrorMessageService) { }
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> { 
    const response = context.switchToHttp().getResponse();
    const errors = this.errorMessageService.getErrorMessages();
    this.errorMessageService.clearErrorMessages();
    // return next.handle().pipe(map(result => ({ message: (result && (result.length !== 0) && errors.length === 0)? 'Success' : (result.length === 0 && errors.length !== 0)? 'Error' : 'Partial Success', statusCode: (result && (result.length !== 0) && errors.length === 0)? 1 : (result.length === 0 && errors.length !== 0)? 2 : 3, data: result, err: errors})));
    return next.handle().pipe(map(result => {
      if ((result && (result.length !== 0) && errors.length === 0)) {
        return response.status(200).json({
          message: 'Success',
          statusCode: 1,
          data: result,
          err: []
        });
      } else if ((result && (result.length === 0) && errors.length === 0)) {
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
      } else {
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
}