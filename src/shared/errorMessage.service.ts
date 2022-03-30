import { Injectable } from '@nestjs/common';

@Injectable()
export class ErrorMessageService {
    errorMessages: string[] = [];
    constructor() {
    }

    public clearErrorMessages() {
        this.errorMessages.length = 0
    }

    public addErrorMessage(errmsg) {
        this.errorMessages.push(errmsg);
    }

    public getErrorMessages() {
        return this.errorMessages;
    }
}