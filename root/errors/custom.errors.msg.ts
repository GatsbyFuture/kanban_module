import {ErrorCodes} from "../enums/error.codes";

export const ErrorMessages: Record<ErrorCodes, { status: number, message: string }> = {
    [ErrorCodes.BOARD_NOT_FOUND]: {status: 404, message: "Board not found!"},
    [ErrorCodes.BOARD_ALREADY_EXIST]: {status: 409, message: "Board already exists!"},

    [ErrorCodes.COLUMN_NOT_FOUND]: {status: 404, message: "Column not found!"},
    [ErrorCodes.COLUMN_ALREADY_EXIST]: {status: 409, message: "Column already exists!"},

    [ErrorCodes.TASK_NOT_FOUND]: {status: 404, message: 'Task not found!'},
    [ErrorCodes.TASK_ALREADY_EXIST]: {status: 409, message: "Task already exists!"},

    [ErrorCodes.TASK_USER_NOT_FOUND]: {status: 404, message: "Task user not found!"},

    [ErrorCodes.DATA_NOT_FOUND]: {status: 404, message: 'Data not found!'},
}