export interface CreateTaskMsgDto {
    readonly task_id: number;
    readonly user_id: number;
    readonly message: string;
    readonly attachments: object;
    readonly meta: object;
}