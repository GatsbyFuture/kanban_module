import {ErrorCodes} from "../enums/error.codes";

export const ErrorMessages: Record<ErrorCodes, { status: number, message: string }> = {
    [ErrorCodes.DATA_NOT_FOUND]: {status: 404, message: 'Data not found!'},
}