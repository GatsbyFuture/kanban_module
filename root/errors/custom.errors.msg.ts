import {ErrorCodes} from "../enums/error.codes";

export const ErrorMessages: Record<ErrorCodes, { status: number, message: string }> = {
    [ErrorCodes.BOARD_NOT_FOUND]: {status: 404, message: "Board not found!"},
    [ErrorCodes.BOARD_ALREADY_EXIST]: {status: 409, message: "Board already exists!"},
    [ErrorCodes.DATA_NOT_FOUND]: {status: 404, message: 'Data not found!'},
}