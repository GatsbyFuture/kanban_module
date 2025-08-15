import {ErrorCodes} from "../enums/error.codes";
import {ErrorMessages} from "./custom.errors.msg";


export class HttpException extends Error {
    public statusCode: number;

    constructor(public code: ErrorCodes) {
        const error = ErrorMessages[code];
        super(error.message);
        this.name = 'HttpException';
        this.statusCode = error.status;
    }
}