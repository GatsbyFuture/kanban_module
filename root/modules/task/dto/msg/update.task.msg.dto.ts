export interface UpdateTaskMsgDto {
    readonly message: number;
    readonly attachments: object;
    readonly meta: object;
    readonly is_active: boolean;
}